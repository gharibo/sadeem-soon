import { getTranslations } from 'next-intl/server';

const PHONE_E164 = '+966530049008';
const PHONE_DIGITS = '966530049008';

export default async function ContactActions() {
  const c = await getTranslations('contact');

  const items = [
    {
      href: `mailto:${c('email')}`,
      label: c('emailLabel'),
      value: c('email'),
      external: false,
    },
    {
      href: `tel:${PHONE_E164}`,
      label: c('phoneLabel'),
      value: c('phone'),
      external: false,
    },
    {
      href: `https://wa.me/${PHONE_DIGITS}`,
      label: c('whatsappLabel'),
      value: c('phone'),
      external: true,
    },
  ];

  return (
    <nav aria-label={c('heading')} className="mt-2 w-full max-w-xl">
      {/* ثلاث بطاقات متساوية العرض: قناة واحدة لكل بطاقة، بلا حقول إدخال.
          على الجوال تتراص عموديًا فيبقى هدف اللمس بعرض كامل. */}
      <ul className="m-0 grid list-none grid-cols-1 gap-2.5 p-0 sm:grid-cols-3">
        {items.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              {...(item.external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className={[
                'flex h-full flex-col items-center justify-center gap-1 rounded-2xl',
                'border border-hairline bg-white/55 px-4 py-4',
                'transition-colors hover:border-brand hover:bg-white',
              ].join(' ')}
            >
              <span className="text-[0.95rem] font-normal text-ink">
                {item.label}
              </span>
              <span
                dir="ltr"
                className="font-utility text-[0.72rem] text-ink-soft"
              >
                {item.value}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
