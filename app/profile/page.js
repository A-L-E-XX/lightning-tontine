import { redirect } from 'next/navigation';
import { getSession } from '@/lib/supabase/server';
import ProfileForm from './form';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Profile · Lightning Tontine' };

export default async function ProfilePage() {
  const { user, profile } = await getSession();
  if (!user) redirect('/sign-in');

  return (
    <>
      <h1>{profile ? 'Your profile' : 'Set up your profile'}</h1>
      <p className="muted">Signed in as {user.email}</p>
      <ProfileForm
        displayName={profile?.display_name || ''}
        lightningAddress={profile?.lightning_address || ''}
      />
    </>
  );
}
