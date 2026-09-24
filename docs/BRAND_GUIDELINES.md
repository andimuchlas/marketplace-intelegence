# Brand Guidelines & Visual Identity System
## Platform: Marketplace Intelligence Indonesia (`MarketplaceIntel` / `RadarHarga`)

- **Document Version:** 1.0.0
- **Status:** Active Brand Specification
- **Primary Archetype:** The Smart Navigator & Financial Market Strategist
- **Core Domain:** Consumer Price Radar (B2C) & Merchant Profit Intelligence (B2B)

---

## 1. Brand Essence & Positioning

### 1.1 Brand Vision & Purpose
**Marketplace Intelligence Indonesia** hadir sebagai platform intelijen e-commerce terpadu yang menjembatani dua kebutuhan penting di ekosistem digital Indonesia:
1. **Bagi Pembeli (Consumer/B2C):** Menyediakan radar harga independen yang objektif untuk membandingkan penawaran aktif di Shopee, Tokopedia, TikTok Shop, dan Lazada dalam hitungan detik agar pembeli selalu mendapatkan harga paling hemat dan terverifikasi.
2. **Bagi Penjual (Merchant/B2B):** Menyediakan kalkulator profit dan panduan skema komisi biaya admin yang akurat untuk melindungi margin laba bersih UMKM dan memitigasi risiko kerugian akibat struktur potongan marketplace.

### 1.2 Brand Pillars
```
┌────────────────────────────────────────────────────────────────────────┐
│ 1. Institutional Precision                                             │
│    Data harga dan rumus potongan komisi matematis akurat hingga 0 Rupiah │
└───────────────────────────────────┬────────────────────────────────────┘
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ 2. Uncompromising Transparency                                         │
│    Objektif, independen, tanpa bias sponsor tersembunyi               │
└───────────────────────────────────┬────────────────────────────────────┘
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ 3. Speed & Clarity                                                     │
│    Hasil instan sub-detik, antarmuka bersih tanpa emoji gimmick         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ 4. Accessible Empowerment                                              │
│    Mudah dipahami oleh pembeli awam sekaligus tajam bagi seller pro    │
└────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Naming Architecture
* **Formal Entity Name:** `Marketplace Intelligence Indonesia`
* **Short Brand Mark:** `MarketplaceIntel`
* **Consumer Sub-Brand:** `Radar Harga Indonesia` (`/` & `/search`)
* **Merchant Sub-Brand:** `Portal Penjual` / `Kalkulator Marketplace` (`/seller/*`)

---

## 2. Voice & Tone Matrix

Prinsip utama komunikasi brand: **Objektif, Tajam, Tenang, dan Berorientasi Solusi**. Kami menerapkan standar komunikasi *fintech-grade*: tidak menggunakan bahasa lebay, clickbait murahan, atau emoji yang mengurangi kredibilitas data.

| Konteks / Halaman | Karakter Tone | Yang Harus Dilakukan (DO) | Yang Dilarang (DON'T) |
| :--- | :--- | :--- | :--- |
| **Katalog & Radar Harga (B2C)** | Lugas, informatif, memberdayakan | Tampilkan persentase selisih harga secara faktual (`12% Lebih Murah`), sebutkan nama marketplace pemenang dengan jelas, sertakan disclaimer ongkir. | Menggunakan kata bombastis berlebihan seperti *"Gokil termurah sedunia!!"*, menyembunyikan selisih harga riil. |
| **Kalkulator & Margin Seller (B2B)** | Analitis, presisi, suportif bagi bisnis | Jelaskan rincian potongan (Admin, Layanan, Gratis Ongkir, Iklan), hitung Break-Even Price secara transparan. | Meremehkan biaya marketplace, menggunakan pembulatan estimasi kasar tanpa rincian pecahan. |
| **Status Error & Rate Limiting** | Empatik, tenang, solutif | Berikan alasan jelas dan waktu tunggu (*"Terlalu banyak permintaan. Silakan tunggu 30 detik"*). | Pesan error teknis membingungkan (`Error 500 Uncaught Exception`), menyalahkan pengguna. |
| **Pesan Notifikasi & Disclaimer** | Bertanggung jawab, transparan | Terangkan bahwa harga katalog dasar belum termasuk voucher personal checkout akun masing-masing. | Mengklaim harga 100% final checkout jika faktanya voucher checkout bersifat dinamis per user. |

---

## 3. Logo Architecture & Creative Standards

### 3.1 Konsep & Simbolisme Logo
Logo `MarketplaceIntel` dibangun dari persimpangan dua metafora visual utama:
1. **Radar Pulse / Scanning Arc:** Gelombang pemancar melengkung yang merepresentasikan pemindaian harga real-time di seluruh marketplace (*Consumer Radar*).
2. **Growth Compass & Mathematical Precision (Monogram 'M'):** Sudut geometris segitiga/panah yang mengarah ke atas yang merepresentasikan pertumbuhan laba (*Seller Intelligence*) dan keputusan pembelian yang tepat (*Checkmark*).

```
         ( Radar Pulse Arc )
             ╭───╮
          ╭──╯   ╰──╮
       ╭──╯         ╰──╮
      │      ╭───╮      │
      │   ╭──╯   ╰──╮   │
          ▲         ▲
          │   /\    │       ← Geometric Monogram 'M'
          │  /  \   │       ← + Upward Growth Arrow
          ▼ /    \  ▼
```

### 3.2 Logo Lockups (Varian Penggunaan)

1. **Primary Horizontal Lockup (Default Navbar & Dokumen):**
   - Logomark di sebelah kiri + Wordmark `Marketplace` (Slate-900) dan `Intel` (Emerald-600) di sebelah kanan.
   - Rasio proporsi: Tinggi wordmark = 60% dari tinggi logomark.
2. **Stacked / Vertical Lockup (Splash screen & Social Media Card):**
   - Logomark berada di tengah atas, Wordmark di bawah dengan tagline: *"E-Commerce Intelligence & Price Radar"*.
3. **Standalone App Icon / Favicon (1:1 Ratio):**
   - Logomark di dalam kontainer persegi dengan sudut lengkung halus (`rounded-2xl` / corner radius 22%).
   - Background: Slate-950 (`#0F172A`) dengan simbol Emerald Green (`#059669`) dan putih, atau sebaliknya.

### 3.3 Clearspace (Ruang Bebas Minimum)
- Ruang bebas di sekeliling logo diukur menggunakan unit **X**, di mana **X = tinggi simbol panah/radar di dalam logomark**.
- Tidak boleh ada elemen teks, garis batas, atau grafis lain yang masuk ke dalam zona aman berjarak **1X** di seluruh sisi logo.

```
       ┌───────────────────────────────┐
       │               X               │
       │   ┌───────────────────────┐   │
     X │   │ [MARK] MarketplaceIntel│   │ X
       │   └───────────────────────┘   │
       │               X               │
       └───────────────────────────────┘
```

### 3.4 Minimum Sizing (Ukuran Minimum)
- **Digital Screen (Web / App):**
  - Horizontal Lockup: Minimal tinggi **28 px** (lebar proporsional).
  - Standalone Mark / Favicon: Minimal **16 × 16 px** (optimal **32 × 32 px**).
- **Print:** Minimal tinggi **8 mm** untuk horizontal lockup.

### 3.5 Aturan Larangan (What NOT to Do)
* **JANGAN** meregangkan (*stretch*), memipihkan, atau mengubah aspek rasio logo.
* **JANGAN** memutar (*rotate*) logomark dari sumbu tegaknya.
* **JANGAN** memberi drop-shadow tebal atau efek 3D bevel/emboss kuno.
* **JANGAN** mengganti warna hijau Emerald atau Slate dengan warna lain di luar palet resmi.
* **JANGAN** menempatkan logo di atas latar belakang foto yang ramai tanpa kontainer pelindung berkontras tinggi.

---

## 4. Color Palette & Design Tokens

### 4.1 Primary Brand Colors

```
┌─────────────────────────────────┬─────────────────────────────────┐
│ Midnight Slate (Institutional)  │ Emerald Growth (Intelligence)   │
│ HEX: #0F172A                    │ HEX: #059669                    │
│ RGB: rgb(15, 23, 42)            │ RGB: rgb(5, 150, 105)           │
│ Tailwind: slate-900             │ Tailwind: emerald-600           │
│ Peran: Dominasi Teks, Brand Navy│ Peran: Aksen Utama, Laba, Hemat │
└─────────────────────────────────┴─────────────────────────────────┘
```

| Nama Token | HEX Code | RGB | Tailwind Class | Penggunaan Utama |
| :--- | :--- | :--- | :--- | :--- |
| **Primary Navy** | `#0F172A` | `15, 23, 42` | `bg-slate-900` / `text-slate-900` | Header, judul utama, tombol dark utama. |
| **Emerald Accent** | `#059669` | `5, 150, 105` | `bg-emerald-600` / `text-emerald-600` | Sorotan harga termurah, label *"Intel"*, CTA beli. |
| **Emerald Deep** | `#047857` | `4, 120, 87` | `bg-emerald-700` | Hover state tombol CTA, badge resmi. |
| **Emerald Soft** | `#ECFDF5` | `236, 253, 245` | `bg-emerald-50` | Background banner best deal, highlight card. |
| **Canvas Neutral** | `#F8FAFC` | `248, 250, 252` | `bg-canvas` / `bg-slate-50` | Background halaman utama dan katalog. |
| **Pure Surface** | `#FFFFFF` | `255, 255, 255` | `bg-white` | Kartu produk, modal filter, input search bar. |

### 4.2 Functional Status Palette

| Token | HEX | Tailwind | Fungsi |
| :--- | :--- | :--- | :--- |
| **Rose Alert / Discount** | `#E11D48` | `rose-600` | Badge diskon (`-28%`), potongan biaya, status rugi. |
| **Amber Warning / Rating** | `#D97706` | `amber-600` | Bintang rating produk (`★ 4.9`), badge trending hot. |
| **Border Neutral** | `#E2E8F0` | `stone-200` | Garis tepi kartu, pemisah tabel, divider. |
| **Subtle Text** | `#64748B` | `slate-500` | Nama toko, lokasi pengiriman, catatan kaki disclaimer. |

### 4.3 Co-Branding Marketplace Palette (Integrasi Resmi)
Untuk menjaga konsistensi brand saat menampilkan marketplace mitra:
* **Shopee:** `#EE4D2D` (Shopee Orange) &mdash; Badge Mall & Shopee Icon.
* **Tokopedia:** `#03AC0E` (Tokopedia Green) &mdash; Badge Official Store Tokopedia.
* **TikTok Shop:** `#000000` (TikTok Black) &mdash; Badge TikTok Verified.
* **Lazada:** `#0F146D` (Lazada Blue) &mdash; Badge LazMall.

---

## 5. Typography System

Sistem tipografi menggunakan 3 font Google open-source berlisensi bebas dengan peruntukan spesifik:

```
┌────────────────────────────────────────────────────────┐
│ 1. Plus Jakarta Sans                                   │
│    Display & Headings (Bold, Extrabold)                │
├────────────────────────────────────────────────────────┤
│ 2. Inter                                               │
│    Body Text, UI Labels, Filters, Navigation (Regular) │
├────────────────────────────────────────────────────────┤
│ 3. JetBrains Mono                                      │
│    Currency, Tabular Prices, Margins, Formulas (Bold)  │
└────────────────────────────────────────────────────────┘
```

### 5.1 Type Scale & Hierarchy
* **Display H1 (Hero Title):** Plus Jakarta Sans, 40px–48px (`text-4xl` / `text-5xl`), Tracking Tight (`-0.025em`), Weight 800 (Extrabold).
* **Section H2:** Plus Jakarta Sans, 24px–30px (`text-2xl` / `text-3xl`), Weight 700 (Bold).
* **Card Title H3:** Plus Jakarta Sans, 14px–16px (`text-sm` / `text-base`), Weight 600 (Semibold), Line-height 1.35.
* **Body / Paragraphs:** Inter, 14px (`text-sm`), Line-height 1.6 (`leading-relaxed`), Weight 400/500.
* **Financial Numerics (IDR):** JetBrains Mono, 16px–24px, Weight 700/800, Tabular Numbers (`tabular-nums`) untuk memastikan angka selalu rata vertikal.

---

## 6. Petunjuk Praktis Pembuatan Logo (Design Brief)

Bagi desainer atau jika Anda ingin membuat aset logo di Figma, Illustrator, Canva, atau generator AI:

### 6.1 Spesifikasi Bentuk Vektor (Geometric Construction)
1. **Bentuk Dasar:** Persegi belah ketupat (*rhombus*) bersudut 45 derajat yang dipadukan dengan busur sinyal 3 lapis di bagian atas.
2. **Ketebalan Garis (Stroke):** Pertahankan ketebalan stroke yang seragam (*uniform stroke width*) sekitar 8%–10% dari lebar total mark.
3. **Corner Radius:** Gunakan *inner corner radius* 2px dan *outer corner radius* 4px–6px untuk menghasilkan siluet modern yang tidak terlalu runcing namun tetap tegas.
4. **Palet:**
   - Bagian busur radar: Emerald Green (`#059669`).
   - Bagian bodi monogram / panah bawah: Midnight Slate (`#0F172A`).

### 6.2 Prompt Siap Pakai untuk AI Generator (Midjourney / DALL-E / ChatGPT)

#### Prompt Varian 1 (Modern Monogram "M" + Radar Signal):
```text
A sleek minimalist corporate vector logo for "MarketplaceIntel", modern fintech and e-commerce price intelligence brand. Clean geometric monogram featuring the letter 'M' seamlessly integrated with subtle radar signal waves at the top and an upward diagonal financial growth arrow. Color palette: deep slate navy blue (#0F172A) and vivid emerald green (#059669). Pure flat vector graphics, high aesthetic, isolated on pure white background, zero gradients, no realistic shadows, app icon mark style, Behance trending vector logo, precision line geometry, SVG vector style --no 3d, realistic photos, blur, watermark
```

#### Prompt Varian 2 (Tech Compass + Scanner Beam Minimalist):
```text
Minimalist geometric tech logomark for e-commerce price radar platform. A modern stylized navigational diamond compass intersecting with a 3-tier curved radar wave emitter, symbolizing price discovery and margin intelligence. Flat 2D vector logo, dual-tone deep midnight slate (#0F172A) and bright emerald green (#059669), pristine white background, symmetrical, corporate identity mark, ultra crisp lines, luxury tech startup aesthetic --no text, complex gradients, photorealism
```

### 6.3 Kode Blueprint SVG Siap Pakai (Untuk Developer & Desainer)
Anda dapat langsung menyalin kode SVG murni di bawah ini ke Figma atau berkas icon web:

```xml
<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Radar Wave Arcs (Emerald Green #059669) -->
  <path d="M14 16C16.8 13.2 20.2 11.5 24 11.5C27.8 11.5 31.2 13.2 34 16" 
        stroke="#059669" stroke-width="3" stroke-linecap="round"/>
  <path d="M18 20C19.7 18.3 21.7 17.2 24 17.2C26.3 17.2 28.3 18.3 30 20" 
        stroke="#059669" stroke-width="3" stroke-linecap="round"/>
  
  <!-- Base Geometric Navigator Body (Midnight Slate #0F172A) -->
  <path d="M24 23L33 32L24 41L15 32L24 23Z" 
        fill="#0F172A"/>
  
  <!-- Internal Check / Growth Accent (Emerald #059669 & White) -->
  <path d="M20 32L23 35L29 28" 
        stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

---

## 7. Checklist Verifikasi Integritas Brand

Sebelum meluncurkan halaman, banner, atau materi publikasi baru, pastikan lolos 5 poin uji kelayakan berikut:

- [ ] **Zero-Emoji Compliance:** Tidak ada emoji karakter WhatsApp/HP dalam teks formal; gunakan Google Material Symbols atau SVG resmi.
- [ ] **Kontras Warna WCAG AA:** Rasio kontras teks di atas background minimal **4.5:1** (misal: teks putih di atas Slate-900 bernilai 16:1, di atas Emerald-700 bernilai 5.2:1).
- [ ] **Ketepatan Nama Merek:** Ditulis `MarketplaceIntel` (satu kata dengan kapitalisasi camel), bukan *Marketplace Intel* atau *Marketplace-intel*.
- [ ] **Presisi Angka Rupiah:** Seluruh nominal menggunakan format integer bersih bertanda titik pemisah ribuan (contoh: `Rp 125.000`), bukan desimal longgar (`Rp 125000.45`).
- [ ] **Pemberian Ruang Logo:** Tersedia margin bebas minimal selebar 1X di sekeliling logo utama.
