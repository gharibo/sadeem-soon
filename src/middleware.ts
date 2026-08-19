import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // كل المسارات عدا الملفات الثابتة ومسارات الـAPI
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
