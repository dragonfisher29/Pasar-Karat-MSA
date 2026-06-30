# Pipeline Planner Output

## Product Goal

Replace the one-time seller manage code flow with a simple account system based on:

- Phone number
- Password
- Logged-in seller dashboard

while keeping the existing marketplace features:

- Seller identity
- WhatsApp buyer contact
- Mark-as-sold management
- Favorites
- Search and filtering
- Moderation states
- Categories
- Richer listing media
- Image upload from device

## Product Flows

### Buyers

1. Browse available items from the homepage or listings page.
2. Search by keyword and filter by category, condition, and price.
3. Open a detail page and contact the seller through WhatsApp.
4. Save favorite items locally for quick return visits.

### Sellers

1. Sign up using phone number, password, and display name.
2. Log in using phone number and password.
3. Create listings while logged in.
4. Upload images from device to Supabase Storage when environment variables are configured.
5. Open a logged-in seller dashboard and manage only their own listings.
6. Mark items as sold so they disappear from the public available listings view.

### Moderation

1. Listings store a moderation status.
2. Public pages show only listings that are both approved and available.
3. Seller dashboard can show moderation state so sellers understand why a listing is hidden.

## Security Model

Use app-level authentication with server-managed sessions:

1. Create a `marketplace_users` table with unique phone number and password hash.
2. Create a `marketplace_sessions` table with hashed session token and expiry.
3. Store the session token in an HTTP-only cookie.
4. Tie each listing to `user_id`.
5. Seller dashboard and mark-as-sold actions must derive identity from the session, not from URL query parameters.

## Technical Stack

- Framework: Next.js 15 with App Router
- Language: TypeScript
- Styling: Tailwind CSS v4
- Validation: Zod
- Database: Supabase Postgres
- Storage: Supabase Storage
- Deployment: Vercel
- Password hashing: Node `crypto.scrypt`

## Information Architecture

### Pages

- `/`: upgraded landing page with categories, feature highlights, and featured listings
- `/listings`: searchable and filterable listings index
- `/listings/[id]`: detail page with gallery, seller info, and WhatsApp CTA
- `/sell`: logged-in sell flow with device uploads
- `/dashboard`: logged-in seller dashboard
- `/favorites`: saved items page powered by local favorites
- `/auth`: combined sign-up and sign-in page

### Components

- Header with links to listings, favorites, sell, dashboard, and auth state
- Auth form for sign-up and sign-in
- Listing card with favorite toggle and category badge
- Listing filters panel
- Listing gallery
- Sell form with device upload support
- Seller dashboard panel
- Favorite button
- Empty states and moderation/status pills

## Data Model

### Table: `marketplace_users`

Fields:

- `id` uuid primary key
- `created_at` timestamptz default now()
- `display_name` text not null
- `phone_number` text not null unique
- `password_hash` text not null

### Table: `marketplace_sessions`

Fields:

- `id` uuid primary key
- `created_at` timestamptz default now()
- `user_id` uuid not null references `marketplace_users(id)` on delete cascade
- `token_hash` text not null unique
- `expires_at` timestamptz not null

### Table: `listings`

Fields:

- `id` uuid primary key
- `created_at` timestamptz default now()
- `user_id` uuid not null references `marketplace_users(id)` on delete cascade
- `name` text not null
- `description` text not null
- `price` numeric not null
- `condition` text not null
- `rating` integer not null check between 1 and 5
- `payment_method` text not null
- `category` text not null
- `location` text not null
- `seller_name` text not null
- `whatsapp_number` text not null
- `image_url` text not null
- `gallery_image_urls` text[] not null default empty array
- `status` text not null default `available`
- `moderation_status` text not null default `approved`
- `sold_at` timestamptz null

## Storage

Need a public bucket, such as `listing-media`, for uploaded listing images.

## Supabase SQL

Need migration updates that:

1. Remove the manage-code dependency from listings and RPC functions.
2. Create `marketplace_users` and `marketplace_sessions`.
3. Add `user_id` to listings and backfill existing rows to a fallback imported user where needed.
4. Add session-aware RPC or safe row-update logic for seller actions.
5. Keep public read access limited to approved and available listings.
6. Keep storage bucket and image upload policies in place.

## Functional Requirements

1. Users can sign up and sign in with phone number and password.
2. Logged-in state is stored in an HTTP-only cookie session.
3. Listing creation requires a logged-in user.
4. Sell form pre-fills seller identity from the logged-in account where appropriate.
5. Listing detail page shows gallery, category, seller identity, location, and a WhatsApp contact CTA.
6. Seller dashboard shows only the logged-in user’s listings.
7. Seller dashboard lets sellers mark listings as sold.
8. Public listing queries exclude sold and moderated-out listings.
9. Favorites remain available without mandatory sign-in.
10. UI remains premium, dark, image-first, and compact.

## Non-Functional Requirements

1. Preserve graceful preview behavior when Supabase is not configured.
2. Keep validation centralized in Zod.
3. Avoid storing plain-text passwords or plain-text session tokens in the database.
4. Document new auth setup behavior in `README.md` and `.env.example`.

## Deliverables For Coding Phase

1. Custom auth helpers, session helpers, and auth UI.
2. Updated listing creation and dashboard logic based on logged-in users.
3. Updated schema and Supabase migration for auth tables and listing ownership.
4. Updated docs and `.pipeline/changes.md`.

## Deliverables For Testing Phase

1. Run lint.
2. Run TypeScript validation.
3. Attempt a production build.
4. Record outcomes in `.pipeline/tests.md`.
