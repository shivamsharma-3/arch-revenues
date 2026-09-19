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
    const emailSubject = `5 target accounts for ${company}`;

    const textBody = `Hey ${firstName},

Got your submission—thanks for sharing your details and case study.

I'm personally reviewing ${payload.website || 'your website'} now. Within the next 48 hours, I'll email you:

1. 5 verified, exact-match target accounts screened for active buying signals.
2. Key decision-maker titles to contact (Founder, CEO, VP Growth).
3. 1 custom cold outreach draft tailored around your client win.

Quick question while I put this together: what's been your primary channel for client acquisition so far—mostly word of mouth / referrals, or have you already experimented with cold outbound?

Talk soon,
Shivam

--
Shivam Sharma
Founder, ARCH Revenues
shivam@archrevenues.com
`;

    const htmlBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #1f2937;">
        <p>Hey ${firstName},</p>
        <p>Got your submission—thanks for sharing your details and case study.</p>
        <p>I'm personally reviewing ${payload.website ? `<a href="${payload.website}" style="color: #1f2937; text-decoration: underline;">${payload.website}</a>` : 'your website'} now. Within the next 48 hours, I'll email you:</p>
        <p style="padding-left: 12px; border-left: 2px solid #e5e7eb; margin: 16px 0; line-height: 1.8;">
          <strong>1.</strong> 5 verified, exact-match target accounts screened for active buying signals.<br/>
          <strong>2.</strong> Key decision-maker titles to contact (Founder, CEO, VP Growth).<br/>
          <strong>3.</strong> 1 custom cold outreach draft tailored around your client win.
        </p>
        <p>Quick question while I put this together: what's been your primary channel for client acquisition so far—mostly word of mouth / referrals, or have you already experimented with cold outbound?</p>
        <p style="margin-top: 20px;">Talk soon,<br/>Shivam</p>
        <p style="color: #6b7280; font-size: 12px; margin-top: 24px; border-top: 1px solid #f3f4f6; padding-top: 12px;">
          Shivam Sharma &bull; Founder, ARCH Revenues<br/>
          <a href="mailto:shivam@archrevenues.com" style="color: #6b7280; text-decoration: none;">shivam@archrevenues.com</a>
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
