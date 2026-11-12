import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// The sign-in link in the email lands here. It is single-use.
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tokenHash = searchParams.get('token_hash');
  const type = searchParams.get('type');
  const code = searchParams.get('code');

  let signedIn = false;

  try {
    const supabase = await createClient();
    if (tokenHash && type) {
      const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
      signedIn = !error;
    } else if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      signedIn = !error;
    }
  } catch {
    signedIn = false;
  }

  const destination = signedIn ? '/dashboard' : '/sign-in?error=link';
  return NextResponse.redirect(new URL(destination, request.url));
}
