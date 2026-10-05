/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TechSection, TechHeader } from "./components/TechSection";
import { linkedinPosts, postsUpdatedAt } from "./data/linkedinPosts";
import { 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  ArrowUpRight, 
  GraduationCap, 
  Briefcase, 
  ShieldCheck, 
  Linkedin, 
  MessageCircle, 
  Copy, 
  Check,
  User,
  Menu,
  X,
  Download
} from "lucide-react";

export default function App() {
  const [certFilter, setCertFilter] = useState<"all" | "lifetime" | "valid" | "expiring">("all");
  const [copiedText, setCopiedText] = useState("");
  const [skillsVisible, setSkillsVisible] = useState(false);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSkillsVisible(true);
          if (skillsRef.current) {
            observer.unobserve(skillsRef.current);
          }
        }
      },
      { threshold: 0.15 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const cvUrl = "https://drive.google.com/file/d/1Gq8-4htQksUC_7xIKiOkxtJC25Q96ySf/view?usp=sharing";

  const handleDownloadCV = () => {
    window.open(cvUrl, "_blank", "noopener,noreferrer");
  };

  const aboutSkills = [
    { label: "WSH & MOM COMPLIANCE", percentage: 98 },
    { label: "RISK ASSESSMENT (HIRA)", percentage: 95 },
    { label: "HIGH-RISK SUPERVISION", percentage: 92 },
    { label: "SAFETY AUDITS & DRILLS", percentage: 90 },
    { label: "INCIDENT INVESTIGATION", percentage: 88 },
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
      const scrollPosition = window.scrollY + 180;

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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(id);
    }
  };

  const navItems = [
    { id: "home", label: "HOME" },
    { id: "summary", label: "ABOUT" },
    { id: "experience", label: "EXPERIENCE" },
    { id: "certifications", label: "CERTIFICATIONS" },
    { id: "posts", label: "POSTS" },
    { id: "competencies", label: "SERVICES" },
    { id: "contact", label: "CONTACT" },
  ];

  return (
    <div className="min-h-screen bg-[#181818] text-zinc-100 font-sans antialiased selection:bg-teal-500 selection:text-black">
      {/* Top Header / Navigation as seen in reference image */}
      <header className="sticky top-0 z-50 bg-[#181818]/95 backdrop-blur-sm border-b border-zinc-800/60 px-6 lg:px-16 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo / Brand Name */}
          <a 
            href="#home" 
            onClick={(e) => scrollToSection(e, "home")}
            className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-0.5 cursor-pointer group"
          >
            Tonu<span className="text-[#E83E8C] font-black group-hover:animate-ping inline-block">.</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-bold tracking-widest text-zinc-300 uppercase">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`relative transition-all duration-200 py-1 cursor-pointer ${
                    isActive 
                      ? "text-white font-extrabold" 
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E83E8C] rounded-full shadow-[0_0_8px_#E83E8C]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Hamburger Menu Toggle for Mobile */}
          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-zinc-300 hover:text-white transition-colors cursor-pointer p-1"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pt-4 pb-2 border-t border-zinc-800/80 mt-3 flex flex-col space-y-3 text-xs font-bold tracking-widest uppercase overflow-hidden"
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => scrollToSection(e, item.id)}
                    className={`py-1.5 transition-colors cursor-pointer flex items-center gap-2 ${
                      isActive ? "text-[#E83E8C] font-black" : "text-zinc-300 hover:text-white"
                    }`}
                  >
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#E83E8C]" />}
                    {item.label}
                  </a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION matching reference image with background photo */}
      <section id="home" className="relative min-h-[85vh] flex items-center overflow-hidden border-b border-zinc-800/40">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.08, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            src="/hero-photo.png"
            alt="Kazi Tonu - WSH Coordinator"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-right-bottom sm:object-right md:object-[85%_center]"
          />
          {/* Gradients to ensure crisp text contrast on the left & top header integration */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#181818] via-[#181818]/90 sm:via-[#181818]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-[#181818]/60 lg:to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-16 py-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl sm:max-w-xl lg:max-w-2xl space-y-5"
          >
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs sm:text-sm font-bold tracking-[0.25em] text-teal-400 uppercase drop-shadow-sm flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping inline-block" />
              HELLO, MY NAME IS
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight uppercase leading-none drop-shadow-md"
            >
              KAZI TONU
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed pt-1 drop-shadow"
            >
              Workplace Safety and Health (WSH) Coordinator based in Singapore. Experienced in supervising high-risk construction activities, conducting HIRA risk assessments, and ensuring full MOM regulatory compliance to maintain zero-incident workplaces.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="pt-4 flex flex-wrap items-center gap-4"
            >
              <motion.a 
                whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(255,255,255,0.3)" }}
                whileTap={{ scale: 0.96 }}
                href="#experience" 
                onClick={(e) => scrollToSection(e, "experience")}
                className="inline-block bg-[#D6D6D6] hover:bg-white text-zinc-950 font-bold px-8 py-3.5 rounded text-xs sm:text-sm tracking-widest uppercase transition-colors shadow-lg cursor-pointer"
              >
                MY WORK
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.04, borderColor: "#14b8a6" }}
                whileTap={{ scale: 0.96 }}
                href="#contact" 
                onClick={(e) => scrollToSection(e, "contact")}
                className="inline-block bg-zinc-900/80 hover:bg-zinc-800 text-teal-400 border border-zinc-700 font-bold px-6 py-3.5 rounded text-xs sm:text-sm tracking-widest uppercase transition-colors shadow-lg cursor-pointer"
              >
                CONTACT ME
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 lg:px-8 py-12 space-y-16 relative">

        {/* ABOUT ME Section matching reference image */}
        <TechSection id="summary" className="bg-[#212121] border border-zinc-800/80 rounded-2xl p-8 sm:p-12 lg:p-16 space-y-10 shadow-2xl">
          {/* Centered Heading with Underline */}
          <TechHeader title="ABOUT ME" subtitle="Certified Workplace Safety & Health Professional with proven field expertise in Singapore." />

          {/* Two Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left Column: Greeting, Description & Download CV Button */}
            <motion.div 
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-6 space-y-6"
            >
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Howdy!
              </h3>
              <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed">
                I am Kazi Tonu, a dedicated Workplace Safety and Health (WSH) Coordinator based in Singapore. Experienced in supervising high-risk construction activities, conducting thorough HIRA risk assessments, and ensuring full MOM regulatory compliance to maintain zero-incident workplaces.
              </p>

              <div className="pt-3">
                <motion.a 
                  whileHover={{ scale: 1.04, boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)" }}
                  whileTap={{ scale: 0.96 }}
                  href={cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-[#D6D6D6] hover:bg-white text-zinc-950 font-extrabold px-7 py-3.5 rounded text-xs sm:text-sm tracking-widest uppercase transition-all duration-200 shadow-sm cursor-pointer"
                >
                  <span>DOWNLOAD MY CV</span>
                  <Download className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>

            {/* Right Column: Skill Proficiency Progress Bars */}
            <div ref={skillsRef} className="lg:col-span-6 space-y-6 pt-2 lg:pt-0">
              {aboutSkills.map((skill, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white">
                    <span>{skill.label}</span>
                    <span className="text-teal-400 font-mono font-bold">{skill.percentage}%</span>
                  </div>
                  <div className="relative w-full h-2 bg-zinc-700/80 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full relative"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.2, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </TechSection>

        {/* Work Experience Section matching reference image */}
        <TechSection id="experience" className="bg-[#212121] border border-zinc-800/80 rounded-2xl p-8 sm:p-12 lg:p-16 space-y-12 shadow-2xl">
          <TechHeader title="MY EXPERIENCE" subtitle="Proven track record in Singapore construction & engineering safety management." />

          {/* Experience Grid - 2 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 pt-4">
            
            {/* Column 1: WSH Coordinator & Safety Supervisor */}
            <div className="space-y-10 sm:space-y-12">
              {/* Item 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="grid grid-cols-12 gap-3 sm:gap-4 items-start group"
              >
                <div className="col-span-4 sm:col-span-3 text-left sm:text-right space-y-0.5 pr-1">
                  <h4 className="text-xs sm:text-sm font-extrabold text-white tracking-wide leading-tight group-hover:text-teal-400 transition-colors">
                    Success Forever Construction & Maintenance Pte Ltd
                  </h4>
                  <p className="text-[11px] sm:text-xs font-mono text-teal-400/90 pt-0.5">
                    Dec 2023 - Present
                  </p>
                </div>

                <div className="col-span-1 flex flex-col items-center">
                  <motion.div 
                    whileHover={{ scale: 1.25 }}
                    className="w-6 h-6 rounded-full bg-teal-500 text-zinc-950 flex items-center justify-center font-bold shrink-0 shadow-[0_0_12px_rgba(20,184,166,0.6)]"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </motion.div>
                  <div className="w-px border-r-2 border-dashed border-teal-500/40 h-28 my-2" />
                </div>

                <div className="col-span-7 sm:col-span-8 space-y-1.5 pl-1">
                  <h3 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                    WSH Coordinator
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                    Oversee daily site safety, enforce strict compliance with Singapore WSH laws and MOM regulations, conduct HIRA risk assessments, and lead toolbox briefings to maintain zero incidents.
                  </p>
                </div>
              </motion.div>

              {/* Item 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-12 gap-3 sm:gap-4 items-start group"
              >
                <div className="col-span-4 sm:col-span-3 text-left sm:text-right space-y-0.5 pr-1">
                  <h4 className="text-xs sm:text-sm font-extrabold text-white tracking-wide leading-tight group-hover:text-teal-400 transition-colors">
                    Success Forever Construction & Maintenance Pte Ltd
                  </h4>
                  <p className="text-[11px] sm:text-xs font-mono text-zinc-400 pt-0.5">
                    May 2023 - Nov 2023
                  </p>
                </div>

                <div className="col-span-1 flex flex-col items-center">
                  <motion.div 
                    whileHover={{ scale: 1.25 }}
                    className="w-6 h-6 rounded-full bg-white text-zinc-950 flex items-center justify-center font-bold shrink-0 shadow-md"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </motion.div>
                </div>

                <div className="col-span-7 sm:col-span-8 space-y-1.5 pl-1">
                  <h3 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                    Workplace Safety and Health Management Construction Industry Supervisor
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                    Supervised high-risk work-at-height activities aligning with MOM safety bylaws, operated hydraulic boom lifts, and conducted daily site hazard audits.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Column 2: General Construction Worker */}
            <div className="space-y-10 sm:space-y-12">
              {/* Item 3 */}
              <motion.div 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-12 gap-3 sm:gap-4 items-start group"
              >
                <div className="col-span-4 sm:col-span-3 text-left sm:text-right space-y-0.5 pr-1">
                  <h4 className="text-xs sm:text-sm font-extrabold text-white tracking-wide leading-tight group-hover:text-teal-400 transition-colors">
                    Success Forever Construction & Maintenance Pte Ltd
                  </h4>
                  <p className="text-[11px] sm:text-xs font-mono text-zinc-400 pt-0.5">
                    Feb 2023 - May 2023
                  </p>
                </div>

                <div className="col-span-1 flex flex-col items-center">
                  <motion.div 
                    whileHover={{ scale: 1.25 }}
                    className="w-6 h-6 rounded-full bg-white text-zinc-950 flex items-center justify-center font-bold shrink-0 shadow-md"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </motion.div>
                </div>

                <div className="col-span-7 sm:col-span-8 space-y-1.5 pl-1">
                  <h3 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                    General Worker
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                    Supported groundwork logistics, materials handling, site layout preparation, and equipment operations while mastering core workplace safety protocols.
                  </p>
                </div>
              </motion.div>
            </div>

          </div>

          {/* Education Subsection */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="pt-8 border-t border-zinc-800/80 space-y-4"
          >
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-teal-400" />
              <h3 className="text-base sm:text-lg font-black text-white tracking-wide uppercase">Educational Background</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {resumeDetails.education.map((edu, eduIdx) => (
                <motion.div 
                  key={eduIdx} 
                  whileHover={{ y: -4, borderColor: "rgba(20,184,166,0.5)" }}
                  className="bg-zinc-900/90 border border-zinc-800/80 p-4 rounded-xl space-y-1 transition-all"
                >
                  <span className="text-xs font-bold text-white block">{edu.degree}</span>
                  <p className="text-xs text-zinc-400">{edu.institution}</p>
                  <span className="text-[11px] font-mono text-teal-400 block pt-1">{edu.period}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </TechSection>

        {/* Certifications and Licenses Section */}
        <TechSection id="certifications" className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 lg:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-teal-400" />
              <h2 className="text-xl font-bold text-white">Certifications & Licenses ({certificationsList.length})</h2>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 text-xs font-medium">
              <button
                onClick={() => setCertFilter("all")}
                className={`px-3 py-1.5 rounded border transition-all cursor-pointer ${
                  certFilter === "all"
                    ? "bg-teal-600 text-white border-teal-500 shadow-[0_0_12px_rgba(20,184,166,0.4)]"
                    : "bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700"
                }`}
              >
                All ({certificationsList.length})
              </button>
              <button
                onClick={() => setCertFilter("lifetime")}
                className={`px-3 py-1.5 rounded border transition-all cursor-pointer ${
                  certFilter === "lifetime"
                    ? "bg-teal-600 text-white border-teal-500 shadow-[0_0_12px_rgba(20,184,166,0.4)]"
                    : "bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700"
                }`}
              >
                Lifetime / No Expiry ({certificationsList.filter(c => getValidityDetails(c.expiryDate).status === 'lifetime').length})
              </button>
              <button
                onClick={() => setCertFilter("valid")}
                className={`px-3 py-1.5 rounded border transition-all cursor-pointer ${
                  certFilter === "valid"
                    ? "bg-teal-600 text-white border-teal-500 shadow-[0_0_12px_rgba(20,184,166,0.4)]"
                    : "bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700"
                }`}
              >
                Active Valid ({certificationsList.filter(c => getValidityDetails(c.expiryDate).status === 'valid').length})
              </button>
              <button
                onClick={() => setCertFilter("expiring")}
                className={`px-3 py-1.5 rounded border transition-all cursor-pointer ${
                  certFilter === "expiring"
                    ? "bg-amber-600 text-white border-amber-500 shadow-[0_0_12px_rgba(217,119,6,0.4)]"
                    : "bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700"
                }`}
              >
                Renewal Action ({certificationsList.filter(c => {
                  const s = getValidityDetails(c.expiryDate).status;
                  return s === 'expiring' || s === 'expired';
                }).length})
              </button>
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredCerts.map((cert) => {
                const validity = getValidityDetails(cert.expiryDate);
                return (
                  <motion.div 
                    layout
                    key={cert.title} 
                    initial={{ opacity: 0, scale: 0.92, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: -15 }}
                    whileHover={{ y: -4, borderColor: "rgba(20, 184, 166, 0.5)", boxShadow: "0 10px 30px -10px rgba(20, 184, 166, 0.15)" }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="bg-zinc-950/80 border border-zinc-800 p-5 rounded-lg flex flex-col justify-between space-y-3 transition-colors"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-bold text-white leading-snug">{cert.title}</h3>
                        <span className="text-[11px] font-mono text-zinc-500 shrink-0">{cert.date}</span>
                      </div>

                      <p className="text-xs font-semibold text-teal-400">{cert.authority}</p>
                      <p className="text-xs text-zinc-400 leading-relaxed">{cert.description}</p>
                    </div>

                    <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-end text-xs font-mono">
                      <span className={`px-2 py-0.5 rounded border text-[10px] font-semibold ${validity.badgeColor}`}>
                        {validity.labelText}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </TechSection>

        {/* LinkedIn Posts Section — synced daily from linkedin.com/in/kazitonu */}
        <TechSection id="posts" className="bg-[#212121] border border-zinc-800/80 rounded-2xl p-8 sm:p-12 lg:p-16 space-y-12 shadow-2xl">
          <TechHeader title="LINKEDIN POSTS" subtitle="My latest workplace-safety posts — synced from LinkedIn every day." />

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {linkedinPosts.map((post) => (
              <motion.a
                key={post.id}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, borderColor: "rgba(20,184,166,0.5)" }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="bg-zinc-900/90 border border-zinc-800/80 rounded-xl overflow-hidden flex flex-col transition-all group"
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
                    <span className="text-teal-400">{formatPostDate(post.date)}</span>
                    <span className="text-zinc-500">
                      {post.reactions != null && `${post.reactions} reaction${post.reactions === 1 ? "" : "s"}`}
                      {post.reactions != null && post.comments != null && " · "}
                      {post.comments != null && `${post.comments} comment${post.comments === 1 ? "" : "s"}`}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed line-clamp-4 whitespace-pre-line">{post.text}</p>
                  <div className="pt-3 mt-auto border-t border-zinc-800/80 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-white flex items-center gap-1 group-hover:text-teal-400 transition-colors">
                      View on LinkedIn <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                    <Linkedin className="w-4 h-4 text-blue-400" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
          <p className="text-center text-[11px] font-mono text-zinc-600">Last synced: {formatPostDate(postsUpdatedAt)}</p>
        </TechSection>

        {/* Specialized WSH Competencies */}
        <TechSection id="competencies" className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 lg:p-8 space-y-6">
          <div className="flex items-center space-x-2 border-b border-zinc-800 pb-4">
            <ShieldCheck className="w-5 h-5 text-teal-400" />
            <h2 className="text-xl font-bold text-white">Specialized WSH Competencies & Capabilities</h2>
          </div>

          <div className="space-y-4">
            {specializedSkillsList.map((skill, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ borderColor: "rgba(20, 184, 166, 0.5)" }}
                className="bg-zinc-950/80 border border-zinc-800 p-5 rounded-lg space-y-2.5 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                    {skill.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono bg-zinc-800 text-teal-400 px-2 py-0.5 rounded border border-zinc-700">
                      {skill.metrics}
                    </span>
                    <span className="text-xs font-mono text-zinc-300 font-bold">{skill.percentage}</span>
                  </div>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed">{skill.description}</p>

                {/* Animated proficiency fill line */}
                <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-teal-500 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: skill.percentage }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: idx * 0.1 + 0.2 }}
                  />
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {skill.aspects.map((aspect, aIdx) => (
                    <span key={aIdx} className="text-[11px] bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded border border-zinc-800">
                      {aspect}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </TechSection>

        {/* Contact Section */}
        <TechSection id="contact" className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 lg:p-8 space-y-6">
          <div className="border-b border-zinc-800 pb-4 space-y-1">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Contact & Communication Channels
            </h2>
            <p className="text-xs text-zinc-400">Direct contact details for recruitment, site audits, and official inquiries.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div 
              whileHover={{ y: -3, borderColor: "rgba(20, 184, 166, 0.6)" }}
              className="bg-zinc-950/80 border border-zinc-800 p-4 rounded-lg flex items-center justify-between transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded bg-teal-950 border border-teal-800 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Email</span>
                  <a href="mailto:tonukazi@gmail.com" className="text-sm font-bold text-white hover:text-teal-400 block truncate">
                    tonukazi@gmail.com
                  </a>
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => handleCopyToClipboard("tonukazi@gmail.com", "email")}
                className="p-2 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer shrink-0 ml-2"
                title="Copy email"
              >
                {copiedText === "email" ? <Check className="w-4 h-4 text-teal-400" /> : <Copy className="w-4 h-4" />}
              </motion.button>
            </motion.div>

            <motion.div 
              whileHover={{ y: -3, borderColor: "rgba(16, 185, 129, 0.6)" }}
              className="bg-zinc-950/80 border border-zinc-800 p-4 rounded-lg flex items-center justify-between transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded bg-emerald-950 border border-emerald-800 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">WhatsApp / Phone</span>
                  <a href="https://wa.me/6580627387" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-white hover:text-teal-400 block truncate">
                    +65 8062 7387
                  </a>
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => handleCopyToClipboard("+6580627387", "phone")}
                className="p-2 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer shrink-0 ml-2"
                title="Copy number"
              >
                {copiedText === "phone" ? <Check className="w-4 h-4 text-teal-400" /> : <Copy className="w-4 h-4" />}
              </motion.button>
            </motion.div>

            <motion.div 
              whileHover={{ y: -3, borderColor: "rgba(59, 130, 246, 0.6)" }}
              className="bg-zinc-950/80 border border-zinc-800 p-4 rounded-lg flex items-center justify-between transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded bg-blue-950 border border-blue-800 flex items-center justify-center shrink-0">
                  <Linkedin className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">LinkedIn</span>
                  <a href="https://linkedin.com/in/kazitonu" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-white hover:text-teal-400 block truncate">
                    kazitonu
                  </a>
                </div>
              </div>
              <a
                href="https://linkedin.com/in/kazitonu"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer shrink-0 ml-2"
                title="Visit LinkedIn"
              >
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          <AnimatePresence>
            {copiedText && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-2 bg-emerald-950/80 border border-emerald-800 rounded text-xs text-emerald-400 text-center font-mono max-w-md mx-auto"
              >
                ✓ Copied {copiedText === "email" ? "email" : "phone number"} to clipboard
              </motion.div>
            )}
          </AnimatePresence>
        </TechSection>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-6 text-center text-xs text-zinc-500 font-mono">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>© {new Date().getFullYear()} KAZI TONU • Workplace Safety and Health Coordinator</span>
          <a href="#summary" className="text-teal-400 hover:underline">Return to top ↑</a>
        </div>
      </footer>
    </div>
  );
}
