"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Clock, Gift, Heart, PartyPopper, Send, ShieldCheck, Sparkles, Star, Utensils } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import Footer from "./components/Footer";
import PremiumCarousel from "./components/PremiumCarousel";
import Story from "./components/Story";

export default function FraisesLanding() {
  const navi = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const cloudsRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2200);

    const canvas = cloudsRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const clouds = Array.from({ length: 10 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: 0.05 + Math.random() * 0.1,
      size: 150 + Math.random() * 200,
      opacity: 0.05 + Math.random() * 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      clouds.forEach((c) => {
        c.x += c.speed;
        if (c.x - c.size > canvas.width) c.x = -c.size;
        const grad = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.size);
        grad.addColorStop(0, `rgba(249, 201, 201, ${c.opacity})`);
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.size, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(draw);
    };
    draw();
  }, []);

  return (
    <main className="relative min-h-screen bg-[#FFFDFD] text-[#3E816B] selection:bg-[#F9C9C9] overflow-x-hidden">
      {/* INTRO ANIMATION - REACTIVAT */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-center"
            >
              <h2 className="text-sm tracking-[0.5em] font-light uppercase mb-4 text-[#3E816B]">L&apos;art du Chocolat</h2>
              <div className="w-48 h-[1px] bg-gray-100 relative overflow-hidden mx-auto">
                <motion.div
                  className="absolute inset-0 bg-[#3E816B]"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <canvas ref={cloudsRef} className="fixed inset-0 z-0 pointer-events-none" />

      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-pink-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-3 cursor-pointer" onClick={() => navi.push("/")}>
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#3E816B]/10 flex items-center justify-center font-serif italic text-lg md:text-xl text-[#3E816B]">
              F
            </div>
            <span className="font-bold tracking-[0.1em] md:tracking-[0.2em] text-[10px] md:text-sm uppercase text-[#3E816B]">
              Fraises au Chocolat
            </span>
          </div>
          <div className="flex gap-4 md:gap-8 items-center">
            <button
              onClick={() => navi.push("/menu")}
              className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#3E816B]"
            >
              Menu
            </button>
            <button className="px-4 py-2 md:px-6 md:py-2.5 bg-[#3E816B] text-white rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-emerald-100">
              Comandă
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 md:pt-48 pb-16 md:pb-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.3 }}>
            <div className="flex justify-center items-center gap-2 mb-6 md:mb-8">
              <div className="h-[1px] w-4 md:w-8 bg-[#A7747D]" />
              <span className="text-[8px] md:text-[10px] font-bold tracking-[0.2em] md:tracking-[0.4em] uppercase text-[#A7747D]">
                Bacău Premiere Dessert Atelier
              </span>
              <div className="h-[1px] w-4 md:w-8 bg-[#A7747D]" />
            </div>
            <h1 className="text-5xl md:text-9xl font-serif italic mb-6 md:mb-10 tracking-tight leading-[1] md:leading-[0.9] text-[#3E816B]">
              Dulce <br /> <span className="font-sans not-italic font-black text-[#3E816B]">Perfecțiune.</span>
            </h1>
            <p className="text-gray-500 max-w-lg mx-auto mb-8 md:mb-12 text-base md:text-lg font-light leading-relaxed">
              O fuziune între prospețimea căpșunilor de sezon și rafinamentul ciocolății belgiene artizanale.
            </p>
            <motion.button
              onClick={() => navi.push("/menu")}
              className="bg-[#3E816B] text-white px-8 py-4 md:px-12 md:py-6 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest inline-flex items-center gap-4 shadow-xl shadow-emerald-50"
            >
              Explorează Colecția <ArrowRight size={14} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* KEY FEATURES */}
      <section className="py-16 md:py-20 bg-white/50 border-y border-pink-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-[#3E816B]">
          {[
            { icon: <Sparkles size={18} />, title: "Calitate", desc: "Premium" },
            { icon: <Clock size={18} />, title: "Proaspăt", desc: "La comandă" },
            { icon: <Heart size={18} />, title: "Artizanat", desc: "Handmade" },
            { icon: <ShieldCheck size={18} />, title: "Livrare", desc: "În Bacău" },
          ].map((item, i) => (
            <div key={i} className="text-center group">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:bg-[#F9C9C9]/20 transition-all duration-300">
                {item.icon}
              </div>
              <h4 className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-1">{item.title}</h4>
              <p className="text-[10px] text-gray-400 font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CAROUSEL SECTION */}
      <div className="py-20 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-16 gap-4 text-center md:text-left">
            <div className="max-w-md">
              <h2 className="text-4xl md:text-5xl font-serif italic mb-4 text-[#3E816B]">Irezistibile.</h2>
              <p className="text-gray-400 text-sm tracking-wide">Fiecare piesă este decorată manual pentru un cadou memorabil.</p>
            </div>
            <button
              onClick={() => navi.push("/menu")}
              className="text-[10px] font-bold uppercase tracking-[0.2em] border-b border-[#3E816B] pb-2 text-[#3E816B] hover:text-[#A7747D] hover:border-[#A7747D] transition-all"
            >
              Vezi tot meniul
            </button>
          </div>
          <PremiumCarousel />
        </div>
      </div>

      {/* PROCESS SECTION */}
      <section className="py-20 md:py-32 bg-[#3E816B] text-white relative">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] bg-[#2d5f4e] rounded-3xl overflow-hidden relative">
              <Image src="/fraises.jpeg" fill className="object-cover opacity-80" alt="Crafting" />
            </div>
            <div className="absolute -bottom-5 -right-5 md:-bottom-10 md:-right-10 bg-[#F9C9C9] text-[#3E816B] p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-2xl">
              <span className="text-3xl md:text-6xl font-black italic">100%</span>
              <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] mt-1 md:mt-2 text-[#3E816B]">Natural</p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl md:text-6xl font-serif italic mb-8 md:mb-10 leading-[1.2]">De la fermă la tine.</h2>
            <div className="space-y-6 md:space-y-10">
              {[
                { n: "01", t: "Selecția", d: "Căpșuni verificate individual." },
                { n: "02", t: "Temperarea", d: "Ciocolată belgiană lucrată cu precizie." },
                { n: "03", t: "Decorarea", d: "Detalii pictate manual." },
              ].map((step, i) => (
                <div key={i} className="flex gap-4 md:gap-8 border-b border-white/10 pb-6 md:pb-8">
                  <span className="text-xl md:text-3xl font-serif italic text-[#F9C9C9]">{step.n}</span>
                  <div>
                    <h4 className="font-bold uppercase tracking-[0.2em] text-xs md:text-sm mb-1">{step.t}</h4>
                    <p className="text-emerald-50/70 text-xs md:text-sm font-light">{step.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Story />

      {/* 6. HOW IT WORKS */}
      <section className="py-20 md:py-32 px-6 bg-[#FDF8F9]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#A7747D] mb-4 block">Simplitate</span>
            <h2 className="text-4xl md:text-6xl font-serif italic text-[#3E816B]">Cum funcționează?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 relative">
            {[
              { icon: <Utensils size={24} />, step: "01", title: "Alegi produsul", text: "Explorezi meniul și selectezi cutia perfectă." },
              { icon: <Gift size={24} />, step: "02", title: "Personalizăm", text: "Adăugăm detalii speciale și decor artizanal." },
              { icon: <Send size={24} />, step: "03", title: "Livrăm emoție", text: "Ridicare locală sau livrare sigură în Bacău." },
            ].map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="relative z-10 p-8 md:p-10 bg-white rounded-[2.5rem] shadow-xl shadow-pink-50/50 text-center border border-pink-50"
              >
                <div className="w-16 h-16 rounded-full bg-[#3E816B] text-white flex items-center justify-center mx-auto mb-8 shadow-lg">
                  {s.icon}
                </div>
                <h3 className="font-bold text-lg uppercase tracking-widest mb-4 text-[#3E816B]">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-light">{s.text}</p>
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#A7747D] text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter">
                  Pasul {s.step}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. OCCASIONS */}
      <section className="py-20 md:py-32 px-6 bg-white relative">
        <div className="max-w-6xl mx-auto text-center relative z-10 text-[#3E816B]">
          <PartyPopper className="mx-auto mb-6 text-[#A7747D]" size={40} />
          <h2 className="text-4xl md:text-6xl font-serif italic mb-6">Pentru momente speciale</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-16 md:mb-20 text-base md:text-lg font-light">
            Fraises este alegerea ideală atunci când vrei să transmiți mai mult decât un simplu mesaj.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {["Aniversări", "Logodne", "Corporate", "Romantism"].map((o, i) => (
              <motion.div
                key={i}
                whileHover={{ backgroundColor: "#3E816B", color: "#FFFFFF" }}
                className="p-8 md:p-12 border border-pink-50 rounded-[2rem] transition-all duration-300 cursor-default group"
              >
                <h3 className="font-bold text-[10px] md:text-xs uppercase tracking-widest">{o}</h3>
                <div className="w-1 h-1 bg-[#F9C9C9] mx-auto mt-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS */}
      <section className="py-20 md:py-32 px-6 bg-[#FFFDFD]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {[
            { n: "Elena M.", text: "Cea mai bună experiență culinară din Bacău. Prezentarea este de 5 stele." },
            { n: "Andrei G.", text: "Cadoul perfect. Iubita mea a fost impresionată de designul personalizat." },
            { n: "Mara I.", text: "Gust autentic de ciocolată belgiană. Recomand cu toată încrederea!" },
          ].map((r, i) => (
            <div key={i} className="text-center group text-[#3E816B]">
              <div className="flex justify-center gap-1 mb-6 md:mb-8">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} className="fill-[#F9C9C9] text-[#F9C9C9]" />
                ))}
              </div>
              <p className="text-lg md:text-xl italic text-gray-600 mb-8 font-light leading-relaxed">&ldquo;{r.text}&ldquo;</p>
              <div className="h-[1px] w-12 bg-pink-100 mx-auto mb-4" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#A7747D]">{r.n}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 10. CTA SECTION */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <motion.div
          whileHover={{ scale: 0.99 }}
          className="max-w-6xl mx-auto bg-[#3E816B] rounded-[3rem] md:rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden shadow-3xl shadow-emerald-100"
        >
          {/* Decor subtil fundal */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#F9C9C9] rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10 text-white">
            <h2 className="text-4xl md:text-7xl font-serif italic mb-8">Ready to taste?</h2>
            <p className="mb-12 text-emerald-50/70 max-w-md mx-auto font-light text-sm md:text-base">
              Comandă astăzi și transformă o zi obișnuită într-o amintire de neuitat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
              <button className="bg-[#F9C9C9] text-[#3E816B] px-10 py-5 md:px-12 md:py-6 rounded-full font-bold uppercase text-[10px] tracking-widest hover:bg-white transition-all shadow-lg">
                Sună la +40 7xx xxx xxx
              </button>
              <button className="bg-transparent text-white px-10 py-5 md:px-12 md:py-6 rounded-full font-bold uppercase text-[10px] tracking-widest border border-white/20 hover:bg-white/10 transition-all">
                Instagram DM
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
