"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  Star,
  Check,
  Plus,
  Minus,
  ChevronUp,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { Product } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import BentoProductCard from "@/components/ui/BentoProductCard";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

const WOOD_OPTIONS = [
  { name: "Kayu Jati Solid", desc: "Grade A Perhutani FSC" },
  { name: "Kayu Sungkai", desc: "Serat Halus Alami" },
];

const FABRIC_OPTIONS = [
  { name: "Krem Alami", color: "#F5F2EB", border: "#D8CEBF" },
  { name: "Pasir Hangat", color: "#E6DFD5", border: "#C7BDB0" },
  { name: "Terracotta Cokelat", color: "#7D553C", border: "#5C3D2A" },
];

export default function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [selectedWood, setSelectedWood] = useState(WOOD_OPTIONS[0].name);
  const [selectedFabric, setSelectedFabric] = useState(FABRIC_OPTIONS[0].name);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isDimensiOpen, setIsDimensiOpen] = useState(true);
  const [isPengirimanOpen, setIsPengirimanOpen] = useState(false);
  const [activeDot, setActiveDot] = useState(0);
  const [imgError, setImgError] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const totalCartItems = useCartStore((state) => state.getTotalItems());
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));

  // Harga coret (diskon 15% sesuai Figma 06M-A)
  const originalPrice = Math.round(product.price * 1.15);

  const handleAddToCart = () => {
    addItem(product, quantity, {
      wood: selectedWood,
      fabric: selectedFabric,
      openDrawer: true,
    });

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  // Gunakan gambar Japandi berkualitas tinggi persis nuansa 06M-A
  const displayImage =
    product.image && product.image.trim() !== ""
      ? product.image
      : "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80";

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#241A15] pb-28 md:pb-16">
      
      {/* 1. Mobile Top Bar (Persis Figma 06M-A: ← Detail Produk ♡ 🛍️) */}
      <div className="sticky top-0 z-30 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#E3D9CB]/80 px-4 py-3.5 flex items-center justify-between md:hidden">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Kembali"
          className="p-1.5 -ml-1.5 rounded-full text-[#241A15] hover:bg-[#F0E8DC] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h1 className="text-sm font-bold text-[#241A15] tracking-tight">
          Detail Produk
        </h1>

        <div className="flex items-center gap-2">
          {/* Wishlist Button */}
          <button
            type="button"
            onClick={() => toggleWishlist(product)}
            aria-label="Wishlist"
            className="p-1.5 rounded-full text-[#241A15] hover:bg-[#F0E8DC] transition-colors"
          >
            <Heart
              className={`w-5 h-5 ${
                isInWishlist ? "fill-[#6E4730] text-[#6E4730]" : ""
              }`}
            />
          </button>

          {/* Cart Bag with Badge */}
          <button
            type="button"
            onClick={openCart}
            aria-label="Buka keranjang belanja"
            className="relative p-1.5 rounded-full text-[#241A15] hover:bg-[#F0E8DC] transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCartItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#1E352B] text-[#FAF6F0] text-[10px] font-bold flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20 pt-4 md:pt-8">
        
        {/* Desktop Breadcrumbs (Hidden on Mobile) */}
        <nav aria-label="Breadcrumb" className="hidden md:flex items-center gap-2 text-xs font-medium text-[#241A15]/60 mb-6">
          <Link href="/" className="hover:text-[#1E352B] transition-colors">
            Beranda
          </Link>
          <span>/</span>
          <Link href="/katalog" className="hover:text-[#1E352B] transition-colors">
            Katalog
          </Link>
          <span>/</span>
          <span className="text-[#241A15] font-semibold">{product.name}</span>
        </nav>

        {/* 2-Column Layout on Desktop, 1-Column on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-start">
          
          {/* Left: Product Image Card (Persis Figma 06M-A) */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <div className="relative aspect-[4/3] sm:aspect-[1/1] lg:aspect-[4/3] w-full rounded-2xl md:rounded-[32px] overflow-hidden bg-[#F0E8DC] border border-[#E3D9CB] shadow-sm flex items-center justify-center">
              
              {!imgError ? (
                <Image
                  src={displayImage}
                  alt={product.name}
                  fill
                  priority
                  onError={() => setImgError(true)}
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover object-center"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#FAF6F0] to-[#F0E8DC]">
                  <div className="w-16 h-16 rounded-2xl bg-[#EFE6DF] border border-[#E3D9CB] flex items-center justify-center text-[#6E4730] mb-2 shadow-sm">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-bold text-[#241A15]">{product.name}</h3>
                  <span className="text-xs text-[#6E4730] font-medium">Japandi Living</span>
                </div>
              )}

              {/* Top-Left Badge: Diskon 15% (Persis Figma 06M-A) */}
              <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#FAF6F0]/90 backdrop-blur-md border border-[#E3D9CB]/80 text-[11px] font-semibold text-[#6E4730] shadow-sm">
                Diskon 15%
              </div>

              {/* Bottom Carousel Indicator Dots (Persis Figma 06M-A: 1 green pill + 3 dots) */}
              <div className="absolute bottom-3.5 inset-x-0 flex items-center justify-center gap-1.5 pointer-events-none">
                <span className={`h-1.5 rounded-full transition-all ${activeDot === 0 ? "w-6 bg-[#1E352B]" : "w-1.5 bg-[#FAF6F0]/80"}`} />
                <span className={`h-1.5 rounded-full transition-all ${activeDot === 1 ? "w-6 bg-[#1E352B]" : "w-1.5 bg-[#FAF6F0]/80"}`} />
                <span className={`h-1.5 rounded-full transition-all ${activeDot === 2 ? "w-6 bg-[#1E352B]" : "w-1.5 bg-[#FAF6F0]/80"}`} />
                <span className={`h-1.5 rounded-full transition-all ${activeDot === 3 ? "w-6 bg-[#1E352B]" : "w-1.5 bg-[#FAF6F0]/80"}`} />
              </div>
            </div>
          </div>

          {/* Right: Product Info, Options & Accordions (Persis Figma 06M-A) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            
            {/* Top Subtitle & Rating Row */}
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6E4730]">
                  KRIYA KAYU PERHUTANI
                </span>

                {/* Rating ★ 4.9(38) */}
                <div className="flex items-center gap-1 text-xs font-semibold text-[#241A15]">
                  <Star className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706]" />
                  <span>{product.rating.toFixed(1)}</span>
                  <span className="text-[#241A15]/60 font-normal">({product.reviewsCount})</span>
                </div>
              </div>

              {/* Product Title */}
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#241A15] tracking-tight mt-1.5">
                {product.name}
              </h2>

              {/* Price Row: Rp 12.500.000 Rp 14.200.000 (Strikethrough) */}
              <div className="flex items-baseline gap-2.5 mt-2">
                <span className="text-xl md:text-2xl font-extrabold text-[#241A15] tracking-tight">
                  Rp {product.price.toLocaleString("id-ID")}
                </span>
                <span className="text-xs md:text-sm text-[#241A15]/40 line-through font-normal">
                  Rp {originalPrice.toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            <div className="w-full border-b border-[#E3D9CB]/80" />

            {/* Option 1: Material Rangka (Persis Figma 06M-A: ✓ Kayu Jati Solid | Kayu Sungkai) */}
            <div>
              <label className="text-xs font-bold text-[#241A15] block mb-2">
                Material Rangka
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {WOOD_OPTIONS.map((wood) => {
                  const isActive = selectedWood === wood.name;
                  return (
                    <button
                      key={wood.name}
                      type="button"
                      onClick={() => setSelectedWood(wood.name)}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                        isActive
                          ? "bg-[#1E352B] text-[#FAF6F0] shadow-sm"
                          : "bg-[#F0E8DC] text-[#241A15] hover:bg-[#EAE1D3]"
                      }`}
                    >
                      {isActive && <Check className="w-3.5 h-3.5" />}
                      <span>{wood.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Option 2: Warna Kain Linen (Persis Figma 06M-A: Circles + Label on right) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-[#241A15]">
                  Warna Kain Linen
                </label>
                <span className="text-xs text-[#241A15]/70 font-medium">
                  {selectedFabric}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {FABRIC_OPTIONS.map((fabric) => {
                  const isActive = selectedFabric === fabric.name;
                  return (
                    <button
                      key={fabric.name}
                      type="button"
                      onClick={() => setSelectedFabric(fabric.name)}
                      aria-label={`Pilih warna ${fabric.name}`}
                      className={`relative w-8 h-8 rounded-full transition-all ${
                        isActive
                          ? "ring-2 ring-[#241A15] ring-offset-2 ring-offset-[#FAF6F0]"
                          : "opacity-85 hover:opacity-100"
                      }`}
                      style={{
                        backgroundColor: fabric.color,
                        border: `1px solid ${fabric.border}`,
                      }}
                    />
                  );
                })}
              </div>
            </div>

            <div className="w-full border-b border-[#E3D9CB]/80 my-1" />

            {/* Accordion 1: Dimensi & Material (Persis Figma 06M-A) */}
            <div className="border-b border-[#E3D9CB]/80 pb-3">
              <button
                type="button"
                onClick={() => setIsDimensiOpen(!isDimensiOpen)}
                className="w-full flex items-center justify-between text-xs font-bold text-[#241A15] py-1 cursor-pointer"
              >
                <span>Dimensi & Material</span>
                {isDimensiOpen ? (
                  <ChevronUp className="w-4 h-4 text-[#241A15]/60" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#241A15]/60" />
                )}
              </button>

              {isDimensiOpen && (
                <div className="mt-2 text-xs text-[#241A15]/75 leading-relaxed space-y-1.5 animate-in fade-in">
                  <p>
                    Dimensi: {product.dimensions || "168 x 84 x 76 cm (Tinggi dudukan 42 cm)"}
                  </p>
                  <p>
                    {product.material} dengan sarung bantal linen lepas-pasang yang mudah dibersihkan.
                  </p>
                </div>
              )}
            </div>

            {/* Accordion 2: Pengiriman & Garansi (Persis Figma 06M-A) */}
            <div className="border-b border-[#E3D9CB]/80 pb-3">
              <button
                type="button"
                onClick={() => setIsPengirimanOpen(!isPengirimanOpen)}
                className="w-full flex items-center justify-between text-xs font-bold text-[#241A15] py-1 cursor-pointer"
              >
                <span>Pengiriman & Garansi</span>
                {isPengirimanOpen ? (
                  <ChevronUp className="w-4 h-4 text-[#241A15]/60" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#241A15]/60" />
                )}
              </button>

              {isPengirimanOpen && (
                <div className="mt-2 text-xs text-[#241A15]/75 leading-relaxed space-y-1.5 animate-in fade-in">
                  <p>
                    Gratis pengiriman dan perakitan langsung untuk wilayah Jabodetabek.
                  </p>
                  <p>
                    Garansi kekuatan konstruksi rangka kayu jati solid seumur hidup.
                  </p>
                </div>
              )}
            </div>

            {/* Desktop-only Add to Cart & Stepper Actions */}
            <div className="hidden md:flex items-center gap-3 pt-2">
              {/* Stepper */}
              <div className="flex items-center gap-2.5 bg-[#F0E8DC] px-3.5 py-2.5 rounded-xl border border-[#E3D9CB]">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  className="w-5 h-5 flex items-center justify-center text-[#241A15] hover:opacity-70"
                  aria-label="Kurangi kuantitas"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-bold text-[#241A15] min-w-[16px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="w-5 h-5 flex items-center justify-center text-[#241A15] hover:opacity-70"
                  aria-label="Tambah kuantitas"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Main CTA Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#1E352B] hover:bg-[#14241D] text-[#FAF6F0] font-semibold text-xs transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isAdded ? "Ditambahkan ✓" : "Tambah ke Keranjang"}</span>
              </button>
            </div>

          </div>

        </div>

        {/* Bottom Section: Rekomendasi Produk Seirama */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 pt-12 border-t border-[#E3D9CB]">
            <h3 className="text-lg md:text-xl font-bold text-[#241A15] mb-6">
              Karya Seirama Lainnya
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6">
              {relatedProducts.slice(0, 3).map((item) => (
                <BentoProductCard
                  key={item.id}
                  product={item}
                  variant="standard"
                  className="lg:col-span-4"
                />
              ))}
            </div>
          </section>
        )}

      </div>

      {/* 3. Mobile Bottom Sticky Bar (Persis Figma 06M-A: [− 1 +] [Tambah ke Keranjang]) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF6F0] border-t border-[#E3D9CB] px-4 py-3 shadow-lg flex items-center gap-3 md:hidden">
        {/* Stepper Pill Box */}
        <div className="flex items-center gap-3 bg-[#F0E8DC] px-3.5 py-2.5 rounded-xl border border-[#E3D9CB] shrink-0">
          <button
            type="button"
            onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
            className="w-5 h-5 flex items-center justify-center text-[#241A15] hover:opacity-70"
            aria-label="Kurangi kuantitas"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="text-xs font-bold text-[#241A15] min-w-[14px] text-center">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((prev) => prev + 1)}
            className="w-5 h-5 flex items-center justify-center text-[#241A15] hover:opacity-70"
            aria-label="Tambah kuantitas"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Main CTA Green Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1E352B] hover:bg-[#14241D] text-[#FAF6F0] font-semibold text-xs transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{isAdded ? "Ditambahkan ✓" : "Tambah ke Keranjang"}</span>
        </button>
      </div>

    </div>
  );
}
