# ClothVex — Website + Admin Panel

A full ready-made website for **clothvex.pk** selling **unstitched** and **stitched** clothing,
with a built-in admin panel and WhatsApp ordering.

- **Customer site:** Home, Shop (Unstitched / Stitched), Product pages, About, Contact Us
- **Ordering:** No checkout/payment system — customers pick size/color and tap **"Order on WhatsApp"**,
  which opens WhatsApp with a pre-filled message to **+923133925925**.
- **Admin Panel** (`/admin`): password-protected. Add / edit / delete products (name, price, sizes,
  colors, stock, multiple images), and change your **logo**, store name, tagline, WhatsApp number,
  email and address — all from the browser, no code required.
- **Database:** PostgreSQL via Prisma (works perfectly with free Vercel/Neon Postgres).

---

## 1. What you need before you start

1. A **GitHub** account (to hold the code) — https://github.com
2. A **Vercel** account (free) — https://vercel.com — sign up with your GitHub account
3. A free **Postgres database** — easiest is **Neon** — https://neon.tech (Vercel also offers
   "Vercel Postgres / Neon" directly inside your Vercel project, see step 4 below)

---

## 2. Project structure (what's inside this zip)

```
clothvex/
  app/                → all website + admin pages (Next.js App Router)
  components/         → reusable UI pieces (Navbar, ProductForm, etc.)
  lib/                → database connection + login helpers
  prisma/schema.prisma → database structure (Product + Settings)
  prisma/seed.js      → optional sample products to start with
  middleware.js        → protects /admin pages with a login
  .env.example         → copy this to .env and fill in your own values
  package.json
```

---

## 3. Run it on your computer first (optional but recommended)

```bash
cd clothvex
npm install
cp .env.example .env
```

Open `.env` and fill in:
- `DATABASE_URL` — paste your Neon/Postgres connection string
- `ADMIN_PASSWORD` — the password you'll use to log into `/admin`
- `AUTH_SECRET` — any long random string (32+ characters)

Then push the database structure and (optionally) load sample products:

```bash
npx prisma db push
npm run seed        # optional — adds 3 sample products so the site isn't empty
npm run dev
```

Visit:
- Website → http://localhost:3000
- Admin panel → http://localhost:3000/admin/login

---

## 4. Deploy to Vercel (step by step)

### Step A — Put the code on GitHub
1. Create a new empty repository on GitHub, e.g. `clothvex`.
2. Upload all the files in this zip into that repository (drag-and-drop on GitHub web works fine,
   or use `git init`, `git add .`, `git commit -m "init"`, `git remote add origin <your repo url>`,
   `git push -u origin main`).

### Step B — Create your database
1. Go to https://neon.tech → sign up free → "Create a project".
2. Once created, copy the **connection string** (it looks like
   `postgresql://user:password@host/dbname?sslmode=require`).
   - *(Alternative: inside Vercel, go to your Project → Storage → Create Database → Postgres —
     this also gives you a connection string and saves you a separate signup.)*

### Step C — Import the project into Vercel
1. Go to https://vercel.com/new
2. Select **Import Git Repository** and choose your `clothvex` repo.
3. Vercel will auto-detect it as a **Next.js** project — leave the build settings as default
   (Build Command: `npm run build`, Output: automatic).
4. Before clicking Deploy, open **Environment Variables** and add:
   | Name | Value |
   |---|---|
   | `DATABASE_URL` | your Neon/Postgres connection string from Step B |
   | `ADMIN_PASSWORD` | a password you choose for `/admin` login |
   | `AUTH_SECRET` | any long random string (e.g. generate one at https://generate-secret.vercel.app/32) |
5. Click **Deploy**. Wait ~1–2 minutes.

### Step D — Create the database tables
After the first deploy finishes, you need to push the Prisma schema to your live database **once**.
Easiest way — from your own computer, with the same `.env` values as Vercel:

```bash
npx prisma db push
```

(You only need to do this once. After that your tables exist permanently in Neon, and the website
will read/write to them.)

Optional — load 3 sample products so the site isn't empty on day one:
```bash
npm run seed
```

### Step E — Connect your domain (clothvex.pk)
1. In your Vercel project → **Settings → Domains** → add `clothvex.pk` (and `www.clothvex.pk`).
2. Vercel will show you DNS records (an **A record** and/or **CNAME**) to add.
3. Go to wherever you bought `clothvex.pk` (your domain registrar) → DNS settings → add the records
   Vercel showed you.
4. Wait 10 minutes – a few hours for DNS to update. Vercel will show "Valid Configuration" with a green
   check once it's live, and will automatically issue a free SSL certificate (https://).

That's it — your site is live at **https://clothvex.pk** 🎉

---

## 5. Using the Admin Panel

1. Go to `https://clothvex.pk/admin/login`
2. Enter the `ADMIN_PASSWORD` you set in Vercel's environment variables.
3. From the sidebar:
   - **Dashboard** — quick stats overview
   - **Products** — Add / Edit / Delete products. Each product has: name, description, category
     (unstitched/stitched), price, optional sale price, sizes, colors, stock quantity, and you can
     upload multiple photos directly from your computer.
   - **Store Settings** — upload/change your **logo**, store name, tagline, WhatsApp number, email
     and address — these update everywhere on the site instantly (navbar, footer, contact page,
     and the WhatsApp button).

To change your admin password later, just update the `ADMIN_PASSWORD` environment variable in
Vercel → Settings → Environment Variables → Redeploy.

---

## 6. How WhatsApp ordering works

There is intentionally **no shopping cart or payment checkout** — as requested. On every product
page, the customer picks a size/color (if applicable) and clicks **"Order on WhatsApp."** This opens
WhatsApp (app or web) with a message already filled in, addressed to your number
(`923133925925`), including the product name, price, chosen size/color, and a link back to the
product. You simply reply to confirm the order, payment method, and delivery address directly in
WhatsApp chat — no backend "orders" system needed, exactly as requested.

The same WhatsApp number also powers:
- The floating WhatsApp button visible on every page
- The "Chat on WhatsApp" card on the Contact Us page

You can update the number anytime from **Admin → Store Settings**.

---

## 7. Notes

- Product images are stored directly in the database as the file you upload (no separate image
  hosting needed) — keep individual images under a few MB for best performance.
- The design uses a maroon/gold "fabric boutique" theme matching a clothing brand; all text, colors
  and layout can be edited in `app/globals.css` and the component files if you ever want a developer
  to customize it further.
- If you ever need to reset the database structure, `npx prisma db push` is non-destructive to
  existing data for normal schema changes.
# clothvex
# clothvex
