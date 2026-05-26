"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const typewriterRef = useRef<HTMLSpanElement>(null);

  const expMonths = Math.max(0, (new Date().getFullYear() - 2024) * 12 + (new Date().getMonth() - 6));

  const devStartDate = new Date(2025, 0);
  const devExpMonths = Math.max(0, (new Date().getFullYear() - devStartDate.getFullYear()) * 12 + (new Date().getMonth() - devStartDate.getMonth()));
  const expYears = (devExpMonths / 12).toFixed(1).replace('.0', '');
  const expText = devExpMonths >= 12 ? `${expYears} year${expYears === '1' ? '' : 's'}` : `${devExpMonths} months`;

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const cursor = document.getElementById('cursorGlow');
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      cursor.style.opacity = '1';
    };

    const hideCursor = () => {
      cursor.style.opacity = '0';
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseleave', hideCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseleave', hideCursor);
    };
  }, []);

  useEffect(() => {
    const roles = ["Software Engineer", "AI Engineer", "System Designer"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      const currentRole = roles[roleIndex];
      const el = typewriterRef.current;

      if (!el) return;

      if (isDeleting) {
        el.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        el.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
      }

      timeoutId = setTimeout(type, typeSpeed);
    };

    timeoutId = setTimeout(type, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const revealOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    const counterOptions = { threshold: 0.5 };
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const target = entry.target as HTMLElement;
        const endValue = parseInt(target.getAttribute('data-target') || "0");
        const duration = 2000;
        const frameDuration = 1000 / 60;
        const totalFrames = Math.round(duration / frameDuration);
        let frame = 0;

        const count = setInterval(() => {
          frame++;
          const progress = frame / totalFrames;
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          const currentCount = Math.round(endValue * easeOutQuart);

          target.textContent = currentCount.toString();

          if (frame === totalFrames) {
            clearInterval(count);
            target.textContent = endValue.toString();
          }
        }, frameDuration);

        observer.unobserve(target);
      });
    }, counterOptions);

    document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

    return () => {
      revealObserver.disconnect();
      counterObserver.disconnect();
    };
  }, []);

  // Active Nav Link + scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let current = 'hero';

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
          current = section.getAttribute('id') || 'hero';
        }
      });

      setActiveSection(current);
      setShowScrollTop(window.scrollY > 400);

      const nav = document.getElementById('navbar');
      if (nav) {
        if (window.scrollY > 50) {
          nav.style.padding = '0.85rem 2.5rem';
        } else {
          nav.style.padding = '1.5rem 2.5rem';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Projects Carousel Auto-Scroll & Drag
  useEffect(() => {
    const slider = document.getElementById('projects-carousel');
    if (!slider) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let isHovered = false;
    let animationId: number;

    const autoScroll = () => {
      if (!isHovered && !isDown) {
        slider.scrollLeft += 1;
        if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth - 1) {
          slider.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);

    slider.addEventListener('mouseenter', () => isHovered = true);
    slider.addEventListener('mouseleave', () => { isHovered = false; isDown = false; });
    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseup', () => isDown = false);
    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    });

    return () => cancelAnimationFrame(animationId);
  }, []);

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      {/* Texture Overlay */}
      <div className="grain-overlay"></div>

      {/* Custom Cursor Glow */}
      <div className="cursor-glow" id="cursorGlow"></div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navItems.map(({ id, label }) => (
          <Link
            key={id}
            href={`#${id}`}
            className={activeSection === id ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Navigation */}
      <nav id="navbar">
        <Link href="#hero" className="nav-brand" onClick={() => setMenuOpen(false)}>SB</Link>
        <ul className="nav-links">
          {navItems.map(({ id, label }) => (
            <li key={id}>
              <Link href={`#${id}`} className={activeSection === id ? "active" : ""}>{label}</Link>
            </li>
          ))}
        </ul>
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <div className="container">

        {/* HERO SECTION */}
        <section id="hero">
          <div className="hero-bg-grid"></div>
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>

          <div className="hero-content reveal">
            <span className="greeting">
              ~$ whoami<br />
              <span className="gradient-text" style={{ fontWeight: 700, fontSize: "1.6rem" }}>Shivam Bhardwaj</span>
            </span>
            <h1>Architecting Robust Systems</h1>

            <div className="typewriter-container">
              <span id="typewriter" className="typewriter" ref={typewriterRef}></span>
            </div>

            <div className="hero-actions">
              <Link href="#projects" className="btn btn-primary">
                View Projects
              </Link>
              <a href="/shivambhardwaj.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                Download CV
              </a>
            </div>

            <div className="social-links">
              <a href="https://www.linkedin.com/in/shivambhardwaj1812" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
              <a href="https://github.com/shivambhardwaj719/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
                <svg viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
              </a>
              <a href="mailto:shivambhardwaj719@gmail.com" className="social-icon" aria-label="Gmail">
                <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
              </a>
              <a href="https://wa.me/916376082733" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
              </a>
            </div>
          </div>

          <div className="hero-img-wrapper reveal delay-2">
            <img src="/profile.png" alt="Shivam Bhardwaj" className="hero-img" />
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about">
          <span className="section-label reveal">01 / About</span>
          <h2 className="reveal">About Me</h2>

          <div className="about-grid">
            <div className="bio reveal delay-1">
              <p className="bio-text">
                I&apos;m a Software Developer with <span>{expText} of hands-on experience</span> building scalable web applications — focusing on robust architectures, secure APIs, and high-performance databases.
              </p>
              <p className="bio-text">
                I&apos;ve shipped real products used by real people, and I care deeply about <span>system design</span>, <span>query optimization</span>, and <span>backend security</span>.
              </p>
            </div>

            <div className="stats-grid">
              <div className="stat-card reveal delay-2">
                <div className="stat-num"><span suppressHydrationWarning className="counter" data-target={expMonths}>0</span><span className="stat-plus">+</span></div>
                <div className="stat-label">Months Experience</div>
              </div>
              <div className="stat-card reveal delay-3">
                <div className="stat-num"><span className="counter" data-target="5">0</span><span className="stat-plus">+</span></div>
                <div className="stat-label">Projects Delivered</div>
              </div>
              <div className="stat-card reveal delay-3">
                <div className="stat-num"><span className="counter" data-target="10">0</span><span className="stat-plus">+</span></div>
                <div className="stat-label">Tech Mastered</div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills">
          <span className="section-label reveal">02 / Stack</span>
          <h2 className="reveal">Tech Stack</h2>

          <div className="skills-wrapper reveal delay-1">

            <div className="skill-row-label">// Backend &amp; Frameworks</div>
            <div className="marquee-container">
              <div className="marquee-content">
                {[...Array(2)].map((_, i) => (
                  <div key={`backend-${i}`} style={{ display: 'flex', gap: '1.2rem' }}>
                    <span className="skill-tag"><svg viewBox="0 0 24 24" className="skill-icon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9h2v9h-2z" /></svg>Django REST</span>
                    <span className="skill-tag"><svg viewBox="0 0 24 24" className="skill-icon"><path d="M11.8 2c-1.3 0-2.6.4-3.7 1L3 6c-1.6.9-2.5 2.6-2.5 4.5v6C.5 18.4 1.4 20 3 21l5.2 3c1.2.7 2.5 1 3.8 1s2.6-.3 3.8-1l5.2-3c1.6-.9 2.5-2.6 2.5-4.5v-6c0-1.9-.9-3.6-2.5-4.5L15.6 3c-1.1-.6-2.4-1-3.8-1zm0 18c-.8 0-1.5-.2-2.1-.6l-4.5-2.6c-1-.6-1.6-1.7-1.6-2.8v-5.2c0-1.1.6-2.2 1.6-2.8l4.5-2.6c1.3-.8 2.9-.8 4.2 0l4.5 2.6c1 .6 1.6 1.7 1.6 2.8v5.2c0 1.1-.6 2.2-1.6 2.8l-4.5 2.6c-.6.4-1.3.6-2.1.6z" /></svg>Node.js</span>
                    <span className="skill-tag"><svg viewBox="0 0 24 24" className="skill-icon"><path d="M19 14.5c0 1.1-.9 2-2 2h-1.5v-2H17v2h-1.5v-2h-3v2H11v-2H9.5v2H8v-2H6.5v2H5c-1.1 0-2-.9-2-2V9.5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v5z" /></svg>Flask</span>
                    <span className="skill-tag"><svg viewBox="0 0 24 24" className="skill-icon"><path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z" /></svg>FastAPI</span>
                    <span className="skill-tag"><svg viewBox="0 0 24 24" className="skill-icon"><path d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 0h6v6h-6z" /></svg>Microservices</span>
                    <span className="skill-tag"><svg viewBox="0 0 24 24" className="skill-icon"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 9h-2V7h-2v5H6v2h2v5h2v-5h2v-2z" /></svg>PostgreSQL</span>
                    <span className="skill-tag"><svg viewBox="0 0 24 24" className="skill-icon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>MongoDB</span>
                    <span className="skill-tag"><svg viewBox="0 0 24 24" className="skill-icon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>Meta APIs</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="skill-row-label" style={{ marginTop: '0.8rem' }}>// Infrastructure &amp; Tools</div>
            <div className="marquee-container">
              <div className="marquee-content reverse">
                {[...Array(2)].map((_, i) => (
                  <div key={`infra-${i}`} style={{ display: 'flex', gap: '1.2rem' }}>
                    <span className="skill-tag"><svg viewBox="0 0 24 24" className="skill-icon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>Docker</span>
                    <span className="skill-tag"><svg viewBox="0 0 24 24" className="skill-icon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-4H9v4H7V8h2v4h2V8h2v8z" /></svg>Redis</span>
                    <span className="skill-tag"><svg viewBox="0 0 24 24" className="skill-icon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9h2v9h-2z" /></svg>AWS</span>
                    <span className="skill-tag"><svg viewBox="0 0 24 24" className="skill-icon"><path d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 0h6v6h-6z" /></svg>Nginx</span>
                    <span className="skill-tag"><svg viewBox="0 0 24 24" className="skill-icon"><path d="M19 14.5c0 1.1-.9 2-2 2h-1.5v-2H17v2h-1.5v-2h-3v2H11v-2H9.5v2H8v-2H6.5v2H5c-1.1 0-2-.9-2-2V9.5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v5z" /></svg>Linux</span>
                    <span className="skill-tag"><svg viewBox="0 0 24 24" className="skill-icon"><path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z" /></svg>Socket.IO</span>
                    <span className="skill-tag"><svg viewBox="0 0 24 24" className="skill-icon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>CI/CD Pipelines</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects">
          <span className="section-label reveal">03 / Work</span>
          <h2 className="reveal">Featured Work</h2>

          <div className="projects-container-wrapper reveal delay-1">
            <div className="projects-grid" id="projects-carousel">

              {/* Project 1 */}
              <div className="project-card reveal delay-1">
                <div className="project-inner">
                  <div className="project-img">
                    <svg viewBox="0 0 24 24" className="project-icon"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 9h-2V7h-2v5H6v2h2v5h2v-5h2v-2z" /></svg>
                  </div>
                  <div className="project-content">
                    <div className="project-header">
                      <h3 className="project-title">Dr. Vijay ENT Hospital</h3>
                      <div className="project-links">
                        <a href="https://drvijayenthospital.com/" target="_blank" rel="noopener noreferrer" aria-label="Live site">
                          <svg viewBox="0 0 24 24" width="18" height="18"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" /></svg>
                        </a>
                      </div>
                    </div>
                    <div className="project-role">Backend Lead</div>
                    <p className="project-desc">
                      Led backend development for a full-featured ENT hospital platform — architected RESTful APIs powering patient management, appointment scheduling, and clinical workflows.
                    </p>
                    <div className="project-tags">
                      <span className="project-tag">Django REST Framework</span>
                      <span className="project-tag">Healthcare</span>
                      <span className="project-tag">Backend Lead</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project 2 */}
              <div className="project-card reveal delay-2">
                <div className="project-inner">
                  <div className="project-img">
                    <svg viewBox="0 0 24 24" className="project-icon"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                  </div>
                  <div className="project-content">
                    <div className="project-header">
                      <h3 className="project-title">OkCare</h3>
                      <div className="project-links">
                        <a href="https://okcare.in/" target="_blank" rel="noopener noreferrer" aria-label="Live site">
                          <svg viewBox="0 0 24 24" width="18" height="18"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" /></svg>
                        </a>
                      </div>
                    </div>
                    <div className="project-role">Software Developer</div>
                    <p className="project-desc">
                      Built backend services for OkCare, a healthcare platform focused on accessible care delivery. Engineered reliable APIs for user management, booking, and service flows.
                    </p>
                    <div className="project-tags">
                      <span className="project-tag">Django REST Framework</span>
                      <span className="project-tag">Healthcare</span>
                      <span className="project-tag">Backend</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project 3 */}
              <div className="project-card reveal delay-3">
                <div className="project-inner">
                  <div className="project-img">
                    <svg viewBox="0 0 24 24" className="project-icon"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>
                  </div>
                  <div className="project-content">
                    <div className="project-header">
                      <h3 className="project-title">HomeLead</h3>
                      <div className="project-links">
                        <a href="https://homelead.in/" target="_blank" rel="noopener noreferrer" aria-label="Live site">
                          <svg viewBox="0 0 24 24" width="18" height="18"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" /></svg>
                        </a>
                      </div>
                    </div>
                    <div className="project-role">Full Stack Integrator</div>
                    <p className="project-desc">
                      Integrated a complete CRM for real estate builders to manage leads, inventory, documents, and finances. Engineered SSR logic and backend API communication for real-time data flow.
                    </p>
                    <div className="project-tags">
                      <span className="project-tag">Next.js</span>
                      <span className="project-tag">Real Estate</span>
                      <span className="project-tag">Frontend</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project 4 */}
              <div className="project-card reveal delay-1">
                <div className="project-inner">
                  <div className="project-img">
                    <svg viewBox="0 0 24 24" className="project-icon"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg>
                  </div>
                  <div className="project-content">
                    <div className="project-header">
                      <h3 className="project-title">HRM System</h3>
                      <div className="project-links">
                        <a href="#" aria-label="Private project">
                          <svg viewBox="0 0 24 24" width="18" height="18"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" /></svg>
                        </a>
                      </div>
                    </div>
                    <div className="project-role">Full Stack Developer</div>
                    <p className="project-desc">
                      Designed and built a complete HRM system from scratch — Node.js REST APIs handling employee records, payroll, and attendance, paired with a dynamic Next.js frontend.
                    </p>
                    <div className="project-tags">
                      <span className="project-tag">Node.js</span>
                      <span className="project-tag">Next.js</span>
                      <span className="project-tag">Enterprise</span>
                      <span className="project-tag">Full Stack</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project 5 */}
              <div className="project-card reveal delay-2">
                <div className="project-inner">
                  <div className="project-img">
                    <svg viewBox="0 0 24 24" className="project-icon"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" /></svg>
                  </div>
                  <div className="project-content">
                    <div className="project-header">
                      <h3 className="project-title">EduCare</h3>
                      <div className="project-links">
                        <a href="https://github.com/shivambhardwaj719/eduPortal" target="_blank" rel="noopener noreferrer" title="Frontend repo">
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                        </a>
                        <a href="https://github.com/shivambhardwaj719/school_management_system" target="_blank" rel="noopener noreferrer" title="Backend repo">
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                        </a>
                      </div>
                    </div>
                    <div className="project-role">Full Stack Developer (Solo)</div>
                    <p className="project-desc">
                      A school management system built solo with DRF and React. Covers student enrollment, attendance, gradebooks, teacher management, and fee tracking — end-to-end.
                    </p>
                    <div className="project-tags">
                      <span className="project-tag">Django REST Framework</span>
                      <span className="project-tag">React.js</span>
                      <span className="project-tag">EdTech</span>
                      <span className="project-tag">Solo Build</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience">
          <span className="section-label reveal">04 / Career</span>
          <h2 className="reveal">Experience</h2>

          <div className="timeline-container reveal delay-1">
            <div className="timeline-line"></div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">Jan 2025 &mdash; Present</div>
              <div className="timeline-content">
                <h3 className="timeline-title">Associate Software Developer @ <a href="https://telepathyinfotech.com/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-primary)", textDecoration: "none" }}>Telepathy Infotech</a></h3>
                <ul>
                  <li>Promoted to Associate Software Developer to lead complex backend architecture and frontend user experiences.</li>
                  <li>Engineered scalable REST APIs using Django REST Framework and Node.js, ensuring high availability and secure data transmission.</li>
                  <li>Developed fast, SEO-optimized web applications with Next.js and React, enhancing overall user retention and engagement.</li>
                  <li>Collaborated directly with product teams to translate complex requirements into robust, deployable technical solutions.</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">July 2024 &mdash; Jan 2025</div>
              <div className="timeline-content">
                <h3 className="timeline-title">Python Intern @ <a href="https://telepathyinfotech.com/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-primary)", textDecoration: "none" }}>Telepathy Infotech</a></h3>
                <ul>
                  <li>Joined as a Python Intern on July 1st, 2024, rapidly scaling into Full Stack responsibilities.</li>
                  <li>Assisted in building backend modules, writing tests, and optimizing database queries for enterprise applications.</li>
                  <li>Gained hands-on experience with Python, Django, and API integration in a fast-paced production environment.</li>
                </ul>
              </div>
            </div>

          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact">
          <span className="section-label reveal">05 / Contact</span>
          <div className="contact-card reveal delay-1">
            <h2 className="contact-heading">Let&apos;s build something great together.</h2>
            <p className="contact-subheading">Currently open for new opportunities.</p>

            <div className="contact-links">
              <a href="https://www.linkedin.com/in/shivambhardwaj1812" target="_blank" rel="noopener noreferrer" className="contact-btn btn-linkedin">
                <svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                LinkedIn
              </a>

              <a href="https://github.com/shivambhardwaj719/" target="_blank" rel="noopener noreferrer" className="contact-btn btn-github">
                <svg viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                GitHub
              </a>

              <a href="mailto:shivambhardwaj719@gmail.com" className="contact-btn btn-gmail">
                <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
                Gmail
              </a>

              <a href="https://wa.me/916376082733" target="_blank" rel="noopener noreferrer" className="contact-btn btn-whatsapp">
                <svg viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
                WhatsApp
              </a>
            </div>
          </div>
        </section>

      </div>

      {/* Scroll to Top */}
      <button
        className={`scroll-top ${showScrollTop ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" /></svg>
      </button>

      <footer>
        <div className="container">
          <p>&copy; 2026 Shivam Bhardwaj. Built with Next.js.</p>
        </div>
      </footer>
    </>
  );
}
