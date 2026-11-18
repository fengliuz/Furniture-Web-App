# Project Rules: KaryaRuang E-Commerce

## 1. Tech Stack & Architecture
- **Framework:** Next.js (App Router) with TypeScript (`src/` directory).
- **Styling:** Tailwind CSS + `lucide-react` for minimalist icons.
- **State Management:** `zustand` (for shopping cart drawer and wishlist persistence).
- **Language:** All UI text, labels, product names, and currency (`Rp`) must be in natural Indonesian.

## 2. Design System — Warm Luxury (Japandi Craft)
- **Background Primary:** Warm Off-White (`#FAF6F0`)
- **Surface / Cards:** Sand (`#F0E8DC`)
- **Borders / Dividers:** Linen (`#E3D9CB`)
- **Primary Text & Headings:** Espresso (`#241A15`)
- **Primary Accent (CTAs):** Deep Forest Green (`#1E352B`), Hover (`#14241D`), Mist (`#DCE3DF`)
- **Secondary Accent (Badges):** Walnut (`#6E4730`), Mist (`#EFE6DF`)
- **Typography:** `Plus Jakarta Sans` via `next/font/google`.

## 3. Responsive Grid & Layout Standards
- **Desktop (1440px):** 12-column grid, `80px` horizontal margin (`px-20`), `24px` gutter (`gap-6`).
- **Mobile (375px):** 4-column grid, `16px` horizontal margin (`px-4`), single-column vertical stacking for product grids, horizontal scrollable category chips.

## 4. Signature Component Rules
- **Header:** Sticky top bar with `KARYARUANG` logo, navigation links, search bar, wishlist, and cart badge (NO top announcement bar). Collapses into a slide-out drawer on mobile.
- **Bento Product Card:** Must feature a Sand (`#F0E8DC`) container with an inward curved cutout (concave notch) at the bottom-right corner holding a circular Deep Forest Green (`#1E352B`) button with a diagonal arrow (`ArrowUpRight`), alongside a pill-shaped `"Tambah ke Keranjang"` button.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
