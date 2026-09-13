import type { CmsDatabase } from "./types";

/** Pre-hashed password for BikeWo@CMS2026 (scrypt salt:hash). */
const ADMIN_PASSWORD_HASH =
  "47f95977de91d99bb5ab6f2c3ead55c2:1af84ee643ffabb04ab0e960667444b1001f70c9fab8d34f1f9e370d4d5b18e9c86449cd0af9d070943f56d3052ae6a84a40c3bcdb1f907f6cae899dcd5ced5d";

/** Local file DB only for CMS login + contact inbox. Content comes from Strapi. */
export function createSeedDatabase(): CmsDatabase {
  return {
    contact: [],
    members: [
      {
        id: "im-admin",
        name: "CMS Admin",
        email: "admin@bikewo.com",
        passwordHash: ADMIN_PASSWORD_HASH,
        cmsRole: "super_admin",
        department: "Technology",
        invitedAt: "2026-01-01",
        lastActiveAt: null,
        status: "active",
      },
    ],
  };
}
