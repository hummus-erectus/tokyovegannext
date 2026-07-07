import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE === 'true') {
    return NextResponse.redirect(new URL('/coming-soon', request.url));
  }
  return intlMiddleware(request);
}
 
export const config = {
  // Match all paths except for next/internal, static files, /studio, and /coming-soon
  matcher: ['/((?!api|_next|studio|coming-soon|.*\\..*).*)']
};
