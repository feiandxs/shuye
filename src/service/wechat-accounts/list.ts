'use server';

import { WechatMpAccount } from '@prisma/client';
import { WechatMpAccountModel } from '@/models/wechat-mp-account.model';

interface ListWechatMpAccountsInput {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  category?: string;
}

interface ListWechatMpAccountsOutput {
  accounts: WechatMpAccount[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const listWechatMpAccounts = async (input: ListWechatMpAccountsInput = {}): Promise<ListWechatMpAccountsOutput> => {
  try {
    const {
      page = 1,
      pageSize = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      category,
    } = input;

    const { accounts, total } = await WechatMpAccountModel.listAccounts({
      page,
      pageSize,
      sortBy,
      sortOrder,
      category,
    });

    const totalPages = Math.ceil(total / pageSize);

    return {
      accounts,
      total,
      page,
      pageSize,
      totalPages,
    };
  } catch (error) {
    console.error('Error listing WeChat MP accounts:', error);
    throw new Error('Failed to list WeChat MP accounts');
  }
};
