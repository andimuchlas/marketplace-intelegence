'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Promotion } from '@/db/schema';
import { MarketplaceIcon } from '@/components/ui/MarketplaceIcon';
import { formatRupiah } from '@/lib/formatting/currency';
import {
  Lock,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Eye,
  LogOut,
  Sparkles,
  ArrowUpRight,
  RefreshCw,
  AlertCircle,
  TrendingDown,
  Layers,
} from 'lucide-react';

export default function AdminPromosPage() {
  const [adminKey, setAdminKey] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');

  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [actionError, setActionError] = useState<string>('');
  const [actionSuccess, setActionSuccess] = useState<string>('');

  // Filter state
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingPromo, setEditingPromo] = useState<Partial<Promotion> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formSubtitle, setFormSubtitle] = useState('');
  const [formBadge, setFormBadge] = useState('Diskon Kilat');
  const [formMarketplace, setFormMarketplace] = useState<string>('shopee');
  const [formType, setFormType] = useState<string>('product_spotlight');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formOriginalPrice, setFormOriginalPrice] = useState('');
  const [formDealPrice, setFormDealPrice] = useState('');
  const [formTargetUrl, setFormTargetUrl] = useState('');
  const [formCtaText, setFormCtaText] = useState('Cek Promo');
  const [formSortOrder, setFormSortOrder] = useState('0');
  const [formIsActive, setFormIsActive] = useState(true);

  // Check saved admin key on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('marketintel_admin_key');
    if (savedKey) {
      setAdminKey(savedKey);
      verifyKey(savedKey);
    }
  }, []);

  const verifyKey = async (key: string) => {
    setIsVerifying(true);
    setAuthError('');
    try {
      const res = await fetch('/api/admin/promotions', {
        headers: { Authorization: `Bearer ${key}` },
      });
      if (res.ok) {
        const data = await res.json();
        setIsAuthenticated(true);
        localStorage.setItem('marketintel_admin_key', key);
        setPromotions(data.promotions || []);
      } else {
        setIsAuthenticated(false);
        setAuthError('Kunci admin tidak valid. Silakan cek kembali.');
        localStorage.removeItem('marketintel_admin_key');
      }
    } catch {
      setAuthError('Gagal menghubungi server verifikasi admin.');
    } finally {
      setIsVerifying(false);
    }
  };

  const loadPromotions = useCallback(async () => {
    if (!adminKey) return;
    setIsLoading(true);
    setActionError('');
    try {
      const res = await fetch('/api/admin/promotions', {
        headers: { Authorization: `Bearer ${adminKey}` },
      });
      if (res.ok) {
        const data = await res.json();
        setPromotions(data.promotions || []);
      } else {
        setActionError('Gagal memuat daftar promosi');
      }
    } catch {
      setActionError('Terjadi kendala jaringan saat memuat promosi');
    } finally {
      setIsLoading(false);
    }
  }, [adminKey]);

  const handleLogout = () => {
    localStorage.removeItem('marketintel_admin_key');
    setIsAuthenticated(false);
    setAdminKey('');
    setPromotions([]);
  };

  const openCreateModal = () => {
    setEditingPromo(null);
    setFormTitle('');
    setFormSubtitle('');
    setFormBadge('Diskon Kilat');
    setFormMarketplace('shopee');
    setFormType('product_spotlight');
    setFormImageUrl('');
    setFormOriginalPrice('');
    setFormDealPrice('');
    setFormTargetUrl('');
    setFormCtaText('Ambil di Shopee');
    setFormSortOrder('0');
    setFormIsActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (promo: Promotion) => {
    setEditingPromo(promo);
    setFormTitle(promo.title);
    setFormSubtitle(promo.subtitle || '');
    setFormBadge(promo.badge);
    setFormMarketplace(promo.marketplace);
    setFormType(promo.type);
    setFormImageUrl(promo.imageUrl);
    setFormOriginalPrice(promo.originalPrice ? String(promo.originalPrice) : '');
    setFormDealPrice(promo.dealPrice ? String(promo.dealPrice) : '');
    setFormTargetUrl(promo.targetUrl);
    setFormCtaText(promo.ctaText);
    setFormSortOrder(String(promo.sortOrder));
    setFormIsActive(promo.isActive);
    setIsModalOpen(true);
  };

  const handleSavePromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formMarketplace || !formImageUrl || !formTargetUrl) {
      alert('Mohon isi field judul, marketplace, image URL, dan target URL');
      return;
    }

    setIsSubmitting(true);
    setActionError('');
    setActionSuccess('');

    try {
      const isEdit = Boolean(editingPromo?.id);
      const url = '/api/admin/promotions';
      const method = isEdit ? 'PUT' : 'POST';

      const payload = {
        ...(isEdit ? { id: editingPromo?.id } : {}),
        title: formTitle,
        subtitle: formSubtitle,
        badge: formBadge,
        marketplace: formMarketplace,
        type: formType,
        imageUrl: formImageUrl,
        originalPrice: formOriginalPrice ? parseInt(formOriginalPrice, 10) : null,
        dealPrice: formDealPrice ? parseInt(formDealPrice, 10) : null,
        targetUrl: formTargetUrl,
        ctaText: formCtaText,
        sortOrder: parseInt(formSortOrder, 10) || 0,
        isActive: formIsActive,
      };

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminKey}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setActionSuccess(isEdit ? 'Promosi berhasil diperbarui!' : 'Promosi baru berhasil ditambahkan!');
        setIsModalOpen(false);
        loadPromotions();
      } else {
        setActionError(data.error || 'Gagal menyimpan promosi');
      }
    } catch {
      setActionError('Terjadi kesalahan koneksi saat menyimpan promosi');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleActive = async (promo: Promotion) => {
    try {
      const res = await fetch('/api/admin/promotions', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminKey}`,
        },
        body: JSON.stringify({
          id: promo.id,
          isActive: !promo.isActive,
        }),
      });

      if (res.ok) {
        setPromotions((prev) =>
          prev.map((p) => (p.id === promo.id ? { ...p, isActive: !p.isActive } : p))
        );
      } else {
        alert('Gagal mengubah status promosi');
      }
    } catch {
      alert('Terjadi kesalahan koneksi');
    }
  };

  const handleDeletePromo = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus promosi ini secara permanen?')) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/promotions?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminKey}` },
      });

      if (res.ok) {
        setPromotions((prev) => prev.filter((p) => p.id !== id));
        setActionSuccess('Promosi berhasil dihapus');
      } else {
        alert('Gagal menghapus promosi');
      }
    } catch {
      alert('Terjadi kesalahan koneksi saat menghapus');
    }
  };

  // Filtered list
  const filteredPromos = promotions.filter((p) => {
    if (filterStatus === 'active') return p.isActive;
    if (filterStatus === 'inactive') return !p.isActive;
    return true;
  });

  // Screen 1: Login / Admin Key Entry
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4 py-12 bg-canvas">
        <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-8 shadow-card">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-900 text-white">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="mt-4 font-display text-xl font-bold text-primary-900">
            Akses CMS Promosi & Banner
          </h1>
          <p className="mt-1 text-xs text-primary-600 leading-relaxed">
            Masukkan kunci rahasia administrator (<code className="rounded bg-stone-100 px-1 py-0.5 font-mono text-stone-700">ADMIN_SECRET_KEY</code>) untuk mengelola banner iklan dan promosi afiliasi.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              verifyKey(adminKey);
            }}
            className="mt-6 space-y-4"
          >
            <div>
              <label className="block text-xs font-semibold text-primary-800">
                Kunci Rahasia Admin
              </label>
              <input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="Masukkan admin secret key..."
                className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                required
              />
            </div>

            {authError && (
              <div className="flex items-center gap-2 rounded-xl bg-rose-50 p-3 text-xs font-medium text-rose-700 border border-rose-200">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full rounded-xl bg-primary-900 px-4 py-3 text-sm font-semibold text-white transition-transform hover:bg-black active:scale-95 disabled:opacity-50"
            >
              {isVerifying ? 'Memverifikasi...' : 'Masuk ke Dashboard CMS'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Screen 2: Admin Dashboard
  return (
    <div className="min-h-screen bg-canvas pb-20 pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-200/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-1 shadow-2xs">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-xs font-semibold text-primary-800">
                Content Management System
              </span>
            </div>
            <h1 className="mt-2 font-display text-2xl font-bold tracking-tight text-primary-900 sm:text-3xl">
              Manajemen Promosi & Banner Afiliasi
            </h1>
            <p className="mt-1 text-xs text-primary-600 sm:text-sm">
              Kelola banner event e-commerce (10.10, WIB) dan spotlight produk diskon secara realtime tanpa redeploy.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={loadPromotions}
              disabled={isLoading}
              title="Refresh Data"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-stone-200 bg-white text-primary-700 hover:bg-stone-50 active:scale-95"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-800 active:scale-95"
            >
              <Plus className="h-4 w-4" />
              <span>Tambah Promo Baru</span>
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-500 hover:bg-rose-50 hover:text-rose-700"
              title="Keluar (Logout)"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Notifications */}
        {actionSuccess && (
          <div className="mt-4 flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800">
            <span>{actionSuccess}</span>
            <button onClick={() => setActionSuccess('')} className="text-emerald-700 font-bold">&times;</button>
          </div>
        )}
        {actionError && (
          <div className="mt-4 flex items-center justify-between rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-800">
            <span>{actionError}</span>
            <button onClick={() => setActionError('')} className="text-rose-700 font-bold">&times;</button>
          </div>
        )}

        {/* KPI Summary Cards */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-subtle">
            <span className="text-xs font-semibold text-primary-500">Total Promosi</span>
            <p className="mt-1 font-display text-2xl font-bold text-primary-900">
              {promotions.length}
            </p>
          </div>
          <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-subtle">
            <span className="text-xs font-semibold text-emerald-700">Promo Aktif</span>
            <p className="mt-1 font-display text-2xl font-bold text-emerald-700">
              {promotions.filter((p) => p.isActive).length}
            </p>
          </div>
          <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-subtle">
            <span className="text-xs font-semibold text-stone-500">Non-Aktif</span>
            <p className="mt-1 font-display text-2xl font-bold text-stone-500">
              {promotions.filter((p) => !p.isActive).length}
            </p>
          </div>
          <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-subtle">
            <span className="text-xs font-semibold text-primary-500">Koneksi Database</span>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Neon PostgreSQL
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mt-8 flex items-center gap-2 border-b border-stone-200 pb-3">
          <button
            onClick={() => setFilterStatus('all')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              filterStatus === 'all'
                ? 'bg-primary-900 text-white'
                : 'bg-stone-100 text-primary-700 hover:bg-stone-200'
            }`}
          >
            Semua ({promotions.length})
          </button>
          <button
            onClick={() => setFilterStatus('active')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              filterStatus === 'active'
                ? 'bg-emerald-700 text-white'
                : 'bg-stone-100 text-primary-700 hover:bg-stone-200'
            }`}
          >
            Aktif ({promotions.filter((p) => p.isActive).length})
          </button>
          <button
            onClick={() => setFilterStatus('inactive')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              filterStatus === 'inactive'
                ? 'bg-stone-800 text-white'
                : 'bg-stone-100 text-primary-700 hover:bg-stone-200'
            }`}
          >
            Non-Aktif ({promotions.filter((p) => !p.isActive).length})
          </button>
        </div>

        {/* Promo Items List */}
        <div className="mt-6 space-y-4">
          {filteredPromos.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-12 text-center">
              <Layers className="mx-auto h-8 w-8 text-stone-400" />
              <h3 className="mt-2 text-sm font-bold text-primary-900">
                Belum ada promosi di database
              </h3>
              <p className="mt-1 text-xs text-primary-500">
                Klik tombol &quot;Tambah Promo Baru&quot; di atas untuk memasukkan banner atau spotlight deal pertama Anda.
              </p>
            </div>
          ) : (
            filteredPromos.map((promo) => (
              <div
                key={promo.id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border bg-white p-4 shadow-subtle transition-all ${
                  promo.isActive ? 'border-stone-200' : 'border-stone-200/50 opacity-60'
                }`}
              >
                {/* Left: Thumbnail & Details */}
                <div className="flex items-start gap-4 min-w-0">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-stone-200 bg-stone-100">
                    <img
                      src={promo.imageUrl}
                      alt={promo.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full border border-stone-200 bg-stone-50 px-2 py-0.5 text-[10px] font-semibold text-primary-800">
                        <MarketplaceIcon id={promo.marketplace} size={12} />
                        <span className="capitalize">{promo.marketplace.replace('-', ' ')}</span>
                      </span>

                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200/60">
                        {promo.badge}
                      </span>

                      <span className="text-[10px] font-medium text-stone-400 uppercase">
                        {promo.type === 'campaign_banner' ? 'Event Banner' : 'Product Spotlight'}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-primary-900 truncate">
                      {promo.title}
                    </h3>

                    {promo.subtitle && (
                      <p className="text-xs text-primary-500 line-clamp-1">
                        {promo.subtitle}
                      </p>
                    )}

                    {promo.dealPrice && (
                      <div className="flex items-center gap-2 pt-0.5">
                        <span className="text-xs font-bold text-emerald-700">
                          {formatRupiah(promo.dealPrice)}
                        </span>
                        {promo.originalPrice && (
                          <span className="text-[11px] text-stone-400 line-through">
                            {formatRupiah(promo.originalPrice)}
                          </span>
                        )}
                        {promo.discountPercent && (
                          <span className="text-[10px] font-semibold text-rose-600">
                            (-{promo.discountPercent}%)
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center justify-between sm:justify-end gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                  {/* Status Toggle Switch */}
                  <button
                    type="button"
                    onClick={() => handleToggleActive(promo)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                      promo.isActive
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                    }`}
                  >
                    {promo.isActive ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Aktif</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-3.5 w-3.5 text-stone-500" />
                        <span>Non-Aktif</span>
                      </>
                    )}
                  </button>

                  {/* Edit */}
                  <button
                    type="button"
                    onClick={() => openEditModal(promo)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-white text-primary-700 hover:bg-stone-50 active:scale-95"
                    title="Edit Promo"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => handleDeletePromo(promo.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-white text-rose-600 hover:bg-rose-50 active:scale-95"
                    title="Hapus Promo"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>

                  {/* Outbound Link Check */}
                  <a
                    href={promo.targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-white text-primary-700 hover:bg-stone-50"
                    title="Buka Link Tujuan"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal: Create / Edit Promo */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
            <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                <h3 className="font-display text-lg font-bold text-primary-900">
                  {editingPromo?.id ? 'Edit Promosi' : 'Tambah Promosi Baru'}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg p-1 text-stone-400 hover:bg-stone-100 hover:text-stone-700"
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleSavePromo} className="mt-4 space-y-4 text-xs">
                {/* Title */}
                <div>
                  <label className="block font-semibold text-primary-800">Judul Promosi *</label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Contoh: Shopee 10.10 Brand Festival: Ekstra Voucher 50%"
                    className="mt-1 w-full rounded-xl border border-stone-300 p-2.5 text-xs focus:border-emerald-600 focus:outline-none"
                    required
                  />
                </div>

                {/* Subtitle */}
                <div>
                  <label className="block font-semibold text-primary-800">Subjudul / Deskripsi Singkat</label>
                  <input
                    type="text"
                    value={formSubtitle}
                    onChange={(e) => setFormSubtitle(e.target.value)}
                    placeholder="Contoh: Gratis Ongkir Rp 0 & Diskon Kilat Tiap Jam"
                    className="mt-1 w-full rounded-xl border border-stone-300 p-2.5 text-xs focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                {/* Grid 2 cols: Marketplace & Type */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-primary-800">Marketplace *</label>
                    <select
                      value={formMarketplace}
                      onChange={(e) => setFormMarketplace(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-stone-300 p-2.5 text-xs focus:border-emerald-600 focus:outline-none bg-white"
                    >
                      <option value="shopee">Shopee</option>
                      <option value="tokopedia">Tokopedia</option>
                      <option value="tiktok-shop">TikTok Shop</option>
                      <option value="lazada">Lazada</option>
                      <option value="all">Semua Marketplace</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-primary-800">Tipe Slide *</label>
                    <select
                      value={formType}
                      onChange={(e) => setFormType(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-stone-300 p-2.5 text-xs focus:border-emerald-600 focus:outline-none bg-white"
                    >
                      <option value="product_spotlight">Product Spotlight (Diskon Produk)</option>
                      <option value="campaign_banner">Campaign Banner (Event / Voucher)</option>
                    </select>
                  </div>
                </div>

                {/* Grid 2 cols: Badge & CTA Text */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-primary-800">Badge Label *</label>
                    <input
                      type="text"
                      value={formBadge}
                      onChange={(e) => setFormBadge(e.target.value)}
                      placeholder="Contoh: Event Akbar 10.10 / Hemat 45%"
                      className="mt-1 w-full rounded-xl border border-stone-300 p-2.5 text-xs focus:border-emerald-600 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-primary-800">Teks Tombol CTA *</label>
                    <input
                      type="text"
                      value={formCtaText}
                      onChange={(e) => setFormCtaText(e.target.value)}
                      placeholder="Contoh: Klaim Voucher / Ambil di Shopee"
                      className="mt-1 w-full rounded-xl border border-stone-300 p-2.5 text-xs focus:border-emerald-600 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <label className="block font-semibold text-primary-800">Image URL *</label>
                  <input
                    type="url"
                    value={formImageUrl}
                    onChange={(e) => setFormImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="mt-1 w-full rounded-xl border border-stone-300 p-2.5 text-xs focus:border-emerald-600 focus:outline-none"
                    required
                  />
                </div>

                {/* Grid 2 cols: Prices (for product spotlight) */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-primary-800">Harga Coret Asli (Rp)</label>
                    <input
                      type="number"
                      value={formOriginalPrice}
                      onChange={(e) => setFormOriginalPrice(e.target.value)}
                      placeholder="Contoh: 249000"
                      className="mt-1 w-full rounded-xl border border-stone-300 p-2.5 text-xs focus:border-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-primary-800">Harga Promo / Deal (Rp)</label>
                    <input
                      type="number"
                      value={formDealPrice}
                      onChange={(e) => setFormDealPrice(e.target.value)}
                      placeholder="Contoh: 136000"
                      className="mt-1 w-full rounded-xl border border-stone-300 p-2.5 text-xs focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Target URL */}
                <div>
                  <label className="block font-semibold text-primary-800">Link Tujuan Afiliasi *</label>
                  <input
                    type="url"
                    value={formTargetUrl}
                    onChange={(e) => setFormTargetUrl(e.target.value)}
                    placeholder="https://shope.ee/..."
                    className="mt-1 w-full rounded-xl border border-stone-300 p-2.5 text-xs focus:border-emerald-600 focus:outline-none"
                    required
                  />
                </div>

                {/* Sort Order & Is Active */}
                <div className="flex items-center justify-between border-t border-stone-100 pt-3">
                  <div className="flex items-center gap-2">
                    <label className="font-semibold text-primary-800">Urutan Tampil:</label>
                    <input
                      type="number"
                      value={formSortOrder}
                      onChange={(e) => setFormSortOrder(e.target.value)}
                      className="w-16 rounded-lg border border-stone-300 p-1 text-center text-xs"
                    />
                  </div>

                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formIsActive}
                      onChange={(e) => setFormIsActive(e.target.checked)}
                      className="h-4 w-4 rounded border-stone-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="font-semibold text-primary-900">Tayangkan Sekarang (Aktif)</span>
                  </label>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-xl border border-stone-300 px-4 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-100"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-xl bg-emerald-700 px-5 py-2 text-xs font-semibold text-white hover:bg-emerald-800 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Menyimpan...' : 'Simpan Promosi'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
