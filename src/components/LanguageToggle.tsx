'use client';

import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { useTransition } from 'react';

export default function LanguageToggle() {
  const t = useTranslations('language');
  const active = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div
      role="group"
      aria-label={t('label')}
      className="inline-flex items-center gap-px rounded-full border border-hairline bg-white/50 p-1"
    >
      {routing.locales.map((locale) => {
        const isActive = locale === active;
        return (
          <button
            key={locale}
            type="button"
            aria-pressed={isActive}
            disabled={isPending}
            onClick={() =>
              startTransition(() => router.replace(pathname, { locale }))
            }
            className={[
              'rounded-full px-3 py-1.5 font-utility text-xs tracking-widest',
              'transition-colors disabled:opacity-60',
              isActive
                ? 'bg-ink text-cream'
                : 'text-ink-soft hover:text-ink',
            ].join(' ')}
          >
            {t(locale)}
          </button>
        );
      })}
    </div>
  );
}
