import { motion } from "framer-motion";
import { type FormEvent, useState } from "react";
import { Reveal } from "./motion/Reveal";
import { useTapLift } from "../hooks/useTapLift";
import { pushDataLayerEvent } from "../lib/gtm";

export function Subscribe() {
  const [email, setEmail] = useState("");
  const submitTap = useTapLift(undefined, { scale: 0.97 });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    pushDataLayerEvent({
      event: "lead_submit",
      form_name: "subscribeForm",
    });

    setEmail("");
    alert("Cadastro enviado!");
  };

  return (
    <section className="bg-secondary">
      <div className="mx-auto max-w-[1200px] px-6 py-[clamp(4rem,7vw,6.5rem)]">
        <Reveal className="grid grid-cols-1 items-center gap-8 rounded-2xl bg-white p-7 shadow-md sm:grid-cols-2 sm:p-12">
          <div>
            <h2 className="font-heading mb-4 text-[clamp(1.75rem,1.3rem+1.8vw,2.5rem)] font-bold tracking-tight text-text-dark">
              Se inscreva para ter ofertas especiais
            </h2>
            <p className="font-body max-w-[600px] text-base leading-[1.7] text-text-dark opacity-65">
              Explore seus lugares adquados e de sonhos ao redor do mundo. Aqui você pode encontrar o seu destino
              certo.
            </p>
          </div>

          <div className="flex items-center justify-center">
            <form
              onSubmit={handleSubmit}
              className="flex w-full max-w-[400px] items-center rounded-full border border-text-dark/[0.08] bg-secondary p-1.5 transition-[border-color,box-shadow] duration-200 ease-out focus-within:border-primary/45 focus-within:shadow-glow"
            >
              <label htmlFor="subscribe_email" className="sr_only">
                Seu email
              </label>
              <input
                id="subscribe_email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu email aqui"
                className="w-full bg-transparent px-4.5 py-3.5 text-base text-text-dark placeholder:text-text-light focus:outline-none"
              />
              <motion.button
                type="submit"
                {...submitTap}
                className="rounded-full bg-primary px-[clamp(1.4rem,1rem+1.5vw,2.1rem)] py-[clamp(0.75rem,0.6rem+0.5vw,0.95rem)] text-[clamp(0.9rem,0.85rem+0.2vw,1rem)] font-semibold whitespace-nowrap text-white shadow-glow transition-colors duration-200 hover:bg-primary-dark"
              >
                Enviar
              </motion.button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
