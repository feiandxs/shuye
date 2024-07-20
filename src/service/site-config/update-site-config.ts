'use server';

import { SiteConfig, Prisma } from '@prisma/client';

import { SiteConfigModel } from '@/models/site-config.model';

export const createSiteConfig = async (data: Prisma.SiteConfigCreateInput): Promise<SiteConfig> => SiteConfigModel.create(data);
