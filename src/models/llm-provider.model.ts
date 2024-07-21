// llm-provider.model.ts
import { prisma } from '@/database/prisma.client';
import { LlmProvider, Prisma } from '@prisma/client';

export class LlmProviderModel {
  static async create(data: Prisma.LlmProviderCreateInput): Promise<LlmProvider> {
    return prisma.llmProvider.create({ data });
  }

  static async findById(id: number): Promise<LlmProvider | null> {
    return prisma.llmProvider.findUnique({ where: { id } });
  }

  static async findByName(name: string): Promise<LlmProvider | null> {
    return prisma.llmProvider.findUnique({ where: { name } });
  }

  static async update(id: number, data: Prisma.LlmProviderUpdateInput): Promise<LlmProvider> {
    return prisma.llmProvider.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(), // 确保更新 updatedAt 字段
      },
    });
  }

  static async delete(id: number): Promise<LlmProvider> {
    return prisma.llmProvider.delete({ where: { id } });
  }

  static async listProviders(params: {
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    isActive?: boolean;
  }): Promise<{ providers: LlmProvider[]; total: number }> {
    const {
      page = 1,
      pageSize = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      isActive,
    } = params;

    const skip = (page - 1) * pageSize;
    const where = isActive !== undefined ? { isActive } : {};

    const [providers, total] = await prisma.$transaction([
      prisma.llmProvider.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { [sortBy]: sortOrder },
      }),
      prisma.llmProvider.count({ where }),
    ]);

    return { providers, total };
  }
}
