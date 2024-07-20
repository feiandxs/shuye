// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // 只对 /dashboard 及其子路径进行处理
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // 检查是否有认证 cookie
    const authCookie = request.cookies.get('auth_token'); // 假设我们使用 'auth_token' 作为认证 cookie 的名称

    if (!authCookie) {
      // 如果没有认证 cookie，重定向到登录页面
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // 如果有认证 cookie，我们就允许请求继续
    // 实际的认证检查和管理员权限验证将在登录过程或具体的页面组件中进行
    return NextResponse.next();
  }

  // 对于非 /dashboard 路径，不做任何处理
  return NextResponse.next();
}

// 配置 middleware 只在特定路径下运行
export const config = {
  matcher: '/dashboard/:path*',
};
