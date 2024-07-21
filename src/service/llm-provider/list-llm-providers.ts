'use server';

import { LlmProvider } from '@prisma/client';
import { LlmProviderModel } from '@/models/llm-provider.model';

interface ListLlmProvidersInput {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  isActive?: boolean;
}

interface ListLlmProvidersOutput {
  providers: LlmProvider[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const listLlmProviders = async (input: ListLlmProvidersInput = {}): Promise<ListLlmProvidersOutput> => {
  try {
    const {
      page = 1,
      pageSize = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      isActive,
    } = input;

    const { providers, total } = await LlmProviderModel.listProviders({
      page,
      pageSize,
      sortBy,
      sortOrder,
      isActive,
    });

    const totalPages = Math.ceil(total / pageSize);

    return {
      providers,
      total,
      page,
      pageSize,
      totalPages,
    };
  } catch (error) {
    console.error('Error listing LLM providers:', error);
    throw new Error('Failed to list LLM providers');
  }
};
