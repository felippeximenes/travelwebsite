import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { cn } from "@/lib/utils";

export interface NavItem {
  label: string;
  href: string;
}

export interface SpotlightNavbarProps {
  items: NavItem[];
  className?: string;
  onItemClick?: (item: NavItem, index: number) => void;
  defaultActiveIndex?: number;
}

/**
 * Spotlight navbar: a glowing highlight that follows the mouse across the
 * pill and springs back to rest under the active item. Adapted from a
 * Next.js registry component (vengenceui.com) — `<style jsx>` (styled-jsx,
 * Next-only) and a dead dark-mode watcher (this project has no dark mode)
 * were removed; classes that referenced an undefined stylesheet
 * (spotlight-nav-bg / glass-border / spotlight-nav-shadow) were replaced
 * with this project's own tokens.
 */
export function SpotlightNavbar({ items, className, onItemClick, defaultActiveIndex = 0 }: SpotlightNavbarProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [hoverX, setHoverX] = useState<number | null>(null);

  const spotlightX = useRef(0);
  const ambienceX = useRef(0);

  useEffect(() => {
    if (!navRef.current) return;
    const nav = navRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = nav.getBoundingClientRect();
      const x = e.clientX - rect.left;
      setHoverX(x);
      spotlightX.current = x;
      nav.style.setProperty("--spotlight-x", `${x}px`);
    };

    const handleMouseLeave = () => {
      setHoverX(null);
      const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);
      if (activeItem) {
        const navRect = nav.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        const targetX = itemRect.left - navRect.left + itemRect.width / 2;

        animate(spotlightX.current, targetX, {
          type: "spring",
          stiffness: 200,
          damping: 20,
          onUpdate: (v) => {
            spotlightX.current = v;
            nav.style.setProperty("--spotlight-x", `${v}px`);
          },
        });
      }
    };

    nav.addEventListener("mousemove", handleMouseMove);
    nav.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      nav.removeEventListener("mousemove", handleMouseMove);
      nav.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [activeIndex]);

  useEffect(() => {
    if (!navRef.current) return;
    const nav = navRef.current;
    const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);

    if (activeItem) {
      const navRect = nav.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      const targetX = itemRect.left - navRect.left + itemRect.width / 2;

      animate(ambienceX.current, targetX, {
        type: "spring",
        stiffness: 200,
        damping: 20,
        onUpdate: (v) => {
          ambienceX.current = v;
          nav.style.setProperty("--ambience-x", `${v}px`);
        },
      });
    }
  }, [activeIndex]);

  const handleItemClick = (item: NavItem, index: number) => {
    setActiveIndex(index);
    onItemClick?.(item, index);
  };

  return (
    <nav
      ref={navRef}
      style={
        {
          "--spotlight-color": "rgb(54 133 251 / 0.12)",
          "--ambience-color": "rgb(54 133 251 / 0.95)",
        } as React.CSSProperties
      }
      className={cn(
        "relative h-11 overflow-hidden rounded-full border border-text-dark/[0.08] bg-white/70 shadow-sm backdrop-blur-md transition-all duration-300",
        className
      )}
    >
      <ul className="relative z-10 flex h-full items-center gap-0 px-2">
        {items.map((item, idx) => (
          <li key={item.label} className="relative flex h-full items-center justify-center">
            <a
              href={item.href}
              data-index={idx}
              onClick={(e) => {
                e.preventDefault();
                handleItemClick(item, idx);
              }}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                activeIndex === idx ? "font-semibold text-text-dark" : "text-text-dark/55 hover:text-primary"
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <div
        className="pointer-events-none absolute inset-0 z-1 opacity-0 transition-opacity duration-300"
        style={{
          opacity: hoverX !== null ? 1 : 0,
          background: "radial-gradient(120px circle at var(--spotlight-x) 100%, var(--spotlight-color) 0%, transparent 50%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-2 h-[2px]"
        style={{
          background: "radial-gradient(60px circle at var(--ambience-x) 0%, var(--ambience-color) 0%, transparent 100%)",
        }}
      />
    </nav>
  );
}
