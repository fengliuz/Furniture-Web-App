"use client";

import { useState, useMemo, useRef, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChevronRight,
  SlidersHorizontal,
  ChevronLeft,
  Sparkles,
  ArrowUpDown,
  Home as HomeIcon,
  RotateCcw,
} from "lucide-react";
import { PRODUCTS, ProductCategory, Product } from "@/data/products";
import BentoProductCard from "@/components/ui/BentoProductCard";

const CATEGORIES: { label: string; value: "Semua" | ProductCategory }[] = [
  { label: "Semua Produk", value: "Semua" },
  { label: "Ruang Tamu", value: "Ruang Tamu" },
  { label: "Kamar Tidur", value: "Kamar Tidur" },
  { label: "Ruang Kerja", value: "Ruang Kerja" },
  { label: "Dekorasi", value: "Dekorasi" },
];

type SortOption = "rekomendasi" | "harga-rendah" | "harga-tinggi" | "rating" | "nama";

const ITEMS_PER_PAGE = 6;

function KatalogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("kategori");

  // Ref untuk target scroll otomatis saat ganti halaman pagination
  const gridSectionRef = useRef<HTMLDivElement>(null);

  // Sinkronisasi kategori secara reaktif dari URL searchParams (mendukung Ruang%20Tamu & Ruang+Tamu)
  const selectedCategory: "Semua" | ProductCategory = useMemo(() => {
    if (!categoryParam) return "Semua";
    const normalized = decodeURIComponent(categoryParam).replace(/\+/g, " ").trim().toLowerCase();
    const found = CATEGORIES.find(
      (c) => c.value.toLowerCase() === normalized
    );
    return found ? found.value : "Semua";
  }, [categoryParam]);

  const [sortBy, setSortBy] = useState<SortOption>("rekomendasi");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filter & Sort Logic
  const processedProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filter kategori aktif
    if (selectedCategory !== "Semua") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Pengurutan
    switch (sortBy) {
      case "harga-rendah":
        result.sort((a, b) => a.price - b.price);
        break;
      case "harga-tinggi":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "nama":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "rekomendasi":
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [selectedCategory, sortBy]);

  // Pagination calculation
  const totalItems = processedProducts.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);

  const paginatedProducts = useMemo(() => {
    const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
    return processedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [processedProducts, safePage]);

  // Handler pergantian halaman pagination dengan auto-scroll ke produk
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);

    // Langsung scroll ke atas produk dengan memperhitungkan sticky navbar
    if (gridSectionRef.current) {
      const headerOffset = 90; // tinggi sticky header (80px) + sedikit padding (10px)
      const elementPosition = gridSectionRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Handler pergantian kategori via tombol chip (sinkron ke URL router)
  const handleCategoryChange = (category: "Semua" | ProductCategory) => {
    setCurrentPage(1);
    if (category === "Semua") {
      router.push("/katalog", { scroll: false });
    } else {
      router.push(`/katalog?kategori=${encodeURIComponent(category)}`, { scroll: false });
    }
  };

  // Hitung jumlah produk per kategori untuk badge chip
  const getCategoryCount = (category: "Semua" | ProductCategory) => {
    if (category === "Semua") return PRODUCTS.length;
    return PRODUCTS.filter((p) => p.category === category).length;
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#241A15] py-8 md:py-12">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20">
        
        {/* 1. Breadcrumb Nav */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-medium text-[#241A15]/60">
          <Link
            href="/"
            className="flex items-center gap-1.5 hover:text-[#1E352B] transition-colors"
          >
            <HomeIcon className="w-3.5 h-3.5 text-[#6E4730]" />
            <span>Beranda</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#E3D9CB]" />
          <Link
            href="/katalog"
            className={`transition-colors ${
              selectedCategory === "Semua"
                ? "text-[#241A15] font-bold"
                : "text-[#241A15]/60 hover:text-[#1E352B]"
            }`}
          >
            Katalog
          </Link>
          {selectedCategory !== "Semua" && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-[#E3D9CB]" />
              <span className="text-[#6E4730] font-bold">{selectedCategory}</span>
            </>
          )}
        </nav>

        {/* 2. Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E3D9CB]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#EFE6DF] text-[#6E4730] border border-[#E3D9CB] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Kurasi Japandi Warm Luxury</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#241A15] leading-[1.15]">
              {selectedCategory === "Semua" ? "Koleksi Lengkap" : `Koleksi ${selectedCategory}`}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#241A15]/70 leading-relaxed font-normal">
              {selectedCategory === "Semua"
                ? "Jelajahi perabot kayu jati solid pilihan, anyaman rotan artisanal, dan tekstil alami yang dirancang untuk menghadirkan ketenangan serta estetika abadi di setiap ruangan Anda."
                : `Menampilkan kurasi furnitur Japandi pilihan khusus untuk kategori ${selectedCategory} dengan material alami dan pengerjaan tangan presisi.`}
            </p>
          </div>

          <div className="hidden lg:flex flex-col items-end text-right">
            <span className="text-2xl font-bold text-[#1E352B]">
              {totalItems} Karya
            </span>
            <span className="text-xs text-[#241A15]/60 mt-0.5">
              Siap dikirim ke seluruh Indonesia
            </span>
          </div>
        </div>

        {/* 3. Category Filter Chips (Horizontal Scrollable di Mobile 375px) */}
        <div className="pt-6 pb-4">
          <div className="flex items-center justify-between gap-4">
            <div className="w-full overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="flex items-center gap-2 sm:gap-2.5 whitespace-nowrap py-1">
                {CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat.value;
                  const count = getCategoryCount(cat.value);

                  return (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => handleCategoryChange(cat.value)}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 border ${
                        isActive
                          ? "bg-[#1E352B] text-[#FAF6F0] border-[#1E352B] shadow-sm"
                          : "bg-[#F0E8DC] text-[#241A15] border-[#E3D9CB] hover:bg-[#FAF6F0]"
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${
                          isActive
                            ? "bg-[#14241D] text-[#DCE3DF]"
                            : "bg-[#E3D9CB]/60 text-[#6E4730]"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Anchor Ref untuk Auto-Scroll ke Grid Produk */}
        <div ref={gridSectionRef} className="scroll-mt-24" />

        {/* 4. Controls Bar: Info Jumlah Produk & Dropdown Sort */}
        <div className="py-4 my-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-y border-[#E3D9CB]/80">
          <div className="flex items-center gap-2 text-xs text-[#241A15]/75 font-medium">
            <span>
              Menampilkan <strong className="text-[#241A15] font-bold">{paginatedProducts.length}</strong> dari <strong className="text-[#241A15] font-bold">{totalItems}</strong> produk
            </span>
            {selectedCategory !== "Semua" && (
              <button
                type="button"
                onClick={() => handleCategoryChange("Semua")}
                className="inline-flex items-center gap-1 ml-2 text-[11px] text-[#6E4730] hover:underline font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Tampilkan Semua</span>
              </button>
            )}
          </div>

          {/* Dropdown Pengurutan (Sort by) */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-xs font-semibold text-[#241A15]/70 flex items-center gap-1.5 shrink-0">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#1E352B]" />
              <span>Urutkan:</span>
            </label>
            <div className="relative">
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as SortOption);
                  setCurrentPage(1);
                }}
                className="appearance-none bg-[#F0E8DC] border border-[#E3D9CB] text-xs font-medium text-[#241A15] pl-3 pr-8 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1E352B]/30 focus:border-[#1E352B] transition-all cursor-pointer"
              >
                <option value="rekomendasi">Pilihan Unggulan</option>
                <option value="harga-rendah">Harga: Terendah ke Tertinggi</option>
                <option value="harga-tinggi">Harga: Tertinggi ke Terendah</option>
                <option value="rating">Rating Tertinggi</option>
                <option value="nama">Nama: A ke Z</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-[#241A15]/60">
                <ChevronRight className="w-3.5 h-3.5 rotate-90" />
              </div>
            </div>
          </div>
        </div>

        {/* 5. Product Grid (Bento Asymmetrical Responsive Grid) */}
        {paginatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 pt-6 min-h-[500px] md:min-h-[580px] content-start">
            {paginatedProducts.map((product, idx) => {
              // Kartu asimetris: produk ke-1 berukuran featured saat di page 1
              const isFeatured = safePage === 1 && idx === 0 && selectedCategory === "Semua";

              return (
                <BentoProductCard
                  key={product.id}
                  product={product}
                  variant={isFeatured ? "featured" : "standard"}
                  priorityImage={idx < 2}
                />
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="py-20 text-center flex flex-col items-center justify-center bg-[#F0E8DC]/40 rounded-3xl border border-[#E3D9CB] mt-6 p-8 min-h-[400px]">
            <div className="w-16 h-16 rounded-full bg-[#EFE6DF] flex items-center justify-center text-[#6E4730] mb-4">
              <SlidersHorizontal className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-[#241A15]">
              Tidak Ada Produk yang Cocok
            </h3>
            <p className="text-xs text-[#241A15]/65 mt-1 max-w-sm">
              Kategori yang Anda pilih saat ini belum memiliki perabot yang tersedia. Silakan pilih kategori lain atau reset filter.
            </p>
            <button
              type="button"
              onClick={() => handleCategoryChange("Semua")}
              className="mt-5 px-6 py-2.5 rounded-full bg-[#1E352B] text-[#FAF6F0] text-xs font-semibold hover:bg-[#14241D] transition-colors"
            >
              Kembali ke Semua Koleksi
            </button>
          </div>
        )}

        {/* 6. Pagination Controls (Tengah Bawah) */}
        {totalPages > 1 && (
          <div className="mt-14 mb-8 flex items-center justify-center gap-2">
            {/* Tombol Sebelumnya */}
            <button
              type="button"
              onClick={() => handlePageChange(Math.max(safePage - 1, 1))}
              disabled={safePage === 1}
              className="inline-flex items-center gap-1 px-4 py-2 rounded-full border border-[#E3D9CB] bg-[#F0E8DC] text-xs font-semibold text-[#241A15] transition-all hover:bg-[#FAF6F0] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Sebelumnya</span>
            </button>

            {/* Nomor Halaman */}
            <div className="flex items-center gap-1.5 px-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                const isActive = pageNum === safePage;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-9 h-9 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#1E352B] text-[#FAF6F0] shadow-sm"
                        : "bg-[#F0E8DC] text-[#241A15] border border-[#E3D9CB] hover:bg-[#FAF6F0]"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            {/* Tombol Selanjutnya */}
            <button
              type="button"
              onClick={() => handlePageChange(Math.min(safePage + 1, totalPages))}
              disabled={safePage === totalPages}
              className="inline-flex items-center gap-1 px-4 py-2 rounded-full border border-[#E3D9CB] bg-[#F0E8DC] text-xs font-semibold text-[#241A15] transition-all hover:bg-[#FAF6F0] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <span className="hidden sm:inline">Selanjutnya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default function KatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center p-8 text-[#241A15]">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-[#1E352B] border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium">Memuat katalog KaryaRuang...</span>
          </div>
        </div>
      }
    >
      <KatalogContent />
    </Suspense>
  );
}
