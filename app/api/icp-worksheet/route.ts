import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { firstName, email } = await req.json();

    if (!firstName || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY is not set. Simulating success.');
      return NextResponse.json({ success: true, simulated: true });
    }

    const { data, error } = await resend.emails.send({
      from: 'ARCH Revenues <hello@archrevenues.com>',
      to: email, // Sending to the user
      bcc: 'shivam@archrevenues.com', // Sending a copy to the founder
      subject: 'Your ICP Worksheet',
      html: `
        <p>Hi ${firstName},</p>
        <p>Here is the 1-page ICP worksheet we use with every ARCH Revenues client.</p>
        <p><a href="https://archrevenues.com/ICP-Teardown-Worksheet.pdf">Download ICP Worksheet (PDF)</a></p>
        <p>Best,<br>Shivam Sharma</p>
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
