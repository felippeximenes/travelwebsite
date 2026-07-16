import { motion } from "framer-motion";
import { useTapLift } from "../hooks/useTapLift";

const SUPPORT_LINKS = ["Faq", "Termos e Condições", "Políticas de Privacidade", "Nosso Contato"];

export function Footer() {
  const linkTap = useTapLift({ opacity: 1, x: 3 }, { x: 3, scale: 0.97 });

  return (
    <footer className="bg-text-dark">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-6 py-[clamp(4rem,7vw,6.5rem)] text-secondary sm:grid-cols-2 lg:grid-cols-3 lg:gap-14">
        <div>
          <h3 className="mb-4 text-2xl font-bold">
            Caminhos<span className="text-primary">.</span>
          </h3>
          <p className="text-sm leading-[1.7] opacity-75">
            Explore seus lugares adquados e de sonhos ao redor do mundo. Aqui você pode encontrar o seu destino
            certo.
          </p>
        </div>

        <div>
          <h4 className="mb-6 font-semibold">Suporte</h4>
          {SUPPORT_LINKS.map((label) => (
            <motion.p key={label} {...linkTap} className="mb-3.5 cursor-pointer text-sm opacity-75">
              {label}
            </motion.p>
          ))}
        </div>

        <div>
          <h4 className="mb-6 font-semibold">Endereço</h4>
          <p className="mb-3.5 text-sm opacity-75">
            <span className="font-semibold">Endereço:</span> 142, Rua Exemplo de Tal, Loja B, São Paulo, Brasil
          </p>
          <p className="mb-3.5 text-sm opacity-75">
            <span className="font-semibold">Email:</span>info@caminhos.com
          </p>
          <p className="mb-3.5 text-sm opacity-75">
            <span className="font-semibold">Telefone:</span>+123 12345678
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-[1200px] border-t border-white/10 px-2 py-5 text-center text-sm text-secondary opacity-60">
        Copyright © Felippe. All rights reserved.
      </div>
    </footer>
  );
}
