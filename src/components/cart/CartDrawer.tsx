"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Truck,
  Sparkles,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export default function CartDrawer() {
  const [mounted, setMounted] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const isOpen = useCartStore((state) => state.isOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const getTotalItems = useCartStore((state) => state.getTotalItems);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Kunci scroll body saat cart terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted) return null;

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      alert(
        "Terima kasih! Pesanan simulasi Anda telah kami terima. Tim concierge KaryaRuang akan segera menghubungi Anda melalui WhatsApp."
      );
      closeCart();
    }, 1200);
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop Dimming Overlay */}
      <div
        className={`absolute inset-0 bg-[#241A15]/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Cart Container: Slide-over di Desktop (kanan) & Bottom-Sheet persis Figma 06M-B di Mobile */}
      <div
        className={`fixed bg-[#FAF6F0] shadow-2xl flex flex-col justify-between z-10 border-[#E3D9CB] transition-transform duration-300 ease-out
          /* Desktop (1440px) */
          top-0 right-0 bottom-0 w-full md:w-[460px] md:border-l md:rounded-l-[32px]
          /* Mobile (375px) - Figma 06M-B Sheet */
          max-md:top-auto max-md:left-0 max-md:right-0 max-md:bottom-0 max-md:max-h-[92vh] max-md:rounded-t-[32px] max-md:border-t
          ${
            isOpen
              ? "translate-x-0 max-md:translate-y-0"
              : "translate-x-full max-md:translate-y-full"
          }
        `}
      >
        {/* Mobile Handle Indicator Bar (Persis Figma 06M-B) */}
        <div className="md:hidden w-full flex justify-center pt-3 pb-1">
          <div className="w-12 h-1.5 rounded-full bg-[#E3D9CB]" />
        </div>

        {/* Sheet Header: Keranjang Belanja (X) & Tombol Silang */}
        <div className="px-5 md:px-6 pt-3 pb-4 md:py-5 border-b border-[#E3D9CB]/80 flex items-center justify-between bg-[#FAF6F0]">
          <h2 className="text-lg md:text-xl font-bold text-[#241A15] tracking-tight">
            Keranjang Belanja ({totalItems})
          </h2>

          <button
            type="button"
            onClick={closeCart}
            aria-label="Tutup keranjang belanja"
            className="p-1.5 rounded-full text-[#241A15]/70 hover:bg-[#F0E8DC] hover:text-[#241A15] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sheet Content: List of Items (Persis Figma 06M-B Cards) */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-3">
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-[#FAF6F0] border border-[#E3D9CB] flex items-center gap-3.5 shadow-sm transition-all hover:bg-[#F0E8DC]/30"
              >
                {/* Square Product Thumbnail / Japandi Swatch */}
                <div className="w-[72px] h-[72px] rounded-xl bg-[#EBE3D5] border border-[#E3D9CB]/80 shrink-0 flex items-center justify-center text-[#6E4730]">
                  <Sparkles className="w-6 h-6 opacity-70" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h3 className="text-xs sm:text-sm font-bold text-[#241A15] truncate">
                      {item.product.name}
                    </h3>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      aria-label="Hapus produk"
                      className="text-[#241A15]/40 hover:text-red-700 transition-colors p-1 -mr-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-[11px] text-[#241A15]/60 mt-0.5 truncate">
                    {item.selectedWood || "Kayu Jati Solid"} • {item.selectedFabric || "Kain Linen"}
                  </p>

                  <div className="flex items-center justify-between mt-2 pt-1">
                    <span className="text-xs sm:text-sm font-bold text-[#241A15]">
                      Rp {item.product.price.toLocaleString("id-ID")}
                    </span>

                    {/* Stepper Pill Container (Persis Figma 06M-B: − 1 +) */}
                    <div className="flex items-center gap-2 bg-[#F0E8DC]/80 px-2.5 py-1 rounded-full border border-[#E3D9CB]">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-4 h-4 flex items-center justify-center text-[#241A15] hover:opacity-70 transition-opacity"
                        aria-label="Kurangi kuantitas"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-[#241A15] min-w-[14px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-4 h-4 flex items-center justify-center text-[#241A15] hover:opacity-70 transition-opacity"
                        aria-label="Tambah kuantitas"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* Empty State */
            <div className="py-14 text-center flex flex-col items-center justify-center h-full">
              <div className="w-16 h-16 rounded-3xl bg-[#F0E8DC] border border-[#E3D9CB] flex items-center justify-center text-[#6E4730] mb-4 shadow-sm">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-[#241A15]">
                Keranjang Belanja Masih Kosong
              </h3>
              <p className="text-xs text-[#241A15]/65 mt-1.5 max-w-xs leading-relaxed">
                Anda belum menambahkan perabot ke keranjang. Jelajahi kurasi Japandi kami sekarang.
              </p>
              <Link
                href="/katalog"
                onClick={closeCart}
                className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1E352B] text-[#FAF6F0] text-xs font-semibold hover:bg-[#14241D] transition-colors shadow-sm"
              >
                <span>Jelajahi Koleksi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>

        {/* Bottom Summary Container (Persis Box Figma 06M-B) */}
        {items.length > 0 && (
          <div className="p-4 md:p-6 bg-[#FAF6F0]">
            <div className="p-4 rounded-2xl bg-[#F0E8DC] border border-[#E3D9CB] space-y-3">
              {/* Row Subtotal */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#241A15]/75">
                  Subtotal ({totalItems} produk)
                </span>
                <span className="text-sm md:text-base font-extrabold text-[#241A15] tracking-tight">
                  Rp {totalPrice.toLocaleString("id-ID")}
                </span>
              </div>

              {/* Free Shipping Truck Row */}
              <div className="flex items-start gap-2 pt-1 text-[10.5px] text-[#241A15]/75">
                <Truck className="w-4 h-4 text-[#1E352B] shrink-0 mt-0.5" />
                <span>
                  Gratis pengiriman & perakitan untuk wilayah Jabodetabek
                </span>
              </div>

              {/* Primary Green CTA Button (Persis Figma: Lanjut ke Pembayaran →) */}
              <button
                type="button"
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-6 rounded-xl md:rounded-full bg-[#1E352B] hover:bg-[#14241D] text-[#FAF6F0] font-semibold text-xs tracking-wide transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {isCheckingOut ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#FAF6F0] border-t-transparent rounded-full animate-spin" />
                    <span>Memproses Pembayaran...</span>
                  </>
                ) : (
                  <>
                    <span>Lanjut ke Pembayaran</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
