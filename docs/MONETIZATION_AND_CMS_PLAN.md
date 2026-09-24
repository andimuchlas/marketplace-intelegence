# Dokumentasi & Rencana Arsitektur: Sistem Monetisasi & Promo CMS

Dokumen ini mendokumentasikan spesifikasi arsitektur dan peta jalan implementasi untuk **Sistem Monetisasi (Google AdSense + Carousel Afiliasi)** serta **Content Management System (CMS) Promosi** di **MarketplaceIntel**.

---

## 1. Tujuan & Filosofi Desain

MarketplaceIntel memegang prinsip **"Data-Driven Financial Intelligence"**. Pendekatan monetisasi dirancang agar:
1. **Tidak merusak kepercayaan (*Brand Trust*)**: Mengindari penempatan iklan sembarangan seperti situs berita gosip/clickbait atau web download bajakan.
2. **Tanpa Pergeseran Layout (*Zero Cumulative Layout Shift / CLS*)**: Kontainer iklan AdSense memiliki *reserved dimensions* tetap sehingga tidak merusak nilai skor Google SEO.
3. **Konversi Afiliasi Tinggi (*High Commercial Intent*)**: Menggunakan kartu spotlight produk dan banner kampanye belanja (misal Shopee 10.10, Tokopedia WIB) yang relevan langsung dengan tujuan belanja pengunjung.
4. **Dapat Dikelola Tanpa Ubah Kode (*CMS-Powered*)**: Admin dapat menambah, mengubah, menjadwalkan, atau menonaktifkan promo kapan saja melalui dashboard CMS internal.

---

## 2. Peta Tata Letak Halaman Depan (Homepage)

```text
+-----------------------------------------------------------------------+
|  HEADER (Logo MarketplaceIntel + Segment Switcher: Pembeli / Seller)  |
+-----------------------------------------------------------------------+
|  [SLOT ADSENSE ATAS]                                                  |
|  Ukuran: Desktop 728x90 px / Mobile 320x50 px - Anti-CLS             |
+-----------------------------------------------------------------------+
|                                                                       |
|  HERO TITLE: Radar Harga E-Commerce Indonesia                         |
|  SUBTITLE: Bandingkan harga riil Shopee, Tokopedia, TikTok Shop...    |
|                                                                       |
|  +-----------------------------------------------------------------+  |
|  | [SEARCH BAR: Masukkan nama barang...]            [Cari Harga]   |  |
|  +-----------------------------------------------------------------+  |
|                                                                       |
|  +-----------------------------------------------------------------+  |
|  | [CAROUSEL PROMO AFILIASI & SPOTLIGHT PRODUK (CMS)]              |  |
|  | < [Slide 1: Event 10.10 Shopee] | [Slide 2: Deal TWS -45%] >    |  |
|  |   Auto-play (5s), pause-on-hover, swipe mobile, dots (•) ( )    |  |
|  +-----------------------------------------------------------------+  |
|                                                                       |
|  TRENDING SEARCH CHIPS: [iPhone 15] [Air Fryer] [TWS Baseus] ...      |
|                                                                       |
|  HASIL KOMPARASI RADAR / GRID DISCOVERY KATALOG                       |
|                                                                       |
+-----------------------------------------------------------------------+
|  [SLOT ADSENSE BAWAH]                                                 |
|  Ukuran: Desktop 728x90 px / Mobile 300x250 px                        |
+-----------------------------------------------------------------------+
|  FOOTER (Navigasi Kategori, Tool Seller, Kepatuhan Afiliasi)          |
+-----------------------------------------------------------------------+
```

---

## 3. Komponen Teknis

### A. Modul Google AdSense (`AdSlot`)
* **File Terkait**:
  - `src/config/ads.ts`: Konfigurasi posisi dan dimensi iklan.
  - `src/components/ads/AdSlot.tsx`: Komponen wrapper iklan AdSense.
* **Fitur Utama**:
  - Deteksi otomatis `NEXT_PUBLIC_ADSENSE_CLIENT_ID`.
  - Mode **Dev/Preview Placeholder** ketika ID AdSense belum dikonfigurasi (menampilkan kotak rapi bergaris halus tanpa merusak tampilan layout).
  - Skrip resmi `adsbygoogle.js` yang dimuat secara asinkron via Next.js `<Script>`.
  - Penanda resmi kepatuhan Google (`SPONSORED` / `IKLAN`).

### B. Modul Carousel Afiliasi (`AffiliateCarousel`)
* **File Terkait**:
  - `src/components/home/AffiliateCarousel.tsx`: Komponen visual carousel interaktif.
  - `src/config/promos.ts`: Konfigurasi cadangan (*static fallback*) jika database sedang offline.
* **Fitur Utama**:
  - **Dua Tipe Slide**:
    1. *Campaign Banner*: Untuk event akbar (Shopee 10.10, Tokopedia WIB, Flash Sale).
    2. *Product Spotlight*: Menampilkan foto barang, badge marketplace, harga asli dicoret, harga promo, persentase diskon, dan CTA tombol beli.
  - **Interaksi**: Auto-play rotasi setiap 5 detik, berhenti saat kursor hover atau layar disentuh, swipe jari di smartphone, indikator titik dan panah navigasi.
  - **Tracking Otomatis**: Klik pada banner terhubung ke rute `/api/radar/click` untuk mencatat metrik konversi ke database PostgreSQL.

---

## 4. Arsitektur CMS Promosi

### A. Skema Database Neon PostgreSQL (`promotions`)
Tabel `promotions` diatur dengan Drizzle ORM:
```sql
CREATE TABLE promotions (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  badge VARCHAR(50) DEFAULT 'Diskon Kilat',
  marketplace VARCHAR(50) NOT NULL, -- 'shopee' | 'tokopedia' | 'tiktok-shop' | 'lazada' | 'all'
  type VARCHAR(30) DEFAULT 'product_spotlight', -- 'campaign_banner' | 'product_spotlight'
  image_url TEXT NOT NULL,
  original_price INTEGER,
  deal_price INTEGER,
  discount_percent INTEGER,
  target_url TEXT NOT NULL,
  cta_text VARCHAR(100) DEFAULT 'Cek Promo',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### B. Endpoint API
1. **Publik (`GET /api/promotions`)**:
   - Mengambil seluruh promo yang sedang aktif (`is_active = true` dan berada dalam rentang tanggal berlaku) terurut berdasarkan `sort_order`.
   - Menggunakan teknik caching/revalidation untuk performa kilat.
2. **Admin (`/api/admin/promotions`)**:
   - `GET`: Mengambil semua promo (aktif maupun arsip) beserta statistik klik.
   - `POST`: Menambah promo baru.
   - `PUT`: Mengubah data promo atau menonaktifkan status aktif.
   - `DELETE`: Menghapus promo.
   - **Keamanan**: Dilindungi header otentikasi `Authorization: Bearer <ADMIN_SECRET_KEY>`.

### C. Halaman Admin Dashboard (`/admin/promos`)
Antarmuka internal yang ringan dan aman:
- **Proteksi Akses**: Menggunakan input PIN / Secret Key administrator.
- **Tabel Kelola**:
  - Switch on/off langsung untuk mengaktifkan/menonaktifkan banner secara realtime.
  - Indikator metrik performa (jumlah klik affiliate).
- **Formulir Tambah/Edit**:
  - Pilihan tipe slide: Banner Event atau Spotlight Produk.
  - Pemilih marketplace: Shopee, Tokopedia, TikTok Shop, Lazada.
  - Input harga asli, harga diskon (otomatis menghitung persentase hemat).
  - Input URL affiliate tujuan dan rentang tanggal tayang.

---

## 5. Rencana Verifikasi & Pengujian

1. **Uji Fungsionalitas Frontend**:
   - Carousel bergeser halus di mobile dan desktop.
   - Slot AdSense stabil di ukuran 728x90 dan 320x50 tanpa menggeser elemen di bawahnya.
   - Klik pada slide mencatat data ke tabel `affiliate_clicks` dan membuka link affiliate di tab baru.
2. **Uji CMS & API**:
   - Uji pembuatan promo baru melalui form admin dan verifikasi banner langsung muncul di carousel homepage.
   - Uji penolakan akses jika `ADMIN_SECRET_KEY` salah pada rute `/admin/promos`.
3. **Uji Otomatis & Build**:
   - `bun test`: Memastikan seluruh unit test tetap lulus 100%.
   - `bun run build`: Memastikan kompilasi rute static dan dynamic Next.js 14 sukses tanpa error lint atau tipe TypeScript.
