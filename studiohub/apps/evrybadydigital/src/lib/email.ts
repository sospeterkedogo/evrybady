type MailPayload = {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
};

const DEFAULT_FROM = process.env.EMAIL_FROM || 'Evrybady Digital <onboarding@resend.dev>';

export async function sendEmail(payload: MailPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = payload.from || DEFAULT_FROM;

  if (!apiKey) {
    console.info('[email] RESEND_API_KEY not configured; skipping send.', payload.subject);
    return { ok: true, skipped: true };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [payload.to],
        subject: payload.subject,
        html: payload.html,
        text: payload.text,
        reply_to: payload.replyTo,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[email] send failed', response.status, errorText);
      return { ok: false, skipped: false, error: errorText };
    }

    return { ok: true, skipped: false };
  } catch (error) {
    console.error('[email] send exception', error);
    return { ok: false, skipped: false, error: error instanceof Error ? error.message : 'unknown' };
  }
}
