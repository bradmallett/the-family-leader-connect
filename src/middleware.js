import { updateSession } from '@/utils/supabase/middleware';

// Since Server Components can't write cookies,
// you need middleware to refresh expired Auth tokens and store them.

export async function middleware(request) {
  return await updateSession(request);
}

// if /constituents is re-named, need to change that here
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!constituents|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
