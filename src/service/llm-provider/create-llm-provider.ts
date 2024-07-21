'use server';

import { LlmProvider } from '@prisma/client';
import { LlmProviderModel } from '@/models/llm-provider.model';

interface CreateLlmProviderInput {
  name: string;
  apiEndpoint: string;
  apiKeys: string[];
  isActive?: boolean;
}

export const createLlmProvider = async (input: CreateLlmProviderInput): Promise<LlmProvider> => {
  try {
    const newProvider = await LlmProviderModel.create(input);
    return newProvider;
  } catch (error) {
    console.error('Error creating LLM provider:', error);
    throw new Error('Failed to create LLM provider');
  }
};
