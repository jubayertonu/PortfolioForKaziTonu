/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
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
  MessageSquare,
  Linkedin,
  MessageCircle,
  Copy,
  Check
} from "lucide-react";
import { TypingText } from "./components/TypingText";
import { WshRadarChart } from "./components/WshRadarChart";

export default function App() {
  const [activeView, setActiveView] = useState<"hero" | "about" | "resume" | "certs" | "contact">("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [hoveredSkillIndex, setHoveredSkillIndex] = useState<number | null>(null);
  const [certFilter, setCertFilter] = useState<"all" | "lifetime" | "valid" | "expiring">("all");
  const [copiedText, setCopiedText] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCopyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(""), 2000);
  };

  useEffect(() => {
    // Disable scroll during loading to prevent background scrolling
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  useEffect(() => {
    // Simulate high-fidelity loading progress
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
          }, 450); // Small delay to let user see "100% / COMPLIANT SYSTEM READY"
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 4; // increment by 4 to 11%
        return Math.min(prev + step, 100);
      });
    }, 85 + Math.random() * 50);

    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { label: "Home", value: "hero" },
    { label: "About", value: "about" },
    { label: "Career Progression", value: "resume" },
    { label: "Certs and Licenses", value: "certs" },
    { label: "Contact", value: "contact" }
  ];

  const getValidityDetails = (expiryDate: string | null) => {
    if (!expiryDate) {
      return {
        status: "lifetime" as const,
        percent: 100,
        labelText: "Unlimited • No Expiry",
        daysLeft: null,
        badgeColor: "bg-emerald-500/10 text-[#41B3A3] border-[#41B3A3]/20",
        barColor: "bg-[#41B3A3]",
        shadowColor: "shadow-[#41B3A3]/20",
        pulse: false,
      };
    }
    const today = new Date("2026-06-11"); // Lock system base date matching environment local time (June 2026)
    const expiry = new Date(expiryDate);
    const diffMs = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) {
      return {
        status: "expired" as const,
        percent: 0,
        labelText: "Expired / Needs Renewal",
        daysLeft: diffDays,
        badgeColor: "bg-red-500/10 text-red-400 border-red-500/20",
        barColor: "bg-red-500",
        shadowColor: "shadow-red-500/30",
        pulse: false,
      };
    }

    // Standard baseline duration is 3 years (1095 days) for visual scaling
    const totalDuration = 1095; 
    const percent = Math.min(100, Math.max(10, (diffDays / totalDuration) * 100));
    
    if (diffDays <= 60) {
      return {
        status: "expiring" as const,
        percent,
        labelText: `${diffDays} Days Left (Renew Soon)`,
        daysLeft: diffDays,
        badgeColor: "bg-amber-500/15 text-amber-500 border-amber-500/30 animate-pulse",
        barColor: "bg-amber-500",
        shadowColor: "shadow-amber-500/40",
        pulse: true,
      };
    }

    return {
      status: "valid" as const,
      percent,
      labelText: `${diffDays} Days Left`,
      daysLeft: diffDays,
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      barColor: "bg-emerald-500",
      shadowColor: "shadow-emerald-500/20",
      pulse: false,
    };
  };

  const certificationsList = [
    {
      title: "Advanced Certificate in Workplace Safety and Health",
      authority: "Greensafe International PTE LTD",
      code: "GS-WSH-ADV-9021",
      date: "Issued 2023",
      description: "Comprehensive qualification mapping safety standards, advanced compliance management rules, and construction safety control systems.",
      color: "#41B3A3",
      expiryDate: null
    },
    {
      title: "Develop a Risk Management Implementation Plan (BizSAFE2)",
      authority: "Greensafe International PTE LTD",
      code: "GS-BIZSAFE-2-88219",
      date: "Issued 2023",
      description: "Focused training on risk prevention, forming dynamic risk matrices, and drafting compliance-proof bizSAFE hazard actions.",
      color: "#41B3A3",
      expiryDate: null
    },
    {
      title: "Workplace Safety and Health Management in Construction Industry",
      authority: "Eversafe Academy PTE LTD",
      code: "EV-WAH-CON-4712",
      date: "Issued 2023",
      description: "Construction-specific regulations training covering active operations, heavy load staging, and field hazard isolation controls.",
      color: "#41B3A3",
      expiryDate: null
    },
    {
      title: "Manage Work at Height",
      authority: "Eversafe Academy PTE LTD",
      code: "EV-WAH-MAN-3382",
      date: "Issued 2023",
      description: "Specialized training for supervising elevated locations, implementing solid fall containment, protective setups, and MOM guidelines.",
      color: "#41B3A3",
      expiryDate: null
    },
    {
      title: "Operate BoomLift",
      authority: "AAT Training Hub PTE LTD",
      code: "AAT-BOOM-OP-2241",
      date: "Issued 2023",
      description: "Core heavy hydraulics license to navigate high aerial lifts, boom stability controls, safety harnesses, and field operation safety.",
      color: "#41B3A3",
      expiryDate: "2028-05-14"
    },
    {
      title: "Perform Work in Confined Space Operation",
      authority: "Eversafe Academy PTE LTD",
      code: "EV-CSO-PERF-97103",
      date: "Issued 2023",
      description: "Gas assessment, toxic ventilation monitoring, closed workspace logging, and rapid extraction emergency logistics.",
      color: "#41B3A3",
      expiryDate: "2027-08-17"
    },
    {
      title: "Standard First Aid Provider",
      authority: "Singapore Red Cross",
      code: "RC-SFA-PROV-1184",
      date: "Issued 2023",
      description: "Certified trauma first-aid, immediate medical response, CPR/AED coordination, and incident triage on active sites.",
      color: "#41B3A3",
      expiryDate: "2026-07-27"
    },
    {
      title: "Psychological First Aid & Befriender Training",
      authority: "Singapore Red Cross",
      code: "RC-PFA-BEF-5582",
      date: "Issued 2023",
      description: "Workplace crisis intervention, peer support systems, and active safety culture promotion centered on psychological wellbeing.",
      color: "#41B3A3",
      expiryDate: "2026-07-27"
    },
    {
      title: "Introduction to OSHA: Safety Standards and Compliance",
      authority: "Coursera",
      code: "CS-OSHA-COMP",
      date: "Issued 2024",
      description: "Foundational training in OSHA safety standards, hazard identification, and regulatory compliance frameworks.",
      color: "#41B3A3",
      expiryDate: null
    },
    {
      title: "Psychological Safety",
      authority: "Coursera",
      code: "CS-PSYCH-SAFE",
      date: "Issued 2024",
      description: "Frameworks for building open, secure safety systems, encouraging open communication, and minimizing workplace operational worries.",
      color: "#41B3A3",
      expiryDate: null
    },
    {
      title: "Creating a Healthy Culture: Addressing Workplace Bullying",
      authority: "Coursera",
      code: "CS-HLTH-CULT",
      date: "Issued 2024",
      description: "Strategic approaches to fostering supportive workplace interactions, active anti-bullying pathways, and overall health culture coordination.",
      color: "#41B3A3",
      expiryDate: null
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


  const [animationKey, setAnimationKey] = useState(0);
  const [animationStyle, setAnimationStyle] = useState(0);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [inquiryType, setInquiryType] = useState<"audits" | "hiring" | "drills">("hiring");
  const [complianceChecked, setComplianceChecked] = useState(false);

  const [activeResumeTab, setActiveResumeTab] = useState<"experience" | "competencies">("experience");
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

  // Dynamic variants helper
  const getInitialVariant = (style: number, element: "g" | "k" | "t" | "sh" | "c") => {
    switch (style) {
      case 0: // Slide Up
        if (element === "g") return { y: 20, opacity: 0, x: 0, scale: 1, rotate: 0 };
        if (element === "k" || element === "t") return { y: "110%", opacity: 0, x: 0, scale: 1, rotate: 0 };
        if (element === "sh") return { y: 15, opacity: 0, x: 0, scale: 1, rotate: 0 };
        return { y: "110%", opacity: 0, x: 0, scale: 1, rotate: 0 }; // c
      case 1: // Slide Down
        if (element === "g") return { y: -20, opacity: 0, x: 0, scale: 1, rotate: 0 };
        if (element === "k" || element === "t") return { y: "-110%", opacity: 0, x: 0, scale: 1, rotate: 0 };
        if (element === "sh") return { y: -15, opacity: 0, x: 0, scale: 1, rotate: 0 };
        return { y: "-110%", opacity: 0, x: 0, scale: 1, rotate: 0 }; // c
      case 2: // Slide Left
        if (element === "g") return { x: -30, opacity: 0, y: 0, scale: 1, rotate: 0 };
        if (element === "k" || element === "t") return { x: "-100%", opacity: 0, y: 0, scale: 1, rotate: 0 };
        if (element === "sh") return { x: -30, opacity: 0, y: 0, scale: 1, rotate: 0 };
        return { x: "-100%", opacity: 0, y: 0, scale: 1, rotate: 0 }; // c
      case 3: // Slide Right
        if (element === "g") return { x: 30, opacity: 0, y: 0, scale: 1, rotate: 0 };
        if (element === "k" || element === "t") return { x: "100%", opacity: 0, y: 0, scale: 1, rotate: 0 };
        if (element === "sh") return { x: 30, opacity: 0, y: 0, scale: 1, rotate: 0 };
        return { x: "100%", opacity: 0, y: 0, scale: 1, rotate: 0 }; // c
      case 4: // Zoom / Scale In
        if (element === "g") return { scale: 0.8, opacity: 0, x: 0, y: 0, rotate: 0 };
        if (element === "k" || element === "t") return { scale: 0.85, opacity: 0, x: 0, y: 0, rotate: 0 };
        if (element === "sh") return { scale: 0.85, opacity: 0, x: 0, y: 0, rotate: 0 };
        return { scale: 0.85, opacity: 0, x: 0, y: 0, rotate: 0 }; // c
      case 5: // Rotate & Scale
        if (element === "g") return { rotate: -4, scale: 0.95, opacity: 0, x: 0, y: 0 };
        if (element === "k" || element === "t") return { rotate: 3, scale: 0.9, opacity: 0, x: 0, y: 0 };
        if (element === "sh") return { rotate: -2, scale: 0.95, opacity: 0, x: 0, y: 0 };
        return { rotate: -3, scale: 0.9, opacity: 0, x: 0, y: 0 }; // c
      default:
        return { y: 20, opacity: 0, x: 0, scale: 1, rotate: 0 };
    }
  };

  // Resume details for Kazi Tonu
  const resumeDetails = {
    name: "Kazi Tonu",
    title: "Workplace Safety and Health Coordinator",
    summary: "Dedicated, MOM-skilled Workplace Safety and Health Coordinator with proactive experience supervising high-risk activities, enforcing Singapore WSH Act compliance, and conducting thorough hazard assessments (HIRA) to maintain zero-incident workplaces in the construction and engineering sectors.",
    experience: [
      {
        role: "Workplace Safety and Health Coordinator",
        company: "Success Forever Construction & Maintenance Pte Ltd.",
        period: "Dec 2023 - Present",
        bullets: [
          "Oversee daily site safety and enforce strict compliance with WSH laws and standard regulations.",
          "Conduct site safety briefings, toolbox talks, perform HIRA risk assessments, and manage routine field inspections.",
          "Establish high workplace safety standards, proactively mitigating hazards and preventing structural incidents."
        ]
      },
      {
        role: "Safety Supervisor",
        company: "Success Forever Construction & Maintenance Pte Ltd.",
        period: "Jun 2023 - Dec 2023",
        bullets: [
          "Supervised challenging work-at-height activities, ensuring full regulatory alignment with MOM safety bylaws.",
          "Operated hydraulic boom lifts and backed up technical crews to safely complete high-elevated assignments.",
          "Strictly enforced safety briefings, harness requirements, and daily site audits throughout working hours."
        ]
      },
      {
        role: "General Worker",
        company: "Success Forever Construction & Maintenance Pte Ltd.",
        period: "Feb 2022 - Jun 2023",
        bullets: [
          "Supported groundwork logistics, rigorous materials handling, and diverse general construction operations.",
          "Acquired strong hands-on insight into site layouts, technical equipment, and essential safety procedures."
        ]
      }
    ],
    skills: [
      "WSH Act & MOM Compliance",
      "Hazard Mitigation & HIRA",
      "Safety Audits & Inspections",
      "Work-at-Height Supervision",
      "BoomLift & Confined Spaces",
      "Incident & RCA Investigation",
      "Toolbox Talks & Briefings",
      "Crisis Triage & Team Sync"
    ],
    certifications: [
      "Advance Certificate in Workplace Safety and Health (Greensafe)",
      "Develop a Risk Management Implementation Plan (BizSAFE2)",
      "Workplace Safety and Health Management in Construction Industry",
      "Manage Work at Height (Eversafe)",
      "Operate BoomLift (AAT Training Hub)",
      "Perform Work in Confined Space Operation (Eversafe)",
      "Standard First Aid Provider (Singapore Red Cross)",
      "Psychological First Aid & Befriender Training (Red Cross)",
      "Introduction to OSHA: Safety Standards and Compliance (Coursera)",
      "Psychological Safety (Coursera)",
      "Creating a Healthy Culture: Addressing Workplace Bullying (Coursera)"
    ],
    education: [
      {
        degree: "Bachelor of Business Studies (BBS)",
        institution: "Naria Govt. College, Bangladesh",
        period: "2020 - 2022 (Incomplete)"
      },
      {
        degree: "Higher Secondary Certificate (HSC)",
        institution: "Naria Govt. College, Bangladesh",
        period: "2018 - 2020 (Grade: A-)"
      },
      {
        degree: "Secondary School Certificate (SSC)",
        institution: "Naria BL Model High School, Bangladesh",
        period: "2014 - 2017 (Grade: A)"
      }
    ]
  };

  const handleNavClick = (val: string) => {
    setActiveView(val as any);
    const el = document.getElementById(val);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "resume", "certs", "contact"];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      let currentSection = "hero";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            currentSection = section;
          }
        }
      }
      setActiveView(currentSection as any);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="portfolio-loader"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              scale: 1.05,
              filter: "blur(20px)",
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
            }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#070707] text-white"
          >
            {/* Ambient Background Glow */}
            <div className="absolute inset-x-0 top-1/4 h-80 bg-[radial-gradient(circle_at_center,rgba(65,179,163,0.07)_0%,transparent_65%)] pointer-events-none" />

            <div className="relative flex flex-col items-center max-w-sm px-6 text-center select-none">
              {/* Spinning Ring & Logo */}
              <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
                {/* Slow Spinning Outer Ring */}
                <motion.div 
                  className="absolute inset-0 border border-dashed border-white/10 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                />
                
                {/* Fast Pulse Inner Ring */}
                <motion.div 
                  className="absolute inset-2 border border-[#41B3A3]/20 rounded-full"
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />

                {/* Main Logo Centerpiece */}
                <motion.div 
                  className="w-14 h-14 bg-white/[0.02] border border-[#41B3A3]/40 rounded-full flex items-center justify-center text-xl font-black text-white shadow-[0_0_30px_rgba(65,179,163,0.15)] relative"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="relative z-10 text-white tracking-widest pl-0.5">KT</span>
                  <div className="absolute inset-0 bg-[#41B3A3]/5 rounded-full blur-sm" />
                </motion.div>
              </div>

              {/* Names */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h1 className="text-sm font-extrabold tracking-[0.45em] text-white uppercase mb-1.5 pl-[0.45em]">
                  KAZI TONU
                </h1>
                <p className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] text-[#41B3A3] uppercase mb-10 pl-[0.25em]">
                  WSH COORDINATOR INTERFACE
                </p>
              </motion.div>

              {/* Loader Slider */}
              <div className="w-48 sm:w-60 mb-6 flex flex-col items-center">
                <div className="w-full h-[1.5px] bg-white/5 relative overflow-hidden rounded-full mb-3">
                  <motion.div 
                    className="absolute top-0 bottom-0 left-0 bg-[#41B3A3] shadow-[0_0_8px_#41B3A3]"
                    style={{ width: `${loadingProgress}%` }}
                    transition={{ ease: "easeOut" }}
                  />
                </div>
                
                {/* Percentage & Terminal log */}
                <div className="w-full flex justify-between items-center text-[9px] font-mono text-zinc-500">
                  <span className="text-[#41B3A3]/80 tracking-wider text-left">
                    {loadingProgress < 20 && "STAGING_PORTFOLIO_CORE"}
                    {loadingProgress >= 20 && loadingProgress < 45 && "PARSING_WSH_CREDENTIALS"}
                    {loadingProgress >= 45 && loadingProgress < 70 && "CACHING_MEDIA_STREAMS"}
                    {loadingProgress >= 70 && loadingProgress < 90 && "RUNNING_RISK_AUDIT"}
                    {loadingProgress >= 90 && loadingProgress < 100 && "VERIFYING_COMPLIANCE"}
                    {loadingProgress === 100 && "COMPLIANT_INTERFACE_READY"}
                  </span>
                  <span className="text-zinc-400 font-bold tabular-nums">
                    {loadingProgress}%
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`relative min-h-screen text-white font-sans selection:bg-white selection:text-black overflow-x-hidden flex flex-col justify-between transition-all duration-1000 ${(activeView === "about" || activeView === "certs" || activeView === "contact") ? "bg-transparent" : "bg-black"}`}>
      {/* Fixed Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#41B3A3] origin-left z-[100] shadow-[0_0_10px_#41B3A3]"
        style={{ scaleX }}
      />

      {/* Background Loop Videos with Smooth Crossfade */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <motion.video
          key="video-default"
          className="absolute inset-0 w-full h-full object-cover"
          src={isMobile ? "/api/video?mobile=true" : "/api/video"}
          autoPlay
          loop
          muted
          playsInline
          animate={{ opacity: (activeView === "about" || activeView === "certs" || activeView === "contact") ? 0 : 0.6 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
        />
        <motion.video
          key="video-about"
          className="absolute inset-0 w-full h-full object-cover"
          src={isMobile ? "/api/video-about?mobile=true" : "/api/video-about"}
          autoPlay
          loop
          muted
          playsInline
          animate={{ opacity: activeView === "about" ? 1.0 : 0 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
        />
        <motion.video
          key="video-certs"
          className="absolute inset-0 w-full h-full object-cover"
          src={isMobile ? "/api/video-certs?mobile=true" : "/api/video-certs"}
          autoPlay
          loop
          muted
          playsInline
          animate={{ opacity: activeView === "certs" ? 1.0 : 0 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
        />
        <motion.video
          key="video-contact"
          className="absolute inset-0 w-full h-full object-cover"
          src={isMobile ? "/api/video-contact?mobile=true" : "/api/video-contact"}
          autoPlay
          loop
          muted
          playsInline
          animate={{ opacity: activeView === "contact" ? 1.0 : 0 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
        />
        {/* Subtle vignette/shading overlay - fades out in About, Certs and Contact view to make video perfectly clear */}
        <motion.div 
          className="absolute inset-0 bg-black/25 bg-gradient-to-b from-black/40 via-transparent to-black/40" 
          animate={{ opacity: (activeView === "about" || activeView === "certs" || activeView === "contact") ? 0 : 1.0 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
        />
      </div>

      {/* 1. HEADER SECTION (STICKY & BLURRED FOR CONTINUOUS SCROLL MODE) */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-0 z-50 w-full bg-black/45 backdrop-blur-md border-b border-white/5 py-6 transition-all duration-300"
      >
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* LOGO */}
          <motion.button 
            onClick={() => {
              handleNavClick("hero");
            }}
            className="text-2xl font-black tracking-tighter text-white select-none cursor-pointer hover:opacity-80 transition-opacity inline-block"
            animate={{
              y: [0, -4, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            KT
          </motion.button>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden md:flex items-center flex-wrap justify-end gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-2 max-w-[85%] md:max-w-none">
            {navItems.map((item) => {
              const isActive = activeView === item.value;
              return (
                <button
                  key={item.value}
                  id={`nav-item-${item.value}`}
                  onClick={() => {
                    handleNavClick(item.value);
                  }}
                  className={`text-[10px] sm:text-xs md:text-sm font-bold tracking-wider sm:tracking-widest transition-colors duration-300 relative py-1 group uppercase cursor-pointer ${
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

          {/* MOBILE DIGITAL MENU BUTTON */}
          <div className="flex md:hidden items-center">
            <button
              id="mobile-menu-trigger"
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg text-zinc-400 hover:text-white active:scale-95 transition-all cursor-pointer hover:bg-white/5"
              aria-label="Toggle Menu"
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE NAV PANEL DRAWER */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-nav-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden absolute top-full left-0 right-0 z-40 bg-black/95 border-b border-white/5 backdrop-blur-xl overflow-hidden shadow-2xl"
            >
              <div className="px-6 py-4 flex flex-col space-y-3">
                <div className="flex flex-col space-y-1">
                  {navItems.map((item, idx) => {
                    const isActive = activeView === item.value;
                    return (
                      <motion.button
                        key={item.value}
                        id={`mobile-nav-item-${item.value}`}
                        initial={{ x: -25, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -15, opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 180,
                          damping: 18,
                          mass: 0.8,
                          delay: idx * 0.05
                        }}
                        onClick={() => {
                          handleNavClick(item.value);
                          setMenuOpen(false);
                        }}
                        className="w-full text-left py-3 px-3 rounded-xl flex items-center justify-between group cursor-pointer transition-all duration-200 hover:bg-white/5"
                      >
                        <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                          isActive ? "text-[#41B3A3]" : "text-zinc-400 group-hover:text-white"
                        }`}>
                          {item.label}
                        </span>
                        
                        {isActive && (
                          <div className="w-1.5 h-1.5 rounded-full bg-[#41B3A3] shadow-[0_0_8px_#41B3A3]" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* 2. MAIN HUB VIEWPORT (VERTICALLY STACKED WITH INTERSECTION OBSERVATION AND BREATHING ROOM) */}
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
            {/* UPSIDE: GREETING & NAME */}
            <div className="flex flex-col">
              {/* GREETING */}
              <motion.div 
                key={`g-${animationKey}`}
                initial={getInitialVariant(animationStyle, "g")}
                animate={{ y: 0, x: 0, scale: 1, rotate: 0, opacity: 1.0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-lg md:text-xl font-bold text-[#41B3A3] mb-2 md:mb-4 tracking-[0.1em] uppercase select-none"
              >
                Hello! I'm
              </motion.div>

              {/* BIG BOLD NAME */}
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

            {/* DOWNSIDE: ROLE & FIELD */}
            <div className="flex flex-col pt-6 md:pt-8 border-t border-white/5 w-full items-end text-right">
              <div className="max-w-3xl flex flex-col items-end text-right">
                {/* UPPER TEXT */}
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

                {/* LOWER BOLD ROLE */}
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

        {/* ABOUT ME SECTION - Matches background transparency & custom video requested */}
        <section id="about" className="w-full min-h-[75vh] flex items-center justify-center scroll-mt-24 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col md:grid md:grid-cols-12 gap-8 items-center"
          >
            {/* Left side spacer - empty as per reference image */}
            <div className="hidden md:block md:col-span-4 lg:col-span-5" />

            {/* Right side content */}
            <div className="col-span-12 md:col-span-8 lg:col-span-7 flex flex-col justify-center text-left space-y-6 bg-black/50 border border-white/10 p-6 sm:p-10 md:p-12 rounded-3xl relative overflow-hidden backdrop-blur-md shadow-2xl transition-all duration-500 hover:border-[#41B3A3]/20 w-full">
              <div 
                className="text-[#41B3A3] text-sm md:text-base font-semibold tracking-[0.25em] uppercase"
              >
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
            {/* Left side spacer - preserves Kazi's alignment signature */}
            <div className="hidden md:block md:col-span-3 lg:col-span-4" />

            {/* Right side content */}
            <div className="col-span-12 md:col-span-9 lg:col-span-8 flex flex-col justify-center text-left space-y-6 md:pl-6 max-w-4xl w-full bg-white/[0.01] border border-white/5 p-6 sm:p-8 md:p-10 rounded-3xl relative overflow-hidden backdrop-blur-md">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-6 w-full">
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

              <div className="space-y-2 bg-white/[0.02] border border-white/[0.03] p-4.5 rounded-2xl">
                <h4 className="text-[10px] font-mono font-black uppercase tracking-widest text-[#41B3A3]">// PROFESSIONAL SUMMARY</h4>
                <p className="text-zinc-300 leading-relaxed text-xs sm:text-sm">{resumeDetails.summary}</p>
              </div>

              {/* Responsive Tab Panel */}
              <div className="grid grid-cols-2 gap-2 p-1.5 bg-white/[0.02] border border-white/5 rounded-2xl w-full font-mono">
                <button
                  onClick={() => setActiveResumeTab("experience")}
                  className={`py-3 px-1 text-[9px] sm:text-xs font-bold uppercase rounded-xl tracking-wider transition-all cursor-pointer text-center flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                    activeResumeTab === "experience" 
                      ? "bg-[#41B3A3] text-black shadow-lg shadow-[#41B3A3]/10" 
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.02]"
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
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.02]"
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span>2. Core Skills</span>
                </button>
              </div>

              {/* TAB CONTENT BLOCK */}
              <div className="min-h-[300px] w-full pt-2">
                
                {/* 1. TIMELINE OF EXPERIENCE */}
                {activeResumeTab === "experience" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full"
                  >
                    {/* Left Timeline Selection Nodes */}
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
                                ? "bg-white/[0.04] border-[#41B3A3]/40 shadow-md shadow-[#41B3A3]/5" 
                                : "bg-transparent border-white/5 hover:border-white/10 hover:bg-white/[0.01]"
                            }`}
                          >
                            <div className="flex justify-between items-start gap-2">
                              <span className={`text-[11px] sm:text-xs font-black uppercase tracking-wider transition-colors ${isSelected ? "text-white" : "text-zinc-400 group-hover:text-zinc-300"}`}>
                                {exp.role === "Workplace Safety and Health Coordinator" ? "WSH Coordinator" : exp.role}
                              </span>
                              <span className="text-[9px] font-mono text-zinc-500 pr-1 shrink-0 font-bold">{exp.period}</span>
                            </div>
                            <div className="flex items-center justify-between mt-3">
                              <span className="text-[10px] font-mono uppercase tracking-wide text-[#41B3A3] font-bold">{exp.company.replace(" Pte Ltd.", "")}</span>
                              <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isSelected ? "bg-[#41B3A3] scale-125 shadow-[0_0_8px_#41B3A3]" : "bg-zinc-700"}`} />
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Right Role-specific Detail Panel */}
                    <div className="md:col-span-7 bg-white/[0.02] border border-white/5 rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-4">
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
                              {/* Job Era Metadata Badges */}
                              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                                <span className="text-[9px] font-mono font-bold uppercase px-2.5 py-1 rounded bg-[#41B3A3]/10 text-[#41B3A3] tracking-widest font-black">
                                  {selectedRoleIdx === 0 ? "CURRENT / MANAGEMENT" : selectedRoleIdx === 1 ? "FIELD SUPERVISOR" : "FIELD EXPERTISE"}
                                </span>
                                <div className="flex items-center space-x-1.5 text-[10px] text-zinc-400 font-mono">
                                  <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                                  <span>{activeJob.period}</span>
                                </div>
                              </div>

                              <div className="space-y-1">
                                <h4 className="text-base font-black text-white uppercase tracking-wider leading-tight">{activeJob.role}</h4>
                                <p className="text-[10px] font-mono uppercase text-[#41B3A3] font-black">{activeJob.company}</p>
                              </div>

                              <div className="space-y-2 pt-2.5">
                                <div className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-500">// KEY DELIVERABLES & ACCOMPLISHMENTS</div>
                                <ul className="space-y-2.5">
                                  {activeJob.bullets.map((bullet, bIdx) => (
                                    <li key={bIdx} className="flex items-start space-x-2 text-zinc-300 text-xs sm:text-xs leading-relaxed font-sans">
                                      <span className="text-[#41B3A3] shrink-0 font-bold mt-1.5">•</span>
                                      <span>{bullet.trim()}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Additional validation footnote */}
                            <div className="pt-3 border-t border-white/5 text-[9px] font-mono text-zinc-500 flex justify-between items-center bg-white/[0.01] px-3 py-2 rounded-xl mt-4">
                              <span>SINGAPORE MOM PROTOCOLS:</span>
                              <span className="text-zinc-300 font-black">100% REGULATORY LAW COMPLIANT</span>
                            </div>
                          </motion.div>
                        );
                      })()}
                    </div>
                  </motion.div>
                )}

                {/* 2. SPECIALIZED COMPETENCIES */}
                {activeResumeTab === "competencies" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-4 w-full"
                  >
                    <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#41B3A3] mb-1 leading-none">// MOM & WORKPLACE COMPLIANCE SKILLS MATRIX</div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                      {/* Left Block: Modern Interactive D3 Radar Chart */}
                      <div className="lg:col-span-5 flex w-full">
                        <WshRadarChart 
                          hoveredIndex={hoveredSkillIndex} 
                          onHoverIndex={setHoveredSkillIndex} 
                        />
                      </div>

                      {/* Right Block: Augmented Core Competency Cards synced with Radar */}
                      <div className="lg:col-span-7 flex flex-col justify-between gap-3 w-full">
                        {specializedSkillsList.map((skill, idx) => {
                          const isHovered = hoveredSkillIndex === idx;
                          return (
                            <div 
                              key={idx} 
                              onMouseEnter={() => setHoveredSkillIndex(idx)}
                              onMouseLeave={() => setHoveredSkillIndex(null)}
                              className={`p-4 rounded-xl border flex flex-col justify-between space-y-3.5 group transition-all duration-300 relative ${
                                isHovered 
                                  ? "bg-[#41B3A3]/[0.04] border-[#41B3A3]/30 shadow-[0_0_20px_rgba(65,179,163,0.08)] scale-[1.01]" 
                                  : "bg-white/[0.01] border-white/5 hover:border-white/10"
                              }`}
                            >
                              <div className="space-y-1.5">
                                <div className="flex justify-between items-start gap-2">
                                  <span className={`text-xs font-black uppercase tracking-wider transition-colors duration-200 ${
                                    isHovered ? "text-[#41B3A3]" : "text-white"
                                  }`}>
                                    {skill.name}
                                  </span>
                                  <span className={`text-[10px] font-mono font-black px-2 py-0.5 rounded leading-none transition-colors duration-200 ${
                                    isHovered ? "bg-[#41B3A3] text-black" : "text-[#41B3A3] bg-[#41B3A3]/5"
                                  }`}>
                                    {skill.percentage}%
                                  </span>
                                </div>
                                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-bold">
                                  {skill.metrics}
                                </div>
                                <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                                  {skill.description}
                                </p>
                              </div>
                              
                              {/* Horizontal mini-progress indicators for auxiliary parameters */}
                              <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden relative">
                                <motion.div 
                                  initial={false}
                                  animate={{ 
                                    width: `${skill.percentage}%`,
                                    backgroundColor: isHovered ? "#41B3A3" : "rgba(65, 179, 163, 0.4)"
                                  }}
                                  transition={{ duration: 0.3 }}
                                  className="h-full rounded-full"
                                />
                              </div>

                              {/* Skill aspect tags */}
                              <div className="flex flex-wrap gap-1.5 font-mono pt-0.5">
                                {skill.aspects.map((aspect, aIdx) => (
                                  <span 
                                    key={aIdx} 
                                    className={`text-[8px] border px-2 py-0.5 rounded-sm uppercase font-bold tracking-wider transition-all duration-300 ${
                                      isHovered 
                                        ? "bg-[#41B3A3]/10 text-white border-[#41B3A3]/30" 
                                        : "bg-white/5 text-zinc-400 border-white/5"
                                    }`}
                                  >
                                    {aspect}
                                  </span>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}


              </div>

              {/* Educational Background */}
              <div className="w-full pt-6 border-t border-white/5 mt-4">
                <div className="space-y-3 max-w-2xl">
                  <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-[#41B3A3] flex items-center space-x-1.5 font-bold">
                    <GraduationCap className="w-4 h-4" />
                    <span>// EDUCATIONAL BACKGROUND</span>
                  </h4>
                  <div className="space-y-3">
                    {resumeDetails.education.map((edu, eduIdx) => (
                      <div key={eduIdx} className="space-y-0.5 border-l border-[#41B3A3]/25 pl-3 hover:border-l-2 hover:border-[#41B3A3] transition-all duration-200">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-white uppercase tracking-wider text-[11px]">{edu.degree}</span>
                          <span className="text-zinc-500 font-mono text-[9px] font-bold">{edu.period}</span>
                        </div>
                        <p className="text-[11px] font-sans text-zinc-400 font-medium">{edu.institution}</p>
                      </div>
                    ))}
                  </div>
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
            {/* Left side spacer */}
            <div className="hidden md:block md:col-span-4 lg:col-span-5" />

            {/* Right side content */}
            <div className="col-span-12 md:col-span-8 lg:col-span-7 flex flex-col justify-center text-left space-y-6 md:pl-6 w-full animate-fadeIn">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
                <div 
                  className="text-[#41B3A3] text-sm md:text-base font-semibold tracking-[0.25em] uppercase"
                >
                  CERTS & LICENSES
                </div>
                
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest leading-none">
                  // VALIDATION INTEGRITY REPORT
                </span>
              </div>

              {/* Dynamic Credential Filter/Status Dashboard */}
              <div id="cert-filter-controls" className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full p-1 bg-white/[0.02] border border-white/5 rounded-2xl font-mono text-[10px]">
                <button
                  id="filter-all"
                  onClick={() => setCertFilter("all")}
                  className={`py-2.5 px-2 rounded-xl font-bold uppercase transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    certFilter === "all"
                      ? "bg-[#41B3A3]/10 text-[#41B3A3] border border-[#41B3A3]/20 shadow-md"
                      : "text-zinc-400 hover:text-white border border-transparent hover:bg-white/[0.02]"
                  }`}
                >
                  <span>ALL CERTS</span>
                  <span className="text-zinc-500 text-[9px]">{certificationsList.length}</span>
                </button>
                <button
                  id="filter-lifetime"
                  onClick={() => setCertFilter("lifetime")}
                  className={`py-2.5 px-2 rounded-xl font-bold uppercase transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    certFilter === "lifetime"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-md"
                      : "text-zinc-400 hover:text-white border border-transparent hover:bg-white/[0.02]"
                  }`}
                >
                  <span>LIFETIME</span>
                  <span className="text-zinc-500 text-[9px]">
                    {certificationsList.filter(c => getValidityDetails(c.expiryDate).status === 'lifetime').length}
                  </span>
                </button>
                <button
                  id="filter-valid"
                  onClick={() => setCertFilter("valid")}
                  className={`py-2.5 px-2 rounded-xl font-bold uppercase transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    certFilter === "valid"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-md"
                      : "text-zinc-400 hover:text-white border border-transparent hover:bg-white/[0.02]"
                  }`}
                >
                  <span>ACTIVE VALID</span>
                  <span className="text-zinc-500 text-[9px]">
                    {certificationsList.filter(c => getValidityDetails(c.expiryDate).status === 'valid').length}
                  </span>
                </button>
                <button
                  id="filter-expiring"
                  onClick={() => setCertFilter("expiring")}
                  className={`py-2.5 px-2 rounded-xl font-bold uppercase transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    certFilter === "expiring"
                      ? "bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-md animate-pulse"
                      : "text-zinc-400 hover:text-white border border-transparent hover:bg-white/[0.02]"
                  }`}
                >
                  <span>URGENT ACTIONS</span>
                  <span className="text-zinc-500 text-[9px]">
                    {certificationsList.filter(c => {
                      const s = getValidityDetails(c.expiryDate).status;
                      return s === 'expiring' || s === 'expired';
                    }).length}
                  </span>
                </button>
              </div>
              
              <motion.div 
                className="space-y-4 max-w-2xl w-full"
                layout
              >
                {certificationsList
                  .filter((cert) => {
                    const details = getValidityDetails(cert.expiryDate);
                    if (certFilter === "all") return true;
                    if (certFilter === "lifetime") return details.status === "lifetime";
                    if (certFilter === "valid") return details.status === "valid";
                    if (certFilter === "expiring") return details.status === "expiring" || details.status === "expired";
                    return true;
                  })
                  .map((cert, index) => {
                    const validity = getValidityDetails(cert.expiryDate);
                    return (
                      <motion.div 
                        key={cert.title} 
                        layout
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: index * 0.05,
                          ease: [0.16, 1, 0.3, 1] 
                        }}
                        className="p-5 rounded-2xl bg-black/40 hover:bg-black/60 border border-white/5 hover:border-[#41B3A3]/20 backdrop-blur-md hover:backdrop-blur-lg transition-all duration-300 flex flex-col space-y-4 group shadow-lg hover:shadow-[#41B3A3]/5"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/5 group-hover:border-white/20 group-hover:bg-white/[0.08] transition-all">
                            <Award className="w-5 h-5 text-[#41B3A3] group-hover:scale-110 transition-transform" />
                          </div>
                          <div className="flex-grow space-y-1">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                              <h4 className="text-sm font-bold text-white uppercase tracking-wider">{cert.title}</h4>
                              <span className="text-[10px] font-mono text-zinc-500 uppercase shrink-0">{cert.date}</span>
                            </div>
                            <p className="text-[11px] font-mono text-[#41B3A3] uppercase tracking-wide">{cert.authority}</p>
                            <p className="text-xs text-zinc-400 font-sans leading-relaxed pt-1">{cert.description}</p>
                          </div>
                        </div>

                        {/* Validation Health Bar */}
                        <div className="pt-3 border-t border-white/5 space-y-1.5">
                          <div className="flex justify-between items-center text-[10px] font-mono">
                            <span className="text-zinc-500 uppercase tracking-widest">// VALIDATION HEALTH</span>
                            <span className={`px-2 py-0.5 rounded-full border text-[9px] font-black tracking-wider ${validity.badgeColor}`}>
                              {validity.labelText.toUpperCase()}
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${validity.percent}%` }}
                              transition={{ duration: 0.6, ease: "easeOut" }}
                              className={`h-full rounded-full ${validity.barColor} ${
                                validity.pulse ? "animate-pulse" : ""
                              }`}
                              style={{
                                boxShadow: validity.percent > 0 
                                  ? `0 0 10px ${validity.barColor === 'bg-amber-500' ? 'rgba(245,158,11,0.4)' : validity.barColor === 'bg-red-500' ? 'rgba(239,68,68,0.4)' : 'rgba(65,179,163,0.4)'}` 
                                  : 'none'
                              }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
              </motion.div>
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
            {/* Left side spacer to keep space for the background video avatar */}
            <div className="hidden md:block md:col-span-4 lg:col-span-5" />

            {/* Right side content */}
            <div className="col-span-12 md:col-span-8 lg:col-span-7 flex flex-col justify-center text-left space-y-6 md:pl-6 w-full">
              <div className="space-y-2">
                <div 
                  className="text-[#41B3A3] text-sm md:text-base font-semibold tracking-[0.25em] uppercase"
                >
                  GET IN TOUCH
                </div>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
                  LET'S COLLABORATE
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 font-sans max-w-xl leading-relaxed">
                  Have any inquiries, project suggestions, or recruitment proposals? Reach out directly through one of my verified secure digital communication channels below.
                </p>
              </div>

              {/* Direct Digital Channels Portal Card */}
              <div id="contact-channels-card" className="w-full max-w-xl bg-black/60 border border-white/10 hover:border-[#41B3A3]/20 p-5 sm:p-8 rounded-2xl sm:rounded-3xl relative overflow-hidden backdrop-blur-xl transition-all duration-500 shadow-2xl flex flex-col space-y-4">
                
                {/* Email Channel */}
                <motion.div 
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="group/item relative bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-[#41B3A3]/40 active:border-[#41B3A3]/60 p-4 rounded-xl flex items-center justify-between transition-all duration-300 hover:scale-[1.015] hover:shadow-[0_0_15px_rgba(65,179,163,0.12)]"
                >
                  <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest">// SECURE EMAIL</div>
                      <a href="mailto:tonukazi@gmail.com" className="text-xs sm:text-sm font-bold text-white hover:text-[#41B3A3] transition-colors break-all block">
                        tonukazi@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1.5 shrink-0">
                    <button
                      onClick={() => handleCopyToClipboard("tonukazi@gmail.com", "email")}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all cursor-pointer active:scale-95"
                      title="Copy email to clipboard"
                    >
                      {copiedText === "email" ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <a
                      href="mailto:tonukazi@gmail.com"
                      className="p-2 rounded-lg bg-[#41B3A3]/10 hover:bg-[#41B3A3] text-[#41B3A3] hover:text-black transition-all cursor-pointer active:scale-95"
                      title="Open Mail Client"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5 font-bold" />
                    </a>
                  </div>
                </motion.div>

                {/* WhatsApp Channel */}
                <motion.div 
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="group/item relative bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-[#41B3A3]/40 active:border-[#41B3A3]/60 p-4 rounded-xl flex items-center justify-between transition-all duration-300 hover:scale-[1.015] hover:shadow-[0_0_15px_rgba(65,179,163,0.12)]"
                >
                  <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                      <MessageCircle className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest">// WHATSAPP CHAT</div>
                      <a 
                        href="https://wa.me/6580627387" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-xs sm:text-sm font-bold text-white hover:text-[#41B3A3] transition-colors block"
                      >
                        +65 8062 7387
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1.5 shrink-0">
                    <button
                      onClick={() => handleCopyToClipboard("+6580627387", "phone")}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all cursor-pointer active:scale-95"
                      title="Copy number to clipboard"
                    >
                      {copiedText === "phone" ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <a
                      href="https://wa.me/6580627387"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-[#41B3A3]/10 hover:bg-[#41B3A3] text-[#41B3A3] hover:text-black transition-all cursor-pointer active:scale-95"
                      title="Open WhatsApp Chat"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5 font-bold" />
                    </a>
                  </div>
                </motion.div>

                {/* LinkedIn Gateway */}
                <motion.div 
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: 0.19, ease: [0.16, 1, 0.3, 1] }}
                  className="group/item relative bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-[#41B3A3]/40 active:border-[#41B3A3]/60 p-4 rounded-xl flex items-center justify-between transition-all duration-300 hover:scale-[1.015] hover:shadow-[0_0_15px_rgba(65,179,163,0.12)]"
                >
                  <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-[#41B3A3]/10 border border-[#41B3A3]/25 flex items-center justify-center shrink-0">
                      <Linkedin className="w-5 h-5 text-[#41B3A3]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest">// PROFESSIONAL LINKEDIN</div>
                      <a 
                        href="https://linkedin.com/in/kazitonu" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-xs sm:text-sm font-bold text-white hover:text-[#41B3A3] transition-colors break-all block"
                      >
                        linkedin/in/kazitonu
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1.5 shrink-0">
                    <a
                      href="https://linkedin.com/in/kazitonu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-[#41B3A3]/10 hover:bg-[#41B3A3] text-[#41B3A3] hover:text-black transition-all cursor-pointer active:scale-95"
                      title="Visit LinkedIn Profile"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5 font-bold" />
                    </a>
                  </div>
                </motion.div>

                {/* Copied notification alert label */}
                <AnimatePresence>
                  {copiedText && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest text-center pt-2 select-none"
                    >
                      ✓ copied {copiedText === "email" ? "email address" : "phone number"} to clipboard
                    </motion.div>
                  )}
                </AnimatePresence>
                
              </div>

              {/* Simple Direct Links Footer info */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4">
                <div 
                  className="bg-black/50 border border-white/5 backdrop-blur-md py-2.5 px-4 rounded-xl flex items-center space-x-2.5 text-xs text-zinc-400 font-mono shadow-md select-none"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#41B3A3]" />
                  <span>Singapore Base</span>
                </div>
                <div 
                  className="bg-black/50 border border-white/5 backdrop-blur-md py-2.5 px-4 rounded-xl flex items-center space-x-2.5 text-xs text-zinc-400 font-mono shadow-md select-none"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#41B3A3] animate-pulse" />
                  <span>Available for Global Placement</span>
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
  </>
  );
}
