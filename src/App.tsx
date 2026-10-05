/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { TechSection, TechHeader } from "./components/TechSection";
import { linkedinPosts, postsUpdatedAt } from "./data/linkedinPosts";
import {
  Mail,
  Phone,
  Award,
  ArrowUpRight,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  Linkedin,
  MessageCircle,
  Copy,
  Check,
  Menu,
  X,
  Download,
  HardHat,
  MapPin,
} from "lucide-react";

/* ---------------------------------- hooks ---------------------------------- */

function useCountUp(target: number, started: boolean, duration = 1500) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!started) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);
  return value;
}

/* ---------------------------------- data ----------------------------------- */

export default function App() {
  const [certFilter, setCertFilter] = useState<"all" | "lifetime" | "valid" | "expiring">("all");
  const [copiedText, setCopiedText] = useState("");
  const [skillsVisible, setSkillsVisible] = useState(false);
  const skillsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSkillsVisible(true);
          if (skillsRef.current) observer.unobserve(skillsRef.current);
        }
      },
      { threshold: 0.15 }
    );
    if (skillsRef.current) observer.observe(skillsRef.current);
    return () => observer.disconnect();
  }, []);

  const cvUrl = "https://drive.google.com/file/d/1Gq8-4htQksUC_7xIKiOkxtJC25Q96ySf/view?usp=sharing";

  const aboutSkills = [
    { label: "WSH & MOM COMPLIANCE", percentage: 98 },
    { label: "RISK ASSESSMENT (HIRA)", percentage: 95 },
    { label: "HIGH-RISK SUPERVISION", percentage: 92 },
    { label: "SAFETY AUDITS & DRILLS", percentage: 90 },
    { label: "INCIDENT INVESTIGATION", percentage: 88 },
  ];

  const stats = [
    { target: 3, suffix: "+", label: "Years on Singapore Sites" },
    { target: 15, suffix: "", label: "Professional Certifications" },
    { target: 150, suffix: "+", label: "Safety Briefings Delivered" },
    { target: 100, suffix: "%", label: "MOM Compliance Focus" },
  ];

  const marqueeItems = [
    "MOM-QUALIFIED WSH COORDINATOR",
    "HDB & PUB PROJECT EXPERIENCE",
    "15 PROFESSIONAL CERTIFICATIONS",
    "HIRA RISK ASSESSMENT",
    "PERMIT-TO-WORK SYSTEMS",
    "ZERO-INCIDENT FOCUS",
  ];

  const handleCopyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(""), 2000);
  };

  const resumeDetails = {
    name: "Kazi Tonu",
    title: "Workplace Safety and Health (WSH) Coordinator",
    location: "Singapore",
    status: "Available for Global Placement",
    summary: "Dedicated, MOM-skilled Workplace Safety and Health Coordinator with proactive experience supervising high-risk activities, enforcing Singapore WSH Act compliance, and conducting thorough hazard assessments (HIRA) to maintain zero-incident workplaces in the construction and engineering sectors.",
    experience: [
      {
        role: "Workplace Safety and Health Coordinator",
        company: "Success Forever Construction & Maintenance Pte Ltd",
        period: "Dec 2023 - Present",
        bullets: [
          "Conduct daily toolbox meetings and safety briefings for site workers",
          "Manage and enforce the Permit-to-Work (PTW) system on site",
          "Carry out site inspections, hazard identification and risk assessments (HIRA)",
          "Ensure compliance with MOM WSH regulations across HDB and PUB project sites"
        ]
      },
      {
        role: "Workplace Safety and Health Management Construction Industry Supervisor",
        company: "Success Forever Construction & Maintenance Pte Ltd",
        period: "May 2023 - Nov 2023",
        bullets: [
          "Supervised challenging work-at-height activities, ensuring full regulatory alignment with MOM safety bylaws.",
          "Operated hydraulic boom lifts and backed up technical crews to safely complete high-elevated assignments.",
          "Strictly enforced safety briefings, harness requirements, and daily site audits throughout working hours."
        ]
      },
      {
        role: "General Worker",
        company: "Success Forever Construction & Maintenance Pte Ltd",
        period: "Feb 2023 - May 2023",
        bullets: [
          "Supported groundwork logistics, rigorous materials handling, and diverse general construction operations.",
          "Acquired strong hands-on insight into site layouts, technical equipment, and essential safety procedures."
        ]
      }
    ],
    education: [
      {
        degree: "Higher Secondary Certificate (HSC), Business/Commerce",
        institution: "Naria Govt College",
        period: "2018 - 2019 (Grade: A-)"
      },
      {
        degree: "Secondary School Certificate (SSC), Business/Commerce",
        institution: "Naria BL Model High School",
        period: "2015 - 2017"
      },
      {
        degree: "Junior School Certificate (JSC)",
        institution: "Naria BL Model High School",
        period: "2012 - 2014"
      }
    ]
  };

  const getValidityDetails = (expiryDate: string | null) => {
    if (!expiryDate) {
      return {
        status: "lifetime" as const,
        labelText: "Unlimited • No Expiry",
        badgeColor: "bg-emerald-950/60 text-emerald-400 border-emerald-800",
      };
    }
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffMs = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
      return {
        status: "expired" as const,
        labelText: "Expired / Needs Renewal",
        badgeColor: "bg-red-950/60 text-red-400 border-red-800",
      };
    }

    if (diffDays <= 60) {
      return {
        status: "expiring" as const,
        labelText: `${diffDays} Days Left (Renew Soon)`,
        badgeColor: "bg-amber-950/60 text-amber-400 border-amber-800",
      };
    }

    return {
      status: "valid" as const,
      labelText: `${diffDays} Days Left (Valid until ${expiry.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })})`,
      badgeColor: "bg-emerald-950/60 text-emerald-400 border-emerald-800",
    };
  };

  const formatPostDate = (iso: string) => {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  };

  const certificationsList = [
    {
      title: "Digital Marketing Certified",
      authority: "HubSpot Academy",
      date: "Issued Jul 2026",
      description: "Professional certification covering digital marketing strategy, campaign planning, and online audience engagement.",
      expiryDate: "2027-07-31"
    },
    {
      title: "Perform Work in Confined Space",
      authority: "Eversafe Academy",
      date: "Issued Aug 2024",
      description: "Gas assessment, toxic ventilation monitoring, closed workspace logging, and rapid extraction emergency logistics.",
      expiryDate: "2027-08-31"
    },
    {
      title: "Manage Work-at-Height",
      authority: "Eversafe Academy",
      date: "Issued Jul 2023",
      description: "Specialized training for supervising elevated locations, implementing solid fall containment, protective setups, and MOM guidelines.",
      expiryDate: null
    },
    {
      title: "Operate Boom Lift",
      authority: "AAT Training Hub Pte Ltd",
      date: "Issued May 2023",
      description: "Core heavy hydraulics license to navigate high aerial lifts, boom stability controls, safety harnesses, and field operation safety.",
      expiryDate: "2028-05-31"
    },
    {
      title: "Advance Certificate in Workplace Safety and Health",
      authority: "Greensafe International Pte Ltd",
      date: "Issued Nov 2023",
      description: "Comprehensive qualification mapping safety standards, advanced compliance management rules, and construction safety control systems.",
      expiryDate: null
    },
    {
      title: "Occupational First Aid Course",
      authority: "Eversafe Academy",
      date: "Issued Jul 2026",
      description: "Certified occupational first aid responder for industrial & construction sites, emergency CPR/AED resuscitation, trauma management, and workplace casualty triage.",
      expiryDate: "2028-07-31"
    },
    {
      title: "International Labour Organisation",
      authority: "3S LIFE SAFE AKADEMIE PRIVATE LIMITED",
      date: "Issued Mar 2026",
      description: "Comprehensive alignment on core international labour safety and health guidelines, ethical standards, and global worker protection principles.",
      expiryDate: null
    },
    {
      title: "WSH Coordinator Refresher Training",
      authority: "SCAL Academy",
      date: "Issued Jan 2026",
      description: "Recertification covering critical updates in workplace safety and health coordination, legislative transformations, and accident mitigation.",
      expiryDate: "2028-01-31"
    },
    {
      title: "Workplace Safety and Health Control Measures-4",
      authority: "Greensafe International Pte Ltd",
      date: "Issued Dec 2025",
      description: "Advanced training on WSH control measures, the hierarchy of controls, and practical hazard elimination on construction sites.",
      expiryDate: null
    },
    {
      title: "Introduction to OSHA; Safety Standards and Compliance",
      authority: "Coursera",
      date: "Issued Jan 2026",
      description: "Foundational training in OSHA safety standards, hazard identification, and regulatory compliance frameworks.",
      expiryDate: null
    },
    {
      title: "Psychological Safety",
      authority: "Coursera",
      date: "Issued Jan 2026",
      description: "Frameworks for building open, secure safety systems, encouraging open communication, and minimizing workplace operational worries.",
      expiryDate: null
    },
    {
      title: "Responders Plus Programme",
      authority: "Singapore Civil Defence Force",
      date: "Issued Jun 2025",
      description: "Community emergency preparedness training covering fire safety, first response actions, and emergency evacuation procedures.",
      expiryDate: "2027-06-30"
    },
    {
      title: "Befriender Training",
      authority: "Singapore Red Cross",
      date: "Issued Aug 2024",
      description: "Training in befriending and providing emotional support to vulnerable individuals in the community.",
      expiryDate: "2026-08-31"
    },
    {
      title: "Psychological First Aid",
      authority: "Singapore Red Cross",
      date: "Issued Aug 2024",
      description: "Practical skills for delivering psychological first aid and emotional support during crises and emergencies.",
      expiryDate: "2026-08-31"
    },
    {
      title: "Workplace Safety and Health Management in Construction Industry",
      authority: "Eversafe Academy",
      date: "Issued Jun 2023",
      description: "Construction-specific regulations training covering active operations, heavy load staging, and field hazard isolation controls.",
      expiryDate: null
    }
  ];

  const specializedSkillsList = [
    {
      name: "Workplace Safety & Health (WSH) Compliance",
      percentage: "100%",
      metrics: "Certified WSH Coordinator",
      description: "Formulating strict compliance pathways adhering directly to Singapore WSH Act and local Ministry of Manpower (MOM) safety regulations.",
      aspects: ["Singapore WSH Act", "MOM Safety Bylaws", "Regulatory Compliance"]
    },
    {
      name: "Hazard Identification & Risk Assessment (HIRA)",
      percentage: "100%",
      metrics: "bizSAFE2 Implementation Specialist",
      description: "Utilizing professional risk assessment techniques to preemptively target operational site gaps and institute fall-containment actions.",
      aspects: ["HIRA Matrices", "bizSAFE2 Planning", "Site-wide Hazard Audits"]
    },
    {
      name: "Safety Supervision & Field Audits",
      percentage: "97%",
      metrics: "Active Elevated Site Inspector",
      description: "Directing high-risk operations including work-at-height, boom lift coordinates, confined spaces, and regular site machinery audits.",
      aspects: ["Work At Height", "Confined Spaces", "BoomLift Coordination"]
    },
    {
      name: "Incident Investigation & Root Cause Analysis",
      percentage: "94%",
      metrics: "RCA Investigation Specialist",
      description: "Evaluating on-site incidents systematically to extract key breakdown layers, draft compliance reporting, and set secure containment logs.",
      aspects: ["Root Cause Analysis", "Preventative Directives", "Accident Prevention"]
    },
    {
      name: "Training & Toolbox Talk Delivery",
      percentage: "98%",
      metrics: "150+ Technical Briefings Conducted",
      description: "Instructing local and diverse multi-cultural crews in safety precautions, harness fittings, chemical/machinery handling sheets, and responder roles.",
      aspects: ["Daily Toolbox Talks", "Site Drill Management", "Safety Culture Activation"]
    }
  ];

  const filteredCerts = certificationsList.filter((cert) => {
    const details = getValidityDetails(cert.expiryDate);
    if (certFilter === "all") return true;
    if (certFilter === "lifetime") return details.status === "lifetime";
    if (certFilter === "valid") return details.status === "valid";
    if (certFilter === "expiring") return details.status === "expiring" || details.status === "expired";
    return true;
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "summary", "experience", "certifications", "posts", "competencies", "contact"];
      const scrollPosition = window.innerHeight / 2 + window.scrollY;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 72;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  const navItems = [
    { id: "home", label: "HOME" },
    { id: "summary", label: "ABOUT" },
    { id: "experience", label: "EXPERIENCE" },
    { id: "certifications", label: "CERTIFICATIONS" },
    { id: "posts", label: "POSTS" },
    { id: "competencies", label: "EXPERTISE" },
    { id: "contact", label: "CONTACT" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-zinc-100 font-sans antialiased selection:bg-amber-400 selection:text-black overflow-x-clip">

      {/* ------------------------------- Header ------------------------------ */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[#0a0a0c]/85 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 py-4">
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, "home")}
            className="font-display text-2xl font-black tracking-tight text-white cursor-pointer"
          >
            KAZI<span className="text-amber-400">.</span>TONU
          </a>
          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`text-[11px] font-bold tracking-[0.18em] uppercase transition-colors cursor-pointer ${
                    isActive ? "text-amber-400" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href="#contact"
              onClick={(e) => scrollToSection(e, "contact")}
              className="hidden sm:inline-block bg-amber-400 hover:bg-amber-300 text-zinc-950 font-extrabold px-6 py-2.5 rounded-full text-[11px] tracking-[0.18em] uppercase transition-colors shadow-[0_0_24px_rgba(251,191,36,0.35)] cursor-pointer"
            >
              Hire Me
            </motion.a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-white/5 px-6 py-4 flex flex-col space-y-3 overflow-hidden bg-[#0a0a0c]/95"
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => scrollToSection(e, item.id)}
                    className={`text-xs font-bold tracking-[0.18em] uppercase cursor-pointer flex items-center gap-2 ${
                      isActive ? "text-amber-400" : "text-zinc-300"
                    }`}
                  >
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                    {item.label}
                  </a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* -------------------------------- Hero ------------------------------- */}
      <section id="home" className="relative overflow-hidden bg-blueprint pt-28 sm:pt-32 pb-16 lg:py-0 lg:min-h-screen lg:flex lg:items-center">
        {/* Amber glow accents */}
        <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-amber-500/10 blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 -right-40 w-[560px] h-[560px] rounded-full bg-amber-400/10 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[420px] h-[420px] rounded-full bg-amber-400/5 blur-[120px] pointer-events-none" />
        {/* Giant watermark */}
        <div aria-hidden="true" className="pointer-events-none select-none absolute inset-x-0 top-14 lg:top-1/2 lg:-translate-y-1/2 flex justify-center">
          <span className="font-display font-black uppercase whitespace-nowrap leading-none text-[27vw] lg:text-[19rem] text-transparent [-webkit-text-stroke:1.5px_rgba(251,191,36,0.10)]">
            Safety
          </span>
        </div>
        {/* Bottom fade into next section */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0b0b0d] to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-center">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-bold tracking-[0.28em] text-amber-400 uppercase border border-amber-400/25 bg-amber-400/5 rounded-full px-4 py-2"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
              </span>
              MOM-Qualified WSH Coordinator — Singapore
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="font-display text-6xl sm:text-7xl md:text-8xl font-black text-white tracking-tight uppercase leading-[0.95]"
            >
              Kazi<br />Tonu<span className="text-amber-400">.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-xl"
            >
              I keep construction sites <span className="text-white font-semibold">safe, compliant, and incident-free</span> — from
              daily toolbox talks to HIRA risk assessments and Permit-to-Work enforcement across{" "}
              <span className="text-amber-400 font-semibold">HDB and PUB projects</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs font-semibold tracking-wide text-zinc-400"
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" /> Singapore
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                Available in 2–3 weeks
              </span>
              <span className="inline-flex items-center gap-1.5">
                <HardHat className="w-3.5 h-3.5 text-amber-400" /> Construction & Built Environment
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <motion.a
                whileHover={{ scale: 1.04, boxShadow: "0 0 32px rgba(251,191,36,0.45)" }}
                whileTap={{ scale: 0.96 }}
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-extrabold px-8 py-4 rounded-full text-xs tracking-[0.18em] uppercase transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" /> Download CV
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.04, borderColor: "#fbbf24" }}
                whileTap={{ scale: 0.96 }}
                href="#contact"
                onClick={(e) => scrollToSection(e, "contact")}
                className="inline-block border border-zinc-700 hover:border-amber-400 text-white font-extrabold px-8 py-4 rounded-full text-xs tracking-[0.18em] uppercase transition-colors cursor-pointer"
              >
                Contact Me
              </motion.a>
            </motion.div>

            {/* Mini stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-x-10 gap-y-4 pt-6 border-t border-white/8 max-w-xl"
            >
              {[
                ["3+", "Years Experience"],
                ["15", "Certifications"],
                ["HDB & PUB", "Project Sites"],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="font-display text-2xl sm:text-3xl font-black text-white">{v}</div>
                  <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 mt-1">{l}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative mx-auto w-full max-w-sm"
          >
            {/* Viewfinder corner ticks */}
            <div aria-hidden="true" className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-amber-400/70 rounded-tl-xl" />
            <div aria-hidden="true" className="absolute -top-3 -right-3 w-10 h-10 border-t-2 border-r-2 border-amber-400/70 rounded-tr-xl" />
            <div aria-hidden="true" className="absolute -bottom-3 -left-3 w-10 h-10 border-b-2 border-l-2 border-amber-400/70 rounded-bl-xl" />
            <div aria-hidden="true" className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-amber-400/70 rounded-br-xl" />
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-amber-400/25 via-transparent to-transparent blur-2xl pointer-events-none" />
            <div className="relative rounded-[2rem] overflow-hidden border border-amber-400/30 shadow-[0_30px_80px_-20px_rgba(251,191,36,0.25)]">
              <img
                src="/hero-photo.png"
                alt="Kazi Tonu — WSH Coordinator"
                className="w-full aspect-[4/5] object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
            {/* Floating badges */}
            <div className="animate-floaty absolute -left-6 top-10 bg-zinc-950/90 backdrop-blur border border-amber-400/30 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl">
              <div className="w-9 h-9 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="text-xs font-extrabold text-white uppercase tracking-wide">MOM Qualified</div>
                <div className="text-[10px] text-zinc-500 font-mono">WSH Coordinator</div>
              </div>
            </div>
            <div className="animate-floaty-delayed absolute -right-4 bottom-12 bg-zinc-950/90 backdrop-blur border border-amber-400/30 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl">
              <div className="w-9 h-9 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center">
                <Award className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="text-xs font-extrabold text-white uppercase tracking-wide">15 Certifications</div>
                <div className="text-[10px] text-zinc-500 font-mono">Safety & Health</div>
              </div>
            </div>
          </motion.div>
        </div>
        {/* Scroll cue */}
        <motion.a
          href="#summary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-zinc-500 hover:text-amber-400 transition-colors"
          aria-label="Scroll to content"
        >
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Scroll</span>
          <span className="w-5 h-9 rounded-full border border-current flex justify-center pt-1.5">
            <motion.span
              animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 rounded-full bg-current"
            />
          </span>
        </motion.a>
      </section>

      {/* ---------------------------- Trust marquee --------------------------- */}
      <div className="border-y border-amber-400/15 bg-[#0d0d0f] py-4 overflow-hidden select-none">
        <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-8 text-xs font-extrabold tracking-[0.25em] text-zinc-400 uppercase">
              {item} <span className="text-amber-400">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ------------------------------- Main ------------------------------- */}
      <main className="max-w-6xl mx-auto px-4 lg:px-8 py-20 space-y-24">

        {/* ------------------------------- About ------------------------------ */}
        <TechSection id="summary" className="scroll-mt-24">
          <TechHeader title="About Me" subtitle="The safety leader your site deserves — certified, field-tested, and relentless about compliance." />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mt-12">
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 space-y-6"
            >
              <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Safety isn't a checklist.<br />
                <span className="text-amber-400">It's a culture I build.</span>
              </h3>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                I am Kazi Tonu, a MOM-qualified Workplace Safety and Health Coordinator based in Singapore.
                For nearly three years I have supervised high-risk construction activities — work at height,
                confined spaces, heavy plant operations — conducting thorough HIRA risk assessments and
                enforcing full MOM regulatory compliance across HDB and PUB project sites.
              </p>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                My approach is simple: be on the ground, speak the workers' language, and never compromise
                on a control measure. That is how zero-incident workplaces are built.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <motion.a
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  href={cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-extrabold px-7 py-3.5 rounded-full text-xs tracking-[0.18em] uppercase transition-all cursor-pointer shadow-[0_0_24px_rgba(251,191,36,0.3)]"
                >
                  <Download className="w-4 h-4" /> Download My CV
                </motion.a>
                <span className="inline-flex items-center gap-2 text-xs text-zinc-500 font-mono">
                  <MapPin className="w-4 h-4 text-amber-400" /> Singapore • Available in 2–3 weeks
                </span>
              </div>
            </motion.div>

            <div ref={skillsRef} className="lg:col-span-6 space-y-6 bg-white/[0.02] border border-white/8 rounded-2xl p-6 sm:p-8">
              <p className="text-[11px] font-extrabold tracking-[0.25em] uppercase text-zinc-500">Core Capabilities</p>
              {aboutSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white">
                    <span>{skill.label}</span>
                    <span className="text-amber-400 font-mono font-bold">{skillsVisible ? skill.percentage : 0}%</span>
                  </div>
                  <div className="relative w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                      initial={{ width: 0 }}
                      animate={skillsVisible ? { width: `${skill.percentage}%` } : {}}
                      transition={{ duration: 1.1, delay: index * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </TechSection>

        {/* ------------------------------ Stats band ----------------------------- */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => {
            const v = useCountUp(s.target, statsInView);
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-gradient-to-b from-white/[0.04] to-transparent border border-white/8 rounded-2xl p-6 text-center"
              >
                <div className="font-display text-4xl sm:text-5xl font-black text-amber-400">
                  {v}{s.suffix}
                </div>
                <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 mt-2">{s.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* ----------------------------- Experience ---------------------------- */}
        <TechSection id="experience" className="scroll-mt-24">
          <TechHeader title="Experience" subtitle="A field-first career — from the ground up to site safety leadership." />
          <div className="relative mt-14 max-w-3xl mx-auto">
            <div className="absolute left-2 sm:left-3 top-1 bottom-1 w-px bg-gradient-to-b from-amber-400 via-amber-400/40 to-transparent" />
            <div className="space-y-10">
              {resumeDetails.experience.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, delay: idx * 0.08 }}
                  className="relative pl-10 sm:pl-12"
                >
                  <span className="absolute left-2 sm:left-3 top-1.5 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-amber-400 ring-4 ring-amber-400/20" />
                  <div className="bg-white/[0.02] border border-white/8 hover:border-amber-400/40 rounded-2xl p-6 sm:p-7 transition-colors">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-lg sm:text-xl font-extrabold text-white leading-snug">{exp.role}</h3>
                        <p className="text-sm text-amber-400/90 font-semibold mt-1 flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5" /> {exp.company}
                        </p>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-zinc-400 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 whitespace-nowrap">
                        {exp.period}
                      </span>
                    </div>
                    <ul className="mt-4 space-y-2.5">
                      {exp.bullets.map((b, bi) => (
                        <li key={bi} className="flex gap-3 text-sm text-zinc-400 leading-relaxed">
                          <span className="text-amber-400 mt-0.5 shrink-0">▸</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="mt-16">
            <div className="flex items-center justify-center gap-2 mb-8">
              <GraduationCap className="w-5 h-5 text-amber-400" />
              <h3 className="font-display text-lg font-extrabold text-white tracking-[0.2em] uppercase">Education</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {resumeDetails.education.map((edu, eduIdx) => (
                <motion.div
                  key={eduIdx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: eduIdx * 0.1 }}
                  whileHover={{ y: -4, borderColor: "rgba(251,191,36,0.4)" }}
                  className="bg-white/[0.02] border border-white/8 p-5 rounded-2xl space-y-1.5 transition-all"
                >
                  <span className="text-sm font-bold text-white block leading-snug">{edu.degree}</span>
                  <p className="text-xs text-zinc-500">{edu.institution}</p>
                  <span className="text-[11px] font-mono text-amber-400 block pt-1">{edu.period}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </TechSection>

        {/* --------------------------- Certifications -------------------------- */}
        <TechSection id="certifications" className="scroll-mt-24">
          <div className="text-center space-y-3">
            <TechHeader title="Certifications" subtitle="15 professional certifications — audited, current, and field-relevant." />
            <div className="flex flex-wrap justify-center gap-2 pt-4 text-xs font-bold">
              {([
                ["all", `All (${certificationsList.length})`],
                ["lifetime", `Lifetime (${certificationsList.filter(c => getValidityDetails(c.expiryDate).status === 'lifetime').length})`],
                ["valid", `Valid (${certificationsList.filter(c => getValidityDetails(c.expiryDate).status === 'valid').length})`],
                ["expiring", `Expiring (${certificationsList.filter(c => { const s = getValidityDetails(c.expiryDate).status; return s === 'expiring' || s === 'expired'; }).length})`],
              ] as const).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setCertFilter(key)}
                  className={`px-4 py-2 rounded-full border transition-all cursor-pointer ${
                    certFilter === key
                      ? "bg-amber-400 text-zinc-950 border-amber-400 shadow-[0_0_16px_rgba(251,191,36,0.35)]"
                      : "bg-white/[0.03] text-zinc-400 border-white/10 hover:border-amber-400/50 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            <AnimatePresence mode="popLayout">
              {filteredCerts.map((cert) => {
                const validity = getValidityDetails(cert.expiryDate);
                return (
                  <motion.div
                    layout
                    key={cert.title}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -4, borderColor: "rgba(251,191,36,0.45)", boxShadow: "0 12px 32px -12px rgba(251,191,36,0.2)" }}
                    className="bg-white/[0.02] border border-white/8 p-5 rounded-2xl flex flex-col justify-between space-y-3 transition-colors"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-bold text-white leading-snug">{cert.title}</h3>
                        <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      </div>
                      <p className="text-xs font-semibold text-amber-400/90">{cert.authority}</p>
                      <p className="text-[11px] font-mono text-zinc-500">{cert.date}</p>
                      <p className="text-xs text-zinc-400 leading-relaxed">{cert.description}</p>
                    </div>
                    <div className="pt-3 border-t border-white/8 flex items-center justify-end">
                      <span className={`px-2.5 py-1 rounded-full border text-[10px] font-bold ${validity.badgeColor}`}>
                        {validity.labelText}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </TechSection>

        {/* ------------------------------- Posts ------------------------------- */}
        <TechSection id="posts" className="scroll-mt-24">
          <TechHeader title="LinkedIn Posts" subtitle="Daily safety insights from the field — synced from my LinkedIn every morning." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {linkedinPosts.map((post) => (
              <motion.a
                key={post.id}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, borderColor: "rgba(251,191,36,0.45)" }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="bg-white/[0.02] border border-white/8 rounded-2xl overflow-hidden flex flex-col transition-all group"
              >
                <div className="aspect-[4/3] overflow-hidden bg-zinc-950">
                  <img
                    src={post.image}
                    alt="LinkedIn post image"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex flex-col space-y-3 flex-1">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-amber-400">{formatPostDate(post.date)}</span>
                    <span className="text-zinc-500">
                      {post.reactions != null && `${post.reactions} reaction${post.reactions === 1 ? "" : "s"}`}
                      {post.reactions != null && post.comments != null && " · "}
                      {post.comments != null && `${post.comments} comment${post.comments === 1 ? "" : "s"}`}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-4 whitespace-pre-line">{post.text}</p>
                  <div className="pt-3 mt-auto border-t border-white/8 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-white flex items-center gap-1 group-hover:text-amber-400 transition-colors uppercase tracking-wider">
                      View on LinkedIn <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                    <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
          <p className="text-center text-[11px] font-mono text-zinc-600 mt-8">Last synced: {formatPostDate(postsUpdatedAt)}</p>
        </TechSection>

        {/* ---------------------------- Competencies ---------------------------- */}
        <TechSection id="competencies" className="scroll-mt-24">
          <TechHeader title="Expertise" subtitle="The disciplines I bring to every site, every shift." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12 max-w-5xl mx-auto">
            {specializedSkillsList.map((skill, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (idx % 2) * 0.1 }}
                whileHover={{ y: -4, borderColor: "rgba(251,191,36,0.4)" }}
                className="bg-white/[0.02] border border-white/8 rounded-2xl p-6 space-y-4 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-base font-extrabold text-white leading-snug">{skill.name}</h3>
                    <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mt-1">{skill.metrics}</p>
                  </div>
                  <span className="font-display text-2xl font-black text-amber-400 shrink-0">{skill.percentage}</span>
                </div>
                <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: skill.percentage }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                  />
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">{skill.description}</p>
                <div className="flex flex-wrap gap-2">
                  {skill.aspects.map((a, ai) => (
                    <span key={ai} className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 bg-white/5 border border-white/10 rounded-full px-3 py-1">
                      {a}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </TechSection>

        {/* ------------------------------ Contact ------------------------------ */}
        <TechSection id="contact" className="scroll-mt-24">
          <div className="relative overflow-hidden rounded-[2rem] border border-amber-400/25 bg-gradient-to-br from-amber-400/[0.07] via-transparent to-transparent p-8 sm:p-12 lg:p-16 text-center space-y-6">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[480px] h-[240px] bg-amber-400/15 blur-[100px] rounded-full pointer-events-none" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative space-y-5"
            >
              <p className="text-[11px] font-extrabold tracking-[0.3em] uppercase text-amber-400 flex items-center justify-center gap-2">
                <HardHat className="w-4 h-4" /> Available in 2–3 weeks
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Need a safety leader<br />your management can trust?
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
                Let's talk about your project. I respond within 24 hours —
                call, WhatsApp, or email, whichever suits you.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-2">
                <motion.a
                  whileHover={{ scale: 1.04, boxShadow: "0 0 32px rgba(251,191,36,0.45)" }}
                  whileTap={{ scale: 0.96 }}
                  href="https://wa.me/6580627387"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-extrabold px-8 py-4 rounded-full text-xs tracking-[0.18em] uppercase transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp Me
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  href={cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 border border-zinc-700 hover:border-amber-400 text-white font-extrabold px-8 py-4 rounded-full text-xs tracking-[0.18em] uppercase transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" /> Download CV
                </motion.a>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            {[
              {
                icon: <Mail className="w-5 h-5 text-amber-400" />,
                bg: "bg-amber-400/10 border-amber-400/25",
                label: "Email",
                value: "tonukazi@gmail.com",
                href: "mailto:tonukazi@gmail.com",
                copy: "tonukazi@gmail.com",
                copyLabel: "email",
                action: "copy" as const,
              },
              {
                icon: <Phone className="w-5 h-5 text-amber-400" />,
                bg: "bg-amber-400/10 border-amber-400/25",
                label: "WhatsApp / Phone",
                value: "+65 8062 7387",
                href: "https://wa.me/6580627387",
                copy: "+6580627387",
                copyLabel: "phone",
                action: "copy" as const,
              },
              {
                icon: <Linkedin className="w-5 h-5 text-[#0A66C2]" />,
                bg: "bg-[#0A66C2]/10 border-[#0A66C2]/25",
                label: "LinkedIn",
                value: "linkedin.com/in/kazitonu",
                href: "https://linkedin.com/in/kazitonu",
                copy: "",
                copyLabel: "",
                action: "link" as const,
              },
            ].map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                whileHover={{ y: -3 }}
                className="bg-white/[0.02] border border-white/8 hover:border-amber-400/40 p-5 rounded-2xl flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${c.bg}`}>
                    {c.icon}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.18em]">{c.label}</span>
                    <a href={c.href} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-white hover:text-amber-400 block truncate transition-colors">
                      {c.value}
                    </a>
                  </div>
                </div>
                {c.action === "copy" ? (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleCopyToClipboard(c.copy, c.copyLabel)}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors cursor-pointer shrink-0 ml-2"
                    title={`Copy ${c.copyLabel}`}
                  >
                    {copiedText === c.copyLabel ? <Check className="w-4 h-4 text-amber-400" /> : <Copy className="w-4 h-4" />}
                  </motion.button>
                ) : (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors cursor-pointer shrink-0 ml-2"
                    title="Visit LinkedIn"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {copiedText && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-2.5 bg-amber-400/10 border border-amber-400/30 rounded-xl text-xs text-amber-300 text-center font-mono max-w-md mx-auto mt-6"
              >
                ✓ Copied {copiedText === "email" ? "email" : "phone number"} to clipboard
              </motion.div>
            )}
          </AnimatePresence>
        </TechSection>
      </main>

      {/* -------------------------------- Footer ------------------------------- */}
      <footer className="border-t border-white/5 bg-[#08080a] py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <span className="font-display text-lg font-black text-white tracking-tight">
            KAZI<span className="text-amber-400">.</span>TONU
          </span>
          <span className="text-[11px] text-zinc-600 font-mono text-center">
            © {new Date().getFullYear()} Kazi Tonu • MOM-Qualified WSH Coordinator, Singapore
          </span>
          <a href="#home" onClick={(e) => scrollToSection(e, "home")} className="text-[11px] font-bold tracking-[0.2em] uppercase text-amber-400 hover:text-amber-300 cursor-pointer">
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
