import { db } from '@/db';
import { promotions } from '@/db/schema';
import { DEFAULT_PROMOTIONS } from '@/config/promos';

async function seed() {
  if (!db) {
    console.error('No database connection');
    process.exit(1);
  }

  const existing = await db.select().from(promotions);
  console.log(`Current promotions in DB: ${existing.length}`);

  if (existing.length === 0) {
    console.log('Seeding initial promotions into database...');
    for (const p of DEFAULT_PROMOTIONS) {
      await db.insert(promotions).values({
        title: p.title,
        subtitle: p.subtitle,
        badge: p.badge,
        marketplace: p.marketplace,
        type: p.type,
        imageUrl: p.imageUrl,
        originalPrice: p.originalPrice,
        dealPrice: p.dealPrice,
        discountPercent: p.discountPercent,
        targetUrl: p.targetUrl,
        ctaText: p.ctaText,
        sortOrder: p.sortOrder || 0,
        isActive: true,
      });
    }
    console.log('Seeding completed successfully!');
  } else {
    console.log('Database already has promotions, skipping seed.');
  }
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
