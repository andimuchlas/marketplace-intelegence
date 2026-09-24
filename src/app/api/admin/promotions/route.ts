import { NextResponse } from 'next/server';
import { db } from '@/db';
import { promotions } from '@/db/schema';
import { eq, asc, desc } from 'drizzle-orm';

function isAuthorized(request: Request): boolean {
  const adminSecret = process.env.ADMIN_SECRET_KEY || 'market-intel-admin-2025';
  
  const authHeader = request.headers.get('authorization');
  const customHeader = request.headers.get('x-admin-key');

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    if (token === adminSecret) return true;
  }

  if (customHeader && customHeader.trim() === adminSecret) {
    return true;
  }

  return false;
}

// GET /api/admin/promotions - List all promotions
export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Kunci admin tidak valid' },
      { status: 401 }
    );
  }

  if (!db) {
    return NextResponse.json(
      { success: false, error: 'Koneksi database tidak tersedia' },
      { status: 500 }
    );
  }

  try {
    const list = await db
      .select()
      .from(promotions)
      .orderBy(asc(promotions.sortOrder), desc(promotions.createdAt));

    return NextResponse.json({
      success: true,
      promotions: list,
    });
  } catch (error) {
    console.error('Failed to list promotions:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal mengambil data promosi' },
      { status: 500 }
    );
  }
}

// POST /api/admin/promotions - Create a new promotion
export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Kunci admin tidak valid' },
      { status: 401 }
    );
  }

  if (!db) {
    return NextResponse.json(
      { success: false, error: 'Koneksi database tidak tersedia' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();

    if (!body.title || !body.marketplace || !body.imageUrl || !body.targetUrl) {
      return NextResponse.json(
        { success: false, error: 'Field title, marketplace, imageUrl, dan targetUrl wajib diisi' },
        { status: 400 }
      );
    }

    const originalPrice = body.originalPrice ? parseInt(body.originalPrice, 10) : null;
    const dealPrice = body.dealPrice ? parseInt(body.dealPrice, 10) : null;
    let discountPercent = body.discountPercent ? parseInt(body.discountPercent, 10) : null;

    // Auto-calculate discount percentage if both prices are provided
    if (originalPrice && dealPrice && originalPrice > dealPrice && !discountPercent) {
      discountPercent = Math.round(((originalPrice - dealPrice) / originalPrice) * 100);
    }

    const [inserted] = await db
      .insert(promotions)
      .values({
        title: body.title.trim(),
        subtitle: body.subtitle ? body.subtitle.trim() : null,
        badge: body.badge ? body.badge.trim() : 'Diskon Kilat',
        marketplace: body.marketplace,
        type: body.type || 'product_spotlight',
        imageUrl: body.imageUrl.trim(),
        originalPrice,
        dealPrice,
        discountPercent,
        targetUrl: body.targetUrl.trim(),
        ctaText: body.ctaText ? body.ctaText.trim() : 'Cek Promo',
        sortOrder: body.sortOrder ? parseInt(body.sortOrder, 10) : 0,
        isActive: body.isActive !== false,
      })
      .returning();

    return NextResponse.json({
      success: true,
      message: 'Promosi berhasil ditambahkan',
      promotion: inserted,
    });
  } catch (error) {
    console.error('Failed to create promotion:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal menyimpan promosi baru' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/promotions - Update an existing promotion
export async function PUT(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Kunci admin tidak valid' },
      { status: 401 }
    );
  }

  if (!db) {
    return NextResponse.json(
      { success: false, error: 'Koneksi database tidak tersedia' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const id = body.id ? parseInt(body.id, 10) : null;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID promosi wajib disertakan' },
        { status: 400 }
      );
    }

    const originalPrice = body.originalPrice !== undefined ? (body.originalPrice ? parseInt(body.originalPrice, 10) : null) : undefined;
    const dealPrice = body.dealPrice !== undefined ? (body.dealPrice ? parseInt(body.dealPrice, 10) : null) : undefined;
    const discountPercent = body.discountPercent !== undefined ? (body.discountPercent ? parseInt(body.discountPercent, 10) : null) : undefined;

    const updateData: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (body.title !== undefined) updateData.title = body.title.trim();
    if (body.subtitle !== undefined) updateData.subtitle = body.subtitle ? body.subtitle.trim() : null;
    if (body.badge !== undefined) updateData.badge = body.badge.trim();
    if (body.marketplace !== undefined) updateData.marketplace = body.marketplace;
    if (body.type !== undefined) updateData.type = body.type;
    if (body.imageUrl !== undefined) updateData.imageUrl = body.imageUrl.trim();
    if (originalPrice !== undefined) updateData.originalPrice = originalPrice;
    if (dealPrice !== undefined) updateData.dealPrice = dealPrice;
    if (discountPercent !== undefined) updateData.discountPercent = discountPercent;
    if (body.targetUrl !== undefined) updateData.targetUrl = body.targetUrl.trim();
    if (body.ctaText !== undefined) updateData.ctaText = body.ctaText.trim();
    if (body.sortOrder !== undefined) updateData.sortOrder = parseInt(body.sortOrder, 10);
    if (body.isActive !== undefined) updateData.isActive = Boolean(body.isActive);

    const [updated] = await db
      .update(promotions)
      .set(updateData)
      .where(eq(promotions.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Promosi tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Promosi berhasil diperbarui',
      promotion: updated,
    });
  } catch (error) {
    console.error('Failed to update promotion:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal memperbarui promosi' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/promotions - Delete a promotion
export async function DELETE(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Kunci admin tidak valid' },
      { status: 401 }
    );
  }

  if (!db) {
    return NextResponse.json(
      { success: false, error: 'Koneksi database tidak tersedia' },
      { status: 500 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get('id');

    if (!idParam) {
      return NextResponse.json(
        { success: false, error: 'Parameter id wajib disertakan' },
        { status: 400 }
      );
    }

    const id = parseInt(idParam, 10);

    const [deleted] = await db
      .delete(promotions)
      .where(eq(promotions.id, id))
      .returning();

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Promosi tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Promosi berhasil dihapus',
      deletedId: id,
    });
  } catch (error) {
    console.error('Failed to delete promotion:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal menghapus promosi' },
      { status: 500 }
    );
  }
}
