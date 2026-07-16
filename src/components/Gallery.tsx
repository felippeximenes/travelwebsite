import { motion } from "framer-motion";
import { Reveal } from "./motion/Reveal";
import { useTapLift } from "../hooks/useTapLift";

export function Gallery() {
  const ctaTap = useTapLift(undefined, { scale: 0.97 });
  const imgHover = useTapLift({ scale: 1.03 }, undefined);

  return (
    <section>
      <Reveal className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 px-6 py-[clamp(4rem,7vw,6.5rem)] sm:grid-cols-2">
        <div className="order-first grid grid-cols-2 gap-4 sm:order-none">
          <div className="grid place-content-center gap-4">
            <motion.img
              {...imgHover}
              src="/images/gallery-1.jpg"
              alt="gallary"
              className="aspect-3/4 w-full rounded-2xl object-cover shadow-md"
            />
          </div>
          <div className="grid place-content-center gap-4">
            <motion.img
              {...imgHover}
              src="/images/gallery-2.jpg"
              alt="gallary"
              className="aspect-3/4 w-full rounded-2xl object-cover shadow-md"
            />
            <motion.img
              {...imgHover}
              src="/images/gallery-3.jpg"
              alt="gallary"
              className="aspect-3/4 w-full rounded-2xl object-cover shadow-md"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="max-w-[400px]">
            <h2 className="mb-4 text-[clamp(1.5rem,1.15rem+1.4vw,2.1rem)] leading-[1.25] font-bold tracking-tight text-text-dark">
              A nossa galeria de viagens, que vai inspirar você.
            </h2>
            <p className="mb-8 text-base leading-[1.7] text-text-dark opacity-65">
              Explore seus lugares adquados e de sonhos ao redor do mundo. Aqui você pode encontrar o seu destino
              certo.
            </p>
            <motion.button
              type="button"
              {...ctaTap}
              className="rounded-full bg-primary px-[clamp(1.4rem,1rem+1.5vw,2.1rem)] py-[clamp(0.75rem,0.6rem+0.5vw,0.95rem)] text-[clamp(0.9rem,0.85rem+0.2vw,1rem)] font-semibold text-white shadow-glow transition-colors duration-200 hover:bg-primary-dark"
            >
              Veja mais!
            </motion.button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
