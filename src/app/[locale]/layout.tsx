import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing, dirOf } from '@/i18n/routing';
import '../globals.css';

/**
 * خط سديم الوحيد في الصفحة — عربي ولاتيني ورقمي في ملف واحد لكل وزن،
 * فلا حاجة لخط ثانٍ ولا لاستدعاء خارجي من Google Fonts.
 * الأوزان المتاحة: 300 / 400 / 500 فقط — لا تستخدم غيرها في الكلاسات.
 */
const heliopolis = localFont({
  src: [
    { path: '../../fonts/Heliopolis-Light.woff2', weight: '300', style: 'normal' },
    { path: '../../fonts/Heliopolis-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../fonts/Heliopolis-Medium.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-heliopolis',
  display: 'swap',
  preload: true,
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    icons: { icon: '/logo-icon.svg' },
  };
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F0EBE6',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // ضروري لإبقاء الصفحة ثابتة (static) مع next-intl
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      dir={dirOf(locale)}
      className={heliopolis.variable}
      suppressHydrationWarning
    >
      <body className="min-h-[100svh] overflow-x-hidden antialiased">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
