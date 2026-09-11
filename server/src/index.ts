import type { Core } from '@strapi/strapi';
import { INVESTOR_SEED } from './api/investor-document/seed-data';

const PUBLIC_ACTIONS = [
  'api::investor-document.investor-document.find',
  'api::investor-document.investor-document.findOne',
  'api::team-member.team-member.find',
  'api::team-member.team-member.findOne',
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

async function seedInvestorDocuments(strapi: Core.Strapi) {
  const existing = await strapi.db.query('api::investor-document.investor-document').count();
  if (existing > 0) {
    strapi.log.info(`Investor seed skipped (${existing} documents already present).`);
    return;
  }

  for (const item of INVESTOR_SEED) {
    await strapi.documents('api::investor-document.investor-document').create({
      data: {
        slug: item.slug,
        title: item.title,
        excerpt: item.excerpt,
        docType: item.docType,
        date: item.date,
        featured: Boolean(item.featured),
        href: '',
      },
      status: 'published',
    });
  }

  strapi.log.info(`Seeded ${INVESTOR_SEED.length} investor documents (PDFs empty — upload manually).`);
}

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await enablePublicFind(strapi);
    await seedInvestorDocuments(strapi);
  },
};
