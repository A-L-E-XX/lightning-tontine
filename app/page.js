import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession, isConfigured } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function LandingPage() {
  if (isConfigured()) {
    const { user } = await getSession();
    if (user) redirect('/dashboard');
  }

  return (
    <>
      <h1>Save together. Nobody holds the pot.</h1>
      <p className="muted">
        Save for school fees and rent with your classmates, without trusting one person to hold
        the money.
      </p>

      <div className="card">
        <ol className="steps">
          <li>Create a circle: an amount in naira, weekly or monthly, and your members.</li>
          <li>Each round, everyone pays that round&apos;s recipient directly, in sats.</li>
          <li>The whole circle sees who has paid and who has not.</li>
        </ol>
      </div>

      <Link href="/sign-in" className="button">
        Get started
      </Link>
      <p className="hint">You need a Lightning wallet such as Blink or Wallet of Satoshi.</p>
    </>
  );
}
