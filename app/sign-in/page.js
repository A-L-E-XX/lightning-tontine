import { redirect } from 'next/navigation';
import { getSession, isConfigured } from '@/lib/supabase/server';
import SignInForm from './form';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Sign in · Lightning Tontine' };

export default async function SignInPage({ searchParams }) {
  const params = await searchParams;

  if (isConfigured()) {
    const { user } = await getSession();
    if (user) redirect('/dashboard');
  }

  return (
    <>
      <h1>Sign in</h1>
      <SignInForm linkError={params?.error === 'link'} />
    </>
  );
}
