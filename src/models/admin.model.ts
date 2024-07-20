import { prisma } from '@/database/prisma.client';
import { Admin, Prisma } from '@prisma/client';

/**
 * AdminModel 类
 *
 * 这个类封装了所有与管理员相关的数据库操作。
 * 它使用 Prisma ORM 来进行数据库交互，确保类型安全和查询效率。
 */
export class AdminModel {
  /**
   * 创建新的管理员
   *
   * @param data - 包含管理员信息的对象
   * @returns 返回创建的管理员对象
   */
  static async create(data: Prisma.AdminCreateInput): Promise<Admin> {
    return prisma.admin.create({ data });
  }

  /**
   * 通过ID查找管理员
   *
   * @param id - 管理员的唯一标识符
   * @returns 返回找到的管理员对象，如果不存在则返回 null
   */
  static async findById(id: string): Promise<Admin | null> {
    return prisma.admin.findUnique({ where: { id } });
  }

  /**
   * 通过用户名查找管理员
   *
   * @param username - 管理员的用户名
   * @returns 返回找到的管理员对象，如果不存在则返回 null
   */
  static async findByUsername(username: string): Promise<Admin | null> {
    return prisma.admin.findUnique({ where: { username } });
  }

  /**
   * 更新管理员信息
   *
   * @param id - 需要更新的管理员的ID
   * @param data - 包含要更新的字段的对象
   * @returns 返回更新后的管理员对象
   */
  static async update(id: string, data: Prisma.AdminUpdateInput): Promise<Admin> {
    return prisma.admin.update({ where: { id }, data });
  }

  /**
   * 停用管理员账户
   *
   * @param id - 需要停用的管理员的ID
   * @returns 返回更新后的管理员对象
   */
  static async deactivateAdmin(id: string): Promise<Admin> {
    return prisma.admin.update({
      where: { id },
      data: { isActive: false },
    });
  }

  /**
   * 激活管理员账户
   *
   * @param id - 需要激活的管理员的ID
   * @returns 返回更新后的管理员对象
   */
  static async activateAdmin(id: string): Promise<Admin> {
    return prisma.admin.update({
      where: { id },
      data: { isActive: true },
    });
  }

  /**
   * 列出管理员，支持分页、排序和过滤
   *
   * @param params - 查询参数对象
   * @param params.page - 页码，默认为1
   * @param params.pageSize - 每页数量，默认为10
   * @param params.sortBy - 排序字段，默认为'createdAt'
   * @param params.sortOrder - 排序顺序，'asc'升序或'desc'降序，默认为'desc'
   * @param params.isActive - 是否筛选活跃状态
   * @param params.role - 根据角色筛选
   * @returns 返回包含管理员列表和总数的对象
   */
  static async listAdmins(params: {
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    isActive?: boolean;
    role?: string;
  }): Promise<{ admins: Admin[]; total: number }> {
    const {
      page = 1,
      pageSize = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      isActive,
      role,
    } = params;

    // 计算需要跳过的记录数
    const skip = (page - 1) * pageSize;

    // 构建查询条件
    const where: Prisma.AdminWhereInput = {};
    if (isActive !== undefined) where.isActive = isActive;
    if (role) where.role = role;

    // 使用事务确保数据一致性
    const [admins, total] = await prisma.$transaction([
      prisma.admin.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { [sortBy]: sortOrder },
      }),
      prisma.admin.count({ where }),
    ]);

    return { admins, total };
  }

  /**
 * 查找第一个管理员
 *
 * 这个方法用于查找数据库中的第一个管理员记录。
 *
 * @returns 返回找到的管理员对象，如果不存在则返回 null
 */
  static async findFirst(): Promise<Admin | null> {
    return prisma.admin.findFirst();
  }
}
