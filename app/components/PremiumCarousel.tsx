import { useEffect, useRef, useState } from "react";

const PremiumCarousel = () => {
  const sliderRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const products = [
    { name: "Ruby Deluxe", color: "from-[#A7747D] to-[#7C5A60]", price: "65 lei", desc: "Ciocolată ruby naturală" },
    { name: "Golden Love", color: "from-[#C89A6A] to-[#A7747D]", price: "75 lei", desc: "Cu fulgi de aur 24K" },
    { name: "Dark Passion", color: "from-[#3B2A2F] to-[#7C5A60]", price: "55 lei", desc: "Ciocolată neagră 70%" },
    { name: "White Dream", color: "from-[#F5F5F5] to-[#EDEDED]", price: "60 lei", desc: "Ciocolată albă premium" },
    { name: "Classic Rouge", color: "from-[#A33B3B] to-[#7C5A60]", price: "50 lei", desc: "Clasic cu ciocolată cu lapte" },
    { name: "Caramel Kiss", color: "from-[#D4A55B] to-[#A7747D]", price: "70 lei", desc: "Cu caramel sărat" },
    { name: "Mint Fresh", color: "from-[#77A774] to-[#A0C1A0]", price: "65 lei", desc: "Ciocolată cu mentă" },
    { name: "Hazelnut Bliss", color: "from-[#D4C49A] to-[#A7747D]", price: "75 lei", desc: "Cu alune de pădure" },
    { name: "Raspberry Dream", color: "from-[#D47C7C] to-[#A7747D]", price: "68 lei", desc: "Cu zmeură proaspătă" },
  ];

  const CARD_WIDTH = 280;
  const GAP = 24;
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

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const scrollToIndex = (i) => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: i * PAGE_SIZE,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-32 px-6 bg-gradient-to-br from-rose-50 via-white to-amber-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-red-500 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#A7747D] to-[#7C5A60] rounded-2xl mx-auto flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#A7747D] to-[#7C5A60] mb-4">
            Colecții Premium
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descoperiți gama noastră exclusivistă de căpșuni în ciocolată artizanală
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={() => scrollToIndex(Math.max(0, index - 1))}
            disabled={index === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center hover:bg-[#A7747D] hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => scrollToIndex(Math.min(products.length - 1, index + 1))}
            disabled={index === products.length - 1}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center hover:bg-[#A7747D] hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110"
            style={{ transform: "translate(50%, -50%)" }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* SLIDER */}
          <div
            ref={sliderRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-4 pb-8 scroll-smooth scrollbar-hide cursor-grab active:cursor-grabbing select-none"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {products.map((product, i) => (
              <div key={i} className="snap-center flex-shrink-0 group" style={{ width: `${CARD_WIDTH}px` }}>
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#A7747D]/30 hover:-translate-y-4">
                  {/* Product Image */}
                  <div
                    className={`relative w-full h-72 bg-gradient-to-br ${product.color} flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-500`}
                  >
                    <svg className="w-32 h-32 text-white/40" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                    </svg>
                    <div className="absolute inset-0">
                      {[...Array(8)].map((_, j) => (
                        <div
                          key={j}
                          className="absolute w-2 h-2 bg-white/30 rounded-full animate-pulse"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${j * 0.2}s`,
                            animationDuration: `${2 + Math.random() * 2}s`,
                          }}
                        />
                      ))}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute top-4 right-4 bg-[#D4A55B] text-[#3B2A2F] px-4 py-2 rounded-full text-xs font-black shadow-lg">
                      PREMIUM
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#A7747D] to-[#7C5A60] mb-2 group-hover:text-[#7C5A60] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">{product.desc}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#A7747D] to-[#7C5A60]">
                        {product.price}
                      </span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, j) => (
                          <svg key={j} className="w-4 h-4 text-[#D4A55B]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <button className="w-full py-3 bg-gradient-to-r from-[#A7747D] to-[#7C5A60] text-white rounded-xl font-bold hover:shadow-lg hover:shadow-[#A7747D]/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                      Adaugă în Coș
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* DOTS */}
          <div className="flex justify-center gap-3 mt-10">
            {products.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={`transition-all duration-300 rounded-full ${
                  index === i ? "w-12 h-3 bg-gradient-to-r from-[#A7747D] to-[#7C5A60]" : "w-3 h-3 bg-gray-300 hover:bg-[#A7747D]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-20 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-4xl mb-3">🍓</div>
              <h4 className="font-bold text-lg text-gray-800 mb-2">Căpșuni Premium</h4>
              <p className="text-sm text-gray-600">Selectate manual zilnic</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-4xl mb-3">🍫</div>
              <h4 className="font-bold text-lg text-gray-800 mb-2">Ciocolată Belgiană</h4>
              <p className="text-sm text-gray-600">Importată direct din Europa</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-4xl mb-3">🎨</div>
              <h4 className="font-bold text-lg text-gray-800 mb-2">Design Artizanal</h4>
              <p className="text-sm text-gray-600">Decorat manual cu pasiune</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default PremiumCarousel;
