import {
  GetObjectCommand,
  PutBucketCorsCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

/** Prefer Railway bucket names; keep short aliases for older local/Vercel envs. */
function env(...names: string[]) {
  for (const name of names) {
    const value = process.env[name];
    if (value) return value;
  }
  return undefined;
}

function required(...names: string[]) {
  const value = env(...names);
  if (!value) throw new Error(`Missing env ${names.join(" or ")}`);
  return value;
}

export function s3Configured() {
  return Boolean(
    env("AWS_ENDPOINT_URL", "AWS_ENDPOINT") &&
      env("AWS_S3_BUCKET_NAME", "AWS_BUCKET") &&
      env("AWS_ACCESS_KEY_ID") &&
      env("AWS_SECRET_ACCESS_KEY", "AWS_ACCESS_SECRET"),
  );
}

export function getS3() {
  return new S3Client({
    region: env("AWS_DEFAULT_REGION", "AWS_REGION") || "auto",
    endpoint: required("AWS_ENDPOINT_URL", "AWS_ENDPOINT"),
    credentials: {
      accessKeyId: required("AWS_ACCESS_KEY_ID"),
      secretAccessKey: required("AWS_SECRET_ACCESS_KEY", "AWS_ACCESS_SECRET"),
    },
    // Railway Buckets (R2) require virtual-hosted-style URLs — do not force path style.
  });
}

export function bucketName() {
  return required("AWS_S3_BUCKET_NAME", "AWS_BUCKET");
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

/** Browser uploads directly to the bucket (avoids Vercel/proxy body size limits). */
export async function signedPutUrl(
  key: string,
  contentType: string,
  expiresIn = 600,
) {
  const s3 = getS3();
  return getSignedUrl(
    s3,
    new PutObjectCommand({
      Bucket: bucketName(),
      Key: key,
      ContentType: contentType,
    }),
    { expiresIn },
  );
}

const DEFAULT_CORS_ORIGINS = [
  "https://www.bikewo.in",
  "https://bikewo.in",
  "http://localhost:3000",
];

let corsReady: Promise<void> | null = null;

/** Allow browser PUTs from the marketing site (Railway has no CORS UI). */
export function ensureBucketCors() {
  if (!corsReady) {
    corsReady = (async () => {
      const extra = (env("AWS_CORS_ORIGINS") || "")
        .split(",")
        .map((o) => o.trim())
        .filter(Boolean);
      const origins = [...new Set([...DEFAULT_CORS_ORIGINS, ...extra])];
      const s3 = getS3();
      await s3.send(
        new PutBucketCorsCommand({
          Bucket: bucketName(),
          CORSConfiguration: {
            CORSRules: [
              {
                AllowedHeaders: ["*"],
                AllowedMethods: ["GET", "PUT", "HEAD"],
                AllowedOrigins: origins,
                ExposeHeaders: ["ETag", "Content-Type"],
                MaxAgeSeconds: 3000,
              },
            ],
          },
        }),
      );
    })().catch((err) => {
      corsReady = null;
      console.error(
        "[s3] PutBucketCors failed — configure CORS on the Railway bucket:",
        err instanceof Error ? err.message : err,
      );
    });
  }
  return corsReady;
}

/** Public app path that proxies / redirects to the private bucket object. */
export function mediaPath(key: string) {
  return `/api/media/${key.split("/").map(encodeURIComponent).join("/")}`;
}
