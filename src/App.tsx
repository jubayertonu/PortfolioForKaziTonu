/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  FileText, 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  ArrowUpRight, 
  Menu,
  CheckCircle,
  Loader2,
  Send,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  AlertTriangle,
  Calendar,
  ChevronRight,
  User,
  MessageSquare
} from "lucide-react";
import { TypingText } from "./components/TypingText";

export default function App() {
  const [activeView, setActiveView] = useState<"hero" | "about" | "resume" | "certs" | "contact">("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navItems = [
    { label: "Home", value: "hero" },
    { label: "About", value: "about" },
    { label: "Career Progression", value: "resume" },
    { label: "Certs and Licenses", value: "certs" },
    { label: "Contact", value: "contact" }
  ];

  const certificationsList = [
    {
      title: "Advanced Certificate in Workplace Safety and Health",
      authority: "Greensafe International PTE LTD",
      code: "GS-WSH-ADV-9021",
      date: "Issued 2023",
      description: "Comprehensive qualification mapping safety standards, advanced compliance management rules, and construction safety control systems.",
      color: "#41B3A3"
    },
    {
      title: "Develop a Risk Management Implementation Plan (BizSAFE2)",
      authority: "Greensafe International PTE LTD",
      code: "GS-BIZSAFE-2-88219",
      date: "Issued 2023",
      description: "Focused training on risk prevention, forming dynamic risk matrices, and drafting compliance-proof bizSAFE hazard actions.",
      color: "#41B3A3"
    },
    {
      title: "Workplace Safety and Health Management in Construction Industry",
      authority: "Eversafe Academy PTE LTD",
      code: "EV-WAH-CON-4712",
      date: "Issued 2023",
      description: "Construction-specific regulations training covering active operations, heavy load staging, and field hazard isolation controls.",
      color: "#41B3A3"
    },
    {
      title: "Manage Work at Height",
      authority: "Eversafe Academy PTE LTD",
      code: "EV-WAH-MAN-3382",
      date: "Issued 2023",
      description: "Specialized training for supervising elevated locations, implementing solid fall containment, protective setups, and MOM guidelines.",
      color: "#41B3A3"
    },
    {
      title: "Operate BoomLift",
      authority: "AAT Training Hub PTE LTD",
      code: "AAT-BOOM-OP-2241",
      date: "Issued 2023",
      description: "Core heavy hydraulics license to navigate high aerial lifts, boom stability controls, safety harnesses, and field operation safety.",
      color: "#41B3A3"
    },
    {
      title: "Perform Work in Confined Space Operation",
      authority: "Eversafe Academy PTE LTD",
      code: "EV-CSO-PERF-97103",
      date: "Issued 2023",
      description: "Gas assessment, toxic ventilation monitoring, closed workspace logging, and rapid extraction emergency logistics.",
      color: "#41B3A3"
    },
    {
      title: "Standard First Aid Provider",
      authority: "Singapore Red Cross",
      code: "RC-SFA-PROV-1184",
      date: "Issued 2023",
      description: "Certified trauma first-aid, immediate medical response, CPR/AED coordination, and incident triage on active sites.",
      color: "#41B3A3"
    },
    {
      title: "Psychological First Aid & Befriender Training",
      authority: "Singapore Red Cross",
      code: "RC-PFA-BEF-5582",
      date: "Issued 2023",
      description: "Workplace crisis intervention, peer support systems, and active safety culture promotion centered on psychological wellbeing.",
      color: "#41B3A3"
    }
  ];

  const specializedSkillsList = [
    {
      name: "Workplace Safety & Health (WSH) Compliance",
      percentage: 100,
      metrics: "Certified WSH Coordinator",
      description: "Formulating strict compliance pathways adhering directly to Singapore WSH Act and local Ministry of Manpower (MOM) safety regulations.",
      aspects: ["Singapore WSH Act", "MOM Safety Bylaws", "Regulatory Compliance"]
    },
    {
      name: "Hazard Identification & Risk Assessment (HIRA)",
      percentage: 100,
      metrics: "bizSAFE2 Implementation Specialist",
      description: "Utilizing professional risk assessment techniques to preemptively target operational site gaps and institute fall-containment actions.",
      aspects: ["HIRA Matrices", "bizSAFE2 Planning", "Site-wide Hazard Audits"]
    },
    {
      name: "Safety Supervision & Field Audits",
      percentage: 97,
      metrics: "Active Elevated Site Inspector",
      description: "Directing high-risk operations including work-at-height, boom lift coordinates, confined spaces, and regular site machinery audits.",
      aspects: ["Work At Height", "Confined Spaces", "BoomLift Coordination"]
    },
    {
      name: "Incident Investigation & Root Cause Analysis",
      percentage: 94,
      metrics: "RCA Investigation Specialist",
      description: "Evaluating on-site incidents systematically to extract key breakdown layers, draft compliance reporting, and set secure containment logs.",
      aspects: ["Root Cause Analysis", "Preventative Directives", "Accident Prevention"]
    },
    {
      name: "Training & Toolbox Talk Delivery",
      percentage: 98,
      metrics: "150+ Technical Briefings Conducted",
      description: "Instructing local and diverse multi-cultural crews in safety precautions, harness fittings, chemical/machinery handling sheets, and responder roles.",
      aspects: ["Daily Toolbox Talks", "Site Drill Management", "Safety Culture Activation"]
    }
  ];

  const safetyChallengesList = [
    {
      id: "complacency",
      title: "Worker Complacency & High-Risk Fatigue",
      context: "On continuous long-term assignments, machinery operators often run on autopilot, causing minor safety oversights to cascade into major incidents.",
      approach: "Deploy proactive safety feedback micro-loops, random gamified safety audits, and visual reminders that maintain full hazard focus.",
    },
    {
      id: "compliance",
      title: "Rapidly Evolving Regulatory Standard Updates",
      context: "Sudden regional chemical/structural compliance updates can trigger instant training gaps or workplace shutdown mandates.",
      approach: "Maintain a continuous digitized standards matrix synced to regulatory alerts, ensuring fast policy adjustments and preventative toolbox talks.",
    },
    {
      id: "response",
      title: "Delayed Emergency Action and Dispatch",
      context: "Under crisis stress, response teams lose coordination coherence, leading to delayed medical help or hazard containment failures.",
      approach: "Establish automated site-wide warning communication workflows linked to active response protocols, and conduct unannounced drills.",
    }
  ];
  const [animationKey, setAnimationKey] = useState(0);
  const [animationStyle, setAnimationStyle] = useState(0);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [inquiryType, setInquiryType] = useState<"audits" | "hiring" | "drills">("hiring");
  const [complianceChecked, setComplianceChecked] = useState(false);

  const [activeResumeTab, setActiveResumeTab] = useState<"experience" | "competencies" | "challenges">("experience");
  const [selectedRoleIdx, setSelectedRoleIdx] = useState(0);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    }, 1200);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (activeView !== "hero") return;
    const interval = setInterval(() => {
      setAnimationKey((prev) => prev + 1);
      setAnimationStyle((prev) => {
        let nextStyle;
        do {
          nextStyle = Math.floor(Math.random() * 6);
        } while (nextStyle === prev);
        return nextStyle;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [activeView]);

  const getInitialVariant = (style: number, element: "g" | "k" | "t" | "sh" | "c") => {
    switch (style) {
      case 0:
        if (element === "g") return { y: 20, opacity: 0, x: 0, scale: 1, rotate: 0 };
        if (element === "k" || element === "t") return { y: "110%", opacity: 0, x: 0, scale: 1, rotate: 0 };
        if (element === "sh") return { y: 15, opacity: 0, x: 0, scale: 1, rotate: 0 };
        return { y: "110%", opacity: 0, x: 0, scale: 1, rotate: 0 };
      case 1:
        if (element === "g") return { y: -20, opacity: 0, x: 0, scale: 1, rotate: 0 };
        if (element === "k" || element === "t") return { y: "-110%", opacity: 0, x: 0, scale: 1, rotate: 0 };
        if (element === "sh") return { y: -15, opacity: 0, x: 0, scale: 1, rotate: 0 };
        return { y: "-110%", opacity: 0, x: 0, scale: 1, rotate: 0 };
      case 2:
        if (element === "g") return { x: -30, opacity: 0, y: 0, scale: 1, rotate: 0 };
        if (element === "k" || element === "t") return { x: "-100%", opacity: 0, y: 0, scale: 1, rotate: 0 };
        if (element === "sh") return { x: -30, opacity: 0, y: 0, scale: 1, rotate: 0 };
        return { x: "-100%", opacity: 0, y: 0, scale: 1, rotate: 0 };
      case 3:
        if (element === "g") return { x: 30, opacity: 0, y: 0, scale: 1, rotate: 0 };
        if (element === "k" || element === "t") return { x: "100%", opacity: 0, y: 0, scale: 1, rotate: 0 };
        if (element === "sh") return { x: 30, opacity: 0, y: 0, scale: 1, rotate: 0 };
        return { x: "100%", opacity: 0, y: 0, scale: 1, rotate: 0 };
      case 4:
        if (element === "g") return { scale: 0.8, opacity: 0, x: 0, y: 0, rotate: 0 };
        if (element === "k" || element === "t") return { scale: 0.85, opacity: 0, x: 0, y: 0, rotate: 0 };
        if (element === "sh") return { scale: 0.85, opacity: 0, x: 0, y: 0, rotate: 0 };
        return { scale: 0.85, opacity: 0, x: 0, y: 0, rotate: 0 };
      case 5:
        if (element === "g") return { rotate: -4, scale: 0.95, opacity: 0, x: 0, y: 0 };
        if (element === "k" || element === "t") return { rotate: 3, scale: 0.9, opacity: 0, x: 0, y: 0 };
        if (element === "sh") return { rotate: -2, scale: 0.95, opacity: 0, x: 0, y: 0 };
        return { rotate: -3, scale: 0.9, opacity: 0, x: 0, y: 0 };
      default:
        return { y: 20, opacity: 0, x: 0, scale: 1, rotate: 0 };
    }
  };

  const handleNavClick = (val: string) => {
    const el = document.getElementById(val);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMenuOpen(false);
  };

  return (
    <div className={`relative min-h-screen text-white font-sans selection:bg-white selection:text-black overflow-x-hidden flex flex-col justify-between transition-all duration-1000 ${(activeView === "about" || activeView === "certs" || activeView === "contact") ? "bg-transparent" : "bg-black"}`}>
      {/* Background Loop Videos with Smooth Responsive Crossfade */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <motion.video
          key="video-default"
          className="absolute inset-0 w-full h-full object-cover"
          src={isMobile 
            ? "https://res.cloudinary.com/dqtyuf02y/video/upload/v1781023576/HnVideoEditor_2026_06_10_004448194_lso0dp.mp4" 
            : "https://res.cloudinary.com/dqtyuf02y/video/upload/v1780853514/gemini_generated_video_8b15deec_ifrrms.mp4"}
          autoPlay loop muted playsInline
          animate={{ opacity: (activeView === "about" || activeView === "certs" || activeView === "contact") ? 0 : 0.6 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
        />
        <motion.video
          key="video-about"
          className="absolute inset-0 w-full h-full object-cover"
          src={isMobile 
            ? "https://res.cloudinary.com/dqtyuf02y/video/upload/v1781023581/HnVideoEditor_2026_06_10_004413527_h17cuf.mp4" 
            : "https://res.cloudinary.com/dqtyuf02y/video/upload/v1780853433/gemini_generated_video_fbb884cc_oo3f8m.mp4"}
          autoPlay loop muted playsInline
          animate={{ opacity: activeView === "about" ? 1.0 : 0 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
        />
        <motion.video
          key="video-certs"
          className="absolute inset-0 w-full h-full object-cover"
          src={isMobile 
            ? "https://res.cloudinary.com/dqtyuf02y/video/upload/v1781023581/HnVideoEditor_2026_06_10_004330226_gdoktp.mp4" 
            : "https://res.cloudinary.com/dqtyuf02y/video/upload/v1780853432/Make_character_alive_blinking_br__202606072030_onzb7e.mp4"}
          autoPlay loop muted playsInline
          animate={{ opacity: activeView === "certs" ? 1.0 : 0 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
        />
        <motion.video
          key="video-contact"
          className="absolute inset-0 w-full h-full object-cover"
          src={isMobile 
            ? "https://res.cloudinary.com/dqtyuf02y/video/upload/v1781023584/HnVideoEditor_2026_06_10_004224069_rnmhex.mp4" 
            : "https://res.cloudinary.com/dqtyuf02y/video/upload/v1780853433/gemini_generated_video_2c0a1bca_hpbmpi.mp4"}
          autoPlay loop muted playsInline
          animate={{ opacity: activeView === "contact" ? 1.0 : 0 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute inset-0 bg-black/35 bg-gradient-to-b from-black/50 via-transparent to-black/50" 
          animate={{ opacity: (activeView === "about" || activeView === "certs" || activeView === "contact") ? 0.7 : 1.0 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
        />
      </div>

      {/* 1. HEADER SECTION */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-0 z-50 w-full bg-black/60 backdrop-blur-md border-b border-white/10 py-6 transition-all duration-300"
      >
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center relative">
          <button 
            onClick={() => handleNavClick("hero")}
            className="text-2xl font-black tracking-tighter text-white select-none cursor-pointer hover:opacity-80 transition-opacity z-50"
          >
            KT
          </button>

          <nav className="hidden md:flex items-center gap-x-8">
            {navItems.map((item) => {
              const isActive = activeView === item.value;
              return (
                <button
                  key={item.value}
                  onClick={() => handleNavClick(item.value)}
                  className={`text-sm font-bold tracking-widest transition-colors duration-300 relative py-1 group uppercase cursor-pointer ${
                    isActive ? "text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-0 h-[1.5px] bg-[#41B3A3] transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </button>
              );
            })}
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white hover:text-[#41B3A3] transition-colors p-1 focus:outline-none z-50 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-lg border-b border-white/10 flex flex-col items-center py-8 space-y-5 md:hidden z-40 shadow-2xl"
              >
                {navItems.map((item) => {
                  const isActive = activeView === item.value;
                  return (
                    <button
                      key={item.value}
                      onClick={() => handleNavClick(item.value)}
                      className={`text-sm font-bold tracking-widest uppercase transition-all duration-300 py-2 px-6 rounded-xl w-[80%] text-center ${
                        isActive 
                          ? "text-black bg-[#41B3A3] shadow-lg shadow-[#41B3A3]/25" 
                          : "text-zinc-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* 2. MAIN HUB VIEWPORT */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex-grow flex flex-col py-12 md:py-20 space-y-32 md:space-y-48">
        
        {/* HERO SECTION */}
        <section id="hero" className="w-full min-h-[75vh] flex items-center justify-start scroll-mt-24 pt-4 pb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start text-left w-full max-w-5xl space-y-8 md:space-y-12"
          >
            <div className="flex flex-col">
              <motion.div 
                key={`g-${animationKey}`}
                initial={getInitialVariant(animationStyle, "g")}
                animate={{ y: 0, x: 0, scale: 1, rotate: 0, opacity: 1.0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-lg md:text-xl font-bold text-[#41B3A3] mb-2 md:mb-4 tracking-[0.1em] uppercase select-none"
              >
                Hello! I'm
              </motion.div>

              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tight leading-[0.85] text-white flex flex-col select-none">
                <span className="block overflow-hidden relative">
                  <motion.span
                    key={`k-${animationKey}`}
                    initial={getInitialVariant(animationStyle, "k")}
                    animate={{ y: 0, x: 0, scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="block"
                  >
                    KAZI
                  </motion.span>
                </span>
                <span className="block overflow-hidden relative">
                  <motion.span
                    key={`t-${animationKey}`}
                    initial={getInitialVariant(animationStyle, "t")}
                    animate={{ y: 0, x: 0, scale: 1, rotate: 0, opacity: 0.95 }}
                    transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="block text-white/95"
                  >
                    TONU
                  </motion.span>
                </span>
              </h1>
            </div>

            <div className="flex flex-col pt-6 md:pt-8 border-t border-white/5 w-full items-end text-right">
              <div className="max-w-3xl flex flex-col items-end text-right">
                <div className="overflow-hidden mb-2">
                  <motion.div 
                    key={`sh-${animationKey}`}
                    initial={getInitialVariant(animationStyle, "sh")}
                    animate={{ y: 0, x: 0, scale: 1, rotate: 0, opacity: 1.0 }}
                    transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
                    className="text-xs sm:text-sm md:text-base font-extrabold tracking-[0.25em] text-[#41B3A3] uppercase select-none"
                  >
                    WORKPLACE SAFETY AND HEALTH
                  </motion.div>
                </div>

                <div className="overflow-hidden">
                  <motion.h2 
                    key={`c-${animationKey}`}
                    initial={getInitialVariant(animationStyle, "c")}
                    animate={{ y: 0, x: 0, scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ duration: 1.1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tight leading-none text-white"
                  >
                    COORDINATOR
                  </motion.h2>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ABOUT ME SECTION */}
        <section id="about" className="w-full min-h-[75vh] flex items-center justify-center scroll-mt-24 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col md:grid md:grid-cols-12 gap-8 items-center"
          >
            <div className="hidden md:block md:col-span-4 lg:col-span-5" />

            {/* Added standard glassmorphism blur layers */}
            <div className="col-span-12 md:col-span-8 lg:col-span-7 flex flex-col justify-center text-left space-y-6 bg-black/65 border border-white/15 p-6 sm:p-10 md:p-12 rounded-3xl relative overflow-hidden backdrop-blur-lg shadow-2xl transition-all duration-500 hover:border-[#41B3A3]/30 w-full">
              <div className="text-[#41B3A3] text-sm md:text-base font-semibold tracking-[0.25em] uppercase">
                ABOUT ME
              </div>
              <TypingText 
                text="Certified professional with expertise in implementing safety protocols, conducting risk assessments, and ensuring compliance. Skilled in team supervision and maintaining a safe workplace."
                className="text-xl sm:text-2xl md:text-3xl lg:text-[2.5rem] font-medium text-white/95 leading-[1.35] tracking-wide"
              />
            </div>
          </motion.div>
        </section>

        {/* RESUME CARD SECTION */}
        <section id="resume" className="w-full min-h-[75vh] flex items-center justify-center scroll-mt-24 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col md:grid md:grid-cols-12 gap-8 items-start"
          >
            <div className="hidden md:block md:col-span-3 lg:col-span-4" />

            {/* Added standard glassmorphism blur layers */}
            <div className="col-span-12 md:col-span-9 lg:col-span-8 flex flex-col justify-center text-left space-y-6 md:pl-6 max-w-4xl w-full bg-black/55 border border-white/15 p-6 sm:p-8 md:p-10 rounded-3xl relative overflow-hidden backdrop-blur-lg shadow-2xl">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6 w-full">
                <div>
                  <span className="text-[#41B3A3] text-xs font-mono tracking-[0.2em] font-extrabold uppercase">// COMPLIANCE DOSSIER</span>
                  <h3 className="text-3xl sm:text-4xl font-black uppercase text-white mt-1">{resumeDetails.name}</h3>
                  <p className="text-xs font-mono tracking-wider text-zinc-400 uppercase font-bold">{resumeDetails.title}</p>
                </div>
                <button 
                  onClick={() => window.print()}
                  className="text-[10px] tracking-widest font-mono uppercase bg-white/5 border border-white/10 hover:bg-[#41B3A3] hover:text-black py-2.5 px-4.5 rounded-xl transition-all flex items-center space-x-2 cursor-pointer font-bold shrink-0 self-start sm:self-auto"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>PRINT DOSSIER</span>
                </button>
              </div>

              <div className="space-y-2 bg-white/[0.03] border border-white/10 p-4.5 rounded-2xl">
                <h4 className="text-[10px] font-mono font-black uppercase tracking-widest text-[#41B3A3]">// PROFESSIONAL SUMMARY</h4>
                <p className="text-zinc-200 leading-relaxed text-xs sm:text-sm">{resumeDetails.summary}</p>
              </div>

              <div className="grid grid-cols-3 gap-2 p-1.5 bg-white/[0.03] border border-white/10 rounded-2xl w-full font-mono">
                <button
                  onClick={() => setActiveResumeTab("experience")}
                  className={`py-3 px-1 text-[9px] sm:text-xs font-bold uppercase rounded-xl tracking-wider transition-all cursor-pointer text-center flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                    activeResumeTab === "experience" 
                      ? "bg-[#41B3A3] text-black shadow-lg shadow-[#41B3A3]/10" 
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.03]"
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5 shrink-0" />
                  <span>1. Timeline</span>
                </button>
                <button
                  onClick={() => setActiveResumeTab("competencies")}
                  className={`py-3 px-1 text-[9px] sm:text-xs font-bold uppercase rounded-xl tracking-wider transition-all cursor-pointer text-center flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                    activeResumeTab === "competencies" 
                      ? "bg-[#41B3A3] text-black shadow-lg shadow-[#41B3A3]/10" 
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.03]"
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span>2. Core Skills</span>
                </button>
                <button
                  onClick={() => setActiveResumeTab("challenges")}
                  className={`py-3 px-1 text-[9px] sm:text-xs font-bold uppercase rounded-xl tracking-wider transition-all cursor-pointer text-center flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                    activeResumeTab === "challenges" 
                      ? "bg-[#41B3A3] text-black shadow-lg shadow-[#41B3A3]/10" 
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.03]"
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>3. Action Center</span>
                </button>
              </div>

              <div className="min-h-[300px] w-full pt-2">
                {activeResumeTab === "experience" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full"
                  >
                    <div className="md:col-span-5 flex flex-col space-y-3">
                      <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#41B3A3] mb-1 leading-none">// CLICK TO INVESTIGATE ROLES</div>
                      
                      {resumeDetails.experience.map((exp, idx) => {
                        const isSelected = selectedRoleIdx === idx;
                        return (
                          <button
                            key={idx}
                            onClick={() => setSelectedRoleIdx(idx)}
                            className={`p-4 rounded-xl text-left border transition-all duration-300 relative group cursor-pointer flex flex-col justify-between ${
                              isSelected 
                                ? "bg-white/[0.06] border-[#41B3A3]/50 shadow-md" 
                                : "bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]"
                            }`}
                          >
                            <div className="flex justify-between items-start gap-2">
                              <span className={`text-[11px] sm:text-xs font-black uppercase tracking-wider transition-colors ${isSelected ? "text-white" : "text-zinc-400 group-hover:text-zinc-300"}`}>
                                {exp.role === "Workplace Safety and Health Coordinator" ? "WSH Coordinator" : exp.role}
                              </span>
                              <span className="text-[9px] font-mono text-zinc-400 pr-1 shrink-0 font-bold">{exp.period}</span>
                            </div>
                            <div className="flex items-center justify-between mt-3">
                              <span className="text-[10px] font-mono uppercase tracking-wide text-[#41B3A3] font-bold">{exp.company.replace(" Pte Ltd.", "")}</span>
                              <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isSelected ? "bg-[#41B3A3] scale-125 shadow-[0_0_8px_#41B3A3]" : "bg-zinc-700"}`} />
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="md:col-span-7 bg-white/[0.03] border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-4">
                      {(() => {
                        const activeJob = resumeDetails.experience[selectedRoleIdx];
                        return (
                          <motion.div 
                            key={selectedRoleIdx}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4 h-full flex flex-col justify-between"
                          >
                            <div className="space-y-3.5">
                              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                                <span className="text-[9px] font-mono font-bold uppercase px-2.5 py-1 rounded bg-[#41B3A3]/10 text-[#41B3A3] tracking-widest font-black">
                                  {selectedRoleIdx === 0 ? "CURRENT / MANAGEMENT" : selectedRoleIdx === 1 ? "FIELD SUPERVISOR" : "FIELD EXPERTISE"}
                                </span>
                                <div className="flex items-center space-x-1.5 text-[10px] text-zinc-300 font-mono">
                                  <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                                  <span>{activeJob.period}</span>
                                </div>
                              </div>

                              <div className="space-y-1">
                                <h4 className="text-base font-black text-white uppercase tracking-wider leading-tight">{activeJob.role}</h4>
                                <p className="text-[10px] font-mono uppercase text-[#41B3A3] font-black">{activeJob.company}</p>
                              </div>

                              <div className="space-y-2 pt-2.5">
                                <div className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-400">// KEY DELIVERABLES & ACCOMPLISHMENTS</div>
                                <ul className="space-y-2.5">
                                  {activeJob.bullets.map((bullet, bIdx) => (
                                    <li key={bIdx} className="flex items-start space-x-2 text-zinc-200 text-xs sm:text-xs leading-relaxed font-sans">
                                      <span className="text-[#41B3A3] shrink-0 font-bold mt-1.5">•</span>
                                      <span>{bullet.trim()}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            <div className="pt-3 border-t border-white/10 text-[9px] font-mono text-zinc-400 flex justify-between items-center bg-white/[0.02] px-3 py-2 rounded-xl mt-4">
                              <span>SINGAPORE MOM PROTOCOLS:</span>
                              <span className="text-zinc-200 font-black">100% REGULATORY LAW COMPLIANT</span>
                            </div>
                          </motion.div>
                        );
                      })()}
                    </div>
                  </motion.div>
                )}

                {activeResumeTab === "competencies" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-4 w-full"
                  >
                    <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#41B3A3] mb-1 leading-none">// MOM & WORKPLACE COMPLIANCE SKILLS MATRIX</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {specializedSkillsList.map((skill, idx) => (
                        <div 
                          key={idx} 
                          className="bg-white/[0.03] border border-white/10 hover:border-[#41B3A3]/20 p-5 rounded-2xl flex flex-col justify-between space-y-3.5 group transition-all duration-300"
                        >
                          <div className="space-y-2">
                            <div className="flex justify-between items-start gap-2">
                              <span className="text-xs font-black text-white uppercase tracking-wider group-hover:text-[#41B3A3] transition-colors">{skill.name}</span>
                              <span className="text-[10px] font-mono font-black text-[#41B3A3] bg-[#41B3A3]/5 px-2 py-0.5 rounded leading-none">{skill.percentage}%</span>
                            </div>
                            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-bold">{skill.metrics}</div>
                            <p className="text-[11px] text-zinc-300 leading-relaxed font-sans">{skill.description}</p>
                          </div>
                          
                          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden relative">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.percentage}%` }}
                              transition={{ duration: 1.2, ease: "easeOut", delay: idx * 0.1 }}
                              className="h-full bg-[#41B3A3] rounded-full shadow-[0_0_8px_#41B3A3]"
                            />
                          </div>

                          <div className="flex flex-wrap gap-1.5 font-mono pt-1">
                            {skill.aspects.map((aspect, aIdx) => (
                              <span key={aIdx} className="text-[8px] sm:text-[9px] bg-white/10 text-zinc-300 border border-white/5 px-2.5 py-0.5 rounded-md uppercase font-bold tracking-wider">
                                {aspect}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeResumeTab === "challenges" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-4 w-full"
                  >
                    <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#41B3A3] mb-1 leading-none">// SAFETY COORDINATOR METHODOLOGIES & GROUND-LEVEL RESOLUTIONS</div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {safetyChallengesList.map((challenge, idx) => (
                        <div 
                          key={idx}
                          className="bg-white/[0.03] border border-white/10 p-5 rounded-2xl flex flex-col justify-between space-y-4 relative group hover:bg-white/[0.05] hover:border-[#41B3A3]/40 transition-all duration-300"
                        >
                          <div className="space-y-2">
                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/5 group-hover:border-white/20 transition-all">
                              {challenge.id === "complacency" ? (
                                <ShieldCheck className="w-4 h-4 text-[#41B3A3]" />
                              ) : challenge.id === "compliance" ? (
                                <FileText className="w-4 h-4 text-[#41B3A3]" />
                              ) : (
                                <AlertTriangle className="w-4 h-4 text-[#41B3A3]" />
                              )}
                            </div>
                            <h4 className="text-xs font-bold text-white uppercase tracking-wider">{challenge.title}</h4>
                            
                            <div className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest pt-2 font-bold">// CRITICAL RISK GAP</div>
                            <p className="text-[11px] text-zinc-300 font-sans leading-relaxed">{challenge.context}</p>
                          </div>

                          <div className="space-y-1.5 pt-3 border-t border-white/10">
                            <span className="text-[9px] font-mono text-[#41B3A3] font-black uppercase tracking-widest">// COORDINATOR REMEDY</span>
                            <p className="text-[11px] text-zinc-200 leading-relaxed font-sans italic">{challenge.approach}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 w-full border-t border-white/10 mt-4">
                <div className="space-y-3">
                  <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-[#41B3A3] flex items-center space-x-1.5 font-bold">
                    <GraduationCap className="w-4 h-4" />
                    <span>// EDUCATIONAL BACKGROUND</span>
                  </h4>
                  <div className="space-y-3">
                    {resumeDetails.education.map((edu, eduIdx) => (
                      <div key={eduIdx} className="space-y-0.5 border-l border-[#41B3A3]/30 pl-3 hover:border-l-2 hover:border-[#41B3A3] transition-all duration-200">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-white uppercase tracking-wider text-[11px]">{edu.degree}</span>
                          <span className="text-zinc-400 font-mono text-[9px] font-bold">{edu.period}</span>
                        </div>
                        <p className="text-[11px] font-sans text-zinc-300 font-medium">{edu.institution}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-[#41B3A3] flex items-center space-x-1.5 font-bold">
                    <Award className="w-4 h-4" />
                    <span>// MANDATORY WSH BOARD TRAINING</span>
                  </h4>
                  <div className="bg-white/[0.02] border border-white/10 rounded-xl p-3 max-h-[160px] overflow-y-auto space-y-1.5 font-mono text-[10px] text-zinc-300 scrollbar-thin scrollbar-thumb-white/10">
                    {resumeDetails.certifications.map((cert, cIdx) => (
                      <div key={cIdx} className="flex items-start space-x-1.5 leading-normal">
                        <span className="text-[#41B3A3] shrink-0 font-bold">•</span>
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-[9px] font-mono text-zinc-400 italic text-right pr-1">
                    Scroll to view all 11 certified standard titles
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono text-zinc-400 w-full mt-6">
                <a href="mailto:tonukazi@gmail.com" className="flex items-center space-x-2.5 hover:text-[#41B3A3] transition-colors group">
                  <div className="w-7 h-7 rounded bg-white/10 flex items-center justify-center border border-white/5 group-hover:border-[#41B3A3]/40 transition-all">
                    <Mail className="w-3.5 h-3.5 text-[#41B3A3]" />
                  </div>
                  <span className="truncate text-zinc-300">tonukazi@gmail.com</span>
                </a>
                <a href="tel:+6580627387" className="flex items-center space-x-2.5 hover:text-[#41B3A3] transition-colors group">
                  <div className="w-7 h-7 rounded bg-white/10 flex items-center justify-center border border-white/5 group-hover:border-[#41B3A3]/40 transition-all">
                    <Phone className="w-3.5 h-3.5 text-[#41B3A3]" />
                  </div>
                  <span className="text-zinc-300">+65 8062 7387</span>
                </a>
                <a href="https://linkedin.com/in/kazitonu" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2.5 hover:text-[#41B3A3] transition-colors group">
                  <div className="w-7 h-7 rounded bg-white/10 flex items-center justify-center border border-white/5 group-hover:border-[#41B3A3]/40 transition-all">
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#41B3A3]" />
                  </div>
                  <span className="truncate text-zinc-300">linkedin/in/kazitonu</span>
                </a>
                <div className="flex items-center space-x-2.5 group">
                  <div className="w-7 h-7 rounded bg-white/10 flex items-center justify-center border border-white/5">
                    <MapPin className="w-3.5 h-3.5 text-[#41B3A3]" />
                  </div>
                  <span className="text-zinc-300">Singapore</span>
                </div>
              </div>

            </div>
          </motion.div>
        </section>

        {/* CERTS & LICENSES SECTION */}
        <section id="certs" className="w-full min-h-[75vh] flex items-center justify-center scroll-mt-24 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col md:grid md:grid-cols-12 gap-8 items-center"
          >
            <div className="hidden md:block md:col-span-4 lg:col-span-5" />

            <div className="col-span-12 md:col-span-8 lg:col-span-7 flex flex-col justify-center text-left space-y-6 md:pl-6 w-full">
              <div className="text-[#41B3A3] text-sm md:text-base font-semibold tracking-[0.25em] uppercase">
                CERTS & LICENSES
              </div>
              
              {/* Added high contrast blurred text cards for mobile screens */}
              <div className="space-y-4 max-w-2xl w-full">
                {certificationsList.map((cert, idx) => (
                  <div 
                    key={idx} 
                    className="p-5 rounded-2xl bg-black/65 backdrop-blur-md border border-white/15 hover:border-[#41B3A3]/30 transition-all duration-300 flex items-start space-x-4 group shadow-xl"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/5 group-hover:border-white/20 group-hover:bg-white/[0.12] transition-all">
                      <Award className="w-5 h-5 text-[#41B3A3] group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex-grow space-y-1">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">{cert.title}</h4>
                        <span className="text-[10px] font-mono text-zinc-400 uppercase shrink-0 font-bold">{cert.date}</span>
                      </div>
                      <p className="text-[11px] font-mono text-[#41B3A3] uppercase tracking-wide font-bold">{cert.authority}</p>
                      <p className="text-xs text-zinc-200 font-sans leading-relaxed pt-1">{cert.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="w-full min-h-[75vh] flex items-center justify-center scroll-mt-24 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col md:grid md:grid-cols-12 gap-8 items-center"
          >
            <div className="hidden md:block md:col-span-4 lg:col-span-5" />

            <div className="col-span-12 md:col-span-8 lg:col-span-7 flex flex-col justify-center text-left space-y-6 md:pl-6 w-full">
              <div className="space-y-2">
                <div className="text-[#41B3A3] text-sm md:text-base font-semibold tracking-[0.25em] uppercase">
                  GET IN TOUCH
                </div>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
                  LET'S COLLABORATE
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans max-w-xl leading-relaxed">
                  Have any inquiries, suggestions, or recruitment proposals? Drop a direct message below or reach out through one of the direct coordination lines.
                </p>
              </div>

              <div className="w-full max-w-xl bg-black/75 border border-white/15 hover:border-[#41B3A3]/30 p-6 sm:p-10 rounded-2xl sm:rounded-3xl relative overflow-hidden backdrop-blur-lg transition-all duration-500 shadow-2xl">
                {formSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 text-center space-y-4"
                  >
                    <CheckCircle className="w-12 h-12 text-[#41B3A3] mx-auto mb-2" />
                    <h4 className="text-xl font-bold text-white uppercase tracking-wider">MESSAGE ROUTED SUCCESSFULLY</h4>
                    <p className="text-zinc-300 text-sm max-w-sm mx-auto leading-relaxed">
                      Thank you! Your message has been safely routed. Kazi Tonu will review your submission and respond shortly.
                    </p>
                    <button 
                      onClick={() => setFormSubmitted(false)}
                      className="text-xs font-mono uppercase bg-white/5 border border-white/10 hover:bg-[#41B3A3] hover:text-black py-2.5 px-6 rounded-lg transition-all cursor-pointer mt-4"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4 text-left w-full">
                    <div>
                      <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1.5 font-bold select-none">
                        Name
                      </label>
                      <div className="relative flex items-center">
                        <span className="absolute left-4 text-zinc-400 transition-all pointer-events-none">
                          <User className="w-4 h-4" />
                        </span>
                        <input 
                          type="text" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="YOUR NAME"
                          className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#41B3A3] focus:bg-black/60 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none transition-all duration-300 uppercase tracking-wider font-mono text-xs focus:ring-2 focus:ring-[#41B3A3]/40 focus:shadow-[0_0_15px_rgba(65,179,163,0.3)]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1.5 font-bold select-none">
                        Email Address
                      </label>
                      <div className="relative flex items-center">
                        <span className="absolute left-4 text-zinc-400 transition-all pointer-events-none">
                          <Mail className="w-4 h-4" />
                        </span>
                        <input 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="YOUR.EMAIL@DOMAIN.COM"
                          className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#41B3A3] focus:bg-black/60 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none transition-all duration-300 uppercase tracking-wider font-mono text-xs focus:ring-2 focus:ring-[#41B3A3]/40 focus:shadow-[0_0_15px_rgba(65,179,163,0.3)]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1.5 font-bold select-none">
                        Message
                      </label>
                      <div className="relative flex items-start">
                        <span className="absolute left-4 top-3.5 text-zinc-400 transition-all pointer-events-none">
                          <MessageSquare className="w-4 h-4" />
                        </span>
                        <textarea 
                          rows={4}
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="HOW CAN I HELP YOU?"
                          className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#41B3A3] focus:bg-black/60 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none transition-all duration-300 uppercase tracking-wider font-mono text-xs resize-none focus:ring-2 focus:ring-[#41B3A3]/40 focus:shadow-[0_0_15px_rgba(65,179,163,0.3)]"
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full text-xs tracking-widest font-mono font-bold uppercase bg-[#41B3A3] text-black hover:bg-[#41B3A3]/90 py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 active:scale-[0.98] cursor-pointer mt-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>SENDING...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>SEND MESSAGE</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4">
                <a 
                  href="mailto:tonukazi@gmail.com" 
                  className="bg-black/60 hover:bg-black/80 border border-white/10 hover:border-[#41B3A3]/40 backdrop-blur-md transition-all duration-300 py-2.5 px-4 rounded-xl flex items-center space-x-2.5 text-xs text-zinc-200 hover:text-[#41B3A3] font-mono shadow-lg hover:shadow-[#41B3A3]/5"
                >
                  <Mail className="w-3.5 h-3.5 text-[#41B3A3]" />
                  <span>tonukazi@gmail.com</span>
                </a>
                <a 
                  href="tel:+6580627387" 
                  className="bg-black/60 hover:bg-black/80 border border-white/10 hover:border-[#41B3A3]/40 backdrop-blur-md transition-all duration-300 py-2.5 px-4 rounded-xl flex items-center space-x-2.5 text-xs text-zinc-200 hover:text-[#41B3A3] font-mono shadow-lg hover:shadow-[#41B3A3]/5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#41B3A3]" />
                  <span>+65 8062 7387</span>
                </a>
                <div 
                  className="bg-black/60 border border-white/10 backdrop-blur-md py-2.5 px-4 rounded-xl flex items-center space-x-2.5 text-xs text-zinc-300 font-mono shadow-md select-none"
                >
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Singapore</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* 3. FOOTER */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-8 text-center md:text-left flex flex-col sm:flex-row justify-between items-center gap-4">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-[10px] uppercase tracking-[0.15em] text-zinc-500 font-medium font-sans"
        >
          © {new Date().getFullYear()} KAZI TONU. ALL RIGHTS RESERVED.
        </motion.p>
        {activeView !== "hero" && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            whileHover={{ opacity: 1, x: -5 }}
            onClick={() => handleNavClick("hero")}
            className="text-[10px] uppercase tracking-[0.15em] text-zinc-400 font-semibold cursor-pointer flex items-center space-x-2"
          >
            <span>← RETURN TO HOME</span>
          </motion.button>
        )}
      </footer>
    </div>
  );
}