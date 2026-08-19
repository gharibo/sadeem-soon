'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';

type Status = 'idle' | 'sending' | 'ok' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function NotifyForm() {
  const t = useTranslations('notify');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const value = email.trim();

    if (!value) {
      setStatus('error');
      setMessage(t('empty'));
      return;
    }
    if (!EMAIL_RE.test(value)) {
      setStatus('error');
      setMessage(t('invalid'));
      return;
    }

    setStatus('sending');
    setMessage('');

    try {
      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value }),
      });

      if (res.ok) {
        const data = (await res.json()) as { duplicate?: boolean };
        setStatus('ok');
        setMessage(data.duplicate ? t('duplicate') : t('success'));
        setEmail('');
        return;
      }
      if (res.status === 422) {
        setStatus('error');
        setMessage(t('invalid'));
        return;
      }
      throw new Error(String(res.status));
    } catch {
      setStatus('error');
      setMessage(t('error'));
    }
  }

  const sending = status === 'sending';

  return (
    <form onSubmit={onSubmit} noValidate className="mt-4 w-full max-w-md">
      {/* الحقل سطر سفلي لا صندوق. الحلقة الصندوقية تتعارض مع هذا الشكل،
          فالتركيز يُعلَن بتلوين السطر نفسه — واضح وبلا كسر بصري.
          على الجوال ينزل الزر تحت الحقل، فيحمل الحقل حدّه بنفسه. */}
      <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap sm:border-b sm:border-ink sm:py-2 sm:focus-within:border-brand">
        <label htmlFor="email" className="sr-only">
          {t('label')}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          dir="ltr"
          autoComplete="email"
          inputMode="email"
          value={email}
          disabled={sending}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('placeholder')}
          className={[
            'min-w-0 flex-1 basis-full bg-transparent py-2.5 text-base font-light',
            'text-ink placeholder:text-ink-soft/75 focus:outline-none',
            'border-b border-ink focus:border-brand',
            'sm:basis-auto sm:border-b-0 sm:py-1 sm:focus:border-b-0',
          ].join(' ')}
        />
        <button
          type="submit"
          disabled={sending}
          className={[
            'w-full shrink-0 rounded-full bg-ink px-5 py-3 text-cream',
            'transition-colors hover:bg-brand-deep active:scale-[0.98]',
            'disabled:opacity-60 latin-caps text-sm',
            'sm:mt-0 sm:w-auto sm:py-2.5',
          ].join(' ')}
        >
          {sending ? t('submitting') : t('submit')}
        </button>
      </div>

      <p
        role="status"
        aria-live="polite"
        className={[
          'mt-2 min-h-[1.25rem] text-sm',
          status === 'ok' ? 'text-brand-deep' : 'text-ink-soft',
        ].join(' ')}
      >
        {message}
      </p>
    </form>
  );
}
