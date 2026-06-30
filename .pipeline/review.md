# Pipeline Reviewer Output

## Verdict

Approved with auth-hardening caveats noted for follow-up.

## What Was Reviewed

- Git diff for repository changes
- `.pipeline/specs.md`
- `.pipeline/changes.md`
- `.pipeline/tests.md`

## Findings

- The delivered scope matches the requested change: one-time manage codes are replaced by phone-number-and-password login with session-based seller ownership.
- The seller flow is now cleaner because listing creation and dashboard access both derive from the logged-in account.
- Validation is strong for this phase because lint, TypeScript, and production build all passed.

## Residual Risk

- Custom auth now depends on `SUPABASE_SERVICE_ROLE_KEY`, so deployment must keep that value server-only and never expose it to the client.
- The current custom auth flow does not yet include password reset, login rate limiting, or account recovery.
- Storage upload policy is still intentionally public for ease of device uploads. Add tighter constraints or authenticated uploads if abuse becomes a concern.
- Favorites are browser-local only, so they do not sync across devices.

## Final Recommendation

Proceed with the new Supabase migration and Vercel environment setup, then plan a later hardening pass for password reset, rate limiting, and stricter upload controls.

## 2026-06-30 Lint Fix Verdict

Approved.

## Review Notes

- The lint fix is narrowly scoped and replaces raw `<img>` elements with `next/image` in the two warned components.
- The updated components preserve the existing responsive layouts by using `fill` within already positioned containers.
- Using `unoptimized` is reasonable here because listing image URLs are user-provided and not yet backed by curated `remotePatterns` in `next.config.ts`.

## Residual Risk For This Fix

- Images remain unoptimized until the project standardizes allowed remote hosts and adds corresponding Next.js image configuration.
- PowerShell users may need to prefer `npm.cmd` over `npm` if local execution policy blocks `npm.ps1`.
