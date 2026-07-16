import { motion, type Variants } from "framer-motion";
import { Reveal } from "./motion/Reveal";
import { useTapLift } from "../hooks/useTapLift";
import { EASE_OUT } from "../lib/motion";

const TRIPS = [
  { title: "Wasserwerk Frelberg, Alemanha", rating: "4.2", price: "R$300", image: "/images/trip-1.jpg" },
  { title: "Patagoni, Argentina e Chile", rating: "4.5", price: "R$450", image: "/images/trip-2.jpg" },
  { title: "Dolomites, Itália", rating: "4.7", price: "R$400", image: "/images/trip-3.jpg" },
];

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, transition: { duration: 0.25, ease: EASE_OUT } },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT } },
};

export function TripPackages() {
  const cardTap = useTapLift({ y: -6 }, { scale: 0.985 });
  const bookTap = useTapLift(undefined, { scale: 0.96 });
  const ctaTap = useTapLift(undefined, { scale: 0.97 });

  return (
    <section className="bg-secondary">
      <div className="mx-auto max-w-[1200px] px-6 py-[clamp(4rem,7vw,6.5rem)] text-center">
        <Reveal className="mx-auto">
          <h2 className="font-heading mb-4 text-[clamp(1.75rem,1.3rem+1.8vw,2.5rem)] font-bold tracking-tight text-text-dark">
            Melhores Pacotes
          </h2>
          <p className="font-body mx-auto max-w-[600px] text-base leading-[1.7] text-text-dark opacity-65">
            Explore seus lugares adquados e de sonhos ao redor do mundo. Aqui você pode encontrar o seu destino
            certo.
          </p>
        </Reveal>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="my-14 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
        >
          {TRIPS.map((t) => (
            <motion.div
              key={t.title}
              variants={cardVariants}
              {...cardTap}
              className="group overflow-hidden rounded-2xl bg-white text-left shadow-sm transition-shadow duration-300 hover:shadow-lg"
            >
              <img
                src={t.image}
                alt="trip"
                className="aspect-4/3 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
              />
              <div className="grid cursor-pointer gap-2.5 p-5">
                <p className="font-semibold text-text-dark">{t.title}</p>
                <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[rgb(218_165_32_/_0.12)] px-2.5 py-1.5 text-sm font-semibold text-[#a3720a]">
                  <i className="ri-star-fill text-[goldenrod]" />
                  {t.rating}
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <div className="text-[1.15rem] font-bold text-text-dark">
                    <span className="text-sm font-normal text-text-light">De</span> {t.price}
                  </div>
                  <motion.button
                    type="button"
                    {...bookTap}
                    className="rounded-full border border-primary/35 px-5.5 py-2.5 text-sm font-semibold text-primary transition-colors duration-200 hover:bg-primary hover:text-white hover:shadow-glow"
                  >
                    Agende Agora
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          type="button"
          {...ctaTap}
          className="rounded-full bg-primary px-[clamp(1.4rem,1rem+1.5vw,2.1rem)] py-[clamp(0.75rem,0.6rem+0.5vw,0.95rem)] text-[clamp(0.9rem,0.85rem+0.2vw,1rem)] font-semibold text-white shadow-glow transition-colors duration-200 hover:bg-primary-dark"
        >
          Veja mais!
        </motion.button>
      </div>
    </section>
  );
}
