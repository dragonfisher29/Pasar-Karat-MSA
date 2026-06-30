# Pasar Karat MSA

Pasar Karat is a Vercel-ready community marketplace for pre-loved items. It turns a WhatsApp-based selling flow into a searchable website powered by Next.js and Supabase.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase
- Vercel

## Features

- Premium dark landing page for the marketplace concept
- Public listings page with search and filtering
- Listing detail page with WhatsApp seller contact
- Sell form based on the WhatsApp item template with device image uploads
- Phone number and password login for sellers
- Seller dashboard for mark-as-sold management
- Favorites saved in the browser
- Categories, location, moderation states, and richer listing media
- Supabase integration with local preview fallback data
- SQL migrations for listings, seller auth, sessions, and storage policies

## Local setup

1. Copy `.env.example` to `.env.local`.
2. Add your Supabase project URL and public anon key.
3. Add an optional public bucket name if you want to override the default `listing-media`.
4. Add your Supabase service role key for server-only auth and seller management flows.
5. Install dependencies:

```bash
npm install
```

6. Start the dev server:

```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000).

## Environment variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-anon-key
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=listing-media
SUPABASE_SERVICE_ROLE_KEY=your-server-only-service-role-key
```

If the public variables are missing, the app still renders using preview listings. If the service role key is missing, seller login, listing creation, and dashboard actions stay disabled.

## Supabase setup

Run the SQL inside:

- `supabase/migrations/001_create_listings.sql`
- `supabase/migrations/002_marketplace_phase_two.sql`
- `supabase/migrations/003_phone_auth.sql`

This creates the listing schema, seller auth/session tables, and storage bucket policies needed for uploads and logged-in seller management.

## Deployment

Deploy to Vercel and set the same environment variables in the Vercel project settings.
