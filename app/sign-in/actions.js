'use server';

import { headers } from 'next/headers';
import { createClient, isConfigured } from '@/lib/supabase/server';
import { validateEmail } from '@/lib/validation';

export async function sendSignInLink(prevState, formData) {
  const email = validateEmail(formData.get('email'));
  if (email.error) return { error: email.error, email: String(formData.get('email') || '') };

  if (!isConfigured()) {
    return { error: 'Sign-in is not set up yet. Please try again later.', email: email.value };
  }

  const headerList = await headers();
  const origin = headerList.get('origin') || `https://${headerList.get('host')}`;

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: email.value,
    options: { emailRedirectTo: `${origin}/auth/confirm` },
  });

  if (error) {
    const tooMany = error.status === 429 || /rate|seconds/i.test(error.message || '');
    return {
      error: tooMany
        ? 'You asked for a link very recently. Wait a minute, then try again.'
        : 'We could not send the sign-in link. Check your connection and try again.',
      email: email.value,
    };
  }

  return { sent: true, email: email.value };
}
