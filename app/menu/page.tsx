"use client";

import { ArrowLeft, ArrowUp, Phone, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CategoryCarousel from "../components/CategoryCarousel";
import Footer from "../components/Footer";
import { menu } from "../data/data";

export default function MenuPage() {
  const [selected, setSelected] = useState<{ [key: string]: number }>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const router = useRouter();

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

  const totalItems = Object.entries(selected).reduce(
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
    const url = `https://wa.me/40758988775?text=Buna ziua!%20Aș dori să comand:%0A${itemsText}%0ATotal: ${totalItems} RON`;
    window.open(url, "_blank");
  };

  const categories = Array.from(new Set(menu.map((p) => p.category)));

  const scrollToCategory = (cat: string) => {
    const el = document.getElementById(cat);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <main className="relative min-h-screen bg-gradient-to-b from-[#E8D0D4] via-white to-[#F8EEF0] text-[#3B2A2F] pb-24">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
          <div className="relative mb-8 md:mb-6">
            <button
              onClick={() => router.replace("/")}
              className="fixed md:absolute top-4 left-4 md:top-0 md:left-0 z-50 bg-[#A7747D] text-white w-12 h-12 md:w-auto md:h-auto md:px-4 md:py-2 rounded-full md:rounded-xl font-bold shadow-lg hover:shadow-[#A7747D]/50 transition-all flex items-center justify-center md:gap-2"
            >
              <ArrowLeft />
              <span className="hidden md:inline">Înapoi</span>
            </button>

            <h1 className="text-3xl md:text-5xl text-center font-black bg-gradient-to-r from-[#A7747D] to-[#7C5A60] bg-clip-text text-transparent drop-shadow-lg px-4">
              Meniu Fraises au Chocolat
            </h1>
          </div>

          <CategoryCarousel categories={categories} scrollToCategory={scrollToCategory} />

          {categories.map((cat) => (
            <section key={cat} id={cat} className="mb-12">
              <h2 className="text-3xl font-black text-[#A7747D] mb-6">{cat}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {menu
                  .filter((p) => p.category === cat)
                  .map((product) => (
                    <div
                      key={product.title}
                      className="rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between transform hover:-translate-y-1 hover:shadow-[#A7747D]/30 transition-all bg-gradient-to-br from-[#A7747D] to-[#7C5A60]"
                    >
                      <Image src={product.imageUrl} alt={product.title} className="h-48 w-full object-cover" width={600} height={600} />
                      <div className="p-4 md:p-6 flex flex-col justify-between h-auto text-white">
                        <h3 className="text-xl md:text-2xl font-black mb-1 drop-shadow-lg">{product.title}</h3>
                        <p className="text-sm opacity-90 drop-shadow mb-2">{product.description}</p>
                        <p className="text-lg font-bold mb-3">{product.price} RON</p>
                        <div className="flex gap-3 items-center mt-auto justify-end">
                          <button
                            onClick={() => removeProduct(product.title)}
                            className="bg-white/30 text-white w-8 h-8 rounded-full hover:bg-white/50 transition font-bold text-lg"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-lg font-black bg-white/10 rounded-lg py-1">
                            {selected[product.title] || 0}
                          </span>
                          <button
                            onClick={() => addProduct(product.title)}
                            className="bg-white text-[#A7747D] w-8 h-8 font-bold rounded-full hover:shadow-xl transition text-lg"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          ))}
        </div>

        <button
          onClick={scrollToTop}
          className="fixed bottom-4 left-4 z-40 bg-[#A7747D] text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center font-black text-lg transition-all hover:scale-110"
        >
          <ArrowUp className="w-6 h-6" />
        </button>

        {!Object.keys(selected).length ? null : (
          <>
            <button
              onClick={() => setIsCartOpen(true)}
              className="md:hidden fixed bottom-4 right-4 z-40 bg-[#A7747D] text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center font-black text-lg transition-all transform hover:scale-110"
            >
              <ShoppingCart className="w-6 h-6" />
              {Object.values(selected).reduce((a, b) => a + b, 0) > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {Object.values(selected).reduce((a, b) => a + b, 0)}
                </span>
              )}
            </button>

            <div className="hidden lg:block fixed top-24 right-4 w-80 bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 flex flex-col gap-4 border border-white/20 z-30">
              <h3 className="text-2xl font-bold text-[#A7747D] mb-4">Coșul tău</h3>
              <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto pr-2">
                {Object.entries(selected).map(([title, qty]) => (
                  <div key={title} className="flex justify-between items-center text-[#3B2A2F] border-b pb-2 last:border-b-0">
                    <span className="text-sm font-semibold">{title}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => removeProduct(title)}
                        className="bg-[#3B2A2F]/10 px-2 rounded-full hover:bg-[#3B2A2F]/20 transition text-sm"
                      >
                        -
                      </button>
                      <span className="text-base font-black w-6 text-center">{qty}</span>
                      <button
                        onClick={() => addProduct(title)}
                        className="bg-[#A7747D] text-white font-bold px-2 rounded-full hover:opacity-90 transition text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={orderOnWhatsApp}
                className="mt-4 w-full bg-[#A7747D] text-white px-4 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-[#A7747D]/50 transition-all"
              >
                <Phone className="w-5 h-5" /> Comandă pe WhatsApp ({totalItems} RON)
              </button>
            </div>

            <div
              className={`fixed inset-0 z-50 transition-transform duration-300 transform lg:hidden ${
                isCartOpen ? "translate-y-0" : "translate-y-full"
              }`}
            >
              <div className="absolute inset-0 bg-black/50" onClick={() => setIsCartOpen(false)} />
              <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl p-6 flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
                <h3 className="text-3xl font-bold text-[#A7747D] mb-4 border-b pb-2 flex justify-between items-center">
                  Coșul tău
                  <button onClick={() => setIsCartOpen(false)} className="text-[#3B2A2F] text-2xl font-light">
                    &times;
                  </button>
                </h3>
                <div className="flex flex-col gap-4">
                  {Object.entries(selected).map(([title, qty]) => (
                    <div key={title} className="flex justify-between items-center text-[#3B2A2F] border-b pb-3">
                      <span className="text-base font-semibold">{title}</span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => removeProduct(title)}
                          className="bg-[#3B2A2F]/10 w-8 h-8 rounded-full hover:bg-[#3B2A2F]/20 transition text-base font-bold"
                        >
                          -
                        </button>
                        <span className="text-xl font-black w-6 text-center">{qty}</span>
                        <button
                          onClick={() => addProduct(title)}
                          className="bg-[#A7747D] text-white w-8 h-8 font-bold rounded-full hover:opacity-90 transition text-base"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={orderOnWhatsApp}
                  className="mt-6 w-full bg-[#A7747D] text-white px-4 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-[#A7747D]/50 transition-all text-lg"
                >
                  <Phone className="w-6 h-6" /> Finalizează comanda ({totalItems} RON)
                </button>
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
