import type { ReactNode } from 'react';

/**
 * الجذر لا يعرف اللغة (تُحسم في [locale]/layout)، فيبقى بلا <html>
 * ويتركها للطبقة التي تملك المعلومة. هذا يمنع تضارب dir/lang.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
