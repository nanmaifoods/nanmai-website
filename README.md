# 🫓 Nanmai Appalam – Full-Stack E-Commerce Website

Premium South Indian papad e-commerce platform built with **Next.js 14**, **Supabase**, and **Razorpay**.

---

## 📁 Complete Folder Structure

```
nanmai-appalam/
├── public/                        # Static assets (add logo, og-image.png here)
├── supabase/
│   └── migrations/
│       ├── 001_init.sql           # ← Run this first in Supabase SQL Editor
│       └── 002_storage.sql         # ← Run this second for image storage
├── src/
│   ├── app/                       # Next.js App Router pages
│   │   ├── layout.tsx             # Root layout (Navbar, Footer, Cart, Toaster)
│   │   ├── globals.css            # Global styles + Tailwind
│   │   ├── page.tsx               # Homepage
│   │   ├── about/page.tsx         # About Us
│   │   ├── products/
│   │   │   ├── page.tsx           # Products listing with filters
│   │   │   └── [slug]/page.tsx    # Product detail page
│   │   ├── blogs/
│   │   │   ├── page.tsx           # Blog listing (6 posts)
│   │   │   └── [slug]/page.tsx    # Full blog post
│   │   ├── contact/page.tsx       # Contact form
│   │   ├── checkout/page.tsx      # Checkout + Razorpay
│   │   ├── order-success/page.tsx # Post-payment success
│   │   ├── not-found.tsx          # 404 page
│   │   ├── admin/                 # Admin Panel (protected)
│   │   │   ├── layout.tsx         # Admin layout (Sidebar + Header)
│   │   │   ├── page.tsx           # Dashboard with charts
│   │   │   ├── orders/page.tsx    # Order management
│   │   │   ├── products/page.tsx  # Product CRUD with Test/Live toggle
│   │   │   ├── analytics/page.tsx # Detailed analytics
│   │   │   ├── blogs/page.tsx     # Blog manager (create/edit/publish)
│   │   │   ├── cms/page.tsx       # Site content editor
│   │   │   ├── customers/page.tsx # Customer list & details
│   │   │   └── settings/page.tsx  # Store settings
│   │   └── api/
│   │       ├── products/
│   │       │   ├── route.ts       # GET all, POST new product
│   │       │   └── [id]/route.ts  # GET, PUT, DELETE single product
│   │       ├── payment/
│   │       │   ├── create-order/route.ts  # Create Razorpay order
│   │       │   └── verify/route.ts        # Verify payment + save to DB
│   │       ├── webhooks/
│   │       │   └── razorpay/route.ts      # Razorpay webhooks
│   │       └── subscribe/route.ts         # Newsletter subscribe
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx         # Responsive navbar
│   │   │   └── Footer.tsx         # Footer with newsletter
│   │   ├── home/
│   │   │   ├── HeroSection.tsx    # Hero with animated product
│   │   │   ├── FeaturesSection.tsx # 6 feature cards
│   │   │   ├── FeaturedProducts.tsx # 4 featured products
│   │   │   └── index.tsx          # Stats, Testimonials, BlogPreview, CTA
│   │   ├── products/
│   │   │   ├── ProductsClientPage.tsx  # Full products page with filters
│   │   │   └── ProductDetailClient.tsx # Product detail with FAQ
│   │   ├── cart/
│   │   │   └── CartDrawer.tsx     # Slide-in cart drawer
│   │   └── admin/
│   │       ├── AdminSidebar.tsx   # Collapsible admin nav
│   │       ├── AdminHeader.tsx    # Admin top bar with Test/Live toggle
│   │       └── AdminDashboardClient.tsx # Dashboard with Recharts
│   ├── store/
│   │   ├── cartStore.ts           # Zustand cart (persisted)
│   │   └── adminModeContext.tsx   # Test/Live mode context
│   ├── lib/
│   │   ├── supabase.ts            # Supabase client (public + admin)
│   │   └── razorpay.ts            # Razorpay helper
│   └── types/
│       └── database.ts            # TypeScript types for all tables
├── .env.local.example             # Copy → .env.local, fill values
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## 🚀 HOW TO RUN IN VS CODE (Step by Step)

### Step 1 – Prerequisites

Make sure you have installed:

- **Node.js 18+** → https://nodejs.org
- **VS Code** → https://code.visualstudio.com

### Step 2 – Open Project

```bash
# Open VS Code and open the nanmai-appalam folder
# Then open the VS Code terminal: Ctrl + ` (backtick)
```

### Step 3 – Install Dependencies

```bash
npm install
```

### Step 4 – Set Up Supabase

1. Go to https://supabase.com and create a **free account**
2. Click **"New Project"** → give it a name → choose a region (Singapore recommended for India)
3. Once created, go to **Settings → API**
4. Copy:
   - `Project URL` → this is your `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)
5. Go to **SQL Editor** in Supabase
6. Paste the contents of `supabase/migrations/001_init.sql` and click **Run**
7. Then paste the contents of `supabase/migrations/002_storage.sql` and click **Run** (this creates image storage buckets)

### Step 5 – Set Up Razorpay

1. Go to https://razorpay.com and create an account
2. For testing, use **Test Mode** (toggle in dashboard)
3. Go to **Settings → API Keys → Generate Test Key**
4. Copy `Key ID` → `NEXT_PUBLIC_RAZORPAY_KEY_ID`
5. Copy `Key Secret` → `RAZORPAY_KEY_SECRET`
6. For webhooks: go to **Settings → Webhooks → Add New**
   - URL: `https://your-domain.vercel.app/api/webhooks/razorpay`
   - Secret: create any string → `RAZORPAY_WEBHOOK_SECRET`

### Step 6 – Configure Environment Variables

```bash
# In the project root, copy the example file
cp .env.local.example .env.local
```

Then open `.env.local` and fill in all values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxx
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Nanmai Appalam
```

### Step 7 – Start Development Server

```bash
npm run dev
```

Open your browser → http://localhost:3000 ✅

### Admin Panel

Open → http://localhost:3000/admin ✅

---

## 🧪 ADMIN TEST/LIVE MODE

The admin panel has a **Test/Live toggle** in the header:

- **🧪 TEST Mode** (default): Uses sample data, changes are local only
  - Perfect for previewing how the admin looks
  - No database connection needed
  - Changes won't affect production

- **🚀 LIVE Mode**: Connected to Supabase database
  - All CRUD operations work with real data
  - Changes are permanent
  - Images upload to Supabase Storage

The toggle is persistent across sessions (saved in localStorage).

---

## 🔧 PRODUCT MANAGEMENT

### Adding Products (Admin → Products)

1. Go to `/admin/products`
2. Click **"Add Product"**
3. Fill in details:
   - Product Name (required)
   - Description
   - Category (classic/flavoured/mini/packs)
   - Weight (e.g., "200g")
   - Price & Original Price
   - Stock quantity
   - Ingredients
   - Tags (comma-separated)
4. Upload an image (stored in Supabase Storage)
5. Toggle Active/Featured as needed
6. Click **"Add Product"**

### Image Storage

Product images are stored in Supabase Storage bucket `product-images`.
The storage migration (`002_storage.sql`) sets up the bucket with proper policies.

---

## 🌐 DEPLOYING TO VERCEL

### Step 1 – Push to GitHub

1. Create a new repository on GitHub
2. Push your code:

```bash
git init
git add .
git commit -m "Initial commit - Nanmai Appalam"
git remote add origin https://github.com/yourusername/nanmai-appalam.git
git push -u origin main
```

### Step 2 – Deploy to Vercel

1. Go to https://vercel.com and sign in with GitHub
2. Click **"New Project"** → import your `nanmai-appalam` repo
3. In **Environment Variables**, add all the variables from your `.env.local`
4. Click **"Deploy"**
5. Your site will be live at `https://nanmai-appalam.vercel.app`

### Step 3 – Update Razorpay Webhook

After deployment, go to Razorpay dashboard → Webhooks → update the URL to your Vercel domain:
`https://your-project.vercel.app/api/webhooks/razorpay`

---

## 💳 TEST PAYMENTS

In Razorpay test mode, use these test credentials:

- **Card**: 4111 1111 1111 1111 | Any future date | CVV: any 3 digits
- **UPI**: success@razorpay
- **Net Banking**: Choose any bank → Success

---

## 🔐 ADMIN PANEL FEATURES

| Feature                                           | Location           |
| ------------------------------------------------- | ------------------ |
| Dashboard with charts                             | `/admin`           |
| Order management (view, update status)            | `/admin/orders`    |
| Product CRUD (add/edit/delete/feature)            | `/admin/products`  |
| Detailed analytics (revenue, orders, cities)      | `/admin/analytics` |
| Blog manager (create/edit/publish)                | `/admin/blogs`     |
| Site content editor (CMS)                         | `/admin/cms`       |
| Customer list & details                           | `/admin/customers` |
| Store settings (payment, shipping, notifications) | `/admin/settings`  |

---

## 🎨 COLOR PALETTE (From Logo)

| Color       | Hex       | Usage                       |
| ----------- | --------- | --------------------------- |
| Brand Pink  | `#E91E8C` | Primary actions, highlights |
| Brand Green | `#2E7D32` | Trust, natural, CTAs        |
| Brand Lime  | `#66BB6A` | Accents, success states     |
| Brand Gold  | `#F9A825` | Badges, premium elements    |
| Brand Cream | `#FFF8F0` | Backgrounds, cards          |

---

## 📦 KEY DEPENDENCIES

| Package                 | Purpose                |
| ----------------------- | ---------------------- |
| `next` 14               | Framework              |
| `@supabase/supabase-js` | Database & auth        |
| `razorpay`              | Payment gateway        |
| `zustand`               | Cart state management  |
| `framer-motion`         | Animations             |
| `recharts`              | Admin analytics charts |
| `tailwindcss`           | Styling                |
| `react-hot-toast`       | Notifications          |
| `lucide-react`          | Icons                  |

---

## 🔒 SECURITY FEATURES

- ✅ Razorpay signature verification on every payment
- ✅ HTTPS security headers (XSS, CSRF, clickjacking protection)
- ✅ Supabase Row Level Security (RLS) on all tables
- ✅ Service role key only used server-side (API routes)
- ✅ Input validation on all forms
- ✅ Environment variables never exposed to client

---

## 📞 SUPPORT

For any issues, contact: kothandapani6776@gmail.com
