import { useEffect, useRef, useState } from "react";
import HeroScene from "./components/HeroScene";
import { useReveal, useTilt, useCounter, useParallax, usePinProgress } from "./hooks/hooks";

/* ---------- dados ---------- */
const DESTINATIONS = [
  { name: "Banff, Canadá", img: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&q=80" },
  { name: "Patagônia, Argentina", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80" },
  { name: "Dolomitas, Itália", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80" },
  { name: "Islândia", img: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=800&q=80" },
  { name: "Deserto do Atacama", img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80" },
  { name: "Alpes Suíços", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80" },
];

const STEPS = [
  { n: "01 — Conversa", title: "Você conta o sonho.", text: "Uma conversa de trinta minutos: o que você quer sentir, quanto tempo tem, com quem vai. Sem formulários intermináveis.", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1100&q=80" },
  { n: "02 — Desenho", title: "Nós traçamos o caminho.", text: "Roteiro autoral, dia a dia: trilhas, mesas, pousadas e os horários certos para ver cada lugar sem multidão.", img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1100&q=80" },
  { n: "03 — Partida", title: "Você só embarca.", text: "Reservas, transfers e suporte no fuso do destino. A única decisão que sobra é onde parar para a próxima foto.", img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1100&q=80" },
];

const PACKAGES = [
  { title: "Freiburg, Alemanha", rating: "4,2", desc: "Floresta Negra em 6 dias: vilarejos, relojoarias e trilhas entre pinheiros.", price: "R$ 5.300", img: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=900&q=80" },
  { title: "Patagônia, Arg. & Chile", rating: "4,5", desc: "9 dias entre El Chaltén e Torres del Paine, com guia de montanha.", price: "R$ 8.450", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=80" },
  { title: "Dolomitas, Itália", rating: "4,7", desc: "7 dias de rifúgios alpinos, teleféricos e massas frescas no Tirol do Sul.", price: "R$ 7.200", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80" },
];

const TESTIMONIALS = [
  { quote: "“Nunca abri um mapa. Cada dia da Patagônia estava desenhado até o horário do pôr do sol.”", name: "Mariana Alves", where: "Patagônia, 2025", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80" },
  { quote: "“Pedi ‘montanha e silêncio’. Recebi as Dolomitas fora de temporada. Acertaram em tudo.”", name: "Rafael Duarte", where: "Dolomitas, 2025", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80" },
  { quote: "“Viajei sozinha pela primeira vez aos 61. Suporte no WhatsApp respondia em minutos.”", name: "Cecília Ramos", where: "Islândia, 2026", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80" },
];

/* ---------- nav + barra de progresso ---------- */
function Nav() {
  const [on, setOn] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      setOn(window.scrollY > 40);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (barRef.current)
        barRef.current.style.transform = `scaleX(${total ? window.scrollY / total : 0})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <div ref={barRef} style={{ position: "fixed", top: 0, left: 0, height: 2, width: "100%", background: "var(--accent)", transformOrigin: "0 50%", transform: "scaleX(0)", zIndex: 90 }} />
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 80,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: on ? "14px 48px" : "20px 48px",
        background: on ? "rgba(246,244,239,0.88)" : "transparent",
        backdropFilter: on ? "blur(12px)" : "none",
        boxShadow: on ? "0 1px 0 rgba(23,26,30,0.08)" : "none",
        transition: "background .4s, box-shadow .4s, padding .4s",
      }}>
        <a href="#" style={{ fontFamily: "var(--serif)", fontSize: 26, fontWeight: 500, letterSpacing: "-0.02em" }}>
          Caminhos<span style={{ color: "var(--accent)" }}>.</span>
        </a>
        <div style={{ display: "flex", gap: 32, fontSize: 14, letterSpacing: "0.02em" }}>
          <a href="#destinos">Destinos</a>
          <a href="#pacotes">Pacotes</a>
          <a href="#galeria">Galeria</a>
          <a href="#depoimentos">Depoimentos</a>
        </div>
        <a href="#contato" className="btn--pill-sm btn">Entre em contato</a>
      </nav>
    </>
  );
}

/* ---------- hero ---------- */
function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const r1 = useReveal(), r2 = useReveal<HTMLHeadingElement>(80), r3 = useReveal<HTMLParagraphElement>(160), r4 = useReveal(240);
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const p = Math.min(1, window.scrollY / (window.innerHeight * 0.9));
      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${-p * 120}px)`;
        contentRef.current.style.opacity = String(1 - p * 1.1);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <header style={{ position: "relative", height: "100vh", minHeight: 640, overflow: "hidden" }}>
      <HeroScene />
      <div ref={contentRef} style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "0 24px" }}>
        <div ref={r1} className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />
          Agência de viagens autorais
        </div>
        <h1 ref={r2} className="h-serif" style={{ fontSize: "clamp(56px, 10vw, 148px)", lineHeight: 0.98, maxWidth: "12ch" }}>
          O mundo é feito de <em style={{ fontWeight: 400, color: "var(--accent)" }}>caminhos</em>.
        </h1>
        <p ref={r3} style={{ maxWidth: "44ch", fontSize: 17, lineHeight: 1.65, color: "var(--muted)", margin: "32px 0 40px", textWrap: "pretty" }}>
          Roteiros desenhados um a um, para quem viaja em busca de altitude, silêncio e histórias que não cabem em pacotes prontos.
        </p>
        <div ref={r4} style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
          <a href="#contato" className="btn btn--solid">Planejar minha viagem</a>
          <a href="#destinos" className="btn btn--ghost">Ver destinos</a>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", zIndex: 2, fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--faint)", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        Role para descer
        <span style={{ width: 1, height: 44, background: "linear-gradient(var(--ink), transparent)" }} />
      </div>
    </header>
  );
}

/* ---------- stats ---------- */
function Stat({ target, decimal, suffix, label, delay }: { target: number; decimal?: boolean; suffix?: React.ReactNode; label: string; delay: number }) {
  const wrap = useReveal(delay);
  const num = useCounter(target, { decimal });
  return (
    <div ref={wrap} style={{ padding: "44px 24px", borderRight: "1px solid var(--line)", textAlign: "center" }}>
      <div style={{ fontFamily: "var(--serif)", fontSize: 52, fontWeight: 300, letterSpacing: "-0.02em" }}>
        <span ref={num}>0</span>{suffix}
      </div>
      <div className="eyebrow" style={{ letterSpacing: "0.14em", marginTop: 6 }}>{label}</div>
    </div>
  );
}
function Stats() {
  return (
    <section style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", position: "relative", zIndex: 3, background: "var(--paper)" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        <Stat target={12400} suffix={<span style={{ color: "var(--accent)" }}>+</span>} label="Viajantes" delay={0} />
        <Stat target={48} label="Destinos" delay={80} />
        <Stat target={49} decimal label="Avaliação média" delay={160} />
        <Stat target={9} suffix={<span style={{ fontSize: 24, fontStyle: "italic" }}> anos</span>} label="De estrada" delay={240} />
      </div>
    </section>
  );
}

/* ---------- como funciona (pinado) ---------- */
function HowItWorks() {
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const wrapRef = usePinProgress<HTMLElement>((p) => {
    const n = STEPS.length, seg = 1 / n;
    STEPS.forEach((_, i) => {
      const el = stepRefs.current[i];
      if (!el) return;
      const local = (p - i * seg) / seg;
      let o = 0, ty = 40;
      if (local >= 0 && local < 1) {
        const fadeIn = Math.min(1, local / 0.25);
        const fadeOut = i === n - 1 ? 1 : Math.min(1, (1 - local) / 0.25);
        o = Math.min(fadeIn, fadeOut);
        ty = (1 - fadeIn) * 40 - (1 - fadeOut) * 40;
      } else if (i === 0 && p <= 0) { o = 1; ty = 0; }
      else if (i === n - 1 && p >= 1) { o = 1; ty = 0; }
      el.style.opacity = String(o);
      el.style.transform = `translateY(${ty}px)`;
      el.style.pointerEvents = o > 0.5 ? "auto" : "none";
      const fill = fillRefs.current[i];
      if (fill) fill.style.transform = `scaleX(${Math.min(1, Math.max(0, local))})`;
    });
  });
  return (
    <section ref={wrapRef} style={{ height: "300vh", position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="container" style={{ width: "100%" }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Como funciona</div>
          <div style={{ position: "relative", minHeight: 380 }}>
            {STEPS.map((s, i) => (
              <div key={s.n} ref={(el) => (stepRefs.current[i] = el)}
                style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", opacity: i === 0 ? 1 : 0 }}>
                <div>
                  <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 20, color: "var(--accent)" }}>{s.n}</div>
                  <h2 className="h-serif" style={{ fontSize: "clamp(40px, 5vw, 72px)", margin: "16px 0 20px" }}>{s.title}</h2>
                  <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--muted)", maxWidth: "42ch" }}>{s.text}</p>
                </div>
                <div style={{ borderRadius: 4, overflow: "hidden", aspectRatio: "4/3", boxShadow: "0 40px 80px -40px rgba(23,26,30,0.4)" }}>
                  <img src={s.img} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 32 }}>
            {STEPS.map((s, i) => (
              <span key={s.n} style={{ height: 2, width: 64, background: "var(--line)", position: "relative", overflow: "hidden", display: "block" }}>
                <span ref={(el) => (fillRefs.current[i] = el)} style={{ position: "absolute", inset: 0, background: "var(--accent)", transform: "scaleX(0)", transformOrigin: "0 50%", display: "block" }} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- destinos (carrossel 3D pinado) ---------- */
function DestinationsRing() {
  const N = DESTINATIONS.length, R = 380;
  const ringRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [idx, setIdx] = useState(0);
  const wrapRef = usePinProgress<HTMLElement>((p) => {
    const rot = p * (N - 1) * (360 / N);
    if (ringRef.current) ringRef.current.style.transform = `rotateY(${-rot}deg)`;
    cardRefs.current.forEach((c, i) => {
      if (!c) return;
      const ang = ((i * (360 / N) - rot) % 360 + 360) % 360;
      const facing = Math.max(0, Math.cos((ang * Math.PI) / 180));
      c.style.opacity = String(0.25 + 0.75 * facing);
      c.style.filter = `brightness(${0.55 + 0.45 * facing})`;
    });
    setIdx(Math.round(p * (N - 1)));
  });
  return (
    <section id="destinos" ref={wrapRef} style={{ height: "320vh", position: "relative", background: "var(--ink)", color: "var(--paper)" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", paddingTop: "clamp(48px, 9vh, 80px)" }}>
        <div style={{ textAlign: "center", marginBottom: "clamp(48px, 9vh, 80px)" }}>
          <div className="eyebrow">Destinos</div>
          <h2 className="h-serif" style={{ fontSize: "clamp(36px, 4.6vw, 64px)", marginTop: 10 }}>
            Gire o mundo <em style={{ color: "var(--accent-soft)" }}>com o scroll</em>
          </h2>
        </div>
        <div style={{ perspective: 1400, width: "100%", height: 480, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div ref={ringRef} style={{ position: "relative", width: 300, height: 400, transformStyle: "preserve-3d" }}>
            {DESTINATIONS.map((d, i) => (
              <figure key={d.name} ref={(el) => (cardRefs.current[i] = el)}
                style={{ position: "absolute", inset: 0, margin: 0, borderRadius: 6, overflow: "hidden", backfaceVisibility: "hidden", boxShadow: "0 30px 60px -20px rgba(0,0,0,0.6)", transform: `rotateY(${i * (360 / N)}deg) translateZ(${R}px)` }}>
                <img src={d.img} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </figure>
            ))}
          </div>
        </div>
        <div style={{ textAlign: "center", height: 70, marginTop: "clamp(40px, 8vh, 76px)" }}>
          <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 32, fontWeight: 300 }}>{DESTINATIONS[idx].name}</div>
          <div style={{ fontSize: 12, letterSpacing: "0.3em", color: "var(--faint)", marginTop: 6 }}>0{idx + 1} / 0{N}</div>
        </div>
      </div>
    </section>
  );
}

/* ---------- pacotes ---------- */
function PackageCard({ p, delay }: { p: (typeof PACKAGES)[number]; delay: number }) {
  const reveal = useReveal<HTMLElement>(delay);
  const tilt = useTilt<HTMLDivElement>(8);
  return (
    <article ref={reveal}>
      <div ref={tilt} className="tilt" style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 6, overflow: "hidden" }}>
        <div style={{ aspectRatio: "4/3", overflow: "hidden" }}>
          <img src={p.img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ padding: "26px 26px 30px", display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: 24, letterSpacing: "-0.02em", margin: 0 }}>{p.title}</h3>
            <span style={{ fontSize: 13, color: "var(--faint)", whiteSpace: "nowrap" }}>★ {p.rating}</span>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--muted)", margin: 0 }}>{p.desc}</p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
            <div style={{ fontSize: 13, color: "var(--faint)" }}>
              a partir de <span style={{ fontFamily: "var(--serif)", fontSize: 22, color: "var(--ink)" }}>{p.price}</span>
            </div>
            <a href="#contato" className="btn--pill-sm btn">Agende agora</a>
          </div>
        </div>
      </div>
    </article>
  );
}
function Packages() {
  const r1 = useReveal(), r2 = useReveal<HTMLHeadingElement>(80), r3 = useReveal<HTMLParagraphElement>(160);
  return (
    <section id="pacotes" className="container" style={{ padding: "140px 48px 100px" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 32, marginBottom: 64, flexWrap: "wrap" }}>
        <div>
          <div ref={r1} className="eyebrow" style={{ marginBottom: 12 }}>Roteiros assinados</div>
          <h2 ref={r2} className="h-serif" style={{ fontSize: "clamp(40px, 5vw, 76px)" }}>
            Melhores <em style={{ color: "var(--accent)" }}>pacotes</em>
          </h2>
        </div>
        <p ref={r3} style={{ maxWidth: "36ch", fontSize: 15, lineHeight: 1.7, color: "var(--muted)", margin: 0 }}>
          Grupos pequenos, datas fixas, tudo incluído do embarque à volta. Passe o mouse — os cards têm relevo.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
        {PACKAGES.map((p, i) => <PackageCard key={p.title} p={p} delay={i * 100} />)}
      </div>
    </section>
  );
}

/* ---------- galeria parallax ---------- */
function Gallery() {
  const quote = useParallax<HTMLHeadingElement>(-0.06);
  const f1 = useParallax<HTMLElement>(0.12);
  const f2 = useParallax<HTMLElement>(0.22);
  const f3 = useParallax<HTMLElement>(0.05);
  const r1 = useReveal<HTMLParagraphElement>(), r2 = useReveal<HTMLAnchorElement>(100);
  const fig = (top: string, side: React.CSSProperties, z: number): React.CSSProperties => ({
    position: "absolute", top, margin: 0, borderRadius: 4, overflow: "hidden", zIndex: z,
    boxShadow: "0 50px 90px -40px rgba(23,26,30,0.45)", ...side,
  });
  return (
    <section id="galeria" style={{ position: "relative", padding: "120px 0 160px" }}>
      <div className="container" style={{ position: "relative", minHeight: 720 }}>
        <h2 ref={quote} className="h-serif" style={{ fontStyle: "italic", fontSize: "clamp(44px, 6.5vw, 104px)", lineHeight: 1.05, position: "relative", zIndex: 3, maxWidth: "14ch" }}>
          “A viagem começa muito antes do embarque.”
        </h2>
        <figure ref={f1} style={fig("180px", { right: "6%", width: "34%", maxWidth: 420 }, 2)}>
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=80" alt="Praia deserta" style={{ width: "100%" }} />
        </figure>
        <figure ref={f2} style={fig("420px", { left: "4%", width: "28%", maxWidth: 340 }, 1)}>
          <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=900&q=80" alt="Canoa no lago" style={{ width: "100%" }} />
        </figure>
        <figure ref={f3} style={fig("470px", { left: "42%", width: "24%", maxWidth: 300 }, 2)}>
          <img src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=900&q=80" alt="Neblina na serra" style={{ width: "100%" }} />
        </figure>
        <p ref={r1} style={{ position: "relative", zIndex: 3, margin: "480px 0 0", maxWidth: "38ch", fontSize: 16, lineHeight: 1.75, color: "var(--muted)" }}>
          Cada camada desta página se move num ritmo diferente — como as janelas de um trem. A nossa galeria completa tem 4.000 fotos enviadas por quem já foi.
        </p>
        <a ref={r2} href="#contato" style={{ position: "relative", zIndex: 3, display: "inline-block", marginTop: 28, borderBottom: "1px solid var(--ink)", paddingBottom: 4, fontSize: 14, fontWeight: 500, letterSpacing: "0.04em" }}>
          Ver a galeria completa →
        </a>
      </div>
    </section>
  );
}

/* ---------- depoimentos ---------- */
function TestimonialCard({ t, delay }: { t: (typeof TESTIMONIALS)[number]; delay: number }) {
  const reveal = useReveal<HTMLQuoteElement>(delay);
  const tilt = useTilt<HTMLDivElement>(6);
  return (
    <blockquote ref={reveal} style={{ margin: 0 }}>
      <div ref={tilt} className="tilt" style={{ background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 6, padding: 36, display: "flex", flexDirection: "column", gap: 24, height: "100%", boxSizing: "border-box" }}>
        <p style={{ fontFamily: "var(--serif)", fontSize: 21, lineHeight: 1.5, fontWeight: 300, margin: 0 }}>{t.quote}</p>
        <footer style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <img src={t.img} alt={t.name} style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover" }} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{t.name}</div>
            <div style={{ fontSize: 12, color: "var(--faint)" }}>{t.where}</div>
          </div>
        </footer>
      </div>
    </blockquote>
  );
}
function Testimonials() {
  const r1 = useReveal(), r2 = useReveal<HTMLHeadingElement>(80);
  return (
    <section id="depoimentos" style={{ background: "var(--paper-2)", borderTop: "1px solid var(--line)", padding: "120px 48px" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div ref={r1} className="eyebrow" style={{ marginBottom: 12 }}>Depoimentos</div>
        <h2 ref={r2} className="h-serif" style={{ fontSize: "clamp(38px, 4.6vw, 68px)", margin: "0 0 64px" }}>
          Quem foi, <em style={{ color: "var(--accent)" }}>conta melhor</em>.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
          {TESTIMONIALS.map((t, i) => <TestimonialCard key={t.name} t={t} delay={i * 100} />)}
        </div>
      </div>
    </section>
  );
}

/* ---------- newsletter ---------- */
function Newsletter() {
  const reveal = useReveal();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const subscribe = () => {
    if (email.includes("@")) { setMsg("Bem-vindo a bordo. A primeira carta chega em breve. ✉"); setEmail(""); }
    else setMsg("Digite um e-mail válido.");
  };
  return (
    <section id="contato" style={{ padding: "140px 48px", textAlign: "center" }}>
      <div ref={reveal} style={{ maxWidth: 760, margin: "0 auto" }}>
        <h2 className="h-serif" style={{ fontSize: "clamp(40px, 5vw, 76px)", lineHeight: 1.05, margin: "0 0 20px" }}>
          Ofertas que <em style={{ color: "var(--accent)" }}>não chegam</em> ao site.
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--muted)", margin: "0 0 40px" }}>
          Uma carta por mês: vagas de última hora, datas novas e um destino explicado a fundo.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Seu melhor e-mail"
            style={{ border: "1px solid #c9c4b8", background: "#fff", borderRadius: 999, padding: "16px 26px", fontSize: 15, fontFamily: "var(--sans)", width: 320, outline: "none", color: "var(--ink)" }} />
          <button onClick={subscribe} className="btn btn--solid">Assinar</button>
        </div>
        <div style={{ height: 24, marginTop: 16, fontSize: 14, color: "var(--accent)" }}>{msg}</div>
      </div>
    </section>
  );
}

/* ---------- footer ---------- */
function Footer() {
  const link: React.CSSProperties = { color: "#c9cdd3" };
  return (
    <footer style={{ background: "var(--ink)", color: "var(--paper)", padding: "90px 48px 40px" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 64 }}>
        <div>
          <div style={{ fontFamily: "var(--serif)", fontSize: 32 }}>Caminhos<span style={{ color: "var(--accent-soft)" }}>.</span></div>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "#9aa0a8", maxWidth: "32ch", margin: "16px 0 0" }}>
            Roteiros autorais desde 2016. São Paulo, Brasil — e mais 48 lugares onde já deixamos pegadas.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 14 }}>
          <div className="eyebrow" style={{ fontSize: 12, marginBottom: 6 }}>Suporte</div>
          <a href="#" style={link}>FAQ</a>
          <a href="#" style={link}>Termos e condições</a>
          <a href="#" style={link}>Política de privacidade</a>
          <a href="#" style={link}>Fale conosco</a>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 14, color: "#c9cdd3" }}>
          <div className="eyebrow" style={{ fontSize: 12, marginBottom: 6 }}>Endereço</div>
          <div>Rua Exemplo de Tal, 142 — Loja B<br />São Paulo, Brasil</div>
          <a href="mailto:info@caminhos.com" style={link}>info@caminhos.com</a>
          <div>+55 11 1234-5678</div>
        </div>
      </div>
      <div style={{ maxWidth: 1240, margin: "64px auto 0", borderTop: "1px solid rgba(246,244,239,0.12)", paddingTop: 24, fontSize: 12, color: "var(--faint)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <span>© 2026 Caminhos. Todos os direitos reservados.</span>
        <span style={{ fontStyle: "italic", fontFamily: "var(--serif)" }}>feito para quem não para quieto</span>
      </div>
    </footer>
  );
}

/* ---------- app ---------- */
export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Stats />
      <HowItWorks />
      <DestinationsRing />
      <Packages />
      <Gallery />
      <Testimonials />
      <Newsletter />
      <Footer />
      <div className="grain" />
    </>
  );
}
