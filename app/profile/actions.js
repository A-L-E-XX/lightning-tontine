'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { lookupLightningAddress } from '@/lib/lightning';
import { validateDisplayName, validateLightningAddress } from '@/lib/validation';

export async function saveProfile(prevState, formData) {
  const values = {
    displayName: String(formData.get('displayName') || ''),
    lightningAddress: String(formData.get('lightningAddress') || ''),
  };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/sign-in');

  const name = validateDisplayName(values.displayName);
  if (name.error) return { error: name.error, values };

  const address = validateLightningAddress(values.lightningAddress);
  if (address.error) return { error: address.error, values };

  // Confirm the address really exists at its wallet provider, so that
  // payments are never sent to a mistyped address.
  const lookup = await lookupLightningAddress(address.value);
  if (!lookup.ok) {
    return {
      error:
        'We could not find that Lightning address. Check the spelling in your wallet and try again.',
      values,
    };
  }

  const { error } = await supabase.from('profiles').upsert({
    id: user.id,
    display_name: name.value,
    lightning_address: address.value,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    return { error: 'We could not save your profile. Please try again.', values };
  }

  redirect('/dashboard');
}
