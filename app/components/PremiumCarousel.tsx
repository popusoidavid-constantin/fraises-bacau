"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { menu } from "../data/data";

const PremiumCarousel = () => {
  // Am inclus categoriile tale
  const productsPremium = menu.filter((p) => ["Cutii Cadou", "Cupe Dubai Style", "Cupe Individuale"].includes(p.category));
  const navi = useRouter();

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);

  const CARD_WIDTH = 320; // Puțin mai lat pentru eleganță
  const GAP = 32;
  const PAGE_SIZE = CARD_WIDTH + GAP;

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const onScroll = () => {
      const newIndex = Math.round(slider.scrollLeft / PAGE_SIZE);
      setIndex(newIndex);
    };

    slider.addEventListener("scroll", onScroll);
    return () => slider.removeEventListener("scroll", onScroll);
  }, [PAGE_SIZE]);

  const scrollToIndex = (i: number) => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({ left: i * PAGE_SIZE, behavior: "smooth" });
    }
  };

  return (
    <section className="py-10 bg-transparent relative">
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Slider Container */}
        <div
          ref={sliderRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-12 scroll-smooth cursor-grab active:cursor-grabbing select-none no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {productsPremium.map((product, i) => (
            <motion.div
              key={i}
              className="snap-center flex-shrink-0"
              style={{ width: `${CARD_WIDTH}px` }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-white rounded-[2.5rem] overflow-hidden border border-pink-50 flex flex-col h-[520px] shadow-sm hover:shadow-2xl hover:shadow-emerald-100/50 transition-all duration-500">
                {/* Imaginea - Înălțime fixă */}
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#3E816B]">
                    Premium
                  </div>
                </div>

                {/* Conținut - Flex container pentru aliniere */}
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-serif italic text-[#3E816B] mb-3">{product.title}</h3>

                  {/* Descrierea cu flex-grow forțează butonul jos */}
                  <p className="text-gray-400 text-sm font-light leading-relaxed mb-6 flex-grow overflow-hidden line-clamp-3">
                    {product.description}
                  </p>

                  <div className="space-y-4">
                    <div className="h-[1px] w-full bg-pink-50" />

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold uppercase tracking-tighter text-gray-300">Preț de la</span>
                      <span className="text-xl font-bold text-[#3E816B]">{product.price} RON</span>
                    </div>

                    {/* BUTONUL - Acum stă mereu la bază */}
                    <button
                      onClick={() => navi.push("/menu")}
                      className="w-full py-4 bg-[#3E816B] text-white rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 group/btn hover:bg-[#2d5f4e] transition-all shadow-lg shadow-emerald-50"
                    >
                      Vezi în meniu
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dots - Stil Minimalist */}
        <div className="flex justify-center gap-4">
          {productsPremium.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`transition-all duration-500 rounded-full h-1.5 ${
                index === i ? "w-10 bg-[#3E816B]" : "w-2 bg-[#F9C9C9] hover:bg-[#A7747D]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumCarousel;
