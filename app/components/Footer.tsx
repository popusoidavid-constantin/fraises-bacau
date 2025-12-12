"use client";

import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const TikTokIcon = () => (
  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18 2c.3 1.7 1.4 3 3 3v3c-1.5 0-3-.5-4.2-1.3v7.5a7.8 7.8 0 11-7.8-7.8c.4 0 .8 0 1.2.1v3.3a4.5 4.5 0 104.5 4.5V2h3.3z" />
  </svg>
);

export default function Footer() {
  const navi = useRouter();
  return (
    <footer className="py-16 bg-[#A7747D] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.30),_transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          <div className="flex flex-col items-center lg:items-start">
            <Image
              src="/fraises.jpeg"
              alt="Fraises au Chocolat logo"
              width={120}
              height={120}
              className="rounded-full shadow-2xl ring-4 ring-white/40 mb-4"
              onClick={() => navi.push("/")}
            />
            <h3 className="text-2xl font-black tracking-wide drop-shadow-md text-center lg:text-left">Fraises au Chocolat Bacău</h3>
          </div>

          <div className="space-y-5">
            <h4 className="text-xl font-bold mb-4 border-b-2 border-white/30 pb-2">Contact</h4>
            <a href="tel:0758988775" className="flex items-center gap-3 hover:translate-x-1 transition group">
              <Phone className="w-6 h-6 group-hover:scale-110 transition" />
              <span className="text-base font-medium">0758 988 775</span>
            </a>
            <a href="mailto:fraisesauchocolat03@gmail.com" className="flex items-center gap-3 hover:translate-x-1 transition group">
              <Mail className="w-6 h-6 group-hover:scale-110 transition" />
              <span className="text-base font-medium">fraisesauchocolat03@gmail.com</span>
            </a>
          </div>

          <div className="lg:col-span-2 space-y-5">
            <h4 className="text-xl font-bold mb-4 border-b-2 border-white/30 pb-2">Locații</h4>

            <a
              href="https://maps.app.goo.gl/wz98cy4PD6L3nPX6A"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 hover:translate-x-1 transition group"
            >
              <MapPin className="w-6 h-6 shrink-0 mt-1 group-hover:scale-110 transition" />
              <div>
                <p className="text-base font-semibold">Locația 1</p>
                <p className="text-sm text-white/90">Str. 22 Decembrie nr. 113, Bacău</p>
              </div>
            </a>

            <a
              href="https://maps.app.goo.gl/7iG1D8pwc65pAgid7"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 hover:translate-x-1 transition group"
            >
              <MapPin className="w-6 h-6 shrink-0 mt-1 group-hover:scale-110 transition" />
              <div>
                <p className="text-base font-semibold">Locația 2</p>
                <p className="text-sm text-white/90">Str. Laurențiu Pătrașcanu, bloc D2, Bacău</p>
              </div>
            </a>
          </div>
        </div>

        <div className="border-t border-white/20 my-8"></div>

        <div className="flex flex-col md:flex-row md:justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/fraises_au_chocolat03/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-125 hover:text-pink-200 transition"
              aria-label="Instagram"
            >
              <Instagram className="w-7 h-7" />
            </a>
            <a
              href="https://www.facebook.com/fraisesauchocolat03/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-125 hover:text-blue-200 transition"
              aria-label="Facebook"
            >
              <Facebook className="w-7 h-7" />
            </a>
            <a
              href="https://www.tiktok.com/@fraisesauchocolat.bacau"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-125 transition"
              aria-label="TikTok"
            >
              <TikTokIcon />
            </a>
          </div>

          <div className="text-center md:text-right space-y-1">
            <p className="text-sm text-white/90 font-medium">
              © {new Date().getFullYear()} Fraises au Chocolat Bacău — Toate drepturile rezervate
            </p>
            <p className="text-xs text-white/70 flex items-center justify-center md:justify-end gap-1">
              Made with <span className="text-red-300 animate-pulse">❤️</span> by{" "}
              <a
                href="https://enable-tech.online"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition font-semibold underline decoration-dotted"
              >
                Enable Tech Software
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
