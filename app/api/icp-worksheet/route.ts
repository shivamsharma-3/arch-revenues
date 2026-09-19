import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const getResend = () => new Resend(process.env.RESEND_API_KEY || "dummy_key_for_build");

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const name = payload.name || payload.firstName || payload.yourName || "Agency Founder";
    const firstName = name.split(' ')[0] || "there";
    const { email } = payload;

    if (!email) {
      return NextResponse.json({ error: 'Missing required email field' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY is not set. Simulating success.');
      return NextResponse.json({ success: true, simulated: true });
    }

    const resend = getResend();

    // Format all payload fields into an HTML table for Shivam
    const htmlPayload = Object.entries(payload)
      .map(([key, value]) => `<tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">${key}</td><td style="padding: 8px; border: 1px solid #ddd;">${value}</td></tr>`)
      .join('');

    const company = payload.companyName ? payload.companyName.trim() : 'your agency';
    const emailSubject = `Your 5 Target Accounts & Custom Outbound Pitch (Incoming)`;

    const textBody = `Hey ${firstName},

Got your request! Thanks for sharing your agency details and case study.

I'm personally reviewing your agency website and niche. Within the next 48 hours, I will send you:

1. 5 Verified, Exact-Match Target Accounts
Hand-picked companies in your vertical that match your sweet spot and deal size, screened for active buying signals.

2. Key Decision-Maker Titles
The exact cheque-signers to contact (e.g. Founder/CEO, CMO, or VP Growth).

3. 1 Custom Pattern-Interrupt Cold Email
A tailored outreach script using your real client win as the proof hook.

No automated bulk CSVs—I review every submission personally to show you what high-signal outbound actually looks like for your agency.

Talk within 48 hours,

Shivam Sharma
Founder, ARCH Revenues
shivam@archrevenues.com
`;

    const htmlBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; color: #18181b; line-height: 1.6; max-width: 600px;">
        <p>Hey ${firstName},</p>
        <p>Got your request! Thanks for sharing your agency details and case study.</p>
        <p>I'm personally reviewing your agency website and niche. Within the next <strong>48 hours</strong>, I will send you:</p>
        <ol style="padding-left: 20px; margin: 16px 0;">
          <li style="margin-bottom: 12px;">
            <strong>5 Verified, Exact-Match Target Accounts</strong><br>
            Hand-picked companies in your vertical that match your sweet spot and deal size, screened for active buying signals.
          </li>
          <li style="margin-bottom: 12px;">
            <strong>Key Decision-Maker Titles</strong><br>
            The exact cheque-signers to contact (e.g. Founder/CEO, CMO, or VP Growth).
          </li>
          <li style="margin-bottom: 12px;">
            <strong>1 Custom Pattern-Interrupt Cold Email</strong><br>
            A tailored outreach script using your real client win as the proof hook.
          </li>
        </ol>
        <p style="margin-top: 20px;">
          No automated bulk CSVs—I review every submission personally to show you what high-signal outbound actually looks like for your agency.
        </p>
        <p style="margin-top: 24px;">
          Talk within 48 hours,<br><br>
          <strong>Shivam Sharma</strong><br>
          Founder, ARCH Revenues<br>
          <a href="mailto:shivam@archrevenues.com" style="color: #0d9488; text-decoration: none;">shivam@archrevenues.com</a>
        </p>
      </div>
    `;

    // Send emails in parallel
    const [userEmail, founderEmail] = await Promise.all([
      resend.emails.send({
        from: 'Shivam Sharma <shivam@archrevenues.com>',
        to: email,
        replyTo: 'shivam@archrevenues.com',
        subject: emailSubject,
        text: textBody,
        html: htmlBody,
      }),
      resend.emails.send({
        from: 'ARCH Revenues <hello@archrevenues.com>',
        to: 'shivam@archrevenues.com',
        subject: `New 5-Account Sample Request: ${name} (${payload.companyName || 'Agency'})`,
        html: `
          <h2>New 5-Account Sample Pipeline Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Website:</strong> <a href="${payload.website}">${payload.website}</a></p>
          <table style="border-collapse: collapse; width: 100%;">
            ${htmlPayload}
          </table>
        `,
      })
    ]);

    if (userEmail.error || founderEmail.error) {
      console.error('Resend error:', userEmail.error || founderEmail.error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
