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

    // Send emails in parallel
    const [userEmail, founderEmail] = await Promise.all([
      resend.emails.send({
        from: 'Shivam Sharma <shivam@archrevenues.com>',
        to: email,
        replyTo: 'shivam@archrevenues.com',
        subject: 'Your full ICP worksheet + my 5-min review (incoming)',
        html: `
          <div style="font-family: sans-serif; font-size: 15px; color: #18181b; line-height: 1.6;">
            <p>Hey ${firstName},</p>
            <p>Got your Quick ICP Check — thanks for sending it over.</p>
            <p>Two things are coming your way:</p>
            <ol style="padding-left: 20px;">
              <li style="margin-bottom: 12px;">
                <strong>The full 45-minute ICP Teardown Worksheet</strong><br>
                This is the deep version. Same structure, but with 30+ fields covering firmographics, pain points, trigger events, behavioral signals, disqualifiers, and your top 5 dream accounts.<br>
                👉 <a href="https://www.archrevenues.com/ICP-Teardown-Worksheet.pdf" target="_blank" style="color: #0d9488; font-weight: bold;">Download the Full PDF Worksheet</a>
              </li>
              <li style="margin-bottom: 12px;">
                <strong>A 5-minute Loom from me, reviewing your short-form answers</strong><br>
                I'll record this within the next 48 hours and email you the link. No sales pitch — just my honest take on what your answers tell me about your ICP, and where I'd start if I were running outbound for you.
              </li>
            </ol>
            <p style="margin-top: 20px;">While you wait (2 optional things):</p>
            <ul style="padding-left: 20px;">
              <li style="margin-bottom: 8px;">
                Want to see what a real cold email from me looks like? <a href="https://www.archrevenues.com/tools/email-generator" style="color: #0d9488;">Try the AI Cold Email Generator</a> on one of your actual prospects. It's free.
              </li>
              <li style="margin-bottom: 8px;">
                Curious about what the full done-for-you system costs? <a href="https://www.archrevenues.com/pricing" style="color: #0d9488;">Pricing is here</a> — $499 setup + $1,499/mo, 5+ qualified demos guaranteed or your money back.
              </li>
            </ul>
            <p style="margin-top: 20px;">
              If you'd rather just jump on a call instead of doing the worksheet dance, <a href="https://www.archrevenues.com/strategy-call" style="color: #0d9488; font-weight: bold;">book a 30-min strategy call here</a>. No deck, no pressure.
            </p>
            <p style="margin-top: 24px;">
              Talk within 48 hours,<br><br>
              <strong>Shivam Sharma</strong><br>
              Founder, ARCH Revenues<br>
              <a href="mailto:shivam@archrevenues.com" style="color: #0d9488;">shivam@archrevenues.com</a>
            </p>
            <p style="font-size: 12px; color: #71717a; margin-top: 28px; border-t: 1px solid #e4e4e7; padding-top: 12px;">
              P.S. If this email lands in spam, mark it "not spam" — that helps my domain reputation, which is mildly ironic given what I do for a living.
            </p>
          </div>
        `,
      }),
      resend.emails.send({
        from: 'ARCH Revenues <hello@archrevenues.com>',
        to: 'shivam@archrevenues.com',
        subject: `New Quick ICP Check: ${name}`,
        html: `
          <h2>New Quick ICP Check Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
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
