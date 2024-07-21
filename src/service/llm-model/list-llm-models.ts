'use server';

import { LlmModel } from '@prisma/client';
import { LlmModelModel } from '@/models/llm-model.model';

interface ListLlmModelsInput {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  providerId?: number;
  isActive?: boolean;
}

interface ListLlmModelsOutput {
  models: LlmModel[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const listLlmModels = async (input: ListLlmModelsInput = {}): Promise<ListLlmModelsOutput> => {
  try {
    const {
      page = 1,
      pageSize = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      providerId,
      isActive,
    } = input;

    const { models, total } = await LlmModelModel.listModels({
      page,
      pageSize,
      sortBy,
      sortOrder,
      providerId,
      isActive,
    });

    const totalPages = Math.ceil(total / pageSize);

    return {
      models,
      total,
      page,
      pageSize,
      totalPages,
    };
  } catch (error) {
    console.error('Error listing LLM models:', error);
    throw new Error('Failed to list LLM models');
  }
};
