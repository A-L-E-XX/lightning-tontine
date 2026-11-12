import Link from 'next/link';
import { redirect } from 'next/navigation';
import { signOut } from '@/app/auth/actions';
import { getSession } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Your circles · Lightning Tontine' };

export default async function DashboardPage() {
  const { user, profile } = await getSession();
  if (!user) redirect('/sign-in');
  if (!profile) redirect('/profile');

  return (
    <>
      <h1>Hello, {profile.display_name}</h1>

      <h2>Your circles</h2>
      <div className="card">
        <p>You are not in a circle yet.</p>
        <p className="muted small">
          Creating and joining circles is the next part of the build. It will appear here.
        </p>
      </div>

      <h2>Your profile</h2>
      <div className="card">
        <div className="row">
          <span className="muted">Name</span>
          <span>{profile.display_name}</span>
        </div>
        <div className="row">
          <span className="muted">Lightning address</span>
          <span>{profile.lightning_address}</span>
        </div>
        <div className="row">
          <span className="muted">Email</span>
          <span>{user.email}</span>
        </div>
      </div>

      <div className="stack">
        <Link href="/profile" className="button secondary">
          Edit profile
        </Link>
        <form action={signOut}>
          <button className="button secondary" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </>
  );
}
