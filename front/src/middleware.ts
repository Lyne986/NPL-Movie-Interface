import { NextRequest, NextResponse } from 'next/server';
import { Routes } from '@/utils/routes';
import { updateSession } from '@/utils/supabase/middleware';
import { createClient } from '@/utils/supabase/server';

export async function middleware(request: NextRequest) {
  await updateSession(request);

  const pathname = request.nextUrl.pathname;
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (pathname !== `/${Routes.LOGIN}` && pathname !== `/${Routes.SIGNUP}`) {
    if (error || !data.user) {
      const url = request.nextUrl;
      url.pathname = `/${Routes.LOGIN}`;

      console.log('Middleware: Redirecting to login page');
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
