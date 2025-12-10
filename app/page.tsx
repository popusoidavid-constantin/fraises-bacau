"use client";
import { motion } from "framer-motion";
import { Phone, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import PremiumCarousel from "./components/PremiumCarousel";

/*  COLOR THEME
    Primary: #A7747D (rose gold chocolate)
    Accent: #E8D0D4 (soft cream)
    Dark: #3B2A2F
*/

export default function FraisesLanding() {
  // ---------- CLOUDS ----------
  const cloudsRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = cloudsRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const layers = [
      { count: 10, speed: 0.2, size: 180, opacity: 0.35 },
      { count: 14, speed: 0.12, size: 140, opacity: 0.25 },
      { count: 20, speed: 0.08, size: 100, opacity: 0.15 },
    ];

    const clouds = layers.flatMap((layer) =>
      Array.from({ length: layer.count }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: layer.speed,
        size: layer.size,
        opacity: layer.opacity,
      }))
    );

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      clouds.forEach((c) => {
        c.x += c.speed;
        if (c.x - c.size > canvas.width) c.x = -c.size;

        const gradient = ctx.createRadialGradient(c.x, c.y, 20, c.x, c.y, c.size);
        gradient.addColorStop(0, `rgba(255,255,255,${c.opacity})`);
        gradient.addColorStop(1, "rgba(255,255,255,0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(draw);
    };

    draw();
  }, []);

  // ---------- PARTICLES ----------
  const particlesRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = particlesRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 90 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vy: Math.random() * 0.4 + 0.2,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.4 + 0.2,
    }));

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.y -= p.vy;
        if (p.y < -10) p.y = canvas.height + 10;

        ctx.fillStyle = `rgba(255,220,200,${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(animate);
    }
    animate();
  }, []);

  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-[#E8D0D4] via-white to-[#F8EEF0] text-[#3B2A2F]">
      {/* CLOUDS */}
      <canvas ref={cloudsRef} className="fixed inset-0 z-0 pointer-events-none opacity-[0.55]" />

      {/* PARTICLES */}
      <canvas ref={particlesRef} className="fixed inset-0 z-0 pointer-events-none opacity-30" />

      {/* ---------- LUXURY CURTAINS ---------- */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-120%" }}
        transition={{ duration: 2.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 w-[55vw] h-full z-20 bg-gradient-to-r from-[#A7747D] to-[#82535C] shadow-2xl"
      />

      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "120%" }}
        transition={{ duration: 2.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 right-0 w-[55vw] h-full z-20 bg-gradient-to-l from-[#A7747D] to-[#82535C] shadow-2xl"
      />

      {/* CONTENT */}
      <div className="relative z-10">
        {/* HEADER */}
        <header className="py-8 px-6 flex  justify-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-3">
            <Image src="/fraises.jpeg" width={70} height={70} alt="logo" className="rounded-full shadow-2xl ring-4 ring-white/40" />
            <h1 className="text-3xl text-center font-black bg-gradient-to-r from-[#A7747D] to-[#7C5A60] bg-clip-text text-transparent drop-shadow-lg">
              Fraises au Chocolat Bacău
            </h1>
          </motion.div>
        </header>

        {/* HERO */}
        <section className="text-center px-6 pt-24 pb-32 max-w-4xl mx-auto relative">
          <motion.h2
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#A7747D] via-[#C48A94] to-[#7C5A60] drop-shadow-[0_0_20px_rgba(200,150,150,0.3)]"
          >
            Artă în Ciocolată
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl mt-6 text-[#3B2A2F]/80 max-w-2xl mx-auto"
          >
            Căpșuni premium îmbrăcate în ciocolată belgiană, create cu eleganță și atenție la detalii.
          </motion.p>

          <motion.a
            href="https://wa.me/40758988775"
            target="_blank"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="mt-10 inline-flex items-center gap-3 px-10 py-5 bg-[#A7747D] text-white rounded-2xl text-xl font-bold shadow-xl hover:shadow-[#A7747D]/50 transition-all"
          >
            <Phone />
            Comandă pe WhatsApp
          </motion.a>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-6 mt-20">
            {[
              { n: "900+", label: "Clienți fericiți" },
              { n: "100%", label: "Ingrediente Premium" },
              { n: "18+", label: "Colecții Unice" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-md"
              >
                <div className="text-3xl font-black text-[#A7747D]">{s.n}</div>
                <div className="text-sm text-[#3B2A2F]/60">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PRODUCT CAROUSEL */}
        <PremiumCarousel />

        {/* REVIEWS */}
        <section className="py-32 px-6">
          <h2 className="text-center text-5xl font-black mb-16 text-transparent bg-clip-text bg-gradient-to-r from-[#A7747D] to-[#7C5A60]">
            Recenzii
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[
              { n: "Elena", text: "Cele mai fine căpșuni, absolut superbe!" },
              { n: "Andrei", text: "Cadoul perfect pentru iubita mea." },
              { n: "Mara", text: "Prezentare de lux, gust senzațional." },
            ].map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-[#A7747D] fill-[#A7747D]" />
                  ))}
                </div>
                <p className="text-[#3B2A2F] italic mb-6">"{r.text}"</p>
                <div className="font-bold text-[#A7747D]">{r.n}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* LOCATION */}
        <section className="py-24 px-6 bg-[#F8EEF0] text-[#3B2A2F]">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#A7747D] to-[#7C5A60]">
              Unde ne găsești
            </h2>

            <p className="text-lg">
              📍 <strong>Adresa:</strong> 22 Decembrie nr. 113, Bacău
            </p>
            <p className="text-lg">
              📞 <strong>Telefon:</strong> 0758 988 775
            </p>

            <a
              href="https://wa.me/40758988775"
              target="_blank"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#A7747D] text-white rounded-2xl font-bold shadow-lg hover:shadow-[#A7747D]/50 transition-all"
            >
              <Phone /> Scrie-ne pe WhatsApp
            </a>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-12 bg-[#A7747D] text-white text-center">
          <p className="font-semibold tracking-wide">© {new Date().getFullYear()} Fraises au Chocolat Bacău</p>
        </footer>
      </div>
    </main>
  );
}
