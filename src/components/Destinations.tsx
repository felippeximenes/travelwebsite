import { useReducedMotion } from "framer-motion";
import { Reveal } from "./motion/Reveal";
import { PerspectiveCarousel, type PerspectiveCarouselItem } from "./ui/perspective-carousel";

const DESTINATIONS: PerspectiveCarouselItem[] = [
  { src: "/images/destination-1.jpg", title: "Banff, Cánada" },
  { src: "/images/destination-2.jpg", title: "Machu Picchu, Peru" },
  { src: "/images/destination-3.jpg", title: "Lauterbrunnen, Suiça" },
  { src: "/images/destination-4.jpg", title: "Zhangjiajie, China" },
];

export function Destinations() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-[clamp(4rem,7vw,6.5rem)]">
      <Reveal className="mb-14">
        <h2 className="font-heading mb-4 text-[clamp(1.75rem,1.3rem+1.8vw,2.5rem)] font-bold tracking-tight text-text-dark">
          Explore os melhores destinos
        </h2>
        <p className="font-body max-w-[600px] text-base leading-[1.7] text-text-dark opacity-65">
          Explore os lugares dos seus maiores sonhos. Aqui você pode encontrar seu destino.
        </p>
      </Reveal>

      <Reveal>
        <PerspectiveCarousel
          items={DESTINATIONS}
          defaultActiveIndex={0}
          loop
          slideWidth={230}
          rotationStep={reduceMotion ? 0 : 55}
          inactiveScale={reduceMotion ? 1 : 0.85}
          transition={reduceMotion ? { duration: 0.2 } : { type: "spring", bounce: 0.14, duration: 0.9 }}
          imageClassName="rounded-2xl shadow-lg"
          labelClassName="font-semibold text-text-dark"
          controlsClassName="border-text-dark/10 bg-white/80 text-text-dark shadow-sm backdrop-blur-sm"
          className="h-[480px] rounded-2xl bg-secondary text-text-dark sm:h-[540px]"
        />
      </Reveal>
    </section>
  );
}
