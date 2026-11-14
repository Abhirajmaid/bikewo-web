import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "fs";
import path from "path";
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { bucketName, getS3, s3Configured } from "@/lib/s3";
import { createSeedDatabase } from "./seed";
import { mergeSiteSettings } from "./settings";
import type {
  CmsContactInquiry,
  CmsDatabase,
  CmsJobApplication,
  CmsMember,
  CmsSiteSettings,
} from "./types";

// Serverless/container filesystems are wiped on restart, so production state lives in the bucket.
const S3_KEY = "cms/cms-db.json";
const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "cms-db.json");

function normalize(raw: Partial<CmsDatabase>): CmsDatabase {
  return {
    contact: Array.isArray(raw.contact) ? raw.contact : [],
    applications: Array.isArray(raw.applications) ? raw.applications : [],
    members: Array.isArray(raw.members) ? raw.members : createSeedDatabase().members,
    settings: raw.settings,
  };
}

async function readRaw(): Promise<Partial<CmsDatabase> | null> {
  if (s3Configured()) {
    try {
      const res = await getS3().send(
        new GetObjectCommand({ Bucket: bucketName(), Key: S3_KEY }),
      );
      return JSON.parse((await res.Body?.transformToString()) || "{}");
    } catch (err) {
      const name = (err as { name?: string }).name;
      if (name === "NoSuchKey" || name === "NotFound") return null;
      throw err;
    }
  }
  if (!existsSync(DB_PATH)) return null;
  return JSON.parse(readFileSync(DB_PATH, "utf8"));
}

export async function getDb(): Promise<CmsDatabase> {
  const raw = await readRaw();
  if (raw) return normalize(raw);
  const seed = createSeedDatabase();
  await saveDb(seed);
  return normalize(seed);
}

export async function saveDb(db: CmsDatabase) {
  const body = JSON.stringify(
    {
      contact: db.contact,
      applications: db.applications,
      members: db.members,
      settings: db.settings,
    },
    null,
    2,
  );
  if (s3Configured()) {
    await getS3().send(
      new PutObjectCommand({
        Bucket: bucketName(),
        Key: S3_KEY,
        Body: body,
        ContentType: "application/json",
      }),
    );
    return;
  }
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(DB_PATH, body, "utf8");
}

function nextId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

/* --------------------------------------------------------------- Contact */

export async function listContact() {
  return [...(await getDb()).contact].sort(
    (a, b) =>
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
  );
}

export async function createContact(
  input: Omit<CmsContactInquiry, "id" | "submittedAt" | "status">,
) {
  const db = await getDb();
  const item: CmsContactInquiry = {
    ...input,
    id: nextId("ci"),
    submittedAt: new Date().toISOString(),
    status: "new",
  };
  db.contact.unshift(item);
  await saveDb(db);
  return item;
}

export async function updateContact(id: string, patch: Partial<CmsContactInquiry>) {
  const db = await getDb();
  const idx = db.contact.findIndex((c) => c.id === id);
  if (idx < 0) return null;
  db.contact[idx] = { ...db.contact[idx], ...patch, id };
  await saveDb(db);
  return db.contact[idx];
}

export async function deleteContact(id: string) {
  const db = await getDb();
  const before = db.contact.length;
  db.contact = db.contact.filter((c) => c.id !== id);
  if (db.contact.length === before) return false;
  await saveDb(db);
  return true;
}

/* ---------------------------------------------------------- Applications */

/** Bucket prefix for CVs / cover letters. Blocked from the public /api/media proxy. */
export const APPLICATION_FILES_PREFIX = "careers-applications/";

export async function listApplications() {
  return [...(await getDb()).applications].sort(
    (a, b) =>
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
  );
}

export function newApplicationId() {
  return nextId("ja");
}

export async function createApplication(
  input: Omit<CmsJobApplication, "submittedAt" | "status">,
) {
  const db = await getDb();
  const item: CmsJobApplication = {
    ...input,
    submittedAt: new Date().toISOString(),
    status: "pending",
  };
  db.applications.unshift(item);
  await saveDb(db);
  return item;
}

export async function getApplication(id: string) {
  return (await getDb()).applications.find((a) => a.id === id) ?? null;
}

export async function updateApplication(
  id: string,
  patch: Pick<CmsJobApplication, "status">,
) {
  const db = await getDb();
  const idx = db.applications.findIndex((a) => a.id === id);
  if (idx < 0) return null;
  db.applications[idx] = { ...db.applications[idx], status: patch.status };
  await saveDb(db);
  return db.applications[idx];
}

export async function deleteApplication(id: string) {
  const db = await getDb();
  const item = db.applications.find((a) => a.id === id);
  if (!item) return false;
  db.applications = db.applications.filter((a) => a.id !== id);
  await saveDb(db);
  for (const key of [item.cvKey, item.coverLetterKey]) {
    if (key) await deleteApplicationFile(key).catch(() => undefined);
  }
  return true;
}

function localFilePath(key: string) {
  return path.join(DATA_DIR, ...key.split("/"));
}

/** Store an uploaded PDF in the bucket (or ./data locally when no bucket is configured). */
export async function saveApplicationFile(key: string, body: Buffer) {
  if (s3Configured()) {
    await getS3().send(
      new PutObjectCommand({
        Bucket: bucketName(),
        Key: key,
        Body: body,
        ContentType: "application/pdf",
      }),
    );
    return;
  }
  const file = localFilePath(key);
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, body);
}

export async function readApplicationFile(key: string): Promise<Buffer | null> {
  if (s3Configured()) {
    try {
      const res = await getS3().send(
        new GetObjectCommand({ Bucket: bucketName(), Key: key }),
      );
      const bytes = await res.Body?.transformToByteArray();
      return bytes ? Buffer.from(bytes) : null;
    } catch {
      return null;
    }
  }
  const file = localFilePath(key);
  return existsSync(file) ? readFileSync(file) : null;
}

async function deleteApplicationFile(key: string) {
  if (s3Configured()) {
    await getS3().send(new DeleteObjectCommand({ Bucket: bucketName(), Key: key }));
    return;
  }
  rmSync(localFilePath(key), { force: true });
}

/* --------------------------------------------------------------- Members */

export async function listMembers() {
  return [...(await getDb()).members];
}

export async function createMember(input: Omit<CmsMember, "id">) {
  const db = await getDb();
  const item: CmsMember = { ...input, id: nextId("im") };
  db.members.push(item);
  await saveDb(db);
  return item;
}

export async function updateMember(id: string, patch: Partial<CmsMember>) {
  const db = await getDb();
  const idx = db.members.findIndex((m) => m.id === id);
  if (idx < 0) return null;
  db.members[idx] = { ...db.members[idx], ...patch, id };
  await saveDb(db);
  return db.members[idx];
}

export async function deleteMember(id: string) {
  const db = await getDb();
  const before = db.members.length;
  db.members = db.members.filter((m) => m.id !== id);
  if (db.members.length === before) return false;
  await saveDb(db);
  return true;
}

/* -------------------------------------------------------------- Settings */

export async function getSiteSettings(): Promise<CmsSiteSettings> {
  try {
    return mergeSiteSettings((await getDb()).settings);
  } catch (err) {
    console.error("[cms/db] settings read failed, using defaults:", err);
    return mergeSiteSettings(undefined);
  }
}

export async function updateSiteSettings(
  patch: Partial<CmsSiteSettings>,
): Promise<CmsSiteSettings> {
  const db = await getDb();
  const cleaned = Object.fromEntries(
    Object.entries(patch).filter(([, v]) => v !== undefined),
  ) as Partial<CmsSiteSettings>;
  const next = mergeSiteSettings({ ...db.settings, ...cleaned });
  db.settings = next;
  await saveDb(db);
  return next;
}
