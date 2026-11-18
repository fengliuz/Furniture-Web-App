"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Sparkles,
  ArrowRight,
  Leaf,
  CheckCircle2,
  Armchair,
} from "lucide-react";
import { PRODUCTS, ProductCategory } from "@/data/products";
import BentoProductCard from "@/components/ui/BentoProductCard";

const CATEGORIES: ("Semua" | ProductCategory)[] = [
  "Semua",
  "Ruang Tamu",
  "Kamar Tidur",
  "Ruang Kerja",
  "Dekorasi",
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<"Semua" | ProductCategory>("Semua");
  const [heroImgError, setHeroImgError] = useState(false);

  const filteredProducts =
    selectedCategory === "Semua"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="flex flex-col w-full bg-[#FAF6F0] text-[#241A15]">
      
      {/* 1. Hero Section */}
      <section className="relative w-full overflow-hidden border-b border-[#E3D9CB] bg-gradient-to-b from-[#FAF6F0] via-[#FAF6F0] to-[#F0E8DC]/40">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20 pt-12 md:pt-20 pb-16 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Hero Text & Actions */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#EFE6DF] text-[#6E4730] border border-[#E3D9CB] w-fit mb-6 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>KaryaRuang — Estetika Japandi Modern</span>
              </div>

              {/* Headline Sesuai Instruksi */}
              <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-bold tracking-tight text-[#241A15] leading-[1.14]">
                Ruang Hangat, Hidup Berkelanjutan
              </h1>

              {/* Descriptive Text */}
              <p className="mt-6 text-base sm:text-lg text-[#241A15]/75 leading-relaxed max-w-xl font-normal">
                Mengharmonikan kesederhanaan wabi-sabi Jepang dan kenyamanan fungsional Skandinavia. Perabot pilihan dari kayu jati solid tersertifikasi FSC, serat linen alami bernapas sejuk, dan ketelitian pengrajin lokal untuk menghadirkan ketenangan sejati di rumah Anda.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/katalog"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#1E352B] text-[#FAF6F0] font-semibold text-sm hover:bg-[#14241D] transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 group"
                >
                  <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>Jelajahi Koleksi</span>
                </Link>

                <a
                  href="#filosofi-ruang"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#FAF6F0] text-[#241A15] border border-[#E3D9CB] font-semibold text-sm hover:bg-[#F0E8DC] transition-all duration-300 shadow-sm active:scale-95"
                >
                  <span>Konsultasi Tata Ruang</span>
                  <ArrowRight className="w-4 h-4 text-[#6E4730]" />
                </a>
              </div>

              {/* Value Propositions */}
              <div className="mt-10 pt-8 border-t border-[#E3D9CB]/80 grid grid-cols-3 gap-4 text-left">
                <div>
                  <span className="text-[#1E352B] font-bold text-lg sm:text-xl block">
                    100% FSC
                  </span>
                  <p className="text-[11px] sm:text-xs text-[#241A15]/65 mt-0.5 font-medium">
                    Kayu Solid Berkelanjutan
                  </p>
                </div>
                <div>
                  <span className="text-[#1E352B] font-bold text-lg sm:text-xl block">
                    Seumur Hidup
                  </span>
                  <p className="text-[11px] sm:text-xs text-[#241A15]/65 mt-0.5 font-medium">
                    Garansi Konstruksi Rangka
                  </p>
                </div>
                <div>
                  <span className="text-[#1E352B] font-bold text-lg sm:text-xl block">
                    Alami & Aman
                  </span>
                  <p className="text-[11px] sm:text-xs text-[#241A15]/65 mt-0.5 font-medium">
                    Finishing Non-Toksik
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Japandi Living Room Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                <div className="relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] w-full rounded-[36px] overflow-hidden border border-[#E3D9CB] bg-[#F0E8DC] shadow-2xl flex items-center justify-center">
                  {!heroImgError ? (
                    <Image
                      src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85"
                      alt="Ruang Tamu Japandi Hangat KaryaRuang"
                      fill
                      priority
                      onError={() => setHeroImgError(true)}
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#FAF6F0] to-[#F0E8DC]">
                      <div className="w-16 h-16 rounded-3xl bg-[#FAF6F0] border border-[#E3D9CB] flex items-center justify-center text-[#1E352B] mb-4 shadow-sm">
                        <Armchair className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold text-[#241A15]">
                        Koleksi Living Kyoto 2026
                      </h3>
                      <p className="text-xs text-[#241A15]/70 mt-2 max-w-xs">
                        Harmoni interior ruang tamu dengan kayu jati solid dan linen Belgia alami.
                      </p>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#241A15]/40 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Highlight Card */}
                  <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-[#FAF6F0]/95 backdrop-blur-md border border-[#E3D9CB]/80 shadow-lg flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#6E4730] block">
                        Koleksi Musim Ini
                      </span>
                      <h4 className="text-sm font-bold text-[#241A15]">
                        Ruang Tamu Harmoni Japandi
                      </h4>
                    </div>
                    <span className="px-3.5 py-1.5 rounded-full bg-[#1E352B] text-[#FAF6F0] text-xs font-semibold shrink-0">
                      Lihat Kurasi
                    </span>
                  </div>
                </div>

                {/* Decorative Subtle Ambient Glows */}
                <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-[#F0E8DC] -z-10 blur-2xl opacity-60" />
                <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-[#E3D9CB] -z-10 blur-3xl opacity-50" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Section "Koleksi Pilihan" (Asymmetrical Bento Grid) */}
      <section id="koleksi-pilihan" className="w-full py-16 md:py-24 max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20">
        
        {/* Section Heading & Category Filter Chips */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#6E4730] mb-2">
              <Leaf className="w-3.5 h-3.5" />
              <span>Kurasi Terbaik KaryaRuang</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#241A15]">
              Koleksi Pilihan
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#241A15]/70 leading-relaxed">
              Eksplorasi tata letak Bento furnitur Japandi. Setiap karya memadukan sandaran proporsional, lekukan sudut (*concave notch*) ikonik di sudut kanan bawah, dan kayu jati perhutani.
            </p>
          </div>

          {/* Horizontal Scrollable Category Chips (Mobile 375px & Desktop) */}
          <div className="w-full md:w-auto overflow-x-auto no-scrollbar pb-2 md:pb-0">
            <div className="flex items-center gap-2 whitespace-nowrap">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 border ${
                      isActive
                        ? "bg-[#1E352B] text-[#FAF6F0] border-[#1E352B] shadow-sm"
                        : "bg-[#F0E8DC] text-[#241A15] border-[#E3D9CB] hover:bg-[#FAF6F0]"
                    }`}
                  >
                    {cat === "Semua" ? "Semua Koleksi" : cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6">
          {filteredProducts.map((product, index) => {
            // Produk ke-1 dan ke-4 berukuran featured (lebar) saat dalam mode Semua
            const isFeatured =
              selectedCategory === "Semua" && (index === 0 || index === 3);

            return (
              <BentoProductCard
                key={product.id}
                product={product}
                variant={isFeatured ? "featured" : "standard"}
                priorityImage={index < 2}
              />
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs text-[#241A15]/60 font-medium">
            Menampilkan {filteredProducts.length} karya seni furnitur siap kirim ke seluruh Indonesia.
          </p>
        </div>
      </section>

      {/* 3. Section Filosofi Japandi Craft & Material */}
      <section id="filosofi-ruang" className="w-full bg-[#F0E8DC]/50 border-t border-[#E3D9CB] py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden border border-[#E3D9CB] bg-[#FAF6F0] shadow-lg flex items-center justify-center p-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-3xl bg-[#EFE6DF] border border-[#E3D9CB] flex items-center justify-center text-[#6E4730] mb-3 shadow-sm">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-[#241A15]">
                    Pengerjaan Presisi Tanpa Paku
                  </h4>
                  <p className="text-xs text-[#241A15]/70 mt-1 max-w-xs">
                    Konstruksi sambungan pasak tradisional Jepara yang kokoh melintasi generasi.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <span className="text-xs font-bold tracking-widest uppercase text-[#6E4730] mb-2 block">
                Filosofi Material & Craftsmanship
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#241A15] leading-snug">
                Sentuhan Tangan Pengrajin, Jiwa Bagi Setiap Ruang
              </h3>
              <p className="mt-4 text-sm sm:text-base text-[#241A15]/75 leading-relaxed">
                Kami percaya bahwa rumah adalah tempat pemulihan energi batin. Oleh karena itu, setiap potongan kayu dipilih dengan cermat dari hutan industri lestari, dibentuk dengan sambungan pasak tradisional tanpa paku berkarat, dan dipadukan dengan tekstur linen alami yang ramah kulit.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-[#241A15]">
                <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-[#FAF6F0] border border-[#E3D9CB]">
                  <CheckCircle2 className="w-4 h-4 text-[#1E352B] shrink-0" />
                  <span>Kayu Jati Solid Grade Perhutani</span>
                </div>
                <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-[#FAF6F0] border border-[#E3D9CB]">
                  <CheckCircle2 className="w-4 h-4 text-[#1E352B] shrink-0" />
                  <span>Anyaman Rotan Asli Tangan Terampil</span>
                </div>
                <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-[#FAF6F0] border border-[#E3D9CB]">
                  <CheckCircle2 className="w-4 h-4 text-[#1E352B] shrink-0" />
                  <span>Pelapis Linen Alami Berpori Sejuk</span>
                </div>
                <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-[#FAF6F0] border border-[#E3D9CB]">
                  <CheckCircle2 className="w-4 h-4 text-[#1E352B] shrink-0" />
                  <span>Finishing Ekologis Aman untuk Anak & Hewan</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
