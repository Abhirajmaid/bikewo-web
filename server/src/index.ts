import type { Core } from '@strapi/strapi';

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

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await enablePublicFind(strapi);
  },
};
