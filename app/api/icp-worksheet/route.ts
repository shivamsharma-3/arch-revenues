import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const { yourName, email } = payload;

    if (!yourName || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY is not set. Simulating success.');
      return NextResponse.json({ success: true, simulated: true });
    }

    // Format all payload fields into a nice HTML table
    const htmlPayload = Object.entries(payload)
      .filter(([key]) => key !== 'yourName' && key !== 'email')
      .map(([key, value]) => `<tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">${key}</td><td style="padding: 8px; border: 1px solid #ddd;">${value}</td></tr>`)
      .join('');

    // 1. Send confirmation to user
    await resend.emails.send({
      from: 'ARCH Revenues <hello@archrevenues.com>',
      to: email,
      subject: 'Your ICP Worksheet Received',
      html: `
        <p>Hi ${yourName},</p>
        <p>Thanks for submitting your ICP worksheet.</p>
        <p>I'll be reviewing your details and will send over a 5-minute Loom teardown within 48 hours.</p>
        <p>Best,<br>Shivam Sharma</p>
      `,
    });

    // 2. Send the actual form data to the founder
    const { data, error } = await resend.emails.send({
      from: 'ARCH Revenues <hello@archrevenues.com>',
      to: 'shivam@archrevenues.com',
      subject: `New ICP Worksheet: ${yourName}`,
      html: `
        <h2>New ICP Worksheet Submission</h2>
        <p><strong>Name:</strong> ${yourName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <table style="border-collapse: collapse; width: 100%;">
          ${htmlPayload}
        </table>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
