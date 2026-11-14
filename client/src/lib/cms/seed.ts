import { randomBytes, scryptSync } from "crypto";
import type { CmsDatabase } from "./types";

/**
 * First-run admin password comes from the environment (never hard-code it in this public repo).
 * Same scrypt "salt:hash" format as hashPassword() in ./auth (not imported: auth -> db -> seed).
 */
function seedAdminPasswordHash(): string | null {
  const password = process.env.CMS_SEED_ADMIN_PASSWORD;
  if (!password) return null;
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
}

/** Local file DB for CMS login, contact inbox, and site settings. Content comes from Strapi. */
export function createSeedDatabase(): CmsDatabase {
  const passwordHash = seedAdminPasswordHash();
  if (!passwordHash) {
    console.warn(
      "[cms] CMS_SEED_ADMIN_PASSWORD is not set: creating the CMS with no admin account. Set it and start with an empty CMS store to create admin@bikewo.com.",
    );
  }
  return {
    contact: [],
    applications: [],
    members: passwordHash
      ? [
          {
            id: "im-admin",
            name: "CMS Admin",
            email: "admin@bikewo.com",
            passwordHash,
            cmsRole: "super_admin",
            department: "Technology",
            invitedAt: "2026-01-01",
            lastActiveAt: null,
            status: "active",
          },
        ]
      : [],
  };
}
