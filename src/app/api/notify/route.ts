import { NextResponse } from 'next/server';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * يستقبل البريد ويسجّله.
 *
 * حاليًا يكتب في سجلّ الخادم فقط — بلا قاعدة بيانات، فلا يضيع البريد
 * لكنه لا يُخزَّن دائمًا. لتفعيل تخزين حقيقي، استبدل كتلة "التخزين"
 * أدناه بمزوّدك (Resend / Supabase / Google Sheets / أي API).
 * الواجهة لا تحتاج أي تعديل — تتوقّع 200 عند النجاح و422 عند بريد غير صالح.
 */
export async function POST(request: Request) {
  let email: unknown;

  try {
    const body = await request.json();
    email = body?.email;
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  if (typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 422 });
  }

  const value = email.trim().toLowerCase();

  // ---- التخزين ----
  console.log('[notify] subscriber:', value, new Date().toISOString());
  // مثال بديل مع Resend:
  // await fetch('https://api.resend.com/audiences/<ID>/contacts', {
  //   method: 'POST',
  //   headers: {
  //     Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ email: value }),
  // });
  // -----------------

  return NextResponse.json({ ok: true, duplicate: false });
}
