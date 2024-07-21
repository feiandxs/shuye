'use server';

import { WechatMpAccount } from '@prisma/client';
import { WechatMpAccountModel } from '@/models/wechat-mp-account.model';

interface CreateWechatMpAccountInput {
  name: string;
  appId: string;
  appSecret: string;
}

export const createWechatMpAccount = async (input: CreateWechatMpAccountInput): Promise<WechatMpAccount> => {
  try {
    const newAccount = await WechatMpAccountModel.create(input);
    return newAccount;
  } catch (error) {
    console.error('Error creating WeChat MP account:', error);
    throw new Error('Failed to create WeChat MP account');
  }
};
