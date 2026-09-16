import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { passcode } = await req.json();
    const correctPasscode = process.env.DASHBOARD_PASSCODE || 'arch2026';

    if (!passcode || passcode.trim() !== correctPasscode) {
      return NextResponse.json({ success: false, error: 'Invalid founder passcode' }, { status: 401 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Auth failed' }, { status: 500 });
  }
}
