import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./motion/Reveal";
import { useHeroTilt } from "../hooks/useHeroTilt";
import { useTapLift } from "../hooks/useTapLift";
import { EASE_IN_OUT } from "../lib/motion";

export function Hero() {
  const { rotateX, rotateY, onMouseMove, onMouseLeave } = useHeroTilt();
  const reduceMotion = useReducedMotion();
  const ctaTap = useTapLift(undefined, { scale: 0.97 });
  const storyTap = useTapLift({ scale: 1.05 }, undefined);

  return (
    <header
      id="main-content"
      className="relative overflow-clip bg-secondary"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <Reveal className="mx-auto grid max-w-[1200px] min-h-screen grid-cols-1 items-center gap-8 px-6 pt-28 md:grid-cols-2">
        <div className="relative order-first min-h-[380px] md:order-none md:min-h-[420px]">
          <motion.span
            aria-hidden="true"
            className="absolute top-[8%] left-[4%] h-[320px] w-[320px] rounded-full opacity-55 blur-[70px]"
            style={{ background: "radial-gradient(circle, rgb(54 133 251 / 0.55), rgb(54 133 251 / 0) 70%)" }}
            animate={reduceMotion ? undefined : { x: [0, 18, 0], y: [0, -14, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 14, ease: EASE_IN_OUT, repeat: Infinity }}
          />
          <motion.span
            aria-hidden="true"
            className="absolute right-[6%] bottom-[6%] h-[260px] w-[260px] rounded-full opacity-55 blur-[70px]"
            style={{ background: "radial-gradient(circle, rgb(54 133 251 / 0.35), rgb(54 133 251 / 0) 70%)" }}
            animate={reduceMotion ? undefined : { x: [0, -18, 0], y: [0, 14, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 18, ease: EASE_IN_OUT, repeat: Infinity }}
          />

          <motion.img
            src="/images/header-1.jpg"
            alt="header"
            style={{ rotateX, rotateY }}
            className="absolute top-1/2 left-1/2 z-10 max-w-[220px] -translate-x-3/4 -translate-y-1/2 rounded-2xl border-8 border-white shadow-lg sm:max-w-[280px] md:max-w-[350px]"
          />
          <motion.img
            src="/images/header-2.jpg"
            alt="header"
            style={{ rotateX, rotateY }}
            className="absolute top-1/2 left-1/2 z-20 max-w-[150px] -translate-y-1/4 rounded-2xl border-8 border-white shadow-xl sm:max-w-[190px] md:max-w-[250px]"
          />
        </div>

        <div className="relative z-20 flex items-center justify-center">
          <div className="grid max-w-[420px] gap-[1.15rem]">
            <p className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-primary before:h-2 before:w-2 before:rounded-full before:bg-primary before:shadow-[0_0_0_4px_rgb(54_133_251_/_0.18)]">
              Agende Agora
            </p>
            <h1 className="font-serif text-[clamp(2.3rem,1.75rem+2.3vw,3.35rem)] leading-[1.15] font-bold text-text-dark">
              Sempre Sorrindo 😊 <br /> agência de viagens
            </h1>
            <p className="font-body text-base leading-[1.7] text-text-dark opacity-65">
              Torne sua viagem mais agradável conosco. Nós somos a melhor agência de viagem e fornecemos sempre os
              melhores serviços para nossos clientes.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-7">
              <motion.button
                type="button"
                {...ctaTap}
                className="rounded-full bg-primary px-[clamp(1.4rem,1rem+1.5vw,2.1rem)] py-[clamp(0.75rem,0.6rem+0.5vw,0.95rem)] text-[clamp(0.9rem,0.85rem+0.2vw,1rem)] font-semibold text-white shadow-glow transition-colors duration-200 hover:bg-primary-dark"
              >
                Planeje sua viajem
              </motion.button>
              <motion.div {...storyTap} className="flex cursor-pointer items-center gap-4">
                <div className="relative">
                  <img src="/images/story.jpg" alt="story" className="h-[58px] w-[58px] rounded-full shadow-md" />
                  <span className="absolute top-1/2 left-full grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-content-center rounded-full bg-white text-primary shadow-md">
                    <i className="ri-play-fill" />
                  </span>
                </div>
                <span className="text-[0.95rem] font-semibold text-text-dark">Veja os storys</span>
              </motion.div>
            </div>
          </div>
        </div>
      </Reveal>
    </header>
  );
}
