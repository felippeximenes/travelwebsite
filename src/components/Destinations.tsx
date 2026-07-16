import { motion, type Variants } from "framer-motion";
import { Reveal } from "./motion/Reveal";
import { useTapLift } from "../hooks/useTapLift";
import { EASE_OUT } from "../lib/motion";

const DESTINATIONS = [
  { title: "Banff", subtitle: "Cánada", image: "/images/destination-1.jpg" },
  { title: "Machu Picchu", subtitle: "Peru", image: "/images/destination-2.jpg" },
  { title: "Lauterbrunnen", subtitle: "Suiça", image: "/images/destination-3.jpg" },
  { title: "Zhangjiajie", subtitle: "China", image: "/images/destination-4.jpg" },
];

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, transition: { duration: 0.25, ease: EASE_OUT } },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT } },
};

export function Destinations() {
  const arrowTap = useTapLift(undefined, { scale: 0.92 });
  const cardTap = useTapLift({ y: -4 }, { scale: 0.98 });

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-[clamp(4rem,7vw,6.5rem)]">
      <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-8">
        <div>
          <h2 className="mb-4 text-[clamp(1.75rem,1.3rem+1.8vw,2.5rem)] font-bold tracking-tight text-text-dark">
            Explore os melhores destinos
          </h2>
          <p className="max-w-[600px] text-base leading-[1.7] text-text-dark opacity-65">
            Explore os lugares dos seus maiores sonhos. Aqui você pode encontrar seu destino.
          </p>
        </div>
        <div className="flex gap-3">
          {["ri-arrow-left-s-line", "ri-arrow-right-s-line"].map((icon) => (
            <motion.span
              key={icon}
              {...arrowTap}
              className="grid h-[38px] w-[38px] cursor-pointer place-content-center rounded-full border border-primary/25 bg-white text-[1.4rem] text-primary shadow-xs transition-colors duration-200 hover:bg-primary hover:text-white"
            >
              <i className={icon} />
            </motion.span>
          ))}
        </div>
      </Reveal>

      <motion.div
        variants={gridVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
        className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-7"
      >
        {DESTINATIONS.map((d) => (
          <motion.div
            key={d.title}
            variants={cardVariants}
            {...cardTap}
            className="group relative isolate cursor-pointer overflow-hidden rounded-2xl shadow-sm transition-shadow duration-300 hover:shadow-lg"
          >
            <img
              src={d.image}
              alt="destination"
              className="aspect-3/4 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]"
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-text-dark/78 via-text-dark/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-left text-white">
              <p className="mb-1 text-[1.05rem] font-semibold">{d.title}</p>
              <p className="text-[0.85rem] opacity-85">{d.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
