"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface CategoryCarouselProps {
  categories: string[];
  scrollToCategory: (category: string) => void;
}

export default function CategoryCarousel({ categories, scrollToCategory }: CategoryCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="relative mb-8 group">
      {/* Gradient fade la stânga */}
      {showLeftArrow && (
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#E8D0D4] via-[#E8D0D4]/80 to-transparent z-10 pointer-events-none" />
      )}

      {/* Gradient fade la dreapta */}
      {showRightArrow && (
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#E8D0D4] via-[#E8D0D4]/80 to-transparent z-10 pointer-events-none" />
      )}

      {/* Săgeată stânga */}
      {showLeftArrow && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-[#A7747D] text-white w-11 h-11 rounded-full shadow-xl hover:scale-110 hover:bg-[#8F626B] transition-all flex items-center justify-center"
          aria-label="Scroll stânga"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Săgeată dreapta */}
      {showRightArrow && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-[#A7747D] text-white w-11 h-11 rounded-full shadow-xl hover:scale-110 hover:bg-[#8F626B] transition-all flex items-center justify-center"
          aria-label="Scroll dreapta"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Scroll container */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex overflow-x-auto gap-3 py-4 px-4 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => scrollToCategory(cat)}
            className="flex-shrink-0 px-6 py-2.5 bg-[#A7747D] text-white rounded-full font-bold hover:scale-105 hover:bg-[#8F626B] transition-all shadow-md hover:shadow-xl snap-start whitespace-nowrap"
          >
            {cat}
          </button>
        ))}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
