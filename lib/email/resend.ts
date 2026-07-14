import { Resend } from 'resend';

const OWNER_EMAIL = 'archrevenues@gmail.com'; // Your notification inbox

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export async function sendLeadEmail(to: string, companyUrl: string, generatedEmail: any) {
  const resend = getResend();
  if (!resend) {
    console.warn("RESEND_API_KEY is not set, skipping email send");
    return;
  }
  
  const body = generatedEmail?.body || '';
  const subject = generatedEmail?.subject || '';

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <p>Here's the cold email our tool generated for ${companyUrl}:</p>
      
      <div style="padding: 16px; border-left: 4px solid #14b8a6; background: #f4f4f5; margin: 24px 0; white-space: pre-wrap;">
<strong>Subject:</strong> ${subject}<br/><br/>
${body}
      </div>
      
      <p>— Shivam<br/>ARCH Revenues</p>
      
      <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 24px 0;" />
      
      <p style="font-size: 12px; color: #71717a;">
        P.S. If you want to see this work for 5+ prospects at once,
        <a href="https://calendly.com/archrevenues" style="color: #14b8a6;">book a 20-min strategy call</a>.
      </p>
    </div>
  `;

  await resend.emails.send({
    from: 'ARCH Revenues <noreply@archrevenues.com>',
    to: [to],
    subject: `Your personalized cold email for ${companyUrl}`,
    html,
  });
}

export async function sendLeadNotification(leadEmail: string, companyUrl: string) {
  const resend = getResend();
  if (!resend) return;

  await resend.emails.send({
    from: 'ARCH Revenues <noreply@archrevenues.com>',
    to: [OWNER_EMAIL],
    subject: `New lead: ${leadEmail}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>New lead unlocked an email</h2>
        <p><strong>Email:</strong> ${leadEmail}</p>
        <p><strong>Prospect URL:</strong> ${companyUrl}</p>
        <p><strong>Time:</strong> ${new Date().toUTCString()}</p>
      </div>
    `,
  });
}
