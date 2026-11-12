# Lightning Tontine (working title)

Save for school fees and rent with your classmates, without trusting one person to hold the money.

A mobile-first web app for rotating savings circles (ajo / esusu). Each round, members pay the
recipient directly from their own Lightning wallets. The app never receives, holds or pools money:
it coordinates, verifies and records.

Built for the Dakar Bitcoin Hack by BTrust.

## Status

- [x] Email-link sign-in (no passwords)
- [x] Profile: display name and Lightning address
- [ ] Create and join circles
- [ ] Start, payout order and schedule
- [ ] Pay and verify
- [ ] Dashboard and reliability record
- [ ] Email notifications
- [ ] AI setup assistant

## Stack

Next.js (hosted on Vercel) and Supabase (Postgres and email-link sign-in).

## Setup

1. Create a Supabase project and run `supabase/schema.sql` in its SQL editor.
2. Set the two variables from `.env.example` in Vercel.
3. In Supabase > Authentication > URL Configuration, set the Site URL to the Vercel URL and add
   `https://<your-vercel-url>/auth/confirm` to the redirect URLs.

The full product requirements are in `docs/PRD.txt`.
