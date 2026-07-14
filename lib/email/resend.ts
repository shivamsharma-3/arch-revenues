import { Resend } from 'resend';

export async function sendLeadEmail(to: string, companyUrl: string, generatedEmail: any) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is not set, skipping email send");
    return;
  }
  
  const resend = new Resend(process.env.RESEND_API_KEY);
  
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

  // TODO: verify archrevenues.com in Resend before going live.
  // Using onboarding@resend.dev for testing for now.
  await resend.emails.send({
    from: 'ARCH Revenues <onboarding@resend.dev>',
    to: [to],
    subject: `Your personalized cold email for ${companyUrl}`,
    html,
  });
}
