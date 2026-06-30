# Pipeline Coder Output

## Implementation Summary

Replaced the one-time seller manage code flow with a simple phone-number-and-password account system, while preserving the marketplace features already added in the previous phase.

## Key Changes

- Added custom auth helpers for sign-up, sign-in, sign-out, password hashing, session hashing, and HTTP-only session cookies.
- Added an `/auth` page with phone number and password flows.
- Updated listing creation to require a logged-in seller and to attach listings to `user_id`.
- Updated seller dashboard access to resolve ownership from the logged-in session instead of URL credentials.
- Updated the database plan with `marketplace_users`, `marketplace_sessions`, and listing ownership migration support.
- Added server-only Supabase admin client support through `SUPABASE_SERVICE_ROLE_KEY`.

## Files Added

- `src/app/auth/actions.ts`
- `src/app/auth/page.tsx`
- `src/components/auth-form.tsx`
- `src/lib/auth.ts`
- `src/lib/schemas/auth.ts`
- `supabase/migrations/003_phone_auth.sql`

## Functional Notes

- Favorites are local-first and do not require sign-in.
- Seller management now uses phone number and password login with cookie-based sessions.
- Public pages only expose approved and available listings.
- Device image upload uses Supabase Storage and needs the related bucket policy setup from the new migration.
- Preview listings still work when Supabase is not configured, but live auth, seller actions, and uploads stay disabled without the required server and public environment variables.

## Follow-up For Testing Phase

- Run lint.
- Run TypeScript validation.
- Attempt a production build if the environment supports a complete Next.js install.
- Record outcomes in `.pipeline/tests.md`.
