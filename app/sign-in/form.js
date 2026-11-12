'use client';

import { useActionState } from 'react';
import { sendSignInLink } from './actions';

export default function SignInForm({ linkError }) {
  const [state, formAction, pending] = useActionState(sendSignInLink, {});

  if (state.sent) {
    return (
      <div className="notice ok" role="status">
        <strong>Check your email.</strong> We sent a sign-in link to {state.email}. It works once
        and expires in 15 minutes. If you cannot see it, look in your spam folder.
      </div>
    );
  }

  const error = state.error || (linkError ? 'That link has expired or was already used. Enter your email to get a new one.' : '');

  return (
    <form action={formAction} noValidate>
      {error ? (
        <div className="notice error" role="alert">
          {error}
        </div>
      ) : null}
      <div className="field">
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          defaultValue={state.email || ''}
          required
        />
        <p className="hint">We will email you a link. There is no password.</p>
      </div>
      <button className="button" type="submit" disabled={pending}>
        {pending ? 'Sending…' : 'Email me a sign-in link'}
      </button>
    </form>
  );
}
