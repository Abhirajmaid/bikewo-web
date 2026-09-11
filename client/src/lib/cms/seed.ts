import type { CmsDatabase } from "./types";

/** Pre-hashed password for BikeWo@CMS2026 (scrypt salt:hash). */
const ADMIN_PASSWORD_HASH =
  "47f95977de91d99bb5ab6f2c3ead55c2:1af84ee643ffabb04ab0e960667444b1001f70c9fab8d34f1f9e370d4d5b18e9c86449cd0af9d070943f56d3052ae6a84a40c3bcdb1f907f6cae899dcd5ced5d";

const NSE = "https://nsearchives.nseindia.com/corporate";

/**
 * NSE press releases — titles from exchange filing subjects / published headlines.
 * Sorted newest-first in seed; runtime sorts by date.
 */
export function createSeedDatabase(): CmsDatabase {
  return {
    news: [
      {
        id: "pr-2026-09-07",
        title:
          "BikeWo Renews Focus on Commerce Forever Partnership Under Broader Energy & Mobility Infrastructure Strategy",
        excerpt:
          "Press release filed with the National Stock Exchange on 7 September 2026.",
        typeLabel: "Press release",
        date: "2026-09-07",
        href: `${NSE}/BIKEWO2016_07092026094207_Pressrelease.pdf`,
        image: null,
        status: "published",
        featured: true,
      },
      {
        id: "pr-2026-08-26",
        title:
          "BikeWo Announces Expansion into Warehousing and Integrated Logistics Infrastructure",
        excerpt:
          "Press release filed with the National Stock Exchange on 26 August 2026.",
        typeLabel: "Press release",
        date: "2026-08-26",
        href: `${NSE}/BIKEWO2016_26082026085232_Pressrelease.pdf`,
        image: null,
        status: "published",
        featured: true,
      },
      {
        id: "pr-2026-08-19",
        title:
          "BikeWo and Evify Sign Strategic MoU to Build AI-Led Logistics Technology Platform",
        excerpt:
          "Press release filed with the National Stock Exchange on 19 August 2026.",
        typeLabel: "Press release",
        date: "2026-08-19",
        href: `${NSE}/BIKEWO2016_19082026085627_Pressrelease19082026.pdf`,
        image: null,
        status: "published",
      },
      {
        id: "pr-2026-08-13",
        title:
          "BikeWo Announces Strategic Partnership with Hala Mobility to Deploy EV Fleets",
        excerpt:
          "Press release filed with the National Stock Exchange on 13 August 2026.",
        typeLabel: "Press release",
        date: "2026-08-13",
        href: `${NSE}/BIKEWO2016_13082026093934_Pressrelease13082026.pdf`,
        image: null,
        status: "published",
      },
      {
        id: "pr-2026-08-04",
        title: "BikeWo Signs MoU to Acquire Majority Stake in Enlite EV Care",
        excerpt:
          "Press release filed with the National Stock Exchange on 4 August 2026.",
        typeLabel: "Press release",
        date: "2026-08-04",
        href: `${NSE}/BIKEWO2016_04082026091840_Pressrelease.pdf`,
        image: null,
        status: "published",
      },
      {
        id: "pr-2026-07-28",
        title: "BikeWo Signs MoU to Acquire 51% Stake in Ignitium Services",
        excerpt:
          "Press release filed with the National Stock Exchange on 28 July 2026.",
        typeLabel: "Press release",
        date: "2026-07-28",
        href: `${NSE}/BIKEWO2016_28072026084651_Press_release_Final.pdf`,
        image: null,
        status: "published",
      },
      {
        id: "pr-2026-07-23",
        title:
          "BikeWo Unveils Long-Term Strategy to Build Full-Stack Mobility and Logistics Platform",
        excerpt:
          "Press release filed with the National Stock Exchange on 23 July 2026.",
        typeLabel: "Press release",
        date: "2026-07-23",
        href: `${NSE}/BIKEWO2016_23072026090744_Pressrelease.pdf`,
        image: null,
        status: "published",
      },
      {
        id: "pr-2026-07-17",
        title:
          "BikeWo Partners with Yubhas Renewables for Solar-Assisted E-3W Pilot",
        excerpt:
          "Press release filed with the National Stock Exchange on 17 July 2026.",
        typeLabel: "Press release",
        date: "2026-07-17",
        href: `${NSE}/BIKEWO2016_17072026102956_Press_release_NSE.pdf`,
        image: null,
        status: "published",
      },
      {
        id: "pr-2026-07-02",
        title:
          "BikeWo Signs MoU to Acquire Majority Stake in PositiEV Mobility",
        excerpt:
          "Press release / disclosure filed with the National Stock Exchange on 2 July 2026.",
        typeLabel: "Press release",
        date: "2026-07-02",
        href: `${NSE}/BIKEWO2016_02072026181446_Press_release_Disclosure.pdf`,
        image: null,
        status: "published",
      },
    ],
    team: [],
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
