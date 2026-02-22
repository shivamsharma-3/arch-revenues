import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface AuditRequestPayload {
  agencyName: string;
  yourName: string;
  role: string;
  website?: string;
  teamSize: string;
  monthlyRevenue: string;
  dealSize: string;
  monthlyMeetings: string;
  leadSources: string[];
  email: string;
  phone?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: AuditRequestPayload = await req.json();

    const {
      agencyName,
      yourName,
      role,
      website,
      teamSize,
      monthlyRevenue,
      dealSize,
      monthlyMeetings,
      leadSources,
      email,
      phone,
    } = body;

    // Validate required fields
    if (
      !agencyName ||
      !yourName ||
      !role ||
      !email ||
      !teamSize ||
      !monthlyRevenue ||
      !dealSize ||
      !monthlyMeetings ||
      !leadSources ||
      !Array.isArray(leadSources) ||
      leadSources.length === 0
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send Owner Notification Email
    const ownerEmailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
        <h2 style="border-bottom: 1px solid #e5e5e5; padding-bottom: 12px;">New Audit Request — ${agencyName}</h2>
        
        <h3 style="color: #4a4a4a; margin-top: 24px;">Section 1: Contact Details</h3>
        <ul style="list-style: none; padding: 0;">
          <li><strong>Name:</strong> ${yourName}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone || 'Not provided'}</li>
          <li><strong>Role:</strong> ${role || 'Not provided'}</li>
          <li><strong>Website:</strong> ${website || 'Not provided'}</li>
        </ul>

        <h3 style="color: #4a4a4a; margin-top: 24px;">Section 2: Agency Profile</h3>
        <ul style="list-style: none; padding: 0;">
          <li><strong>Agency Name:</strong> ${agencyName}</li>
          <li><strong>Team Size:</strong> ${teamSize}</li>
          <li><strong>Monthly Revenue:</strong> ${monthlyRevenue}</li>
          <li><strong>Average Deal Size:</strong> ${dealSize}</li>
          <li><strong>Monthly Meetings:</strong> ${monthlyMeetings}</li>
        </ul>

        <h3 style="color: #4a4a4a; margin-top: 24px;">Section 3: Pipeline & Lead Sources</h3>
        <ul style="list-style: none; padding: 0;">
          <li><strong>Lead Sources:</strong> ${leadSources.join(', ')}</li>
        </ul>

        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 32px 0;" />
        <p style="color: #666; font-size: 14px;"><em>Reply to this email to contact the applicant directly.</em></p>
      </div>
    `;

    // Send Confirmation Email to Submitter
    const submitterEmailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a; line-height: 1.6;">
        <p>Hi ${yourName},</p>
        <p>This email confirms we have received your audit request for ${agencyName}.</p>
        <p>Your tailored assessment will be delivered within 1 business day. We will review your current pipeline, identify what is missing from your outbound setup, and outline what a structured acquisition system would look like for your agency.</p>
        <p>If the audit identifies a clear opportunity for growth, you will receive an invitation to book a strategy call at no obligation.</p>
        <p>Best regards,<br/>The ARCH Revenues Team</p>
      </div>
    `;

    // Execute both emails in parallel
    const [ownerEmailRes, submitterEmailRes] = await Promise.all([
      resend.emails.send({
        from: 'onboarding@archrevenues.com',
        to: 'hello@archrevenues.com',
        replyTo: email,
        subject: `New Audit Request — ${agencyName}`,
        html: ownerEmailHtml,
      }),
      resend.emails.send({
        from: 'onboarding@archrevenues.com',
        to: email,
        subject: 'Your ARCH Revenues Audit Request Has Been Received',
        html: submitterEmailHtml,
      }),
    ]);

    if (ownerEmailRes.error || submitterEmailRes.error) {
      console.error('Resend Error:', ownerEmailRes.error || submitterEmailRes.error);
      return NextResponse.json(
        { error: 'Failed to send email notifications' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Audit API Error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
