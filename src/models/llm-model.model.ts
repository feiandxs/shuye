import { prisma } from '@/database/prisma.client';

import { Prisma, LlmModel } from '@prisma/client';

export class LlmModelModel {
  static async create(data: Prisma.LlmModelCreateInput): Promise<LlmModel> {
    return prisma.llmModel.create({ data });
  }

  static async findById(id: number): Promise<LlmModel | null> {
    return prisma.llmModel.findUnique({ where: { id } });
  }

  static async findByName(name: string): Promise<LlmModel | null> {
    return prisma.llmModel.findUnique({ where: { name } });
  }

  static async update(id: number, data: Prisma.LlmModelUpdateInput): Promise<LlmModel> {
    return prisma.llmModel.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(), // 确保更新 updatedAt 字段
      },
    });
  }

  static async delete(id: number): Promise<LlmModel> {
    return prisma.llmModel.delete({ where: { id } });
  }

  static async listModels(params: {
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    providerId?: number;
    isActive?: boolean;
  }): Promise<{ models: LlmModel[]; total: number }> {
    const {
      page = 1,
      pageSize = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      providerId,
      isActive,
    } = params;

    const skip = (page - 1) * pageSize;
    const where = {
      ...(providerId !== undefined && { providerId }),
      ...(isActive !== undefined && { isActive }),
    };

    const [models, total] = await prisma.$transaction([
      prisma.llmModel.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { [sortBy]: sortOrder },
      }),
      prisma.llmModel.count({ where }),
    ]);

    return { models, total };
  }
}
