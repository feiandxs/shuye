'use server';

import { LlmModel } from '@prisma/client';
import { LlmModelModel } from '@/models/llm-model.model';

interface CreateLlmModelInput {
  name: string;
  providerId: number;
  maxTokens?: number;
  isActive?: boolean;
}

export const createLlmModel = async (input: CreateLlmModelInput): Promise<LlmModel> => {
  try {
    const newModel = await LlmModelModel.create(input);
    return newModel;
  } catch (error) {
    console.error('Error creating LLM model:', error);
    throw new Error('Failed to create LLM model');
  }
};
