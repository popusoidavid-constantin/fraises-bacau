"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Minus, Phone, Plus, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CategoryCarousel from "../components/CategoryCarousel";
import Footer from "../components/Footer";
import { menu } from "../data/data";

export default function MenuPage() {
  const [selected, setSelected] = useState<{ [key: string]: number }>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  // Detect scroll pentru header compact
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const addProduct = (title: string) => {
    setSelected((prev) => ({ ...prev, [title]: (prev[title] || 0) + 1 }));
  };

  const removeProduct = (title: string) => {
    setSelected((prev) => {
      const copy = { ...prev };
      if (!copy[title]) return copy;
      copy[title]--;
      if (copy[title] <= 0) delete copy[title];
      return copy;
    });
  };

  const totalItemsCount = Object.values(selected).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(selected).reduce(
    (sum, [title, qty]) => sum + (menu.find((p) => p.title === title)?.price || 0) * qty,
    0
  );

  const orderOnWhatsApp = () => {
    const itemsText = Object.entries(selected)
      .map(([title, qty]) => {
        const price = menu.find((p) => p.title === title)?.price || 0;
        return `${qty} x ${title} - ${price * qty} RON`;
      })
      .join("%0A");
    const url = `https://wa.me/40758988775?text=Buna ziua!%20Aș dori să comand de pe site:%0A${itemsText}%0A%0ATotal: ${totalPrice} RON`;
    window.open(url, "_blank");
  };

  const categories = Array.from(new Set(menu.map((p) => p.category)));

  return (
    <main className="min-h-screen bg-[#FFFDFD] text-[#1A1A1A]">
      {/* 1. HEADER DINAMIC */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white/80 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <button onClick={() => router.replace("/")} className="flex items-center gap-2 group text-sm font-bold uppercase tracking-widest">
            <div className="w-10 h-10 rounded-full bg-[#F9C9C9]/20 flex items-center justify-center group-hover:bg-[#F9C9C9] transition-colors">
              <ArrowLeft size={18} />
            </div>
            <span className="hidden md:block">Înapoi</span>
          </button>

          <div className="text-center">
            <h1 className="font-serif italic text-2xl md:text-3xl">Meniul Nostru</h1>
            <div className="h-0.5 w-12 bg-[#F9C9C9] mx-auto mt-1" />
          </div>

          <div className="relative">
            <button onClick={() => setIsCartOpen(true)} className="relative p-2 hover:scale-110 transition-transform">
              <ShoppingCart size={24} />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#1A1A1A] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 2. CATEGORY SELECTOR */}
      <div className="pt-32 pb-10">
        <CategoryCarousel
          categories={categories}
          scrollToCategory={(cat) => {
            document.getElementById(cat)?.scrollIntoView({ behavior: "smooth", block: "center" });
          }}
        />
      </div>

      {/* 3. PRODUCT GRID */}
      <div className="max-w-7xl mx-auto px-6 pb-32">
        {categories.map((cat) => (
          <section key={cat} id={cat} className="mb-20 scroll-mt-32">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-2xl font-bold uppercase tracking-[0.3em] text-[#A7747D]">{cat}</h2>
              <div className="h-[1px] flex-1 bg-pink-100" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {menu
                .filter((p) => p.category === cat)
                .map((product) => (
                  <motion.div
                    key={product.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-6 bg-gray-50">
                      <Image
                        src={product.imageUrl}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Overlay la hover */}
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold tracking-tight">{product.title}</h3>
                        <span className="font-serif italic text-lg text-[#A7747D]">{product.price} RON</span>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed font-light line-clamp-2">{product.description}</p>

                      <div className="pt-4 flex items-center justify-between">
                        {/* Quantity Selector Modern */}
                        <div className="flex items-center bg-[#F9C9C9]/10 rounded-full p-1 border border-[#F9C9C9]/20">
                          <button
                            onClick={() => removeProduct(product.title)}
                            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-10 text-center font-bold text-sm">{selected[product.title] || 0}</span>
                          <button
                            onClick={() => addProduct(product.title)}
                            className="w-8 h-8 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center hover:bg-[#A7747D] transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        {!selected[product.title] && (
                          <button
                            onClick={() => addProduct(product.title)}
                            className="text-[10px] font-bold uppercase tracking-widest text-[#A7747D] border-b border-[#F9C9C9] pb-1"
                          >
                            Adaugă în coș
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </section>
        ))}
      </div>

      {/* 4. MODAL COȘ (SIDEBAR) */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-10">
                <h3 className="font-serif italic text-3xl">Coșul tău</h3>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:rotate-90 transition-transform">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
                {Object.entries(selected).length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-gray-400 italic">Coșul este gol...</p>
                  </div>
                ) : (
                  Object.entries(selected).map(([title, qty]) => {
                    const product = menu.find((p) => p.title === title);
                    return (
                      <div key={title} className="flex gap-4 items-center">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden relative flex-shrink-0">
                          <Image src={product?.imageUrl || ""} alt={title} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-sm uppercase tracking-tight">{title}</h4>
                          <p className="text-[#A7747D] font-serif italic">{product?.price} RON</p>
                        </div>
                        <div className="flex items-center gap-3 bg-gray-50 rounded-full px-3 py-1">
                          <button onClick={() => removeProduct(title)}>
                            <Minus size={12} />
                          </button>
                          <span className="font-bold text-sm w-4 text-center">{qty}</span>
                          <button onClick={() => addProduct(title)}>
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="mt-8 pt-8 border-t border-pink-50">
                <div className="flex justify-between items-end mb-6">
                  <span className="text-gray-400 uppercase text-[10px] font-bold tracking-widest">Total de plată</span>
                  <span className="text-3xl font-serif italic">{totalPrice} RON</span>
                </div>
                <button
                  disabled={totalPrice === 0}
                  onClick={orderOnWhatsApp}
                  className="w-full bg-[#1A1A1A] text-white py-6 rounded-full font-bold uppercase text-[11px] tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#A7747D] transition-colors disabled:opacity-50 disabled:bg-gray-200 shadow-xl shadow-pink-100"
                >
                  <Phone size={16} /> Finalizează pe WhatsApp
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
