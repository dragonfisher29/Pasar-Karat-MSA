## Security Hardening Spec (Issues 1–6)

### 1) Supabase Storage: Public upload policy
- Remove/replace any Storage policy that allows unauthenticated/public inserts (uploads) to the listing media bucket.
- Require authenticated uploads only.
- Restrict object path prefix to `listings/` (no other prefixes).
- Enforce basic file size + type constraints at upload time (client-side) and add best-effort server-side policy checks where feasible using `storage.objects.metadata`.
- Consider making the bucket non-public (`public = false`) so objects require signed URLs or authenticated access.

### 2) Auth: Open redirect via `next` parameter
- Validate `nextPath` so it only permits internal navigation.
- Allow only paths that:
  - start with `/`
  - do not start with `//` (protocol-relative)
  - do not contain a URL scheme/protocol (e.g., `http:`, `https:`)
- If invalid, ignore and fall back to a safe default path.

### 3) Auth: Brute-force/rate limiting on password auth
- Add rate limiting for `signIn` keyed by `IP + identifier` (phone/email).
- Add incremental delays on repeated failures.
- Add a temporary lockout after N failures within a window.
- Reset counters on successful login.

### 4) Session cookies: Hardening gaps
- Harden cookie settings where controlled by the server integration:
  - set `maxAge`
  - consider `SameSite=Strict` if feasible (otherwise keep `Lax`)
- Add a lightweight same-origin check for state-changing server actions where possible (CSRF mitigation).

### 5) Upload path sanitization
- Sanitize filenames before composing storage paths:
  - strip path separators (`/` and `\`)
  - strip `..`
  - allow only a safe character set in the final name
  - ensure a non-empty filename and preserve extension when possible

### 6) Security headers
- Add baseline headers via Next config:
  - `Content-Security-Policy` (starter policy suitable for Next.js)
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy`
  - `Permissions-Policy`
