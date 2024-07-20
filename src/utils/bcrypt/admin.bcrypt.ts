import * as bcrypt from 'bcrypt';

// 设置 bcrypt 的 rounds，这决定了哈希的复杂度
const SALT_ROUNDS = 12;

export class PasswordService {
  /**
   * 对密码进行哈希处理
   * @param password 原始密码
   * @returns 哈希后的密码
   */
  static async hashPassword(password: string): Promise<string> {
    try {
      // bcrypt 会自动生成盐并将其包含在返回的哈希中
      return await bcrypt.hash(password, SALT_ROUNDS);
    } catch (error) {
      console.error('Error hashing password:', error);
      throw new Error('Password hashing failed');
    }
  }

  /**
   * 验证密码
   * @param password 用户输入的原始密码
   * @param hashedPassword 数据库中存储的哈希密码
   * @returns 密码是否匹配
   */
  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    try {
      // bcrypt 会自动处理盐的提取和比较
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      console.error('Error verifying password:', error);
      throw new Error('Password verification failed');
    }
  }
}
