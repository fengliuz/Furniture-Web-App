"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  Sparkles,
  ArrowRight,
  MapPin,
  Clock,
  Phone,
  CheckCircle2,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="w-full bg-[#F0E8DC] text-[#241A15] border-t border-[#E3D9CB] transition-colors">
      {/* Top Value Propositions Bar */}
      <div className="border-b border-[#E3D9CB]/80">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-full bg-[#FAF6F0] flex items-center justify-center text-[#1E352B] shrink-0 border border-[#E3D9CB]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#241A15]">
                  Garansi Struktur Kayu
                </h4>
                <p className="text-[11px] text-[#241A15]/65 mt-0.5">
                  Jaminan kekuatan kayu jati & oak solid seumur hidup.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-full bg-[#FAF6F0] flex items-center justify-center text-[#1E352B] shrink-0 border border-[#E3D9CB]">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#241A15]">
                  Pengiriman & Perakitan
                </h4>
                <p className="text-[11px] text-[#241A15]/65 mt-0.5">
                  Layanan perakitan gratis untuk wilayah Jabodetabek.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-full bg-[#FAF6F0] flex items-center justify-center text-[#1E352B] shrink-0 border border-[#E3D9CB]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#241A15]">
                  Pengerjaan Pengrajin Ahli
                </h4>
                <p className="text-[11px] text-[#241A15]/65 mt-0.5">
                  Detail sambungan presisi tanpa paku kimia beracun.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main 4-Column Footer */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20 py-14 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          
          {/* Kolom 1: Brand & Filosofi */}
          <div className="flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-block mb-3">
                <span className="text-2xl font-bold tracking-[0.25em] text-[#241A15] block">
                  KARYARUANG
                </span>
                <span className="text-[9px] uppercase tracking-[0.35em] text-[#6E4730] font-semibold">
                  Japandi Warm Luxury
                </span>
              </Link>
              <p className="text-xs text-[#241A15]/75 leading-relaxed mt-2">
                Mengharmonikan kesederhanaan filosofi wabi-sabi Jepang dan kehangatan fungsional Skandinavia ke dalam perabot rumah tinggal yang bernyawa dan abadi.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-[#E3D9CB]">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#6E4730] block mb-2">
                Showroom & Studio Desain
              </span>
              <p className="text-xs text-[#241A15]/70 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#1E352B] shrink-0 mt-0.5" />
                <span>Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan</span>
              </p>
              <p className="text-xs text-[#241A15]/70 flex items-center gap-2 mt-2">
                <Clock className="w-4 h-4 text-[#1E352B] shrink-0" />
                <span>Selasa - Minggu: 10.00 - 20.00 WIB</span>
              </p>
            </div>
          </div>

          {/* Kolom 2: Kategori Koleksi */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#6E4730] mb-5">
              Koleksi Ruang
            </h3>
            <ul className="space-y-3 text-xs font-medium text-[#241A15]/80">
              <li>
                <Link href="/katalog?kategori=Ruang+Tamu" className="hover:text-[#1E352B] hover:translate-x-1 inline-block transition-transform">
                  Ruang Tamu (Living Room)
                </Link>
              </li>
              <li>
                <Link href="/katalog?kategori=Kamar+Tidur" className="hover:text-[#1E352B] hover:translate-x-1 inline-block transition-transform">
                  Kamar Tidur (Bedroom Sanctuary)
                </Link>
              </li>
              <li>
                <Link href="/katalog?kategori=Ruang+Kerja" className="hover:text-[#1E352B] hover:translate-x-1 inline-block transition-transform">
                  Ruang Kerja & Belajar (Home Office)
                </Link>
              </li>
              <li>
                <Link href="/katalog?kategori=Dekorasi" className="hover:text-[#1E352B] hover:translate-x-1 inline-block transition-transform">
                  Dekorasi & Pencahayaan Wabi
                </Link>
              </li>
              <li>
                <Link href="/katalog" className="hover:text-[#1E352B] hover:translate-x-1 inline-block transition-transform">
                  Koleksi Terbaru Musim Ini
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Layanan Pelanggan */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#6E4730] mb-5">
              Layanan & Bantuan
            </h3>
            <ul className="space-y-3 text-xs font-medium text-[#241A15]/80">
              <li>
                <Link href="/#layanan" className="hover:text-[#1E352B] hover:translate-x-1 inline-block transition-transform">
                  Konsultasi Desain Interior
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-[#1E352B] hover:translate-x-1 inline-block transition-transform">
                  Panduan Perawatan Kayu Alami
                </Link>
              </li>
              <li>
                <Link href="/#garansi" className="hover:text-[#1E352B] hover:translate-x-1 inline-block transition-transform">
                  Klaim Garansi & Servis
                </Link>
              </li>
              <li>
                <Link href="/#lacak" className="hover:text-[#1E352B] hover:translate-x-1 inline-block transition-transform">
                  Pelacakan Status Pengiriman
                </Link>
              </li>
              <li>
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="hover:text-[#1E352B] hover:translate-x-1 inline-flex items-center gap-1.5 transition-transform text-[#1E352B] font-semibold">
                  <Phone className="w-3.5 h-3.5" />
                  Hubungi Concierge WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Warta KaryaRuang (Newsletter) */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#6E4730] mb-5">
              Warta KaryaRuang
            </h3>
            <p className="text-xs text-[#241A15]/75 leading-relaxed mb-4">
              Dapatkan kurasi inspirasi hunian tenang, cerita material kayu, dan undangan eksklusif ke pameran studio kami.
            </p>
            {subscribed ? (
              <div className="p-3 rounded-2xl bg-[#EFE6DF] border border-[#E3D9CB] flex items-center gap-2 text-xs text-[#6E4730] font-medium animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-[#1E352B] shrink-0" />
                <span>Terima kasih telah bergabung dengan warta kami.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2.5">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Alamat email Anda..."
                    className="w-full bg-[#FAF6F0] text-xs text-[#241A15] placeholder-[#241A15]/50 pl-3.5 pr-10 py-2.5 rounded-full border border-[#E3D9CB] focus:outline-none focus:ring-2 focus:ring-[#1E352B]/30 focus:border-[#1E352B] transition-all"
                  />
                  <button
                    type="submit"
                    aria-label="Kirim langganan warta"
                    className="absolute right-1 top-1 bottom-1 w-8 rounded-full bg-[#1E352B] hover:bg-[#14241D] text-[#FAF6F0] flex items-center justify-center transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[10px] text-[#241A15]/55 leading-tight">
                  Privasi Anda terjaga. Kami tidak mengirimkan spam.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>

      {/* Bottom Copyright & Legal Links */}
      <div className="border-t border-[#E3D9CB] bg-[#FAF6F0]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#241A15]/65">
          <p>
            © {new Date().getFullYear()} KaryaRuang Studio. Hak Cipta Dilindungi. Estetika Japandi Modern Indonesia.
          </p>
          <div className="flex flex-wrap items-center gap-6 text-[11px]">
            <Link href="/#privasi" className="hover:text-[#1E352B] transition-colors">
              Kebijakan Privasi
            </Link>
            <Link href="/#syarat" className="hover:text-[#1E352B] transition-colors">
              Syarat & Ketentuan
            </Link>
            <Link href="/#sustainability" className="hover:text-[#1E352B] transition-colors">
              Sertifikasi Kayu FSC
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
