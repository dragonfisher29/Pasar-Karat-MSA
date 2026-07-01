# Profile Editing Feature

## Request
- Allow signed-in users to edit their profile.
- When clicking the signed-in user name in the header, redirect to a user page.

## Scope
- Add a dedicated authenticated user page at `/user`.
- Add a profile edit form for `display_name` and `phone_number`.
- Add a server action to validate and persist profile changes.
- Update the header so the user name chip links to `/user`.
- Keep marketplace listing contact details in sync when a user updates their profile.

## Implementation Notes
- Reuse existing auth validation patterns with Zod.
- Use the existing `marketplace_users` table and session-based auth flow.
- Update `listings.seller_name` and `listings.whatsapp_number` for the current user after a profile change.
- Revalidate affected routes so the updated profile is reflected across the UI.

## UX
- If the user is not signed in, `/user` redirects through the existing auth flow.
- The profile page shows current account details and allows inline editing.
- Success and error states should be shown on the form page.
