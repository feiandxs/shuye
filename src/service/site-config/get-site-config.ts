'use server';

import { SiteConfig } from '@prisma/client';

import { SiteConfigModel } from '@/models/site-config.model';

export const getSiteConfig = async (): Promise<SiteConfig> => {
  const siteConfig = await SiteConfigModel.findById(1);
  if (!siteConfig) {
    throw new Error('Site config not found');
  }
  return siteConfig;
};
