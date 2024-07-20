'use server';

import { PasswordService } from '@/utils/bcrypt/admin.bcrypt';
import { AdminModel } from '@/models/admin.model';
import { Admin } from '@prisma/client';

export async function createNewAdmin(username: string, password: string): Promise<Admin> {
  try {
    // 检查用户名是否已存在
    const existingAdmin = await AdminModel.findByUsername(username);
    if (existingAdmin) {
      throw new Error('Username already exists');
    }

    // 对密码进行哈希处理
    const hashedPassword = await PasswordService.hashPassword(password);

    // 创建新的管理员
    const newAdmin = await AdminModel.create({
      username,
      passwordHash: hashedPassword,
      // 你可能需要添加其他必要的字段，比如创建时间等
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // 返回新创建的管理员对象，但不包括密码哈希
    const { passwordHash, ...adminWithoutPassword } = newAdmin;
    return adminWithoutPassword as Admin;
  } catch (error) {
    console.error('Error creating new admin:', error);
    throw new Error('Failed to create new admin');
  }
}
