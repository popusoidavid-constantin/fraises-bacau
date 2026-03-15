"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Product {
  category: string;
  title: string;
  description: string;
  imageUrl: string;
}

export default function Gallery({ data }: { data: Product[] }) {
  const navi = useRouter();
  const photos = data.slice(0, 20);

  return (
    <section className="py-32 px-6 bg-white">
      <div className="columns-2 md:columns-3 gap-4 space-y-4 max-w-6xl mx-auto">
        {photos.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden rounded-2xl shadow-lg group hover:scale-[1.03] transition-all"
          >
            {/* Image */}
            <Image
              src={p.imageUrl}
              alt={p.title ?? `galerie-${i}`}
              width={600}
              height={600}
              className="w-full h-auto object-cover transition-all duration-500 group-hover:blur-[1px]"
            />

            {/* Overlay */}
            <div
              className="
                absolute inset-0
                bg-gradient-to-t from-[#A7747D]/80 via-[#C48A94]/60 to-transparent
                backdrop-blur-sm
                opacity-0 group-hover:opacity-100
                transition-all duration-500
                flex items-end justify-center
                p-6
              "
            >
              <div className="text-white text-xl font-bold tracking-wide drop-shadow-xl text-center">{p.title}</div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="w-full flex flex-row items-center justify-center">
        <motion.button
          onClick={() => {
            navi.push("/menu");
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="mt-10 inline-flex items-center gap-3 px-10 py-5 bg-[#A7747D] text-white rounded-2xl text-xl font-bold shadow-xl hover:shadow-[#A7747D]/50 transition-all"
        >
          Vezi Meniul
        </motion.button>
      </div>
    </section>
  );
}
