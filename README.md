# 🎯 Radar Harga — Marketplace Intelligence Platform

> **Live Website:** [https://www.radarharga.shop](https://www.radarharga.shop)  
> Platform intelijen harga multi-marketplace dan utilitas finansial e-commerce independen untuk konsumen cerdas dan seller UMKM Indonesia.

[![Website](https://img.shields.io/badge/Live-radarharga.shop-059669?style=for-the-badge&logo=google-chrome&logoColor=white)](https://www.radarharga.shop)
[![Next.js](https://img.shields.io/badge/Next.js%2014-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2D1?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

---

## 🌐 Tautan Cepat Fitur Live

* **[Radar Harga Termurah (B2C)](https://www.radarharga.shop/)** — Bandingkan harga barang secara live di Shopee, Tokopedia, TikTok Shop, dan Lazada.
* **[Portal Penjual Hub (B2B)](https://www.radarharga.shop/seller)** — Pusat utilitas finansial, panduan potongan, dan simulasi margin UMKM.
* **[Kalkulator Profit Universal](https://www.radarharga.shop/seller/kalkulator)** — Hitung break-even price (BEP), margin bersih, dan estimasi laba per transaksi.
* **[Komparasi Biaya Admin 4 Marketplace](https://www.radarharga.shop/seller/komparasi-fee)** — Head-to-head potongan komisi seller: Shopee Star/Mall vs Tokopedia PM Pro vs TikTok Shop vs LazMall.
* **Panduan Biaya Admin Spesifik:**
  * [Biaya Admin Shopee 2025/2026](https://www.radarharga.shop/seller/biaya-admin/shopee)
  * [Biaya Admin Tokopedia (Shop | Tokopedia)](https://www.radarharga.shop/seller/biaya-admin/tokopedia)
  * [Biaya Admin TikTok Shop Indonesia](https://www.radarharga.shop/seller/biaya-admin/tiktok-shop)
  * [Biaya Komisi Lazada Indonesia](https://www.radarharga.shop/seller/biaya-admin/lazada)

---

## 🚀 Fitur Utama

### 1. Radar Harga Multi-Marketplace (Konsumen)
* **Pencarian Real-Time:** Bandingkan penawaran aktif di 4 marketplace terbesar dalam satu layar.
* **Best Deal Badge:** Menandai platform termurah setelah memperhitungkan estimasi ongkir dan diskon.
* **Deteksi Selisih Diskon:** Menginformasikan peluang hemat belanja online tanpa harus membuka 4 aplikasi berbeda.

### 2. Utilitas Finansial & Kalkulator Seller (UMKM)
* **Kalkulasi Presisi Rupiah (Whole IDR):** Perhitungan anti pembulatan floating-point IEEE 754 untuk memastikan akurasi saldo settlement.
* **Dekomposisi Biaya Transparan:** Rincian biaya admin kategori, biaya layanan transaksi/pembayaran, promo gratis ongkir XTRA, komisi affiliate kreator, hingga biaya iklan GMV Max.
* **Barometer Kesehatan Margin:** Indikator visual real-time status profit (Sehat, Tipis, atau Margin Minus / Boncos).

---

## 🛠️ Arsitektur & Teknologi

* **Framework:** Next.js 14 (App Router, Server Components & Streaming SSR)
* **Language:** TypeScript 5 (Strict Mode)
* **Styling:** Tailwind CSS, ReUI/shadcn tokens, Zero-emoji icon system (Google Material Symbols)
* **Animations:** Framer Motion (CLS-safe transitions)
* **Database & ORM:** PostgreSQL (Neon Serverless) + Drizzle ORM
* **Testing:** Vitest (100% pure domain calculation coverage)
* **SEO & Analytics:** JSON-LD Rich Snippets (Product, FAQPage, Breadcrumbs), Dynamic XML Sitemap, Core Web Vitals monitoring

---

## 💻 Panduan Pengembangan Lokal

### Prasyarat
* Node.js 18+ atau Bun 1.1+
* Git

### Instalasi
```bash
# Clone repository
git clone https://github.com/andimuchlas/marketplace-intelegence.git

# Masuk ke direktori
cd marketplace-intelegence

# Install dependensi
npm install
# atau
bun install

# Konfigurasi environment
cp .env.example .env.local

# Jalankan server pengembangan
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) pada browser Anda.

### Menjalankan Test Suite
```bash
npm run test
```

### Build Produksi
```bash
npm run build
npm start
```

---

## 📄 Lisensi & Disclaimer

* **Disclaimer:** Radar Harga adalah alat utilitas independen untuk edukasi konsumen dan UMKM, dan bukan merupakan afiliasi resmi milik Shopee, Tokopedia, TikTok, atau Lazada. Seluruh merek dagang dan hak cipta merupakan milik masing-masing perusahaan.
* **Lisensi:** Proyek ini dilisensikan di bawah lisensi MIT.
