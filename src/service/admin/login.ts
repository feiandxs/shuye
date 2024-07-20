'use server';

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { PasswordService } from '@/utils/bcrypt/admin.bcrypt';
import { AdminModel } from '@/models/admin.model';

// 确保有一个安全的密钥，最好是从环境变量中获取
const JWT_SECRET = process.env.JWT_SECRET || 'ahasofuckinggoodday';

/**
 * 验证管理员登录凭证
 *
 * @param username - 管理员用户名
 * @param password - 管理员密码
 * @returns 验证成功返回管理员对象，失败则抛出错误
 */
async function verifyAdminLogin(username: string, password: string) {
  const admin = await AdminModel.findByUsername(username);

  if (!admin) {
    throw new Error('Admin not found');
  }

  const isPasswordValid = await PasswordService.verifyPassword(password, admin.passwordHash);

  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  return admin;
}

/**
 * 管理员登录函数
 *
 * @param username - 管理员用户名
 * @param password - 管理员密码
 * @returns 包含登录结果的对象
 */
export async function adminLogin(username: string, password: string) {
  try {
    // 验证管理员账号和密码
    const admin = await verifyAdminLogin(username, password);

    if (!admin) {
      return {
        success: false,
        error: '用户名或密码错误',
        errorCode: 'INVALID_CREDENTIALS',
      };
    }

    // 检查账户是否被锁定
    if (admin.accountLocked) {
      return {
        success: false,
        error: '账户已被锁定，请联系系统管理员',
        errorCode: 'ACCOUNT_LOCKED',
      };
    }

    // 检查账户是否激活
    if (!admin.isActive) {
      return {
        success: false,
        error: '账户未激活，请联系系统管理员',
        errorCode: 'ACCOUNT_INACTIVE',
      };
    }

    // 生成 JWT token
    const token = jwt.sign(
      {
        id: admin.id,
        username: admin.username,
        role: admin.role,
      },
      JWT_SECRET,
      { expiresIn: '1h' },
    );

    // 设置 cookie
    cookies().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600,
      path: '/',
    });

    cookies().set('adminId', admin.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600,
      path: '/',
    });

    cookies().set('adminUsername', admin.username, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600,
      path: '/',
    });

    // 更新最后登录时间和重置失败登录尝试次数
    await AdminModel.update(admin.id, {
      lastLogin: new Date(),
      failedLoginAttempts: 0,
    });

    return {
      success: true,
      message: '登录成功',
      user: {
        id: admin.id,
        username: admin.username,
        role: admin.role,
      },
    };
  } catch (error: any) {
    console.error('Login error:', error);

    if (error.message === 'Admin not found') {
      return {
        success: false,
        error: '用户不存在',
        errorCode: 'USER_NOT_FOUND',
      };
    }

    if (error.message === 'Invalid password') {
      const admin = await AdminModel.findByUsername(username);
      if (admin) {
        const updatedAttempts = (admin.failedLoginAttempts || 0) + 1;
        await AdminModel.update(admin.id, {
          failedLoginAttempts: updatedAttempts,
          accountLocked: updatedAttempts >= 5,
        });

        if (updatedAttempts >= 5) {
          return {
            success: false,
            error: '密码错误次数过多，账户已被锁定',
            errorCode: 'ACCOUNT_LOCKED',
          };
        }
        return {
          success: false,
          error: `密码错误，还有 ${5 - updatedAttempts} 次尝试机会`,
          errorCode: 'INVALID_PASSWORD',
        };
      }
    }

    return {
      success: false,
      error: '登录失败，请稍后再试',
      errorCode: 'UNKNOWN_ERROR',
    };
  }
}
