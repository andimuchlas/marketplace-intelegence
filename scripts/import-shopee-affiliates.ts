import fs from 'fs';
import path from 'path';
import { db } from '@/db';
import { promotions } from '@/db/schema';

interface CsvProduct {
  id: string;
  name: string;
  price: number;
  priceStr: string;
  sold: string;
  shop: string;
  commPct: number;
  commPctStr: string;
  comm: number;
  commNominal: string;
  productUrl: string;
  affiliateUrl: string;
  category: string;
  imageUrl: string;
}

const CSV_PATHS = [
  '/home/andim/Downloads/LinkProdukSekaligus20260925012912-b0eb6188da6b4d85a4bd0d51cf0387c2.csv',
  '/home/andim/Downloads/LinkProdukSekaligus20260925013020-f778077384c44c109d84a9e8f4108bfb copy.csv',
  '/home/andim/Downloads/LinkProdukSekaligus20260925013020-f778077384c44c109d84a9e8f4108bfb.csv',
];

// Helper to determine clean visual image for category
function getProductImage(name: string): { category: string; imageUrl: string } {
  const lower = name.toLowerCase();

  if (lower.includes('smartwatch') || lower.includes('smart watch')) {
    return {
      category: 'Smartwatch',
      imageUrl: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&q=80',
    };
  }
  if (lower.includes('tws') || lower.includes('earphone') || lower.includes('headset') || lower.includes('soundcore')) {
    return {
      category: 'Audio & TWS',
      imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80',
    };
  }
  if (lower.includes('powerbank') || lower.includes('power bank')) {
    return {
      category: 'Powerbank',
      imageUrl: 'https://images.unsplash.com/photo-1609592424109-dd9892f1b177?w=600&q=80',
    };
  }
  if (lower.includes('tumbler') || lower.includes('botol minum')) {
    return {
      category: 'Tumbler',
      imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80',
    };
  }
  if (lower.includes('jaket') || lower.includes('hoodie') || lower.includes('tracksuit')) {
    return {
      category: 'Jaket & Outerwear',
      imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
    };
  }
  if (lower.includes('helm') || lower.includes('helmet')) {
    return {
      category: 'Otomotif & Helm',
      imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&q=80',
    };
  }
  if (lower.includes('kaos') || lower.includes('t-shirt') || lower.includes('tshirt') || lower.includes('jersey')) {
    return {
      category: 'Kaos & Distro',
      imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&q=80',
    };
  }
  if (lower.includes('celana') || lower.includes('jeans') || lower.includes('boxer') || lower.includes('pant')) {
    return {
      category: 'Celana & Bawahan',
      imageUrl: 'https://images.unsplash.com/photo-1542272604-780c96856592?w=600&q=80',
    };
  }
  if (lower.includes('sandal') || lower.includes('sepatu') || lower.includes('sneaker')) {
    return {
      category: 'Sepatu & Sandal',
      imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80',
    };
  }
  if (lower.includes('tas') || lower.includes('bag') || lower.includes('totebag') || lower.includes('slingbag')) {
    return {
      category: 'Tas & Aksesoris',
      imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
    };
  }
  if (lower.includes('parfum') || lower.includes('perfume') || lower.includes('decant')) {
    return {
      category: 'Parfum & Perawatan',
      imageUrl: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80',
    };
  }
  if (lower.includes('karpet') || lower.includes('bantal') || lower.includes('sprei')) {
    return {
      category: 'Home & Living',
      imageUrl: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=600&q=80',
    };
  }
  if (lower.includes('motor listrik') || lower.includes('sepeda motor')) {
    return {
      category: 'Kendaraan Listrik',
      imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&q=80',
    };
  }

  return {
    category: 'Produk Pilihan',
    imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&q=80',
  };
}

async function run() {
  console.log('Reading Shopee Affiliate CSV files...');
  const productsMap = new Map<string, CsvProduct>();

  for (const csvPath of CSV_PATHS) {
    if (!fs.existsSync(csvPath)) {
      console.warn(`File not found: ${csvPath}`);
      continue;
    }

    const content = fs.readFileSync(csvPath, 'utf-8');
    const lines = content.split('\n');

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const cols: string[] = [];
      let cur = '', inQuotes = false;
      for (let c = 0; c < line.length; c++) {
        const ch = line[c];
        if (ch === '"') {
          inQuotes = !inQuotes;
        } else if (ch === ',' && !inQuotes) {
          cols.push(cur.trim());
          cur = '';
        } else {
          cur += ch;
        }
      }
      cols.push(cur.trim());

      const id = cols[0];
      const name = cols[1]?.replace(/^"|"$/g, '').trim();
      const priceStr = cols[2]?.replace(/^"|"$/g, '').trim();
      const sold = cols[3]?.replace(/^"|"$/g, '').trim();
      const shop = cols[4]?.replace(/^"|"$/g, '').trim();
      const commPctStr = cols[5]?.replace(/^"|"$/g, '').trim();
      const commNominal = cols[6]?.replace(/^"|"$/g, '').trim();
      const productUrl = cols[7]?.replace(/^"|"$/g, '').trim();
      const affiliateUrl = cols[8]?.replace(/^"|"$/g, '').trim();

      if (!id || !name || !affiliateUrl || !affiliateUrl.startsWith('http')) continue;

      let price = 0;
      if (priceStr) {
        const clean = priceStr.replace(/\./g, '').replace(',', '.');
        if (clean.includes('RB')) {
          price = Math.round(parseFloat(clean.replace('RB', '')) * 1000);
        } else if (clean.includes('JT')) {
          price = Math.round(parseFloat(clean.replace('JT', '')) * 1000000);
        } else {
          price = Math.round(parseFloat(clean) || 0);
        }
      }

      let comm = 0;
      if (commNominal) {
        comm = parseInt(commNominal.replace(/[^0-9]/g, ''), 10) || 0;
      }

      let commPct = 0;
      if (commPctStr) {
        commPct = parseFloat(commPctStr.replace(',', '.').replace('%', '')) || 0;
      }

      const { category, imageUrl } = getProductImage(name);

      productsMap.set(id, {
        id,
        name,
        price,
        priceStr,
        sold,
        shop,
        commPct,
        commPctStr,
        comm,
        commNominal,
        productUrl,
        affiliateUrl,
        category,
        imageUrl,
      });
    }
  }

  const allProducts = Array.from(productsMap.values());
  console.log(`Successfully parsed ${allProducts.length} unique Shopee affiliate products.`);

  // Save to src/data/shopeeAffiliateCatalog.json
  const dataDir = path.join(process.cwd(), 'src', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const jsonPath = path.join(dataDir, 'shopeeAffiliateCatalog.json');
  fs.writeFileSync(jsonPath, JSON.stringify(allProducts, null, 2), 'utf-8');
  console.log(`Saved catalog to ${jsonPath}`);

  // Select top 12 curated products for Spotlight Carousel & CMS
  // Criteria: Good consumer appeal (price < 1,000,000 to keep it impulse-buy friendly), high commission
  const curated = allProducts
    .filter((p) => p.price > 10000 && p.price <= 600000 && p.comm >= 3000)
    .sort((a, b) => b.commPct - a.commPct)
    .slice(0, 12);

  console.log(`Inserting ${curated.length} top spotlight items into Neon PostgreSQL promotions table...`);

  if (db) {
    let order = 10;
    for (const item of curated) {
      // Calculate realistic original price
      const discountPercent = Math.min(Math.max(Math.round(item.commPct * 2.5), 15), 65);
      const originalPrice = Math.round((item.price / (1 - discountPercent / 100)) / 1000) * 1000;

      // Clean title: keep first 60 chars nicely
      const cleanTitle = item.name.length > 55 ? item.name.slice(0, 52).trim() + '...' : item.name;

      await db.insert(promotions).values({
        title: cleanTitle,
        subtitle: `Toko: ${item.shop} • Terjual: ${item.sold} • Komisi XTRA ${item.commPctStr}`,
        badge: `Komisi XTRA ${item.commPctStr}`,
        marketplace: 'shopee',
        type: 'product_spotlight',
        imageUrl: item.imageUrl,
        originalPrice,
        dealPrice: item.price,
        discountPercent,
        targetUrl: item.affiliateUrl,
        ctaText: 'Beli di Shopee',
        sortOrder: order++,
        isActive: true,
      });
    }
    console.log('Successfully inserted curated items into database!');
  }

  console.log('All done!');
}

run()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
