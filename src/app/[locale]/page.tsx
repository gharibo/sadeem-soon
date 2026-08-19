import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import LanguageToggle from '@/components/LanguageToggle';
import ContactActions from '@/components/ContactActions';

export default async function ComingSoonPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('hero');
  const c = await getTranslations('contact');

  return (
    <div className="relative z-[1] mx-auto flex min-h-[100svh] w-full max-w-4xl flex-col px-4 pb-6 pt-10 sm:px-6">
      <header className="flex items-center justify-between gap-4">
        <Image
          src="/logo.svg"
          alt="سديم — Sadeem"
          width={405}
          height={271}
          priority
          className="h-auto w-[76px] sm:w-[96px]"
        />
        <LanguageToggle />
      </header>

      <main className="flex flex-1 flex-col items-center justify-center gap-6 py-14 text-center">
        <div
          className="aperture w-[124px] sm:w-[160px] lg:w-[190px]"
          role="img"
          aria-label="سديم"
        />

        <p className="m-0 text-sm font-normal text-brand-deep sm:text-base">
          {t('eyebrow')}
        </p>

        {/* text-wrap: balance يوزّع الكلمات بالتساوي بدل ترك كلمة وحيدة
            متدلّية في السطر الأخير */}
        <h1 className="m-0 max-w-[18ch] text-balance text-[clamp(2rem,6.2vw,3.9rem)] font-extralight leading-[1.28] tracking-[-0.015em]">
          {t('titleLead')}{' '}
          <span className="accent-underline text-brand-deep">
            {t('titleAccent')}
          </span>
        </h1>

        <p className="m-0 max-w-[46ch] text-balance text-[clamp(0.98rem,2.1vw,1.15rem)] leading-[1.75] text-ink-soft">
          {t('lede')}
        </p>

        <h2 className="m-0 font-utility text-[0.72rem] tracking-[0.18em] text-ink-soft">
          {c('heading')}
        </h2>

        <ContactActions />
      </main>

      <footer className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 border-t border-hairline pt-6">
        <p className="m-0 text-[0.78rem] text-ink-soft">{c('location')}</p>
        <p className="m-0 font-utility text-[0.72rem] text-ink-soft">
          © {new Date().getFullYear()} Sadeem
        </p>
      </footer>
    </div>
  );
}
