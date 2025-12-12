"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { menu } from "../data/data";

const PremiumCarousel = () => {
  const productsPremium = menu.filter((p) => ["Cutii Cadou", "Cupe Dubai Style", "Cupe Individuale"].includes(p.category));
  const navi = useRouter();

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const CARD_WIDTH = 280;
  const GAP = 24;
  const PAGE_SIZE = CARD_WIDTH + GAP;

  // Update index on scroll
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

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const pageX = "touches" in e ? e.touches[0].pageX : e.pageX;
    setStartX(pageX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const pageX = "touches" in e ? e.touches[0].pageX : e.pageX;
    const walk = (pageX - startX) * 2;
    if (sliderRef.current) sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => setIsDragging(false);

  const scrollToIndex = (i: number) => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({ left: i * PAGE_SIZE, behavior: "smooth" });
    }
  };

  return (
    <section className="py-32 px-6 bg-gradient-to-br from-rose-50 via-white to-amber-50 relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-[#A7747D] to-[#7C5A60] mb-16">
          Colecții Premium
        </h2>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-4 pb-8 scroll-smooth cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {productsPremium.map((product, i) => (
            <div key={i} className="snap-center flex-shrink-0 group" style={{ width: `${CARD_WIDTH}px` }}>
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-4">
                {/* Product Image */}
                <Image src={product.imageUrl} alt={product.title} className="w-full h-48 object-cover" width={600} height={600} />
                <div className="p-6 flex flex-col justify-between h-56">
                  <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#A7747D] to-[#7C5A60] mb-2">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                  <button
                    onClick={() => {
                      navi.push("/menu");
                    }}
                    className="mt-auto w-full py-3 bg-gradient-to-r from-[#A7747D] to-[#7C5A60] text-white rounded-xl font-bold hover:shadow-lg hover:shadow-[#A7747D]/50 transition-all duration-300 text-center"
                  >
                    Vezi Meniul
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-10">
          {Array.from({ length: 5 }).map((_, i) => (
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
    </section>
  );
};

export default PremiumCarousel;
