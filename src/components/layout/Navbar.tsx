"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  Search,
  Heart,
  ShoppingBag,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

const NAV_LINKS = [
  { name: "Koleksi Lengkap", href: "/katalog" },
  { name: "Ruang Tamu", href: "/katalog?kategori=Ruang%20Tamu" },
  { name: "Kamar Tidur", href: "/katalog?kategori=Kamar%20Tidur" },
  { name: "Ruang Kerja", href: "/katalog?kategori=Ruang%20Kerja" },
  { name: "Dekorasi", href: "/katalog?kategori=Dekorasi" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const totalCartItems = useCartStore((state) => state.getTotalItems());
  const openCart = useCartStore((state) => state.openCart);
  const totalWishlistItems = useWishlistStore((state) => state.getTotalItems());

  useEffect(() => {
    setMounted(true);
  }, []);

  // Tutup drawer saat rute berpindah
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchExpanded(false);
  }, [pathname]);

  // Kunci scroll body saat mobile drawer terbuka
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/katalog?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchExpanded(false);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Sticky Main Header */}
      <header className="sticky top-0 z-40 w-full bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#E3D9CB] transition-all duration-200">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20 h-16 lg:h-20 flex items-center justify-between gap-4">
          
          {/* Mobile: Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 rounded-xl text-[#241A15] hover:bg-[#F0E8DC] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1E352B]/20"
              aria-label="Buka menu navigasi"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Logo Brand */}
          <div className="flex items-center">
            <Link
              href="/"
              className="group flex flex-col justify-center select-none"
            >
              <span className="text-xl sm:text-2xl font-bold tracking-[0.25em] text-[#241A15] transition-colors group-hover:text-[#1E352B]">
                KARYARUANG
              </span>
              <span className="hidden sm:block text-[9px] uppercase tracking-[0.35em] text-[#6E4730] font-medium -mt-0.5">
                Japandi Warm Luxury
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium tracking-wide text-[#241A15]/80 hover:text-[#1E352B] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#1E352B] after:w-0 hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar (Desktop) & Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Desktop Search Bar */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative w-48 xl:w-64">
              <input
                type="text"
                placeholder="Cari karya furnitur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F0E8DC] text-xs text-[#241A15] placeholder-[#241A15]/50 pl-9 pr-3 py-2.5 rounded-full border border-[#E3D9CB] focus:outline-none focus:ring-2 focus:ring-[#1E352B]/30 focus:border-[#1E352B] transition-all"
              />
              <Search className="w-4 h-4 text-[#241A15]/60 absolute left-3 pointer-events-none" />
            </form>

            {/* Mobile Search Toggle */}
            <button
              type="button"
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              className="p-2 rounded-full text-[#241A15] hover:bg-[#F0E8DC] md:hidden transition-colors"
              aria-label="Cari produk"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Icon with Badge */}
            <Link
              href="/#wishlist"
              className="relative p-2 rounded-full text-[#241A15] hover:bg-[#F0E8DC] hover:text-[#6E4730] transition-colors"
              aria-label="Wishlist favorit Anda"
            >
              <Heart className="w-5 h-5" />
              {mounted && totalWishlistItems > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#6E4730] text-[#FAF6F0] text-[10px] font-bold flex items-center justify-center animate-in fade-in">
                  {totalWishlistItems}
                </span>
              )}
            </Link>

            {/* Shopping Cart Button with Badge */}
            <button
              type="button"
              onClick={openCart}
              className="relative p-2 rounded-full text-[#241A15] hover:bg-[#F0E8DC] hover:text-[#1E352B] transition-colors"
              aria-label="Buka keranjang belanja"
            >
              <ShoppingBag className="w-5 h-5" />
              {mounted && totalCartItems > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#1E352B] text-[#FAF6F0] text-[10px] font-bold flex items-center justify-center animate-in fade-in">
                  {totalCartItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Expandable Search Bar */}
        {isSearchExpanded && (
          <div className="md:hidden px-4 pb-3 pt-1 border-t border-[#E3D9CB] bg-[#FAF6F0] animate-in slide-in-from-top-2">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                autoFocus
                placeholder="Cari perabot atau dekorasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F0E8DC] text-xs text-[#241A15] placeholder-[#241A15]/50 pl-9 pr-3 py-2 rounded-full border border-[#E3D9CB] focus:outline-none focus:ring-2 focus:ring-[#1E352B]/30"
              />
              <Search className="w-4 h-4 text-[#241A15]/60 absolute left-3 top-2.5 pointer-events-none" />
            </form>
          </div>
        )}
      </header>

      {/* Mobile Slide-Out Navigation Drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop Overlay */}
        <div
          className={`absolute inset-0 bg-[#241A15]/40 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Slide-out Drawer Panel */}
        <aside
          className={`absolute top-0 left-0 bottom-0 w-[85%] max-w-[340px] bg-[#FAF6F0] shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-out z-10 border-r border-[#E3D9CB] ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Drawer Top Header */}
          <div>
            <div className="px-5 py-5 border-b border-[#E3D9CB] flex items-center justify-between">
              <div>
                <span className="text-lg font-bold tracking-[0.2em] text-[#241A15] block">
                  KARYARUANG
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#6E4730] font-semibold">
                  Japandi Living
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full text-[#241A15] hover:bg-[#F0E8DC] transition-colors"
                aria-label="Tutup menu navigasi"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Search inside Drawer */}
            <div className="px-5 pt-4 pb-2">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Cari koleksi furnitur..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#F0E8DC] text-xs text-[#241A15] placeholder-[#241A15]/50 pl-9 pr-3 py-2.5 rounded-full border border-[#E3D9CB] focus:outline-none focus:ring-2 focus:ring-[#1E352B]/20"
                />
                <Search className="w-4 h-4 text-[#241A15]/60 absolute left-3 top-3 pointer-events-none" />
              </form>
            </div>

            {/* Navigation Menu Links */}
            <nav className="px-3 py-3">
              <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#6E4730]">
                Kategori Pilihan
              </div>
              <ul className="space-y-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#241A15] hover:bg-[#F0E8DC] hover:text-[#1E352B] transition-colors group"
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="w-4 h-4 text-[#241A15]/30 group-hover:text-[#1E352B] group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="my-3 mx-2 border-t border-[#E3D9CB]" />

              {/* Secondary Navigation */}
              <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#6E4730]">
                Layanan & Bantuan
              </div>
              <ul className="space-y-1 text-xs">
                <li>
                  <Link
                    href="/#filosofi"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-xl text-[#241A15]/80 hover:bg-[#F0E8DC] transition-colors"
                  >
                    Filosofi Kayu & Craftsmanship
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#layanan"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-xl text-[#241A15]/80 hover:bg-[#F0E8DC] transition-colors"
                  >
                    Konsultasi Tata Ruang Gratis
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#kontak"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-xl text-[#241A15]/80 hover:bg-[#F0E8DC] transition-colors"
                  >
                    Hubungi Studio & Showroom
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Drawer Bottom Info Badge */}
          <div className="p-5 border-t border-[#E3D9CB] bg-[#F0E8DC]/40">
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1 rounded-full bg-[#EFE6DF] text-[#6E4730]">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-semibold text-[#241A15]">
                100% Kayu Solid Berkelanjutan
              </span>
            </div>
            <p className="text-[11px] text-[#241A15]/65 leading-relaxed">
              Dibuat dengan tangan oleh pengrajin Jepara dengan standar estetika minimalis Jepang.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
