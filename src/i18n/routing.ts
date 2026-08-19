import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ar', 'en'],
  defaultLocale: 'ar',
});

export type Locale = (typeof routing.locales)[number];

/** الاتجاه مشتقّ من اللغة في مكان واحد — لا يُكرَّر في المكوّنات */
export const dirOf = (locale: string): 'rtl' | 'ltr' =>
  locale === 'ar' ? 'rtl' : 'ltr';
