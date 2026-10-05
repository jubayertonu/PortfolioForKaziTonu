import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Award,
  Building2,
  Check,
  ClipboardCheck,
  Download,
  HardHat,
  Layers,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";

import {
  certifications,
  experience,
  expertise,
  profile,
} from "./data";
import { linkedinPosts } from "./data/linkedinPosts";

const navigation = [
  { label: "Expertise", href: "#expertise" },
  { label: "Experience", href: "#experience" },
  { label: "Credentials", href: "#credentials" },
  { label: "Posts", href: "#posts" },
];

const iconMap = {
  clipboard: ClipboardCheck,
  hardhat: HardHat,
  users: Users,
  shield: ShieldCheck,
  layers: Layers,
};

function formatDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-SG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// LinkedIn brand icon (lucide-react no longer ships brand icons).
function LinkedinIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

/**
 * Progressive enhancement:
 * Content stays visible when IntersectionObserver is unavailable.
 * Reduced-motion users do not receive reveal animations.
 */
function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (
      !element ||
      reducedMotion.matches ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    element.dataset.reveal = "pending";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        element.dataset.reveal = "visible";
        observer.unobserve(element);
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -24px 0px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      delete element.dataset.reveal;
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ "--reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function SectionHeading({ id, eyebrow, title, description }) {
  return (
    <Reveal className="mb-10 max-w-2xl md:mb-14">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="section-title mt-4">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-8 text-muted">
          {description}
        </p>
      )}
    </Reveal>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }

    function handleResize() {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-paper/90 backdrop-blur-xl">
      <div className="shell flex h-20 items-center justify-between gap-6">
        <a
          href="#home"
          className="flex items-center gap-3"
          aria-label={`${profile.name}, home`}
          onClick={() => setOpen(false)}
        >
          <span
            className="flex size-11 items-center justify-center rounded-2xl bg-forest font-display text-sm font-extrabold text-lime"
            aria-hidden="true"
          >
            {profile.initials}
          </span>
          <span>
            <span className="block font-display text-sm font-extrabold tracking-tight">
              {profile.name}
            </span>
            <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
              {profile.role}
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link text-sm font-semibold text-ink/80"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a href="#contact" className="btn btn-primary">
            Get in touch
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-xl border border-line bg-white/70 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-line/80 bg-paper/95 backdrop-blur-xl md:hidden"
        >
          <nav className="shell flex flex-col gap-1 py-4" aria-label="Mobile">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-xl px-4 py-3 text-base font-semibold text-ink"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn btn-primary mt-3"
              onClick={() => setOpen(false)}
            >
              Get in touch
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function SiteIllustration() {
  return (
    <div
      className="hero-visual relative overflow-hidden rounded-[2rem] border border-line bg-forest shadow-hero"
      role="img"
      aria-label="Stylised illustration of a safe construction site at dusk"
    >
      <div className="site-grid absolute inset-0" aria-hidden="true" />
      <svg
        viewBox="0 0 560 440"
        className="relative block h-auto w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1d4a3e" />
            <stop offset="100%" stopColor="#173f35" />
          </linearGradient>
        </defs>

        <rect width="560" height="440" fill="url(#sky)" />

        {/* Sun */}
        <circle cx="468" cy="86" r="46" fill="#d6eea3" opacity="0.9" />
        <circle cx="468" cy="86" r="66" fill="#d6eea3" opacity="0.18" />

        {/* Crane */}
        <g stroke="#d6eea3" strokeWidth="7" strokeLinecap="round" opacity="0.95">
          <line x1="120" y1="330" x2="120" y2="120" />
          <line x1="64" y1="120" x2="252" y2="120" />
          <line x1="120" y1="120" x2="196" y2="182" />
        </g>
        <g fill="none" stroke="#d6eea3" strokeWidth="4" opacity="0.9">
          <line x1="216" y1="120" x2="216" y2="176" />
          <rect x="198" y="176" width="36" height="30" rx="4" />
        </g>

        {/* Buildings */}
        <g>
          <rect x="300" y="190" width="96" height="140" rx="6" fill="#ffffff" opacity="0.10" />
          <rect x="412" y="236" width="84" height="94" rx="6" fill="#ffffff" opacity="0.08" />
          <g fill="#d6eea3" opacity="0.75">
            {Array.from({ length: 4 }).map((_, row) =>
              Array.from({ length: 3 }).map((_, col) => (
                <rect
                  key={`a-${row}-${col}`}
                  x={316 + col * 26}
                  y={208 + row * 28}
                  width="14"
                  height="16"
                  rx="2"
                />
              )),
            )}
            {Array.from({ length: 3 }).map((_, row) =>
              Array.from({ length: 2 }).map((_, col) => (
                <rect
                  key={`b-${row}-${col}`}
                  x={428 + col * 28}
                  y={252 + row * 26}
                  width="14"
                  height="14"
                  rx="2"
                />
              )),
            )}
          </g>
        </g>

        {/* Ground */}
        <rect x="0" y="330" width="560" height="110" fill="#122e27" />

        {/* Safety barrier */}
        <g>
          {Array.from({ length: 9 }).map((_, i) => (
            <g key={i}>
              <rect
                x={24 + i * 58}
                y={352}
                width="10"
                height="52"
                rx="3"
                fill="#d6eea3"
                opacity="0.9"
              />
              <rect
                x={18 + i * 58}
                y={360}
                width="58"
                height="12"
                rx="3"
                fill={i % 2 === 0 ? "#d6eea3" : "#f6f5f0"}
                opacity="0.9"
              />
              <rect
                x={18 + i * 58}
                y={382}
                width="58"
                height="12"
                rx="3"
                fill={i % 2 === 0 ? "#f6f5f0" : "#d6eea3"}
                opacity="0.9"
              />
            </g>
          ))}
        </g>

        {/* Worker with helmet */}
        <g>
          <circle cx="120" cy="262" r="17" fill="#f6f5f0" />
          <path
            d="M103 258a17 17 0 0 1 34 0v4h-34z"
            fill="#d6eea3"
          />
          <rect x="112" y="282" width="16" height="34" rx="7" fill="#f6f5f0" />
          <rect x="104" y="316" width="10" height="26" rx="5" fill="#f6f5f0" />
          <rect x="126" y="316" width="10" height="26" rx="5" fill="#f6f5f0" />
          {/* Checklist board */}
          <rect x="150" y="292" width="34" height="44" rx="5" fill="#f6f5f0" />
          <g stroke="#173f35" strokeWidth="3" strokeLinecap="round">
            <line x1="157" y1="304" x2="177" y2="304" />
            <line x1="157" y1="314" x2="177" y2="314" />
            <line x1="157" y1="324" x2="170" y2="324" />
          </g>
        </g>

        {/* Hard hats */}
        <g>
          <path d="M250 356a22 22 0 0 1 44 0v6h-44z" fill="#d6eea3" />
          <rect x="246" y="360" width="52" height="8" rx="4" fill="#d6eea3" />
          <path d="M330 366a18 18 0 0 1 36 0v5h-36z" fill="#f6f5f0" opacity="0.92" />
          <rect x="327" y="369" width="42" height="7" rx="3.5" fill="#f6f5f0" opacity="0.92" />
        </g>
      </svg>

      <div className="relative flex items-center gap-3 border-t border-white/15 bg-black/20 px-6 py-4">
        <span className="flex size-9 items-center justify-center rounded-xl bg-lime text-forest">
          <ShieldCheck className="size-5" aria-hidden="true" />
        </span>
        <p className="text-sm font-medium text-white/90">
          Practical routines. Clear communication. Consistent follow-through.
        </p>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="scroll-mt-24">
      <div className="shell grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow">Workplace Safety &amp; Health · Singapore</p>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl">
              Safer work.
              <br />
              Stronger teams.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              {profile.introduction}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-8 flex flex-wrap gap-4">
              {profile.resumeUrl ? (
                <a href={profile.resumeUrl} className="btn btn-primary" download>
                  <Download className="size-4" aria-hidden="true" />
                  Download résumé
                </a>
              ) : null}
              <a href="#contact" className="btn btn-outline">
                Get in touch
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
              >
                <LinkedinIcon className="size-4" aria-hidden="true" />
                LinkedIn
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <dl className="mt-10 grid max-w-lg grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <span className="icon-tile" aria-hidden="true">
                  <MapPin className="size-5" />
                </span>
                <div>
                  <dt className="metadata-label uppercase tracking-[0.14em]">
                    Based in
                  </dt>
                  <dd className="metadata-value font-semibold">
                    {profile.location}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="icon-tile" aria-hidden="true">
                  <HardHat className="size-5" />
                </span>
                <div>
                  <dt className="metadata-label uppercase tracking-[0.14em]">
                    Focus
                  </dt>
                  <dd className="metadata-value font-semibold">
                    Site safety coordination
                  </dd>
                </div>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={140} className="w-full">
          <SiteIllustration />
        </Reveal>
      </div>

      <div className="flex justify-center pb-10">
        <a
          href="#expertise"
          className="flex size-12 items-center justify-center rounded-full border border-line bg-white/70 text-forest transition hover:-translate-y-0.5"
          aria-label="Scroll to expertise"
        >
          <ArrowDown className="size-5 animate-bounce" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

function Expertise() {
  return (
    <section id="expertise" className="scroll-mt-24 bg-sage/60">
      <div className="shell py-20 md:py-28">
        <SectionHeading
          id="expertise-heading"
          eyebrow="Expertise"
          title="A practical approach to safer sites"
          description="I focus on the day-to-day habits that keep people safe: spotting risks early, communicating clearly, and following through until issues are closed."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {expertise.map((item, index) => {
            const Icon = iconMap[item.icon] ?? ClipboardCheck;
            return (
              <Reveal key={item.title} delay={index * 90}>
                <article className="surface-card h-full p-7">
                  <span className="icon-tile" aria-hidden="true">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="scroll-mt-24">
      <div className="shell py-20 md:py-28">
        <SectionHeading
          id="experience-heading"
          eyebrow="Experience"
          title="From the ground up to leading site safety"
          description="Nearly three years with Success Forever Construction & Maintenance — promoted twice within ten months."
        />

        <ol className="relative space-y-8 before:absolute before:bottom-4 before:left-[7px] before:top-4 before:w-px before:bg-line">
          {experience.map((role, index) => (
            <Reveal key={role.id} delay={index * 80}>
              <li className="relative pl-10">
                <span
                  className="absolute left-0 top-2 size-[15px] rounded-full border-[3px] border-forest bg-lime"
                  aria-hidden="true"
                />
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  {role.period}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">
                  {role.role}
                </h3>
                <p className="mt-1 flex items-center gap-2 text-sm font-medium text-muted">
                  <Building2 className="size-4" aria-hidden="true" />
                  {role.employer}
                </p>
                <p className="mt-4 max-w-2xl text-[15px] leading-7 text-ink/85">
                  {role.summary}
                </p>
                {role.highlights?.length ? (
                  <ul className="mt-4 max-w-2xl space-y-2.5">
                    {role.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-3 text-[15px] leading-7 text-ink/85"
                      >
                        <Check
                          className="mt-1.5 size-4 shrink-0 text-forest"
                          aria-hidden="true"
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Credentials() {
  return (
    <section id="credentials" className="scroll-mt-24 bg-forest text-white">
      <div className="shell py-20 md:py-28">
        <Reveal className="mb-10 max-w-2xl md:mb-14">
          <p className="eyebrow !text-lime">Credentials</p>
          <h2 className="section-title mt-4 text-white">
            Training &amp; certifications
          </h2>
          <p className="mt-5 text-base leading-8 text-white/75">
            Fifteen professional certifications across WSH management,
            work-at-height, lifting equipment, and emergency response.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, index) => {
            const Icon = iconMap[cert.icon] ?? Award;
            return (
              <Reveal key={cert.id} delay={index * 90}>
                <article className="flex h-full flex-col rounded-3xl border border-white/15 bg-white/[0.06] p-7 backdrop-blur-sm">
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-lime text-forest">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-lime">
                    {cert.category}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-white">
                    {cert.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-white/70">
                    {cert.course}
                  </p>

                  <dl className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-white/55">Issued by</dt>
                      <dd className="text-right font-medium text-white">
                        {cert.issuer}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-white/55">Completed</dt>
                      <dd className="text-right font-medium text-white">
                        {cert.completed}
                      </dd>
                    </div>
                    {cert.validUntil ? (
                      <div className="flex justify-between gap-4">
                        <dt className="text-white/55">Valid until</dt>
                        <dd className="text-right font-medium text-white">
                          {cert.validUntil}
                        </dd>
                      </div>
                    ) : null}
                  </dl>

                  {cert.documentUrl ? (
                    <a
                      href={cert.documentUrl}
                      className="btn btn-light mt-6"
                      target="_blank"
                      rel="noreferrer"
                    >
                      View certificate
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                  ) : null}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Posts() {
  return (
    <section id="posts" className="scroll-mt-24">
      <div className="shell py-20 md:py-28">
        <SectionHeading
          id="posts-heading"
          eyebrow="LinkedIn Posts"
          title="From the site diary"
          description="Safety notes, lessons, and observations I share with fellow safety professionals — synced from LinkedIn."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {linkedinPosts.map((post, index) => (
            <Reveal key={post.id} delay={(index % 3) * 90}>
              <a
                href={post.url}
                target="_blank"
                rel="noreferrer"
                className="surface-card block h-full overflow-hidden"
                aria-label={`LinkedIn post from ${formatDate(post.date)}`}
              >
                <img
                  src={post.image}
                  alt=""
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                    {formatDate(post.date)}
                  </p>
                  <p className="mt-3 line-clamp-4 text-sm leading-7 text-ink/85">
                    {post.text}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-forest">
                    View on LinkedIn
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const hasContact = profile.email || profile.linkedin || profile.phone;

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden">
      <div className="contact-glow" aria-hidden="true" />
      <div className="shell py-20 md:py-28">
        <div className="overflow-hidden rounded-[2rem] bg-forest text-white">
          <div className="grid gap-10 p-8 md:p-14 lg:grid-cols-[1fr_1fr]">
            <Reveal>
              <p className="eyebrow !text-lime">Contact</p>
              <h2 className="section-title mt-4 text-white">
                Let&apos;s talk site safety.
              </h2>
              <p className="mt-5 max-w-md text-base leading-8 text-white/75">
                I&apos;m happy to discuss safety coordination, site routines, or
                upcoming projects. The fastest way to reach me is below.
              </p>
              {profile.resumeUrl ? (
                <a href={profile.resumeUrl} className="btn btn-light mt-8" download>
                  <Download className="size-4" aria-hidden="true" />
                  Download résumé
                </a>
              ) : null}
            </Reveal>

            <Reveal delay={120}>
              {hasContact ? (
                <ul className="on-dark space-y-4">
                  {profile.email && (
                    <li>
                      <a
                        className="contact-link"
                        href={`mailto:${profile.email}?subject=${encodeURIComponent(
                          "Workplace Safety & Health opportunity",
                        )}`}
                      >
                        <span className="icon-tile !bg-lime" aria-hidden="true">
                          <Mail className="size-5" />
                        </span>
                        <span>
                          <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
                            Email
                          </span>
                          <span className="block font-semibold text-white">
                            {profile.email}
                          </span>
                        </span>
                      </a>
                    </li>
                  )}
                  {profile.phone && (
                    <li>
                      <a
                        className="contact-link"
                        href={`tel:${profile.phone.replace(/[^\d+]/g, "")}`}
                      >
                        <span className="icon-tile !bg-lime" aria-hidden="true">
                          <Phone className="size-5" />
                        </span>
                        <span>
                          <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
                            Phone
                          </span>
                          <span className="block font-semibold text-white">
                            {profile.phone}
                          </span>
                        </span>
                      </a>
                    </li>
                  )}
                  {profile.linkedin && (
                    <li>
                      <a
                        className="contact-link"
                        href={profile.linkedin}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="icon-tile !bg-lime" aria-hidden="true">
                          <LinkedinIcon className="size-5" />
                        </span>
                        <span>
                          <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
                            LinkedIn
                          </span>
                          <span className="block font-semibold text-white">
                            Connect on LinkedIn
                          </span>
                        </span>
                        <ArrowUpRight
                          className="ml-auto size-5 text-white/60"
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  )}
                </ul>
              ) : (
                <p className="rounded-2xl border border-white/15 bg-white/[0.06] p-6 text-sm leading-7 text-white/70">
                  Add your email or phone number in{" "}
                  <code className="rounded bg-white/10 px-1.5 py-0.5 text-[13px] text-lime">
                    src/data.js
                  </code>{" "}
                  and your contact options will appear here automatically.
                </p>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col items-center justify-between gap-4 py-8 text-sm text-muted md:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.role}
        </p>
        <p className="flex items-center gap-2">
          <MapPin className="size-4" aria-hidden="true" />
          {profile.location}
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Header />

      <main id="main" tabIndex={-1}>
        <Hero />
        <Expertise />
        <Experience />
        <Credentials />
        <Posts />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
