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

    const htmlBody = `<div dir="ltr">Hey ${firstName},<br><br>Got your submission—thanks for sharing your agency details and case study.<br><br>I'm personally reviewing your website now. Within the next 48 hours, I'll email you:<br><br>1. 5 verified, exact-match target accounts screened for active buying signals.<br>2. Key decision-maker titles to contact (Founder, CEO, VP Growth).<br>3. 1 custom cold outreach draft tailored around your client win.<br><br>Quick question while I put this together: what's been your primary channel for client acquisition so far—mostly word of mouth / referrals, or have you already experimented with cold outbound?<br><br>Talk soon,<br>Shivam<br><br>--<br>Shivam Sharma<br>Founder, ARCH Revenues<br>shivam@archrevenues.com</div>`;

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
