import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { linkedinPosts } from "./data/linkedinPosts";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  ChevronLeft,
  ChevronRight,
  Download,
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

const NAV = [
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

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/* ------------------------------ Background ------------------------------ */
function BackgroundFX() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 bg-coal" />
      <div className="absolute -top-32 -left-32 w-[34rem] h-[34rem] rounded-full bg-blood/15 blur-[160px] animate-pulse-glow" />
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] rounded-full bg-blood-deep/25 blur-[160px]" />
      <div className="absolute inset-0 dot-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}

/* -------------------------------- Navbar -------------------------------- */
function Navbar({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-gradient-to-b from-black/85 via-black/40 to-transparent">
        <div className="flex items-center justify-between px-6 lg:px-14 py-5">
          <button
            onClick={() => scrollToId("home")}
            className="font-display text-xl tracking-wide text-white cursor-pointer"
          >
            KAZI<span className="text-blood">.</span>TONU
          </button>
          <nav className="hidden lg:flex items-center gap-9">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollToId(n.id)}
                className={`font-grotesk text-[11px] font-semibold tracking-[0.25em] transition-colors cursor-pointer ${
                  active === n.id ? "text-blood" : "text-zinc-400 hover:text-white"
                }`}
              >
                {n.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToId("contact")}
              className="hidden sm:inline-flex items-center gap-2 bg-blood hover:bg-red-500 text-white font-grotesk text-[11px] font-bold tracking-[0.2em] px-6 py-3 rounded-full transition-all hover:shadow-[0_0_28px_rgba(255,49,49,0.5)] cursor-pointer"
            >
              LET'S TALK <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden text-white p-2 cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-coal/97 backdrop-blur-xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-display text-xl text-white">
                KAZI<span className="text-blood">.</span>TONU
              </span>
              <button onClick={() => setOpen(false)} className="text-white p-2 cursor-pointer" aria-label="Close menu">
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
              {NAV.map((n, i) => (
                <motion.button
                  key={n.id}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.35 }}
                  onClick={() => {
                    setOpen(false);
                    setTimeout(() => scrollToId(n.id), 120);
                  }}
                  className="text-left font-display text-5xl text-white/90 hover:text-blood transition-colors py-2 cursor-pointer"
                >
                  <span className="font-grotesk text-xs text-blood align-super mr-3">0{i + 1}</span>
                  {n.label}
                </motion.button>
              ))}
            </nav>
            <div className="px-8 pb-10">
              <button
                onClick={() => {
                  setOpen(false);
                  setTimeout(() => scrollToId("contact"), 120);
                }}
                className="inline-flex items-center gap-2 bg-blood text-white font-grotesk text-xs font-bold tracking-[0.2em] px-8 py-4 rounded-full cursor-pointer"
              >
                LET'S TALK <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ------------------------------ Small parts ----------------------------- */
function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="w-2 h-2 rounded-full bg-blood animate-pulse" />
      <span className="font-grotesk text-[11px] font-bold tracking-[0.4em] text-zinc-400 uppercase">
        {children}
      </span>
    </div>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SwipeNext({ target }: { target: string }) {
  return (
    <button
      onClick={() => scrollToId(target)}
      className="group inline-flex items-center gap-3 cursor-pointer"
    >
      <span className="font-grotesk text-[11px] font-bold tracking-[0.3em] text-zinc-400 group-hover:text-white transition-colors uppercase">
        Swipe to Next
      </span>
      <span className="w-11 h-11 rounded-full border border-white/20 group-hover:border-blood group-hover:bg-blood/10 flex items-center justify-center transition-all">
        <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
      </span>
    </button>
  );
}

function SideDots({ active }: { active: string }) {
  return (
    <div className="hidden lg:flex fixed right-7 top-1/2 -translate-y-1/2 z-40 flex-col gap-3">
      {NAV.map((n) => (
        <button
          key={n.id}
          onClick={() => scrollToId(n.id)}
          aria-label={n.label}
          className={`rounded-full transition-all cursor-pointer ${
            active === n.id ? "w-2 h-7 bg-blood" : "w-2 h-2 bg-white/25 hover:bg-white/60"
          }`}
        />
      ))}
    </div>
  );
}

function CarouselButton({ dir, onClick }: { dir: "left" | "right"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === "left" ? "Previous" : "Next"}
      className="w-11 h-11 rounded-full border border-white/20 hover:border-blood hover:bg-blood/10 flex items-center justify-center transition-all cursor-pointer"
    >
      {dir === "left" ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
    </button>
  );
}

/* --------------------------------- HOME --------------------------------- */
function Home() {
  return (
    <section id="home" className="snap-section relative overflow-hidden min-h-screen flex flex-col lg:block">
      {/* Portrait glow + dot grid */}
      <div aria-hidden="true" className="absolute left-1/2 top-[56%] lg:top-1/2 -translate-x-1/2 -translate-y-1/2 w-[88vw] max-w-[640px] aspect-square z-0">
        <div className="absolute inset-0 dot-grid-red rounded-full [mask-image:radial-gradient(circle,black_25%,transparent_68%)]" />
        <div className="absolute inset-[18%] rounded-full bg-blood/25 blur-[90px] animate-pulse-glow" />
      </div>

      {/* Headline block */}
      <div className="relative z-20 px-6 lg:px-14 pt-24 lg:pt-0 lg:absolute lg:top-[12%] lg:inset-x-0 lg:text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-grotesk font-bold tracking-[0.35em] text-sm lg:text-base text-white">
            HELLO!
          </span>
          <svg viewBox="0 0 120 12" className="w-24 lg:w-28 h-3 text-blood lg:mx-auto mt-1" fill="none" aria-hidden="true">
            <path d="M2 9 C 30 2, 70 2, 118 7" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-display leading-[0.88] mt-4 text-white"
        >
          <span className="block text-[clamp(2.6rem,11vw,7rem)]">MEET</span>
          <span className="block text-[clamp(3rem,13.5vw,9.5rem)]">
            KAZI <span className="text-blood">TONU.</span>
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="font-grotesk text-[11px] lg:text-sm font-semibold tracking-[0.45em] text-zinc-300 mt-5 uppercase"
        >
          MOM-Qualified WSH Coordinator
        </motion.p>
        {/* Mobile contact row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="lg:hidden flex flex-wrap gap-x-5 gap-y-2 mt-5 font-grotesk text-[11px] text-zinc-400"
        >
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-blood" /> Singapore
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Available in 2–3 weeks
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-blood" /> {EMAIL}
          </span>
        </motion.div>
      </div>

      {/* Portrait */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto mt-4 lg:mt-0 lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2"
      >
        <img
          src="/hero-photo.png"
          alt="Kazi Tonu — WSH Coordinator"
          className="h-[42vh] lg:h-[68vh] object-contain [mask-image:linear-gradient(to_bottom,black_84%,transparent_99%)]"
          draggable={false}
        />
      </motion.div>

      {/* Desktop contact block */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="hidden lg:block absolute bottom-10 left-14 z-20 space-y-3 font-grotesk text-xs text-zinc-300"
      >
        <div className="flex items-center gap-3">
          <MapPin className="w-4 h-4 text-blood" />
          <span className="tracking-widest uppercase text-zinc-500">Location</span>
          <span className="text-white font-semibold">Singapore</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-4 h-4 flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </span>
          <span className="tracking-widest uppercase text-zinc-500">Status</span>
          <span className="text-white font-semibold">Available in 2–3 weeks</span>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="w-4 h-4 text-blood" />
          <span className="tracking-widest uppercase text-zinc-500">Email</span>
          <a href={`mailto:${EMAIL}`} className="text-white font-semibold hover:text-blood transition-colors">
            {EMAIL}
          </a>
        </div>
      </motion.div>

      {/* Swipe next */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="relative z-20 flex justify-center lg:justify-end pb-10 pt-6 lg:pt-0 lg:pb-0 lg:absolute lg:bottom-10 lg:right-14"
      >
        <SwipeNext target="about" />
      </motion.div>
    </section>
  );
}

/* --------------------------------- ABOUT -------------------------------- */
function About() {
  return (
    <section id="about" className="snap-section relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-14 min-h-screen flex flex-col justify-center py-28">
        <Reveal>
          <SectionLabel>About</SectionLabel>
          <h2 className="font-display leading-[0.9] text-[clamp(2.8rem,9vw,6.5rem)] text-white">
            SAFETY ISN'T<br />
            <span className="text-outline">A CHECKLIST.</span>
          </h2>
          <p className="font-grotesk text-blood font-semibold tracking-[0.2em] mt-5 uppercase text-sm">
            — It's a culture I build.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-zinc-400 leading-relaxed max-w-2xl mt-8 text-[15px] lg:text-base">
            I am Kazi Tonu, a MOM-qualified Workplace Safety and Health Coordinator based in
            Singapore. For nearly three years I have supervised high-risk construction
            activities — work at height, confined spaces, heavy plant operations — conducting
            thorough HIRA risk assessments and enforcing the WSH Act to keep sites
            incident-free across HDB and PUB projects.
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <div className="flex flex-wrap gap-2.5 mt-8">
            {SKILLS.map((s) => (
              <span
                key={s}
                className="font-grotesk text-[11px] font-semibold tracking-[0.18em] uppercase border border-white/15 text-zinc-300 rounded-full px-4 py-2 hover:border-blood hover:text-white transition-colors"
              >
                {s}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.35}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden mt-10">
            {STATS.map(([v, l]) => (
              <div key={l} className="bg-coal p-6 lg:p-8">
                <div className="font-display text-4xl lg:text-5xl text-white">
                  {v}
                </div>
                <div className="font-grotesk text-[10px] font-bold tracking-[0.25em] uppercase text-zinc-500 mt-2">
                  {l}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <div className="flex justify-center lg:justify-end mt-12">
          <SwipeNext target="experience" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- EXPERIENCE ------------------------------ */
function Experience() {
  return (
    <section id="experience" className="snap-section relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-14 min-h-screen flex flex-col justify-center py-28">
        <Reveal>
          <SectionLabel>Experience</SectionLabel>
          <h2 className="font-display leading-[0.9] text-[clamp(2.8rem,9vw,6.5rem)] text-white">
            SITE-TESTED<br />
            <span className="text-outline">EXPERIENCE.</span>
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5 mt-12">
          {EXPERIENCE.map((e, i) => (
            <Fragment key={e.role}>
            <Reveal delay={0.12 * i}>
              <div className="group h-full border border-white/10 bg-white/[0.03] rounded-2xl p-6 lg:p-7 hover:border-blood/60 hover:bg-blood/[0.04] transition-all duration-300">
                <span className="inline-block font-grotesk text-[10px] font-bold tracking-[0.2em] uppercase bg-blood/15 text-blood border border-blood/30 rounded-full px-3.5 py-1.5">
                  {e.period}
                </span>
                <h3 className="font-sans font-extrabold text-lg text-white leading-snug mt-5">
                  {e.role}
                </h3>
                <p className="font-grotesk text-xs text-zinc-500 mt-1.5">{e.company}</p>
                <ul className="mt-5 space-y-2.5">
                  {e.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5 text-[13px] text-zinc-400 leading-relaxed">
                      <span className="mt-[7px] w-1.5 h-1.5 shrink-0 bg-blood rounded-[2px]" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            </Fragment>
          ))}
        </div>
        <div className="flex justify-center lg:justify-end mt-12">
          <SwipeNext target="certifications" />
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- CERTIFICATIONS ---------------------------- */
function Certifications() {
  const ref = useRef<HTMLDivElement>(null);
  const go = (dir: number) => ref.current?.scrollBy({ left: dir * 330, behavior: "smooth" });
  return (
    <section id="certifications" className="snap-section relative overflow-hidden">
      <div className="min-h-screen flex flex-col justify-center py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-14 w-full">
          <Reveal>
            <div className="flex items-end justify-between gap-6">
              <div>
                <SectionLabel>Certifications</SectionLabel>
                <h2 className="font-display leading-[0.9] text-[clamp(2.8rem,9vw,6.5rem)] text-white">
                  PROOF,<br />
                  <span className="text-outline">NOT PROMISES.</span>
                </h2>
                <p className="text-zinc-500 text-sm mt-5 max-w-md">
                  {CERTIFICATIONS.length} professional safety certifications — audited, current,
                  and field-relevant.
                </p>
              </div>
              <div className="hidden sm:flex gap-3 shrink-0">
                <CarouselButton dir="left" onClick={() => go(-1)} />
                <CarouselButton dir="right" onClick={() => go(1)} />
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <div
            ref={ref}
            className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory px-6 lg:px-14 mt-10 pb-2"
          >
            {CERTIFICATIONS.map((c) => {
              const v = validity(c.expiryDate);
              return (
                <div
                  key={c.title}
                  className="snap-start shrink-0 w-[270px] lg:w-[300px] border border-white/10 bg-white/[0.03] rounded-2xl p-6 hover:border-blood/60 hover:bg-blood/[0.04] transition-all duration-300 flex flex-col"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-11 h-11 rounded-xl bg-blood/12 border border-blood/30 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-blood" />
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 font-grotesk text-[10px] font-bold tracking-widest uppercase border rounded-full px-3 py-1 ${v.cls}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${v.dot}`} />
                      {v.label}
                    </span>
                  </div>
                  <h3 className="font-sans font-bold text-[15px] text-white leading-snug mt-5 flex-1">
                    {c.title}
                  </h3>
                  <p className="font-grotesk text-xs text-zinc-500 mt-2">{c.authority}</p>
                  <p className="font-grotesk text-[11px] text-zinc-600 mt-1">{c.date}</p>
                </div>
              );
            })}
          </div>
        </Reveal>
        <div className="max-w-6xl mx-auto px-6 lg:px-14 w-full flex justify-center lg:justify-end mt-10">
          <SwipeNext target="posts" />
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- POSTS --------------------------------- */
function Posts() {
  const ref = useRef<HTMLDivElement>(null);
  const go = (dir: number) => ref.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  const fmt = (iso: string) =>
    new Date(iso + "T00:00:00").toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  return (
    <section id="posts" className="snap-section relative overflow-hidden">
      <div className="min-h-screen flex flex-col justify-center py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-14 w-full">
          <Reveal>
            <div className="flex items-end justify-between gap-6">
              <div>
                <SectionLabel>Site Diary</SectionLabel>
                <h2 className="font-display leading-[0.9] text-[clamp(2.8rem,9vw,6.5rem)] text-white">
                  <span className="text-outline">FROM THE</span>
                  <br />
                  FIELD.
                </h2>
                <p className="text-zinc-500 text-sm mt-5 max-w-md">
                  Real site lessons from my LinkedIn — posted regularly, straight from the ground.
                </p>
              </div>
              <div className="hidden sm:flex gap-3 shrink-0">
                <CarouselButton dir="left" onClick={() => go(-1)} />
                <CarouselButton dir="right" onClick={() => go(1)} />
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <div
            ref={ref}
            className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory px-6 lg:px-14 mt-10 pb-2"
          >
            {linkedinPosts.map((p) => (
              <a
                key={p.id}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="snap-start shrink-0 w-[280px] lg:w-[320px] border border-white/10 bg-white/[0.03] rounded-2xl overflow-hidden hover:border-blood/60 transition-all duration-300 group"
              >
                <div className="aspect-[4/3] overflow-hidden bg-zinc-900">
                  <img
                    src={p.image}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between font-grotesk text-[11px] text-zinc-500">
                    <span>{fmt(p.date)}</span>
                    {p.reactions != null && <span>♥ {p.reactions}</span>}
                  </div>
                  <p className="text-[13px] text-zinc-300 leading-relaxed mt-3 line-clamp-3">
                    {p.text}
                  </p>
                  <span className="inline-flex items-center gap-1.5 font-grotesk text-[11px] font-bold tracking-[0.18em] uppercase text-blood mt-4">
                    <Linkedin className="w-3.5 h-3.5" /> View post
                  </span>
                </div>
              </a>
            ))}
          </div>
        </Reveal>
        <div className="max-w-6xl mx-auto px-6 lg:px-14 w-full flex justify-center lg:justify-end mt-10">
          <SwipeNext target="contact" />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- CONTACT -------------------------------- */
function Contact() {
  return (
    <section id="contact" className="snap-section relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-14 min-h-screen flex flex-col justify-center py-28">
        <Reveal>
          <SectionLabel>Contact</SectionLabel>
          <h2 className="font-display leading-[0.85] text-[clamp(4rem,17vw,12rem)] text-white">
            LET'S<br />
            <span className="text-blood">TALK.</span>
          </h2>
          <p className="text-zinc-400 max-w-xl mt-6 text-[15px] leading-relaxed">
            Have a site that needs a safety leader your management can trust? My line is open —
            call, WhatsApp, or mail me anytime.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="flex flex-wrap gap-4 mt-10">
            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-blood hover:bg-red-500 text-white font-grotesk text-xs font-bold tracking-[0.2em] uppercase px-8 py-4 rounded-full transition-all hover:shadow-[0_0_32px_rgba(255,49,49,0.5)]"
            >
              <Download className="w-4 h-4" /> Download CV
            </a>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 border border-white/20 hover:border-blood text-white font-grotesk text-xs font-bold tracking-[0.2em] uppercase px-8 py-4 rounded-full transition-all"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
            <a
              href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2.5 border border-white/20 hover:border-blood text-white font-grotesk text-xs font-bold tracking-[0.2em] uppercase px-8 py-4 rounded-full transition-all"
            >
              <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2.5 border border-white/20 hover:border-blood text-white font-grotesk text-xs font-bold tracking-[0.2em] uppercase px-8 py-4 rounded-full transition-all"
            >
              <Mail className="w-4 h-4" /> Email
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.25}>
          <div className="border-t border-white/10 mt-16 lg:mt-24 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <span className="font-display text-lg text-white">
              KAZI<span className="text-blood">.</span>TONU
            </span>
            <span className="font-grotesk text-[11px] tracking-[0.2em] uppercase text-zinc-600">
              © 2026 Kazi Tonu — WSH Coordinator, Singapore
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------- APP ---------------------------------- */
export default function App() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-coal text-white font-sans overflow-x-clip">
      <BackgroundFX />
      <Navbar active={active} />
      <SideDots active={active} />
      <main className="relative z-10">
        <Home />
        <About />
        <Experience />
        <Certifications />
        <Posts />
        <Contact />
      </main>
    </div>
  );
}
