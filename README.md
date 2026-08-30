# MyBlog

A simple, responsive blog built with React (Create React App) and React Router, with post content and admin editing backed by Supabase (Postgres + Auth).

## Features
- Home page with search + category filtering
- Individual blog post pages with Back/Next navigation and related posts
- Admin page (`/admin`) — real login, add/edit/delete/publish posts, changes visible to every visitor immediately
- Posts stored in a shared Supabase (Postgres) database — not per-browser
- SEO-friendly URLs: `/blog/your-post-slug`
- Ad placeholders wired for Google AdSense, category pages, and a simple footer with Privacy/Terms/Contact

## Run locally
```
npm install
cp .env.example .env.local   # then fill in your Supabase project's values
npm start
```

## Build for production
```
npm run build
```

## Set up Supabase (one-time)

1. Create a free project at [supabase.com](https://supabase.com).
2. In the SQL Editor, run this to create the `posts` table with the right permissions:

```sql
create table posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null default 'Other',
  description text,
  author text,
  date date not null default current_date,
  image text,
  published boolean not null default false,
  content text,
  created_at timestamptz not null default now()
);

alter table posts enable row level security;

-- Anyone (including logged-out visitors) can read published posts
create policy "Public can read published posts"
  on posts for select
  using (published = true);

-- Logged-in users (i.e. you, once you create an admin account) can do everything
create policy "Authenticated users can manage posts"
  on posts for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
```

3. (Optional) Seed a few sample rows via the SQL Editor or the Table Editor UI so the homepage isn't empty at first.
4. Under **Authentication → Providers**, make sure Email is enabled.
5. Under **Authentication → Users**, click **Add user** and create your one admin account (email + password) — there's no public sign-up form in the app, so this is the only way an account gets created.
6. Under **Project Settings → API**, copy the **Project URL** and **anon public key**.

## Connect the app to Supabase

- **Local dev**: put those two values into `.env.local` (see `.env.example`).
- **Netlify**: Site configuration → Environment variables → add `REACT_APP_SUPABASE_URL` and `REACT_APP_SUPABASE_ANON_KEY` with the same values, then redeploy. (Create-React-App bakes `REACT_APP_*` vars in at build time, so a redeploy is required after adding or changing them.)

## Deploy to Netlify
This project includes a `netlify.toml` already configured with:
- Build command: `npm run build`
- Publish directory: `build`
- SPA redirect rule (so routes like `/blog/my-post` and `/admin` work on refresh)

Any deploy method works here (drag-and-drop, CLI, or Git-connected) — unlike a git-based CMS, Supabase doesn't require your site to be connected to a repo. Just make sure the two environment variables above are set in Netlify before deploying.

## Notes on the Admin page
- Log in at `/admin` with the account you created in Supabase Authentication → Users. There's no self-registration, so access stays limited to accounts you create yourself.
- "Save as Draft" keeps a post hidden from the public homepage; "Save & Publish" makes it live immediately for everyone, not just your browser.
- Deleting a post from the admin table asks for confirmation first.

## Adding real ads (Google AdSense)

Ad slots are wired up with `src/components/GoogleAd.jsx`, placed on the homepage (one banner) and on each blog post page (two sidebar slots). To make them actually serve ads:

1. **Get an AdSense account** and get your site approved at [adsense.google.com](https://adsense.google.com) — this can take a few days.
2. **Set your publisher ID** — in `public/index.html`, replace `ca-pub-XXXXXXXXXXXXXXXX` in the `<script>` tag with your real AdSense client ID.
3. **Set your publisher ID again** — in `src/components/GoogleAd.jsx`, replace the same `ca-pub-XXXXXXXXXXXXXXXX` value in `data-ad-client`.
4. **Create ad units** in your AdSense dashboard (Ads → By ad unit → Display ad), and copy each unit's slot ID into the `slot` prop where `<GoogleAd slot="..." />` is used in `src/pages/Home.jsx` and `src/pages/BlogPost.jsx`.
5. Rebuild and redeploy.

Until your site is approved and slot IDs are real, the ad boxes will render empty — that's expected, not a bug.
