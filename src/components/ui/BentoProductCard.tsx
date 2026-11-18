"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ShoppingBag, Check, Heart, Star, Sparkles } from "lucide-react";
import { Product } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

interface BentoProductCardProps {
  product: Product;
  variant?: "standard" | "featured" | "compact";
  className?: string;
  priorityImage?: boolean;
}

export default function BentoProductCard({
  product,
  variant = "standard",
  className = "",
  priorityImage = false,
}: BentoProductCardProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const isFeatured = variant === "featured";
  const hasValidImage = product.image && product.image.trim() !== "" && !imgError;

  return (
    <div
      className={`group relative bg-[#F0E8DC] rounded-[32px] border border-[#E3D9CB] p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-[#E3D9CB]/80 ${
        isFeatured
          ? "col-span-1 md:col-span-2 lg:col-span-7 xl:col-span-8 min-h-[460px] lg:min-h-[500px]"
          : "col-span-1 md:col-span-1 lg:col-span-5 xl:col-span-4 min-h-[420px]"
      } ${className}`}
    >
      {/* Top Header: Category Badge, Featured Pill, & Wishlist Button */}
      <div className="flex items-center justify-between gap-2 z-10 w-full mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#EFE6DF] text-[#6E4730] tracking-wide border border-[#E3D9CB]/60">
            {product.category}
          </span>
          {product.featured && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#1E352B] text-[#FAF6F0]">
              Unggulan
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          aria-label={isInWishlist ? "Hapus dari wishlist" : "Tambah ke wishlist"}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 border border-[#E3D9CB] ${
            isInWishlist
              ? "bg-[#6E4730] text-[#FAF6F0] shadow-sm"
              : "bg-[#FAF6F0]/90 text-[#241A15] hover:bg-[#FAF6F0] hover:text-[#6E4730]"
          }`}
        >
          <Heart className={`w-4 h-4 ${isInWishlist ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Product Image Stage (with fallback when empty) */}
      <div
        className={`relative w-full rounded-2xl overflow-hidden bg-[#FAF6F0] my-2 transition-transform duration-500 group-hover:scale-[1.01] flex items-center justify-center border border-[#E3D9CB]/50 ${
          isFeatured ? "aspect-[16/10] sm:aspect-[16/9]" : "aspect-[4/3]"
        }`}
      >
        {hasValidImage ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority={priorityImage}
            onError={() => setImgError(true)}
            sizes={
              isFeatured
                ? "(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 55vw"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            }
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#FAF6F0] to-[#F0E8DC]">
            <div className="w-14 h-14 rounded-2xl bg-[#EFE6DF] border border-[#E3D9CB] flex items-center justify-center text-[#6E4730] mb-2 shadow-sm">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-[#241A15] tracking-wide">
              {product.name}
            </span>
            <span className="text-[10px] text-[#6E4730] font-medium mt-0.5">
              Japandi Craft Living
            </span>
          </div>
        )}

        {/* Rating Badge */}
        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-[#FAF6F0]/90 backdrop-blur-md border border-[#E3D9CB]/80 flex items-center gap-1.5 shadow-sm text-xs font-semibold text-[#241A15]">
          <Star className="w-3.5 h-3.5 fill-[#6E4730] text-[#6E4730]" />
          <span>{product.rating.toFixed(1)}</span>
          <span className="text-[#241A15]/40 text-[10px]">({product.reviewsCount})</span>
        </div>
      </div>

      {/* Product Details & Price */}
      <div className="mt-3 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-[#241A15] tracking-tight group-hover:text-[#1E352B] transition-colors line-clamp-1">
            <Link href={`/produk/${product.slug}`}>
              {product.name}
            </Link>
          </h3>
          <p className="text-xs text-[#241A15]/65 mt-1 line-clamp-2 leading-relaxed">
            {product.material}
          </p>
          {isFeatured && (
            <p className="hidden md:block text-xs text-[#241A15]/75 mt-2 line-clamp-2 leading-relaxed italic">
              &ldquo;{product.description}&rdquo;
            </p>
          )}
        </div>

        {/* Price & Pill Button Row */}
        <div className="mt-5 pt-3 border-t border-[#E3D9CB]/70 flex flex-wrap items-end justify-between gap-3 pr-16 sm:pr-20">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#6E4730] block">
              Harga
            </span>
            <span className="text-base sm:text-lg font-bold text-[#241A15] tracking-tight">
              Rp {product.price.toLocaleString("id-ID")}
            </span>
          </div>

          {/* Pill-shaped button: Tambah ke Keranjang */}
          <button
            type="button"
            onClick={handleAddToCart}
            className={`inline-flex items-center gap-1.5 px-4 py-2 sm:px-4 sm:py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 shadow-sm active:scale-95 ${
              isAdded
                ? "bg-[#14241D] text-[#FAF6F0]"
                : "bg-[#1E352B] text-[#FAF6F0] hover:bg-[#14241D]"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#DCE3DF]" />
                <span>Ditambahkan</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Tambah ke Keranjang</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Signature Concave Notch Cutout (Bottom-Right) */}
      <div className="absolute bottom-0 right-0 w-[76px] h-[76px] pointer-events-none select-none z-10">
        <svg
          viewBox="0 0 76 76"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Inward curved notch path smoothly blending into #FAF6F0 background */}
          <path
            d="M76 0 C76 12 68 20 56 20 L40 20 C26 20 20 26 20 40 L20 56 C20 68 12 76 0 76 L76 76 Z"
            fill="#FAF6F0"
          />
        </svg>
      </div>

      {/* Circular Deep Forest Green Button (#1E352B) with Diagonal Arrow (↗) inside the Notch */}
      <Link
        href={`/produk/${product.slug}`}
        className="absolute bottom-2 right-2 z-20 w-11 h-11 rounded-full bg-[#1E352B] text-[#FAF6F0] flex items-center justify-center transition-all duration-300 shadow-md hover:bg-[#14241D] hover:scale-110 group/btn"
        aria-label={`Lihat detail produk ${product.name}`}
      >
        <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
      </Link>
    </div>
  );
}
