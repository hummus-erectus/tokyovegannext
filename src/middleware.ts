import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
export default createMiddleware(routing);
 
export const config = {
  // Match all paths except for next/internal and static files so locale prefixes are handled automatically
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
