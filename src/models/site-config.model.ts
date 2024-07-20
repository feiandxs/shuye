import { prisma } from '@/database/prisma.client';
import { SiteConfig, Prisma } from '@prisma/client';

/**
 * SiteConfigModel 类
 *
 * 这个类封装了所有与网站配置相关的数据库操作。
 * 它使用 Prisma ORM 来进行数据库交互，确保类型安全和查询效率。
 */
export class SiteConfigModel {
  /**
   * 创建新的网站配置
   *
   * @param data - 包含网站配置信息的对象
   * @returns 返回创建的网站配置对象
   */
  static async create(data: Prisma.SiteConfigCreateInput): Promise<SiteConfig> {
    return prisma.siteConfig.create({ data });
  }

  /**
   * 通过ID查找网站配置
   *
   * @param id - 网站配置的唯一标识符
   * @returns 返回找到的网站配置对象，如果不存在则返回 null
   */
  static async findById(id: number): Promise<SiteConfig | null> {
    return prisma.siteConfig.findUnique({ where: { id } });
  }

  /**
   * 更新网站配置信息
   *
   * @param id - 需要更新的网站配置的ID
   * @param data - 包含要更新的字段的对象
   * @returns 返回更新后的网站配置对象
   */
  static async update(id: number, data: Prisma.SiteConfigUpdateInput): Promise<SiteConfig> {
    return prisma.siteConfig.update({ where: { id }, data });
  }

  /**
   * 删除网站配置
   *
   * @param id - 需要删除的网站配置的ID
   * @returns 返回删除后的网站配置对象
   */
  static async delete(id: number): Promise<SiteConfig> {
    return prisma.siteConfig.delete({ where: { id } });
  }

  /**
   * 列出网站配置，支持分页、排序和过滤
   *
   * @param params - 查询参数对象
   * @param params.page - 页码，默认为1
   * @param params.pageSize - 每页数量，默认为10
   * @param params.sortBy - 排序字段，默认为'createdAt'
   * @param params.sortOrder - 排序顺序，'asc'升序或'desc'降序，默认为'desc'
   * @returns 返回包含网站配置列表和总数的对象
   */
  static async listConfigs(params: {
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<{ configs: SiteConfig[]; total: number }> {
    const {
      page = 1,
      pageSize = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = params;

    // 计算需要跳过的记录数
    const skip = (page - 1) * pageSize;

    // 使用事务确保数据一致性
    const [configs, total] = await prisma.$transaction([
      prisma.siteConfig.findMany({
        skip,
        take: pageSize,
        orderBy: { [sortBy]: sortOrder },
      }),
      prisma.siteConfig.count(),
    ]);

    return { configs, total };
  }

  /**
   * 查找第一个网站配置
   *
   * 这个方法用于查找数据库中的第一个网站配置记录。
   *
   * @returns 返回找到的网站配置对象，如果不存在则返回 null
   */
  static async findFirst(): Promise<SiteConfig | null> {
    return prisma.siteConfig.findFirst();
  }
}
