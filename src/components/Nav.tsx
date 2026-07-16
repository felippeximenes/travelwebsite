import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useScrolled } from "../hooks/useScrolled";
import { useTapLift } from "../hooks/useTapLift";
import { EASE_OUT } from "../lib/motion";
import { SpotlightNavbar, type NavItem } from "./ui/spotlight-navbar";

const LINKS: NavItem[] = [
  { label: "Home", href: "#" },
  { label: "Destinos", href: "#" },
  { label: "Preços", href: "#" },
  { label: "Reviews", href: "#" },
];

export function Nav() {
  const scrolled = useScrolled(12);
  const [open, setOpen] = useState(false);
  const buttonTap = useTapLift(undefined, { scale: 0.97 });

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header
      className={`fixed top-3 left-1/2 z-100 flex w-[calc(100%-1.5rem)] max-w-[1200px] -translate-x-1/2 items-center justify-between gap-4 rounded-full border px-5 py-2.5 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-out ${
        scrolled
          ? "border-text-dark/[0.06] bg-white/75 shadow-md backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="font-heading cursor-pointer text-lg font-bold tracking-tight whitespace-nowrap text-text-dark">
        Caminhos <span className="text-primary">.</span>
      </div>

      <SpotlightNavbar items={LINKS} className="hidden md:flex" />

      <div className="flex items-center gap-3.5">
        <motion.button
          type="button"
          {...buttonTap}
          className="rounded-full bg-primary px-[clamp(1.1rem,1rem+0.6vw,1.6rem)] py-[clamp(0.55rem,0.5rem+0.3vw,0.7rem)] text-[clamp(0.8rem,0.78rem+0.1vw,0.9rem)] font-semibold whitespace-nowrap text-white shadow-glow transition-colors duration-200 hover:bg-primary-dark"
        >
          Entre em contato
        </motion.button>

        <button
          type="button"
          aria-label="Abrir menu de navegação"
          aria-expanded={open}
          aria-controls="mobile-nav-links"
          onClick={() => setOpen((v) => !v)}
          className="flex h-[42px] w-[42px] shrink-0 flex-col items-center justify-center gap-[5px] rounded-md bg-text-dark/5 md:hidden"
        >
          <motion.span
            animate={open ? { y: 7, rotate: 45 } : { y: 0, rotate: 0 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="block h-0.5 w-5 rounded-full bg-text-dark"
          />
          <motion.span
            animate={{ opacity: open ? 0 : 1 }}
            transition={{ duration: 0.15 }}
            className="block h-0.5 w-5 rounded-full bg-text-dark"
          />
          <motion.span
            animate={open ? { y: -7, rotate: -45 } : { y: 0, rotate: 0 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="block h-0.5 w-5 rounded-full bg-text-dark"
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            id="mobile-nav-links"
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            style={{ transformOrigin: "top center" }}
            className="absolute top-[calc(100%+0.25rem)] right-0 left-0 flex flex-col gap-1 rounded-2xl border border-text-dark/[0.06] bg-white/92 p-2.5 shadow-lg backdrop-blur-xl backdrop-saturate-150 md:hidden"
          >
            {LINKS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-4 py-3.5 font-medium text-text-dark hover:bg-primary/[0.08]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
