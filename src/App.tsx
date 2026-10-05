import { useCallback, useEffect, useRef, useState, type ReactNode, type TouchEvent, type WheelEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { linkedinPosts } from "./data/linkedinPosts";
import {
  ArrowRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Download,
  Droplet,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  X,
} from "lucide-react";

const CV_URL =
  "https://drive.google.com/file/d/1Gq8-4htQksUC_7xIKiOkxtJC25Q96ySf/view?usp=sharing";
const WA_URL = "https://wa.me/6580627387";
const EMAIL = "tonukazi@gmail.com";
const PHONE_DISPLAY = "+65 8062 7387";

type Theme = "red" | "purple";

const VIEWS = [
  { id: "home", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "certifications", label: "CERTIFICATIONS" },
  { id: "posts", label: "POSTS" },
  { id: "contact", label: "CONTACT" },
];

const EXPERIENCE = [
  {
    role: "Workplace Safety and Health Coordinator",
    company: "Success Forever Construction & Maintenance Pte Ltd",
    period: "Dec 2023 — Present",
    bullets: [
      "Conduct daily toolbox meetings and safety briefings",
      "Manage and enforce the Permit-to-Work (PTW) system",
      "Site inspections, hazard identification & HIRA",
      "MOM WSH compliance across HDB and PUB project sites",
    ],
  },
  {
    role: "WSH Construction Industry Supervisor",
    company: "Success Forever Construction & Maintenance Pte Ltd",
    period: "May 2023 — Nov 2023",
    bullets: [
      "Supervised work-at-height activities to MOM bylaws",
      "Operated hydraulic boom lifts on elevated assignments",
      "Enforced harness rules, briefings & daily site audits",
    ],
  },
  {
    role: "General Worker",
    company: "Success Forever Construction & Maintenance Pte Ltd",
    period: "Feb 2023 — May 2023",
    bullets: [
      "Groundwork logistics & materials handling",
      "Hands-on foundation in site layouts and safety procedures",
    ],
  },
];

const CERTIFICATIONS: { title: string; authority: string; date: string; expiryDate: string | null }[] = [
  { title: "Perform Work in Confined Space", authority: "Eversafe Academy", date: "Issued Aug 2024", expiryDate: "2027-08-31" },
  { title: "Manage Work-at-Height", authority: "Eversafe Academy", date: "Issued Jul 2023", expiryDate: null },
  { title: "Operate Boom Lift", authority: "AAT Training Hub Pte Ltd", date: "Issued May 2023", expiryDate: "2028-05-31" },
  { title: "Advance Certificate in Workplace Safety and Health", authority: "Greensafe International Pte Ltd", date: "Issued Nov 2023", expiryDate: null },
  { title: "Occupational First Aid Course", authority: "Eversafe Academy", date: "Issued Jul 2026", expiryDate: "2028-07-31" },
  { title: "WSH Coordinator Refresher Training", authority: "SCAL Academy", date: "Issued Jan 2026", expiryDate: "2028-01-31" },
  { title: "WSH Control Measures-4", authority: "Greensafe International Pte Ltd", date: "Issued Dec 2025", expiryDate: null },
  { title: "Introduction to OSHA — Safety Standards & Compliance", authority: "Coursera", date: "Issued Jan 2026", expiryDate: null },
  { title: "Psychological Safety", authority: "Coursera", date: "Issued Jan 2026", expiryDate: null },
  { title: "Responders Plus Programme", authority: "Singapore Civil Defence Force", date: "Issued Jun 2025", expiryDate: "2027-06-30" },
  { title: "International Labour Organisation — OSH Guidelines", authority: "3S Life Safe Akademie", date: "Issued Mar 2026", expiryDate: null },
  { title: "Befriender Training", authority: "Singapore Red Cross", date: "Issued Aug 2024", expiryDate: "2026-08-31" },
  { title: "Psychological First Aid", authority: "Singapore Red Cross", date: "Issued Aug 2024", expiryDate: "2026-08-31" },
  { title: "WSH Management in Construction Industry", authority: "Eversafe Academy", date: "Issued Jun 2023", expiryDate: null },
  { title: "Digital Marketing Certified", authority: "HubSpot Academy", date: "Issued Jul 2026", expiryDate: "2027-07-31" },
];

const STATS = [
  ["3+", "Years Experience"],
  ["15", "Safety Certifications"],
  ["150+", "Toolbox Briefings"],
  ["100%", "Compliance Focus"],
];

const SKILLS = ["Toolbox Talks", "HIRA", "Permit-to-Work", "Work-at-Height", "Confined Space", "First Aid"];

function validity(expiry: string | null) {
  if (!expiry)
    return { label: "Lifetime", dot: "bg-zinc-500", cls: "text-zinc-400 border-zinc-800" };
  const days = Math.ceil((new Date(expiry).getTime() - Date.now()) / 86400000);
  if (days <= 0) return { label: "Expired", dot: "bg-red-500", cls: "text-red-400 border-red-900" };
  if (days <= 90) return { label: "Renew soon", dot: "bg-amber-400", cls: "text-amber-400 border-amber-900" };
  return { label: "Valid", dot: "bg-emerald-400", cls: "text-emerald-400 border-emerald-900" };
}

const accent = "var(--accent)";

/* ------------------------- Typing / decode text ------------------------- */
function DecodeText({ text, className = "" }: { text: string; className?: string }) {
  const [out, setOut] = useState(text);
  useEffect(() => {
    const glyphs = "!<>-_\\/[]{}=+*^?#@$%&";
    let frame = 0;
    const total = 26;
    const id = setInterval(() => {
      frame++;
      const settled = Math.floor((frame / total) * text.length);
      let s = "";
      for (let i = 0; i < text.length; i++) {
        s += i < settled ? text[i] : glyphs[Math.floor(Math.random() * glyphs.length)];
      }
      setOut(s);
      if (frame >= total) {
        clearInterval(id);
        setOut(text);
      }
    }, 42);
    return () => clearInterval(id);
  }, [text]);
  return (
    <span className={className}>
      {out}
      <span className="animate-caret" style={{ color: accent }}>
        _
      </span>
    </span>
  );
}

/* ------------------------------ Background ------------------------------ */
function BackgroundFX() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 bg-coal" />
      {/* volumetric glows shifting with theme */}
      <div className="absolute -top-40 -left-40 w-[38rem] h-[38rem] rounded-full blur-[150px] animate-drift-a transition-colors duration-1000"
        style={{ backgroundColor: "color-mix(in srgb, var(--accent) 22%, transparent)" }} />
      <div className="absolute -bottom-48 -right-40 w-[36rem] h-[36rem] rounded-full blur-[150px] animate-drift-b transition-colors duration-1000"
        style={{ backgroundColor: "color-mix(in srgb, var(--accent-deep) 32%, transparent)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] rounded-full blur-[190px] animate-pulse-glow transition-colors duration-1000"
        style={{ backgroundColor: "color-mix(in srgb, var(--accent) 10%, transparent)" }} />
      {/* faint structural grid */}
      <div className="absolute inset-0 line-grid opacity-70 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,black,transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(0,0,0,0.6)_100%)]" />
    </div>
  );
}

/* --------------------------- Ember particles ---------------------------- */
function Embers({ theme }: { theme: Theme }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0, raf = 0, t = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    type P = { x: number; y: number; z: number; r: number; s: number; drift: number; a: number; ph: number; warm: boolean };
    let parts: P[] = [];

    const spawn = (anywhere = false): P => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + 12,
      z: 0.4 + Math.random() * 0.6,
      r: 0.8 + Math.random() * 2.4,
      s: 0.3 + Math.random() * 0.85,
      drift: (Math.random() - 0.5) * 0.5,
      a: 0.3 + Math.random() * 0.6,
      ph: Math.random() * Math.PI * 2,
      warm: Math.random() > 0.4,
    });

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const n = Math.min(90, Math.floor((w * h) / 22000));
      parts = Array.from({ length: n }, () => spawn(true));
    };

    const tick = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        p.y -= p.s * p.z;
        p.x += (p.drift + Math.sin(t * 1.4 + p.ph) * 0.3) * p.z;
        if (p.y < -14 || p.x < -14 || p.x > w + 14) {
          parts[i] = spawn();
          continue;
        }
        const flick = 0.65 + 0.35 * Math.sin(t * 3.5 + p.ph);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * p.z, 0, Math.PI * 2);
        const rgb = p.warm
          ? (theme === "red" ? "255,72,48" : "168,85,247")
          : (theme === "red" ? "255,190,120" : "216,180,254");
        ctx.fillStyle = `rgba(${rgb},${(p.a * flick).toFixed(3)})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener("resize", resize);
    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else tick();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [theme]);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1]" />;
}

/* -------------------------------- Navbar -------------------------------- */
function Navbar({
  view,
  goTo,
  theme,
  toggleTheme,
}: {
  view: number;
  goTo: (i: number) => void;
  theme: Theme;
  toggleTheme: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="absolute top-0 inset-x-0 z-50">
        {/* Centered menu — desktop */}
        <nav className="hidden md:flex items-center justify-center gap-10 pt-7">
          {VIEWS.map((v, i) => (
            <button
              key={v.id}
              onClick={() => goTo(i)}
              className={`font-grotesk text-[11px] font-semibold tracking-[0.3em] uppercase transition-colors cursor-pointer ${
                view === i ? "" : "text-zinc-500 hover:text-white"
              }`}
              style={
                view === i
                  ? { color: accent, textShadow: `0 0 18px var(--accent-glow), 0 0 42px var(--accent-glow)` }
                  : undefined
              }
            >
              {v.label}
            </button>
          ))}
        </nav>
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle glow theme"
          title={theme === "red" ? "Switch to purple glow" : "Switch to red glow"}
          className="absolute right-5 md:right-8 top-6 w-10 h-10 rounded-full border border-white/15 hover:border-white/40 flex items-center justify-center transition-all cursor-pointer"
          style={{ color: accent }}
        >
          <Droplet className="w-4 h-4" />
        </button>
        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="md:hidden absolute left-5 top-6 text-white p-1 cursor-pointer"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-coal/95 backdrop-blur-xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <span className="font-display text-xl text-white">
                KAZI<span style={{ color: accent }}>.</span>TONU
              </span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-white p-1 cursor-pointer">
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex-1 flex flex-col justify-center px-8 gap-1">
              {VIEWS.map((v, i) => (
                <motion.button
                  key={v.id}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                  onClick={() => {
                    setOpen(false);
                    setTimeout(() => goTo(i), 100);
                  }}
                  className="text-left font-display text-4xl py-2 cursor-pointer transition-colors"
                  style={{ color: view === i ? accent : "rgba(255,255,255,0.85)" }}
                >
                  <span className="font-grotesk text-[10px] align-super mr-3" style={{ color: accent }}>
                    0{i + 1}
                  </span>
                  {v.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ------------------------------ Swipe next ------------------------------ */
function SwipeNext({ onClick, label = "Swipe to Next" }: { onClick: () => void; label?: string }) {
  return (
    <button onClick={onClick} className="group inline-flex items-center gap-3 cursor-pointer">
      <span className="font-grotesk text-[11px] font-bold tracking-[0.3em] uppercase" style={{ color: accent }}>
        {label}
      </span>
      <span className="relative w-11 h-11 rounded-full border flex items-center justify-center transition-all group-hover:scale-105"
        style={{ borderColor: "color-mix(in srgb, var(--accent) 55%, transparent)" }}>
        <span className="absolute inset-0 rounded-full animate-ping"
          style={{ backgroundColor: "color-mix(in srgb, var(--accent) 18%, transparent)" }} />
        <ArrowRight className="relative w-4 h-4" style={{ color: accent }} />
      </span>
    </button>
  );
}

function CarouselButton({ dir, onClick }: { dir: "left" | "right"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === "left" ? "Previous" : "Next"}
      className="w-10 h-10 rounded-full border border-white/15 hover:border-white/50 flex items-center justify-center transition-all cursor-pointer text-white"
    >
      {dir === "left" ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
    </button>
  );
}

/* Shared bits */
function ViewLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accent }} />
      <span className="font-grotesk text-[11px] font-bold tracking-[0.4em] text-zinc-400 uppercase">
        {children}
      </span>
    </div>
  );
}

function Enter({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* --------------------------------- HOME --------------------------------- */
function HomeView({ goTo }: { goTo: (i: number) => void }) {
  return (
    <section className="h-[100dvh] relative flex flex-col overflow-hidden">
      <div className="flex-1 grid md:grid-cols-[1.05fr_0.95fr] items-center gap-2 md:gap-6 w-full max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-20">
        {/* Left column */}
        <div className="relative z-10">
          <Enter>
            <h2 className="font-sans font-black text-[22px] md:text-3xl tracking-[0.08em] text-white">
              <DecodeText text="HELLO!" />
            </h2>
            <svg viewBox="0 0 120 12" className="w-28 md:w-36 h-3 mt-1.5" fill="none" aria-hidden="true"
              style={{ color: accent }}>
              <path d="M2 9 C 30 2, 70 2, 118 7" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </Enter>
          <Enter delay={0.15}>
            <p className="font-grotesk font-bold tracking-[0.5em] text-[11px] md:text-sm mt-6 md:mt-8 uppercase"
              style={{ color: accent }}>
              Meet
            </p>
            <h1 className="font-display leading-[0.92] mt-2 text-[clamp(3.2rem,12vw,7.5rem)]">
              <span className="block bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(to bottom, var(--grad-from), var(--accent) 55%, var(--grad-to))" }}>
                KAZI
              </span>
              <span className="block bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(to bottom, var(--grad-from), var(--accent) 55%, var(--grad-to))" }}>
                TONU.
              </span>
            </h1>
          </Enter>
          <Enter delay={0.3}>
            <p className="font-grotesk text-[11px] md:text-[13px] font-semibold tracking-[0.32em] text-white mt-4 md:mt-5 uppercase">
              MOM-Qualified WSH Coordinator
            </p>
          </Enter>
          <Enter delay={0.42}>
            <div className="mt-6 md:mt-8 space-y-2.5 md:space-y-3 font-grotesk text-[12px] md:text-[13px] text-zinc-300">
              <span className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 shrink-0" style={{ color: accent }} /> Singapore
              </span>
              <span className="flex items-center gap-2.5">
                <BadgeCheck className="w-4 h-4 shrink-0" style={{ color: accent }} /> Available in 2–3 weeks
              </span>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Mail className="w-4 h-4 shrink-0" style={{ color: accent }} /> {EMAIL}
              </a>
            </div>
          </Enter>
        </div>

        {/* Center portrait */}
        <div className="group relative flex justify-center md:justify-center items-center">
          {/* hover perspective grid */}
          <div aria-hidden="true"
            className="persp-grid absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] max-w-[520px] aspect-square opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
          {/* resting glow */}
          <div aria-hidden="true" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-[420px] aspect-square">
            <div className="absolute inset-[14%] rounded-full blur-[80px] animate-pulse-glow transition-colors duration-1000"
              style={{ backgroundColor: "color-mix(in srgb, var(--accent) 30%, transparent)" }} />
          </div>
          <img
            src="/hero-photo.png"
            alt="Kazi Tonu — WSH Coordinator"
            draggable={false}
            className="glitch-in relative h-[30vh] md:h-[74vh] object-contain [mask-image:linear-gradient(to_bottom,black_84%,transparent_99%)]"
          />
        </div>
      </div>

      {/* Bottom row: copyright + swipe */}
      <div className="relative z-10 flex items-end justify-between px-6 md:px-12 pb-6 md:pb-8">
        <p className="font-grotesk text-[9px] md:text-[10px] tracking-[0.22em] text-zinc-600 uppercase">
          © 2026 Kazi Tonu Portfolio. All Rights Reserved.
        </p>
        <SwipeNext onClick={() => goTo(1)} />
      </div>
    </section>
  );
}

/* --------------------------------- ABOUT -------------------------------- */
function AboutView({ goTo }: { goTo: (i: number) => void }) {
  return (
    <section className="h-[100dvh] relative flex flex-col overflow-hidden">
      <div className="flex-1 w-full max-w-6xl mx-auto px-6 md:px-12 flex flex-col justify-center pt-16">
        <Enter><ViewLabel>About</ViewLabel></Enter>
        <Enter delay={0.1}>
          <h2 className="font-display leading-[0.9] text-[clamp(2.4rem,8vw,5.5rem)] text-white">
            SAFETY ISN'T<br />
            <span className="text-outline">A CHECKLIST.</span>
          </h2>
          <p className="font-grotesk font-semibold tracking-[0.2em] mt-4 uppercase text-xs md:text-sm"
            style={{ color: accent }}>
            — It's a culture I build.
          </p>
        </Enter>
        <Enter delay={0.2}>
          <p className="text-zinc-400 leading-relaxed max-w-2xl mt-5 md:mt-7 text-[13px] md:text-[15px]">
            I am Kazi Tonu, a MOM-qualified Workplace Safety and Health Coordinator based in
            Singapore. For nearly three years I have supervised high-risk construction
            activities — work at height, confined spaces, heavy plant operations — conducting
            thorough HIRA risk assessments and enforcing the WSH Act to keep sites
            incident-free across HDB and PUB projects.
          </p>
        </Enter>
        <Enter delay={0.3}>
          <div className="grid grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-xl overflow-hidden mt-6 md:mt-8 max-w-3xl">
            {STATS.map(([v, l]) => (
              <div key={l} className="bg-coal p-3 md:p-6">
                <div className="font-display text-2xl md:text-4xl text-white">{v}</div>
                <div className="font-grotesk text-[8px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 mt-1.5">
                  {l}
                </div>
              </div>
            ))}
          </div>
        </Enter>
        <Enter delay={0.4}>
          <div className="hidden md:flex flex-wrap gap-2.5 mt-7">
            {SKILLS.map((s) => (
              <span key={s}
                className="font-grotesk text-[11px] font-semibold tracking-[0.18em] uppercase border border-white/15 text-zinc-300 rounded-full px-4 py-2">
                {s}
              </span>
            ))}
          </div>
        </Enter>
      </div>
      <div className="relative z-10 flex justify-end px-6 md:px-12 pb-6 md:pb-8">
        <SwipeNext onClick={() => goTo(2)} />
      </div>
    </section>
  );
}

/* ------------------------------- EXPERIENCE ------------------------------ */
function ExperienceView({ goTo }: { goTo: (i: number) => void }) {
  return (
    <section className="h-[100dvh] relative flex flex-col overflow-hidden">
      <div className="flex-1 w-full max-w-6xl mx-auto px-6 md:px-12 flex flex-col justify-center pt-16 min-h-0">
        <Enter><ViewLabel>Experience</ViewLabel></Enter>
        <Enter delay={0.1}>
          <h2 className="font-display leading-[0.9] text-[clamp(2.4rem,8vw,5.5rem)] text-white">
            SITE-TESTED<br />
            <span className="text-outline">RECORD.</span>
          </h2>
        </Enter>
        <Enter delay={0.2} className="min-h-0 mt-6 md:mt-10">
          <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-5 overflow-x-auto md:overflow-visible no-scrollbar snap-x snap-mandatory pb-2 -mx-6 px-6 md:mx-0 md:px-0">
            {EXPERIENCE.map((e) => (
              <div key={e.role}
                className="snap-start shrink-0 w-[82vw] sm:w-[60vw] md:w-auto border border-white/10 bg-white/[0.03] rounded-2xl p-5 md:p-7 hover:border-white/25 transition-colors">
                <span className="inline-block font-grotesk text-[10px] font-bold tracking-[0.18em] uppercase rounded-full px-3.5 py-1.5 border"
                  style={{ color: accent, borderColor: "color-mix(in srgb, var(--accent) 40%, transparent)", backgroundColor: "color-mix(in srgb, var(--accent) 12%, transparent)" }}>
                  {e.period}
                </span>
                <h3 className="font-sans font-extrabold text-[15px] md:text-lg text-white leading-snug mt-4">
                  {e.role}
                </h3>
                <p className="font-grotesk text-[11px] md:text-xs text-zinc-500 mt-1.5">{e.company}</p>
                <ul className="mt-4 space-y-2">
                  {e.bullets.slice(0, 3).map((b) => (
                    <li key={b} className="flex gap-2.5 text-[12px] md:text-[13px] text-zinc-400 leading-relaxed">
                      <span className="mt-[7px] w-1.5 h-1.5 shrink-0 rounded-[2px]" style={{ backgroundColor: accent }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Enter>
      </div>
      <div className="relative z-10 flex justify-end px-6 md:px-12 pb-6 md:pb-8">
        <SwipeNext onClick={() => goTo(3)} />
      </div>
    </section>
  );
}

/* ----------------------------- CERTIFICATIONS ---------------------------- */
function CertificationsView({ goTo }: { goTo: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const go = (dir: number) => ref.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  return (
    <section className="h-[100dvh] relative flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col justify-center pt-16 min-h-0">
        <div className="w-full max-w-6xl mx-auto px-6 md:px-12">
          <Enter><ViewLabel>Certifications</ViewLabel></Enter>
          <Enter delay={0.1}>
            <div className="flex items-end justify-between gap-6">
              <h2 className="font-display leading-[0.9] text-[clamp(2.4rem,8vw,5.5rem)] text-white">
                PROOF,<br />
                <span className="text-outline">NOT PROMISES.</span>
              </h2>
              <div className="hidden sm:flex gap-3 shrink-0">
                <CarouselButton dir="left" onClick={() => go(-1)} />
                <CarouselButton dir="right" onClick={() => go(1)} />
              </div>
            </div>
          </Enter>
        </div>
        <Enter delay={0.2}>
          <div ref={ref}
            className="flex gap-4 md:gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory px-6 md:px-12 mt-6 md:mt-8 pb-2">
            {CERTIFICATIONS.map((c) => {
              const v = validity(c.expiryDate);
              return (
                <div key={c.title}
                  className="snap-start shrink-0 w-[240px] md:w-[290px] border border-white/10 bg-white/[0.03] rounded-2xl p-5 md:p-6 flex flex-col hover:border-white/25 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="w-10 h-10 rounded-xl border flex items-center justify-center"
                      style={{ borderColor: "color-mix(in srgb, var(--accent) 35%, transparent)", backgroundColor: "color-mix(in srgb, var(--accent) 12%, transparent)" }}>
                      <ShieldCheck className="w-5 h-5" style={{ color: accent }} />
                    </span>
                    <span className={`inline-flex items-center gap-1.5 font-grotesk text-[10px] font-bold tracking-widest uppercase border rounded-full px-2.5 py-1 ${v.cls}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${v.dot}`} />
                      {v.label}
                    </span>
                  </div>
                  <h3 className="font-sans font-bold text-[14px] text-white leading-snug mt-4 flex-1">
                    {c.title}
                  </h3>
                  <p className="font-grotesk text-[11px] text-zinc-500 mt-2">{c.authority}</p>
                  <p className="font-grotesk text-[10px] text-zinc-600 mt-1">{c.date}</p>
                </div>
              );
            })}
          </div>
        </Enter>
      </div>
      <div className="relative z-10 flex justify-end px-6 md:px-12 pb-6 md:pb-8">
        <SwipeNext onClick={() => goTo(4)} />
      </div>
    </section>
  );
}

/* --------------------------------- POSTS --------------------------------- */
function PostsView({ goTo }: { goTo: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const go = (dir: number) => ref.current?.scrollBy({ left: dir * 330, behavior: "smooth" });
  const fmt = (iso: string) =>
    new Date(iso + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  return (
    <section className="h-[100dvh] relative flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col justify-center pt-16 min-h-0">
        <div className="w-full max-w-6xl mx-auto px-6 md:px-12">
          <Enter><ViewLabel>Site Diary</ViewLabel></Enter>
          <Enter delay={0.1}>
            <div className="flex items-end justify-between gap-6">
              <h2 className="font-display leading-[0.9] text-[clamp(2.4rem,8vw,5.5rem)] text-white">
                <span className="text-outline">FROM THE</span><br />
                FIELD.
              </h2>
              <div className="hidden sm:flex gap-3 shrink-0">
                <CarouselButton dir="left" onClick={() => go(-1)} />
                <CarouselButton dir="right" onClick={() => go(1)} />
              </div>
            </div>
          </Enter>
        </div>
        <Enter delay={0.2}>
          <div ref={ref}
            className="flex gap-4 md:gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory px-6 md:px-12 mt-6 md:mt-8 pb-2">
            {linkedinPosts.map((p) => (
              <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer"
                className="snap-start shrink-0 w-[250px] md:w-[310px] border border-white/10 bg-white/[0.03] rounded-2xl overflow-hidden hover:border-white/25 transition-colors group">
                <div className="aspect-[16/10] overflow-hidden bg-zinc-900">
                  <img src={p.image} alt="" loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4 md:p-5">
                  <div className="flex items-center justify-between font-grotesk text-[10px] md:text-[11px] text-zinc-500">
                    <span>{fmt(p.date)}</span>
                    {p.reactions != null && <span>♥ {p.reactions}</span>}
                  </div>
                  <p className="text-[12px] md:text-[13px] text-zinc-300 leading-relaxed mt-2.5 line-clamp-3">
                    {p.text}
                  </p>
                  <span className="inline-flex items-center gap-1.5 font-grotesk text-[10px] md:text-[11px] font-bold tracking-[0.18em] uppercase mt-3"
                    style={{ color: accent }}>
                    <Linkedin className="w-3.5 h-3.5" /> View post
                  </span>
                </div>
              </a>
            ))}
          </div>
        </Enter>
      </div>
      <div className="relative z-10 flex justify-end px-6 md:px-12 pb-6 md:pb-8">
        <SwipeNext onClick={() => goTo(5)} />
      </div>
    </section>
  );
}

/* -------------------------------- CONTACT -------------------------------- */
function ContactView({ goTo }: { goTo: (i: number) => void }) {
  return (
    <section className="h-[100dvh] relative flex flex-col overflow-hidden">
      <div className="flex-1 w-full max-w-6xl mx-auto px-6 md:px-12 flex flex-col justify-center pt-16">
        <Enter><ViewLabel>Contact</ViewLabel></Enter>
        <Enter delay={0.1}>
          <h2 className="font-display leading-[0.85] text-[clamp(3.6rem,15vw,10rem)] text-white">
            LET'S<br />
            <span className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(to bottom, var(--grad-from), var(--accent) 55%, var(--grad-to))" }}>
              TALK.
            </span>
          </h2>
          <p className="text-zinc-400 max-w-xl mt-5 text-[13px] md:text-[15px] leading-relaxed">
            Have a site that needs a safety leader your management can trust? My line is open —
            call, WhatsApp, or mail me anytime.
          </p>
        </Enter>
        <Enter delay={0.2}>
          <div className="flex flex-wrap gap-3 md:gap-4 mt-7 md:mt-9">
            <a href={CV_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-white font-grotesk text-[11px] md:text-xs font-bold tracking-[0.2em] uppercase px-7 md:px-8 py-3.5 md:py-4 rounded-full transition-all hover:brightness-110"
              style={{ backgroundColor: accent, boxShadow: "0 0 28px var(--accent-glow)" }}>
              <Download className="w-4 h-4" /> Download CV
            </a>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 border border-white/20 hover:border-white/50 text-white font-grotesk text-[11px] md:text-xs font-bold tracking-[0.2em] uppercase px-7 md:px-8 py-3.5 md:py-4 rounded-full transition-all">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
            <a href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2.5 border border-white/20 hover:border-white/50 text-white font-grotesk text-[11px] md:text-xs font-bold tracking-[0.2em] uppercase px-7 md:px-8 py-3.5 md:py-4 rounded-full transition-all">
              <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
            </a>
            <a href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2.5 border border-white/20 hover:border-white/50 text-white font-grotesk text-[11px] md:text-xs font-bold tracking-[0.2em] uppercase px-7 md:px-8 py-3.5 md:py-4 rounded-full transition-all">
              <Mail className="w-4 h-4" /> Email
            </a>
          </div>
        </Enter>
      </div>
      <div className="relative z-10 flex items-end justify-between px-6 md:px-12 pb-6 md:pb-8">
        <p className="font-grotesk text-[9px] md:text-[10px] tracking-[0.22em] text-zinc-600 uppercase">
          © 2026 Kazi Tonu Portfolio. All Rights Reserved.
        </p>
        <button onClick={() => goTo(0)}
          className="font-grotesk text-[11px] font-bold tracking-[0.3em] uppercase hover:opacity-80 transition-opacity cursor-pointer"
          style={{ color: accent }}>
          Back to top ↑
        </button>
      </div>
    </section>
  );
}

/* ------------------------------ Transitions ----------------------------- */
const viewVariants = {
  enter: (d: number) => ({ opacity: 0, x: d * 140, filter: "blur(10px)" }),
  center: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit: (d: number) => ({ opacity: 0, x: d * -140, filter: "blur(10px)" }),
};

/* ---------------------------------- APP ---------------------------------- */
export default function App() {
  const [view, setView] = useState(0);
  const [dir, setDir] = useState(1);
  const [theme, setTheme] = useState<Theme>("red");
  const [beam, setBeam] = useState(0);
  const lock = useRef(false);
  const touchY = useRef<number | null>(null);

  const goTo = useCallback(
    (i: number) => {
      const n = Math.max(0, Math.min(VIEWS.length - 1, i));
      if (n === view || lock.current) return;
      lock.current = true;
      setDir(n > view ? 1 : -1);
      setView(n);
      setBeam((b) => b + 1);
      setTimeout(() => {
        lock.current = false;
      }, 1250);
    },
    [view]
  );

  /* Keyboard navigation */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        goTo(view + 1);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        goTo(view - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(VIEWS.length - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [view, goTo]);

  const onWheel = (e: WheelEvent) => {
    if (Math.abs(e.deltaY) < 28) return;
    goTo(view + (e.deltaY > 0 ? 1 : -1));
  };

  const onTouchStart = (e: TouchEvent) => {
    touchY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchY.current === null) return;
    const dy = touchY.current - e.changedTouches[0].clientY;
    touchY.current = null;
    if (Math.abs(dy) < 70) return;
    /* ignore swipes that start on a horizontal carousel */
    const t = e.target as HTMLElement;
    if (t.closest(".no-scrollbar")) return;
    goTo(view + (dy > 0 ? 1 : -1));
  };

  const renderView = () => {
    switch (view) {
      case 0: return <HomeView goTo={goTo} />;
      case 1: return <AboutView goTo={goTo} />;
      case 2: return <ExperienceView goTo={goTo} />;
      case 3: return <CertificationsView goTo={goTo} />;
      case 4: return <PostsView goTo={goTo} />;
      default: return <ContactView goTo={goTo} />;
    }
  };

  return (
    <div
      data-theme={theme}
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="relative h-[100dvh] overflow-hidden bg-coal text-white font-sans select-none"
    >
      <BackgroundFX />
      <Embers theme={theme} />

      {/* Cinematic wipe beam on view change */}
      {beam > 0 && (
        <motion.div
          key={beam}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.7, times: [0, 0.3, 1], ease: "easeInOut" }}
          onAnimationComplete={() => setBeam(0)}
        >
          <div className="absolute inset-0 bg-black/80" />
          <motion.div
            className="absolute top-[-20%] bottom-[-20%] w-44 blur-[70px] -skew-x-12"
            style={{ backgroundColor: "color-mix(in srgb, var(--accent) 30%, transparent)" }}
            initial={{ left: "-15%" }}
            animate={{ left: "112%" }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          />
        </motion.div>
      )}

      <Navbar
        view={view}
        goTo={goTo}
        theme={theme}
        toggleTheme={() => setTheme((t) => (t === "red" ? "purple" : "red"))}
      />

      <AnimatePresence mode="wait" custom={dir}>
        <motion.main
          key={view}
          custom={dir}
          variants={viewVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-10"
        >
          {renderView()}
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
