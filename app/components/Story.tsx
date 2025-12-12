"use client";
import { motion } from "framer-motion";

export default function Story() {
  const fade = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="py-32 px-6 bg-[#F8EEF0]">
      <div className="max-w-4xl mx-auto space-y-24">
        {/* STORY 1 */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade} className="space-y-6">
          <h2 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#A7747D] to-[#7C5A60]">
            Povestea Căpșunilor Noastre
          </h2>
          <p className="text-lg leading-relaxed text-[#3B2A2F]/80">
            Totul a pornit din dorința de a transforma un desert simplu într-o experiență elegantă. Fiecare căpșună este selectată manual,
            aleasă după prospețime și formă perfectă, apoi scufundată în ciocolată belgiană premium. Procesul este făcut cu atenție, în mici
            loturi, pentru a păstra calitatea și rafinamentul. Ne-am dorit ca fiecare cutie să fie nu doar un cadou, ci un moment de emoție
            – o mică operă de artă comestibilă.
          </p>
        </motion.div>

        {/* STORY 2 */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade} className="space-y-6">
          <h2 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#A7747D] to-[#7C5A60]">
            De Ce Suntem Unici?
          </h2>
          <p className="text-lg leading-relaxed text-[#3B2A2F]/80">
            Folosim exclusiv ingrediente premium, de la ciocolata belgiană autentică până la decoruri comestibile de lux. Fiecare colecție
            este gândită ca o temă vizuală, cu un mix de culori, texturi și aromă. Nu lucrăm industrial – fiecare comandă este handmade,
            personalizată și ambalată cu grijă într-un stil elegant, perfect pentru cadouri, evenimente sau momente speciale. Această
            atenție la detalii este motivul pentru care clienții ne descriu drept combinația perfectă dintre artă și desert.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
