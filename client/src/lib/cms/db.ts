import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { bucketName, getS3, s3Configured } from "@/lib/s3";
import { createSeedDatabase } from "./seed";
import { mergeSiteSettings } from "./settings";
import type { CmsContactInquiry, CmsDatabase, CmsMember, CmsSiteSettings } from "./types";

// Serverless/container filesystems are wiped on restart, so production state lives in the bucket.
const S3_KEY = "cms/cms-db.json";
const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "cms-db.json");

function normalize(raw: Partial<CmsDatabase>): CmsDatabase {
  return {
    contact: Array.isArray(raw.contact) ? raw.contact : [],
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
    { contact: db.contact, members: db.members, settings: db.settings },
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
