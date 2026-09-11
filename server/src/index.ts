import type { Core } from '@strapi/strapi';
import { INVESTOR_SEED } from './api/investor-document/seed-data';
import { CAREER_SEED, NEWS_SEED, TESTIMONIAL_SEED } from './api/content-seed';

const PUBLIC_ACTIONS = [
  'api::investor-document.investor-document.find',
  'api::investor-document.investor-document.findOne',
  'api::team-member.team-member.find',
  'api::team-member.team-member.findOne',
  'api::news-media-item.news-media-item.find',
  'api::news-media-item.news-media-item.findOne',
  'api::testimonial.testimonial.find',
  'api::testimonial.testimonial.findOne',
  'api::career-opening.career-opening.find',
  'api::career-opening.career-opening.findOne',
];

async function enablePublicFind(strapi: Core.Strapi) {
  const role = await strapi.db.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
  });
  if (!role) return;

  for (const action of PUBLIC_ACTIONS) {
    const existing = await strapi.db.query('plugin::users-permissions.permission').findOne({
      where: { action, role: role.id },
    });
    if (existing) continue;
    await strapi.db.query('plugin::users-permissions.permission').create({
      data: { action, role: role.id },
    });
  }
}

async function seedIfEmpty(
  strapi: Core.Strapi,
  uid: Parameters<Core.Strapi['documents']>[0],
  countUid: string,
  label: string,
  rows: Record<string, unknown>[],
) {
  const existing = await strapi.db.query(countUid).count();
  if (existing > 0) {
    strapi.log.info(`${label} seed skipped (${existing} already present).`);
    return;
  }
  for (const data of rows) {
    await strapi.documents(uid).create({
      data,
      status: 'published',
    });
  }
  strapi.log.info(`Seeded ${rows.length} ${label}.`);
}

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await enablePublicFind(strapi);

    await seedIfEmpty(
      strapi,
      'api::investor-document.investor-document',
      'api::investor-document.investor-document',
      'investor documents',
      INVESTOR_SEED.map((item) => ({
        slug: item.slug,
        title: item.title,
        excerpt: item.excerpt,
        docType: item.docType,
        date: item.date,
        featured: Boolean(item.featured),
        href: '',
      })),
    );

    await seedIfEmpty(
      strapi,
      'api::news-media-item.news-media-item',
      'api::news-media-item.news-media-item',
      'news media items',
      NEWS_SEED.map((item) => ({
        ...item,
        featured: Boolean(item.featured),
        imageUrl: '',
      })),
    );

    await seedIfEmpty(
      strapi,
      'api::testimonial.testimonial',
      'api::testimonial.testimonial',
      'testimonials',
      TESTIMONIAL_SEED,
    );

    await seedIfEmpty(
      strapi,
      'api::career-opening.career-opening',
      'api::career-opening.career-opening',
      'career openings',
      CAREER_SEED,
    );
  },
};
