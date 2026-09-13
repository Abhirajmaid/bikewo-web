import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { createSeedDatabase } from "./seed";
import type { CmsContactInquiry, CmsDatabase, CmsMember } from "./types";

// ponytail: /tmp on Vercel (read-only FS); ephemeral across instances — use Postgres/Blob if CMS must persist
const DATA_DIR =
  process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME
    ? "/tmp"
    : path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "cms-db.json");

function ensureDbFile() {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  if (!existsSync(DB_PATH)) {
    writeFileSync(DB_PATH, JSON.stringify(createSeedDatabase(), null, 2), "utf8");
  }
}

export function getDb(): CmsDatabase {
  ensureDbFile();
  const raw = JSON.parse(readFileSync(DB_PATH, "utf8")) as Partial<CmsDatabase>;
  // Drop legacy news/team keys from older local seeds
  return {
    contact: Array.isArray(raw.contact) ? raw.contact : [],
    members: Array.isArray(raw.members) ? raw.members : createSeedDatabase().members,
  };
}

export function saveDb(db: CmsDatabase) {
  ensureDbFile();
  writeFileSync(
    DB_PATH,
    JSON.stringify({ contact: db.contact, members: db.members }, null, 2),
    "utf8",
  );
}

function nextId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

/* --------------------------------------------------------------- Contact */

export function listContact() {
  return [...getDb().contact].sort(
    (a, b) =>
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
  );
}

export function createContact(input: Omit<CmsContactInquiry, "id" | "submittedAt" | "status">) {
  const db = getDb();
  const item: CmsContactInquiry = {
    ...input,
    id: nextId("ci"),
    submittedAt: new Date().toISOString(),
    status: "new",
  };
  db.contact.unshift(item);
  saveDb(db);
  return item;
}

export function updateContact(id: string, patch: Partial<CmsContactInquiry>) {
  const db = getDb();
  const idx = db.contact.findIndex((c) => c.id === id);
  if (idx < 0) return null;
  db.contact[idx] = { ...db.contact[idx], ...patch, id };
  saveDb(db);
  return db.contact[idx];
}

export function deleteContact(id: string) {
  const db = getDb();
  const before = db.contact.length;
  db.contact = db.contact.filter((c) => c.id !== id);
  if (db.contact.length === before) return false;
  saveDb(db);
  return true;
}

/* --------------------------------------------------------------- Members */

export function listMembers() {
  return [...getDb().members];
}

export function createMember(input: Omit<CmsMember, "id">) {
  const db = getDb();
  const item: CmsMember = { ...input, id: nextId("im") };
  db.members.push(item);
  saveDb(db);
  return item;
}

export function updateMember(id: string, patch: Partial<CmsMember>) {
  const db = getDb();
  const idx = db.members.findIndex((m) => m.id === id);
  if (idx < 0) return null;
  db.members[idx] = { ...db.members[idx], ...patch, id };
  saveDb(db);
  return db.members[idx];
}

export function deleteMember(id: string) {
  const db = getDb();
  const before = db.members.length;
  db.members = db.members.filter((m) => m.id !== id);
  if (db.members.length === before) return false;
  saveDb(db);
  return true;
}
