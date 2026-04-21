# 🏔️ Himalayan View Adventure

A production-ready travel website for **Himalayan View Adventure**, an expert-guided trekking company based in Didsari, Uttarkashi, Uttarakhand, India.

Built with **Next.js 15**, **Tailwind CSS**, **Framer Motion**, and **Lucide React**.

---

## ✨ Features

- Stunning hero page with carousel, animated stats, featured treks and testimonials
- Full expedition listings with filtering by difficulty, type, and region
- Individual expedition pages with itinerary, inclusions, and gallery
- Photo gallery with lightbox and category filtering
- Testimonials page
- Contact page with enquiry form and embedded Google Map
- Admin panel for content management
- Fully responsive, mobile-first design
- SEO-optimised with Open Graph and Twitter card metadata

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 15** (App Router) | Framework & SSR |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling |
| **Framer Motion** | Animations |
| **Lucide React** | Icons |
| **Oswald + Inter** | Typography |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+

### Install & Run

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 🔐 Admin Panel

The admin panel is available at `/admin`. It is protected by cookie-based authentication.

### Default Credentials

| Field | Value |
|---|---|
| URL | `/admin` |
| Username | `admin` |
| Password | `himalaya2024` |

> ⚠️ **Change these credentials** in production by setting the `ADMIN_USERNAME` and `ADMIN_PASSWORD` environment variables.

### What You Can Manage

| Section | URL | Description |
|---|---|---|
| Dashboard | `/admin` | Overview stats and quick links |
| Expeditions | `/admin/expeditions` | Add, edit, delete trek listings |
| Gallery | `/admin/gallery` | Upload and organise photos |
| Testimonials | `/admin/testimonials` | Add, edit, delete guest reviews |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Home page
│   ├── layout.tsx                  # Root layout
│   ├── about/page.tsx              # About page
│   ├── contact/page.tsx            # Contact page with enquiry form
│   ├── expeditions/
│   │   ├── page.tsx                # All expeditions listing
│   │   └── [slug]/page.tsx         # Individual expedition detail
│   ├── gallery/page.tsx            # Photo gallery
│   ├── testimonials/page.tsx       # Testimonials page
│   ├── admin/
│   │   ├── page.tsx                # Admin dashboard
│   │   ├── login/page.tsx          # Admin login
│   │   ├── expeditions/page.tsx    # Manage expeditions
│   │   ├── gallery/page.tsx        # Manage gallery
│   │   └── testimonials/page.tsx   # Manage testimonials
│   └── api/
│       ├── contact/route.ts        # Contact form endpoint
│       ├── expeditions/route.ts    # Expeditions CRUD
│       ├── gallery/route.ts        # Gallery CRUD
│       ├── testimonials/route.ts   # Testimonials CRUD
│       └── auth/
│           ├── login/route.ts      # Admin login
│           └── logout/route.ts     # Admin logout
├── components/
│   ├── layout/                     # Header, Footer, WhatsApp button, BackToTop
│   ├── expeditions/                # ExpeditionCard, FilterBar
│   ├── gallery/                    # GalleryGrid, Lightbox
│   └── home/                      # Hero, FeaturedExpeditions, TestimonialsCarousel, etc.
├── data/
│   ├── expeditions.json            # 6 Uttarakhand trek listings
│   ├── gallery.json                # 20 curated photos
│   └── testimonials.json           # 8 guest reviews
├── lib/
│   ├── types.ts                    # TypeScript interfaces
│   ├── auth.ts                     # HMAC session token helpers
│   └── utils.ts                    # Utility functions
└── middleware.ts                   # Protects /admin routes
```

---

## 🌍 Seed Data

The repository ships with pre-loaded content so the site works out of the box:

### Expeditions (6 treks)

| Trek | Difficulty | Duration | Price |
|---|---|---|---|
| Kedarkantha Trek | Easy/Moderate | 6 Days | ₹8,500 |
| Valley of Flowers | Moderate | 7 Days | ₹12,500 |
| Roopkund Trek | Difficult | 8 Days | ₹15,000 |
| Har Ki Dun Trek | Easy/Moderate | 7 Days | ₹9,500 |
| Brahmatal Trek | Moderate | 6 Days | ₹10,500 |
| Pangarchulla Peak | Difficult | 7 Days | ₹13,000 |

### Gallery
20 curated high-quality mountain and trek photos across categories: Trek, Expedition, Camp, Wildlife, Culture.

### Testimonials
8 authentic guest reviews with star ratings.

---

## ☁️ Deployment (Vercel)

### One-click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sudhakara-va/hva)

### Manual Deploy

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Vercel auto-detects Next.js — click **Deploy**

### Environment Variables (optional)

Set these in Vercel → Settings → Environment Variables:

| Variable | Description | Default |
|---|---|---|
| `ADMIN_USERNAME` | Admin login username | `admin` |
| `ADMIN_PASSWORD` | Admin login password | `himalaya2024` |
| `SESSION_SECRET` | HMAC secret for session tokens | auto-generated |

---

## 📞 Contact

**Himalayan View Adventure**  
Didsari Village, Uttarkashi, Uttarakhand – 249 193, India  
📞 [+91-9876543210](tel:+919876543210)  
📧 [info@himalayanviewadventure.com](mailto:info@himalayanviewadventure.com)  
🌐 [himalayanviewadventure.com](https://himalayanviewadventure.com)

---

## 📄 License

MIT © Himalayan View Adventure