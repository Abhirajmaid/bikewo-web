import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

function required(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env ${name}`);
  return value;
}

export function s3Configured() {
  return Boolean(
    process.env.AWS_ENDPOINT &&
      process.env.AWS_BUCKET &&
      process.env.AWS_ACCESS_KEY_ID &&
      process.env.AWS_ACCESS_SECRET,
  );
}

export function getS3() {
  return new S3Client({
    region: process.env.AWS_REGION || "auto",
    endpoint: required("AWS_ENDPOINT"),
    credentials: {
      accessKeyId: required("AWS_ACCESS_KEY_ID"),
      secretAccessKey: required("AWS_ACCESS_SECRET"),
    },
    forcePathStyle: true,
  });
}

export function bucketName() {
  return required("AWS_BUCKET");
}

export async function uploadObject(key: string, body: Buffer, contentType: string) {
  const s3 = getS3();
  await s3.send(
    new PutObjectCommand({
      Bucket: bucketName(),
      Key: key,
      Body: body,
      ContentType: contentType,
    }),
  );
  return key;
}

export async function signedGetUrl(key: string, expiresIn = 3600) {
  const s3 = getS3();
  return getSignedUrl(
    s3,
    new GetObjectCommand({ Bucket: bucketName(), Key: key }),
    { expiresIn },
  );
}

/** Public app path that proxies / redirects to the private bucket object. */
export function mediaPath(key: string) {
  return `/api/media/${key.split("/").map(encodeURIComponent).join("/")}`;
}
