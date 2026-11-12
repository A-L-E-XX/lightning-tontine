'use client';

import { useActionState } from 'react';
import { saveProfile } from './actions';

export default function ProfileForm({ displayName, lightningAddress }) {
  const [state, formAction, pending] = useActionState(saveProfile, {});
  const values = state.values || { displayName, lightningAddress };

  return (
    <form action={formAction} noValidate>
      {state.error ? (
        <div className="notice error" role="alert">
          {state.error}
        </div>
      ) : null}

      <div className="field">
        <label htmlFor="displayName">Display name</label>
        <input
          id="displayName"
          name="displayName"
          type="text"
          autoComplete="nickname"
          minLength={2}
          maxLength={30}
          defaultValue={values.displayName}
          required
        />
        <p className="hint">The name your circle members will see. 2 to 30 characters.</p>
      </div>

      <div className="field">
        <label htmlFor="lightningAddress">Lightning address</label>
        <input
          id="lightningAddress"
          name="lightningAddress"
          type="text"
          inputMode="email"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          placeholder="name@blink.sv"
          defaultValue={values.lightningAddress}
          required
        />
        <p className="hint">
          Where your circle pays you. Find it in your wallet under Receive. We never ask for your
          seed phrase or wallet password.
        </p>
      </div>

      <button className="button" type="submit" disabled={pending}>
        {pending ? 'Checking address…' : 'Save profile'}
      </button>
    </form>
  );
}
