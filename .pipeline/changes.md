## Implemented Changes

### Storage hardening (Public upload removed)
- Added a new Supabase migration to remove the `Public can upload listing media` policy and re-create the `Public can view listing media` policy with a `listings/` prefix restriction.
- Migrations:
  - `supabase/migrations/004_storage_policy_hardening.sql`

### Upload path + size/type enforcement
- Reworked client-side uploads to go through a server route so uploads no longer rely on public Storage insert policies.
- Added server-side validation for file size/type and path prefix enforcement (`listings/...`).
- Files:
  - `src/app/api/listing-media/route.ts`
  - `src/components/image-uploader.tsx`

### Open redirect prevention (`next` param)
- Sanitized `next` so only internal paths are allowed.
- File:
  - `src/app/auth/actions.ts`

### Rate limiting + incremental delay on sign-in
- Added in-memory rate limiting keyed by `IP + phone number`.
- Added incremental delays on failures and a temporary lockout after repeated failures.
- File:
  - `src/app/auth/actions.ts`

### Session cookie hardening
- Added `maxAge` and session rotation (deletes existing sessions for the user on new login).
- File:
  - `src/lib/auth.ts`

### Baseline security headers
- Added CSP starter, nosniff, referrer-policy, and permissions-policy.
- File:
  - `next.config.ts`
