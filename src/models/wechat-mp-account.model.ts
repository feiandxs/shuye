import { prisma } from '@/database/prisma.client';
import { WechatMpAccount, Prisma } from '@prisma/client';

/**
 * WechatMpAccountModel 类
 *
 * 这个类封装了所有与微信公众号账户相关的数据库操作。
 * 它使用 Prisma ORM 来进行数据库交互，确保类型安全和查询效率。
 */
export class WechatMpAccountModel {
  /**
   * 创建新的微信公众号账户
   *
   * @param data - 包含公众号基本信息的对象（name, appId, appSecret 为必填项）
   * @returns 返回创建的公众号账户对象
   */
  static async create(data: Pick<Prisma.WechatMpAccountCreateInput, 'name' | 'appId' | 'appSecret'>): Promise<WechatMpAccount> {
    return prisma.wechatMpAccount.create({ data });
  }

  /**
   * 通过ID查找微信公众号账户
   *
   * @param id - 公众号账户的唯一标识符
   * @returns 返回找到的公众号账户对象，如果不存在则返回 null
   */
  static async findById(id: number): Promise<WechatMpAccount | null> {
    return prisma.wechatMpAccount.findUnique({ where: { id } });
  }

  /**
   * 通过AppID查找微信公众号账户
   *
   * @param appId - 公众号的AppID
   * @returns 返回找到的公众号账户对象，如果不存在则返回 null
   */
  static async findByAppId(appId: string): Promise<WechatMpAccount | null> {
    return prisma.wechatMpAccount.findUnique({ where: { appId } });
  }

  /**
   * 更新微信公众号账户信息
   *
   * @param id - 需要更新的公众号账户的ID
   * @param data - 包含要更新的字段的对象
   * @returns 返回更新后的公众号账户对象
   */
  static async update(id: number, data: Prisma.WechatMpAccountUpdateInput): Promise<WechatMpAccount> {
    return prisma.wechatMpAccount.update({ where: { id }, data });
  }

  /**
   * 删除微信公众号账户
   *
   * @param id - 需要删除的公众号账户的ID
   * @returns 返回删除后的公众号账户对象
   */
  static async delete(id: number): Promise<WechatMpAccount> {
    return prisma.wechatMpAccount.delete({ where: { id } });
  }

  /**
   * 列出微信公众号账户，支持分页、排序和分类过滤
   *
   * @param params - 查询参数对象
   * @param params.page - 页码，默认为1
   * @param params.pageSize - 每页数量，默认为10
   * @param params.sortBy - 排序字段，默认为'createdAt'
   * @param params.sortOrder - 排序顺序，'asc'升序或'desc'降序，默认为'desc'
   * @param params.category - 可选的分类过滤
   * @returns 返回包含公众号账户列表和总数的对象
   */
  static async listAccounts(params: {
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    category?: string;
  }): Promise<{ accounts: WechatMpAccount[]; total: number }> {
    const {
      page = 1,
      pageSize = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      category,
    } = params;

    const skip = (page - 1) * pageSize;
    const where = category ? { category } : {};

    const [accounts, total] = await prisma.$transaction([
      prisma.wechatMpAccount.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { [sortBy]: sortOrder },
      }),
      prisma.wechatMpAccount.count({ where }),
    ]);

    return { accounts, total };
  }

  /**
   * 更新公众号的关注者数量
   *
   * @param id - 公众号账户的ID
   * @param count - 新的关注者数量
   * @returns 返回更新后的公众号账户对象
   */
  static async updateFollowersCount(id: number, count: number): Promise<WechatMpAccount> {
    return prisma.wechatMpAccount.update({
      where: { id },
      data: { followersCount: count },
    });
  }

  /**
   * 更新公众号的最后推送时间
   *
   * @param id - 公众号账户的ID
   * @returns 返回更新后的公众号账户对象
   */
  static async updateLastPushTime(id: number): Promise<WechatMpAccount> {
    return prisma.wechatMpAccount.update({
      where: { id },
      data: { lastPushTime: new Date() },
    });
  }

  /**
   * 减少公众号的API调用剩余次数
   *
   * @param id - 公众号账户的ID
   * @param amount - 减少的次数，默认为1
   * @returns 返回更新后的公众号账户对象
   */
  static async decreaseApiQuota(id: number, amount: number = 1): Promise<WechatMpAccount> {
    return prisma.wechatMpAccount.update({
      where: { id },
      data: {
        apiQuotaRemaining: {
          decrement: amount,
        },
      },
    });
  }
}
