"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const ROLES = ["Software Developer", "Backend Developer", "Full Stack Developer", "Frontend Developer", "Python Developer", "Robust System Design"];

const SKILLS = [
  { n: "Python", i: "/icons/python.svg" }, { n: "JavaScript", i: "/icons/javascript.svg" },
  { n: "Java", i: "/icons/openjdk.svg" }, { n: "Django", i: "/icons/django.svg" },
  { n: "FastAPI", i: "/icons/fastapi.svg" }, { n: "Node.js", i: "/icons/nodedotjs.svg" },
  { n: "Next.js", i: "/icons/nextdotjs.svg" }, { n: "React", i: "/icons/react.svg" },
  { n: "PostgreSQL", i: "/icons/postgresql.svg" }, { n: "MongoDB", i: "/icons/mongodb.svg" },
  { n: "Redis", i: "/icons/redis.svg" }, { n: "Docker", i: "/icons/docker.svg" },
  { n: "AWS", i: "/icons/amazonaws.svg" }, { n: "Nginx", i: "/icons/nginx.svg" },
  { n: "Linux", i: "/icons/linux.svg" }, { n: "Git", i: "/icons/git.svg" },
  { n: "Celery", i: "/icons/celery.svg" }, { n: "Firebase", i: "/icons/firebase.svg" },
  { n: "Socket.io", i: "/icons/socketdotio.svg" }, { n: "OpenAI", i: "/icons/openai.svg" },
  { n: "LangChain", i: "/icons/langchain.svg" }, { n: "Redux", i: "/icons/redux.svg" },
  { n: "Postman", i: "/icons/postman.svg" }, { n: "MySQL", i: "/icons/mysql.svg" },
  { n: "C", i: "/icons/c.svg" }, { n: "Dart", i: "/icons/dart.svg" },
  { n: "Anthropic Claude", i: "/icons/anthropic.svg" }, { n: "Framer Motion", i: "/icons/framer.svg" },
  { n: "React Hook Form", i: "/icons/reacthookform.svg" }, { n: "Zod", i: "/icons/zod.svg" },
  { n: "WebRTC", i: "/icons/webrtc.svg" }, { n: "Swagger", i: "/icons/swagger.svg" },
  { n: "VS Code", i: "/icons/visualstudiocode.svg" }, { n: "JWT", i: "/icons/jsonwebtokens.svg" },
  { n: "Django REST Framework (DRF)", i: "/icons/drf.svg" },
  { n: "Frappe", i: "/icons/frappe.svg" },
  { n: "ERPNext", i: "/icons/erpnext.svg" },
  { n: "LangGraph", i: "/icons/langgraph.svg" },
  { n: "Prompt Engineering", i: "/icons/prompt.svg" },
  { n: "RAG", i: "/icons/rag.svg" },
  { n: "Vector Embeddings", i: "/icons/embeddings.svg" },
  { n: "Multi-Agent Systems", i: "/icons/multiagents.svg" },
  { n: "RESTful API Design", i: "/icons/restapi.svg" },
  { n: "OAuth2", i: "/icons/oauth2.svg" },
  { n: "Role-Based Access Control (RBAC)", i: "/icons/rbac.svg" },
  { n: "Rate Limiting", i: "/icons/ratelimiting.svg" },
  { n: "Third-Party API Integration", i: "/icons/thirdparty.svg" },
  { n: "React-Redux", i: "/icons/reactredux.svg" },
  { n: "MariaDB", i: "/icons/mariadb.svg" },
  { n: "Vector Database", i: "/icons/vectordb.svg" },
  { n: "GitLab CI/CD", i: "/icons/gitlab.svg" },
  { n: "Jenkins", i: "/icons/jenkins.svg" },
  { n: "HIPAA Compliance", i: "/icons/hipaa.svg" },
  { n: "Data Encryption", i: "/icons/encryption.svg" },
  { n: "Secure Storage", i: "/icons/securestorage.svg" },
  { n: "Access Control Policies", i: "/icons/accesscontrol.svg" },
  { n: "GitHub", i: "/icons/github.svg" },
  { n: "SDLC", i: "/icons/sdlc.svg" },
  { n: "Unit Testing", i: "/icons/unittest.svg" },
  { n: "Code Review", i: "/icons/codereview.svg" },
];

const PROJECTS = [
  {
    num: "01",
    title: "Dr. Vijay ENT Hospital",
    role: "Full Stack Developer",
    category: "Full-Stack",
    desc: "Enterprise HMIS with FastAPI microservices backend, React 19/Next.js 15 frontend with Redux Toolkit and Zod-validated forms.",
    tags: ["Next.js", "Django", "PostgreSQL", "Redis"],
    link: "https://drvijayenthospital.com/",
    bullets: [
      "Built an enterprise Hospital Management Information System (HMIS) for an ENT clinical facility, with a FastAPI microservices backend spanning OPD, IPD, master data, and configuration services.",
      "Developed a strongly-typed React 19 / Next.js 15 frontend with Redux Toolkit and Zod-validated forms, backed by JWT authentication and Redis-backed caching.",
      "Integrated QZ Tray for silent receipt and label printing, and automated PDF report generation using ReportLab and Svglib."
    ]
  },
  {
    num: "02",
    title: "OkCare",
    role: "Backend Developer",
    category: "Backend & SaaS",
    desc: "Multi-tenant hospital management platform with HIPAA-compliant security, Celery async processing, and real-time features.",
    tags: ["Django & DRF", "Celery", "Socket.io", "AWS S3"],
    link: "https://okcare.in/",
    bullets: [
      "Engineered a multi-tenant hospital management platform with a subscription-based model, covering patient records, appointments, billing, laboratory, and pharmacy operations for enterprise healthcare clients.",
      "Implemented HIPAA-compliant data security across the platform, including encryption, access control, and secure storage for sensitive patient records.",
      "Leveraged Celery and Redis to handle heavy asynchronous background tasks and reporting jobs."
    ]
  },
  {
    num: "03",
    title: "HomeLead",
    role: "Backend Developer",
    category: "Backend & SaaS",
    desc: "SaaS real estate CRM/ERP for builders and brokers. Migrated to FastAPI with async handling for 100+ active users.",
    tags: ["FastAPI", "PostgreSQL", "Firebase", "Docker"],
    link: "https://homelead.in/",
    bullets: [
      "Delivered a subscription-based SaaS real estate CRM and ERP platform for builders and brokers, managing leads, inventory, sales pipeline, finance, and document workflows with automated follow-ups for 100+ active users.",
      "Migrated and rearchitected the backend on FastAPI, improving request throughput and API response times through asynchronous request handling and Pydantic-based validation."
    ]
  },
  {
    num: "04",
    title: "HRM System",
    role: "Full Stack Developer",
    category: "Full-Stack",
    desc: "Complete Human Resource Management system with automated payroll, attendance tracking, and admin dashboards.",
    tags: ["Node.js", "Next.js", "Enterprise", "Full Stack"],
    link: "#",
    bullets: [
      "Designed and built a complete Human Resource Management system with automated payroll, attendance tracking, and admin dashboards.",
      "Developed secure authentication and role-based access control (RBAC) to protect sensitive employee records and payroll data."
    ]
  },
  {
    num: "05",
    title: "EduCare",
    role: "Full Stack Developer",
    category: "Full-Stack",
    desc: "School management system with student enrollment, attendance tracking, gradebooks, and fee management.",
    tags: ["Django REST", "React.js", "EdTech", "Solo Build"],
    link: "https://github.com/shivambhardwaj719/eduPortal",
    bullets: [
      "School management system with student enrollment, attendance tracking, gradebooks, and fee management.",
      "Created interactive admin panel and parent-student dashboards using React and Django REST Framework."
    ]
  }
];

const TICKER = "Software Developer · Backend Architecture · Frontend Development · System Design · Python · Django · FastAPI · Node.js · React · Next.js · ";

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [roleText, setRoleText] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [bubbleRadius, setBubbleRadius] = useState(42);
  
  // Custom Cursor States
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorRingPos, setCursorRingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  interface Bubble {
    id: number;
    name: string;
    icon: string;
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const dragInfo = useRef<{ index: number; startX: number; startY: number } | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const prevMousePos = useRef({ x: 0, y: 0 });

  const expMonths = Math.max(0, (new Date().getFullYear() - 2024) * 12 + (new Date().getMonth() - 6));

  // Initialize bubbles with random staggered positions in the upper area
  useEffect(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width || 1200;
    const height = rect.height || 600;
    
    const getRadiusForWidth = (w: number) => {
      if (w < 480) return 22;
      if (w < 768) return 28;
      if (w < 1024) return 34;
      return 42;
    };
    
    const radius = getRadiusForWidth(width);
    setBubbleRadius(radius);

    bubblesRef.current = SKILLS.map((s, idx) => {
      const x = radius + Math.random() * (width - radius * 2);
      const y = radius + Math.random() * (height * 0.6 - radius * 2);

      return {
        id: idx,
        name: s.n,
        icon: s.i,
        x,
        y,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        radius,
        color: "rgba(255, 255, 255, 0.04)"
      };
    });
  }, []);

  // Handle window resizing to adjust bubble size and keep bubbles within new boundaries
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const width = rect.width || 1200;
      const height = rect.height || 600;
      
      const getRadiusForWidth = (w: number) => {
        if (w < 480) return 22;
        if (w < 768) return 28;
        if (w < 1024) return 34;
        return 42;
      };
      
      const newRadius = getRadiusForWidth(width);
      setBubbleRadius(newRadius);
      
      if (bubblesRef.current.length > 0) {
        bubblesRef.current.forEach(b => {
          b.radius = newRadius;
          // Constrain within bounds
          if (b.x < newRadius) b.x = newRadius;
          if (b.x > width - newRadius) b.x = width - newRadius;
          if (b.y < newRadius) b.y = newRadius;
          if (b.y > height - newRadius) b.y = height - newRadius;
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Physics animation loop using Direct DOM manipulation via translate3d for 120+ FPS hardware acceleration!
  useEffect(() => {
    let animId: number;
    const gravity = 0.18;
    const friction = 0.985;
    const bounce = 0.6;

    const updatePhysics = () => {
      if (!containerRef.current) {
        animId = requestAnimationFrame(updatePhysics);
        return;
      }
      const rect = containerRef.current.getBoundingClientRect();
      const width = rect.width || 1200;
      const height = rect.height || 600;

      const next = bubblesRef.current;
      if (next.length === 0) {
        animId = requestAnimationFrame(updatePhysics);
        return;
      }

      // Handle active drag
      if (dragInfo.current !== null) {
        const dragIdx = dragInfo.current.index;
        const b = next[dragIdx];
        if (b) {
          b.x = mousePos.current.x;
          b.y = mousePos.current.y;
          b.vx = mousePos.current.x - prevMousePos.current.x;
          b.vy = mousePos.current.y - prevMousePos.current.y;
        }
      }

      prevMousePos.current = { ...mousePos.current };

      // Apply gravity, friction, and movement
      for (let i = 0; i < next.length; i++) {
        const b = next[i];
        if (dragInfo.current?.index === i) continue;

        b.vy += gravity;
        b.x += b.vx;
        b.y += b.vy;

        b.vx *= friction;
        b.vy *= friction;

        // Wall boundary collision
        if (b.x < b.radius) {
          b.x = b.radius;
          b.vx = -b.vx * bounce;
        } else if (b.x > width - b.radius) {
          b.x = width - b.radius;
          b.vx = -b.vx * bounce;
        }

        if (b.y < b.radius) {
          b.y = b.radius;
          b.vy = -b.vy * bounce;
        } else if (b.y > height - b.radius) {
          b.y = height - b.radius;
          b.vy = -b.vy * bounce;
          b.vx *= 0.94; // Extra friction on floor
        }
      }

      // Circle-to-circle collision (4 iterations for stability)
      for (let step = 0; step < 4; step++) {
        for (let i = 0; i < next.length; i++) {
          for (let j = i + 1; j < next.length; j++) {
            const c1 = next[i];
            const c2 = next[j];

            const dx = c2.x - c1.x;
            const dy = c2.y - c1.y;
            const distSq = dx * dx + dy * dy;
            const minDist = c1.radius + c2.radius;

            if (distSq < minDist * minDist && distSq > 0.01) {
              const dist = Math.sqrt(distSq);
              const overlap = minDist - dist;

              const nx = dx / dist;
              const ny = dy / dist;

              // Position correction (push apart)
              if (dragInfo.current?.index === i) {
                c2.x += nx * overlap;
                c2.y += ny * overlap;
              } else if (dragInfo.current?.index === j) {
                c1.x -= nx * overlap;
                c1.y -= ny * overlap;
              } else {
                c1.x -= nx * overlap * 0.5;
                c1.y -= ny * overlap * 0.5;
                c2.x += nx * overlap * 0.5;
                c2.y += ny * overlap * 0.5;
              }

              // Elastic collision response
              const kx = c1.vx - c2.vx;
              const ky = c1.vy - c2.vy;
              const p = 2 * (nx * kx + ny * ky) / 2;

              if (dragInfo.current?.index === i) {
                c2.vx += p * nx;
                c2.vy += p * ny;
              } else if (dragInfo.current?.index === j) {
                c1.vx -= p * nx;
                c1.vy -= p * ny;
              } else {
                c1.vx -= p * nx * 0.85;
                c1.vy -= p * ny * 0.85;
                c2.vx += p * nx * 0.85;
                c2.vy += p * ny * 0.85;
              }
            }
          }
        }
      }

      // Update DOM nodes directly for maximum performance
      const domElements = containerRef.current.querySelectorAll<HTMLDivElement>('.skill-bubble-interactive');
      for (let i = 0; i < next.length; i++) {
        const b = next[i];
        const el = domElements[i];
        if (el) {
          el.style.transform = `translate3d(${b.x - b.radius}px, ${b.y - b.radius}px, 0)`;
          el.style.zIndex = dragInfo.current?.index === b.id ? "100" : "10";
          el.style.cursor = dragInfo.current?.index === b.id ? "grabbing" : "grab";
        }
      }

      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Mouse & Touch interaction event handlers
  const handleMouseDown = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    dragInfo.current = { index, startX: mouseX, startY: mouseY };
    mousePos.current = { x: mouseX, y: mouseY };
    prevMousePos.current = { x: mouseX, y: mouseY };
  };

  const handleTouchStart = (e: React.TouchEvent, index: number) => {
    if (!containerRef.current || e.touches.length === 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const mouseX = touch.clientX - rect.left;
    const mouseY = touch.clientY - rect.top;

    dragInfo.current = { index, startX: mouseX, startY: mouseY };
    mousePos.current = { x: mouseX, y: mouseY };
    prevMousePos.current = { x: mouseX, y: mouseY };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragInfo.current === null || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const b = bubblesRef.current[dragInfo.current.index];
      const radius = b ? b.radius : 42;
      const mouseX = Math.max(radius, Math.min(rect.width - radius, e.clientX - rect.left));
      const mouseY = Math.max(radius, Math.min(rect.height - radius, e.clientY - rect.top));
      mousePos.current = { x: mouseX, y: mouseY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (dragInfo.current === null || !containerRef.current || e.touches.length === 0) return;
      const rect = containerRef.current.getBoundingClientRect();
      const b = bubblesRef.current[dragInfo.current.index];
      const radius = b ? b.radius : 42;
      const touch = e.touches[0];
      const mouseX = Math.max(radius, Math.min(rect.width - radius, touch.clientX - rect.left));
      const mouseY = Math.max(radius, Math.min(rect.height - radius, touch.clientY - rect.top));
      mousePos.current = { x: mouseX, y: mouseY };
    };

    const handleMouseUp = () => {
      dragInfo.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  // Custom Cursor Effect
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      requestAnimationFrame(() => {
        setCursorRingPos({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  // Custom Cursor Interaction Hooks
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".project-card") ||
        target.closest(".social-icon") ||
        target.closest(".skill-bubble-interactive") ||
        target.closest(".scroll-top")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    return () => window.removeEventListener("mouseover", handleMouseOver);
  }, []);

  // Typewriter
  useEffect(() => {
    let ri = 0, ci = 0, del = false, tid: NodeJS.Timeout;
    const tick = () => {
      const r = ROLES[ri];
      if (!del) {
        ci++;
        setRoleText(r.slice(0, ci));
        if (ci === r.length) {
          tid = setTimeout(() => { del = true; tick(); }, 2000);
          return;
        }
      }
      else {
        ci--;
        setRoleText(r.slice(0, ci));
        if (ci === 0) {
          del = false;
          ri = (ri + 1) % ROLES.length;
          tid = setTimeout(tick, 400);
          return;
        }
      }
      tid = setTimeout(tick, del ? 40 : 80);
    };
    tid = setTimeout(tick, 800);
    return () => clearTimeout(tid);
  }, []);

  // Scroll tracking
  useEffect(() => {
    const h = () => {
      const secs = document.querySelectorAll("section");
      let cur = "hero";
      secs.forEach(s => { if (window.scrollY >= (s.offsetTop - s.clientHeight / 3)) cur = s.id || "hero"; });
      setActiveSection(cur);
      setShowScrollTop(window.scrollY > 400);
      const nav = document.getElementById("navbar");
      if (nav) { if (window.scrollY > 50) nav.classList.add("scrolled"); else nav.classList.remove("scrolled"); }
    };
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Reveal + counter observers
  useEffect(() => {
    const ro = new IntersectionObserver((es, o) => {
      es.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          o.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
    document.querySelectorAll(".reveal, .skill-pill").forEach(el => ro.observe(el));

    const co = new IntersectionObserver((es, o) => {
      es.forEach(e => {
        if (!e.isIntersecting) return;
        const t = e.target as HTMLElement, end = parseInt(t.dataset.target || "0"), dur = 2000, fd = 1000 / 60, tf = Math.round(dur / fd);
        let f = 0; const iv = setInterval(() => { f++; const p = 1 - Math.pow(1 - f / tf, 4); t.textContent = Math.round(end * p).toString(); if (f === tf) { clearInterval(iv); t.textContent = end.toString(); } }, fd);
        o.unobserve(t);
      });
    }, { threshold: 0.5 });
    document.querySelectorAll(".counter").forEach(el => co.observe(el));

    return () => { ro.disconnect(); co.disconnect(); };
  }, []);

  useEffect(() => { document.body.style.overflow = menuOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [menuOpen]);

  const navItems = [{ id: "hero", label: "Home" }, { id: "keyfacts", label: "About" }, { id: "skills", label: "Skills" }, { id: "projects", label: "Work" }, { id: "experience", label: "Career" }, { id: "contact", label: "Contact" }];

  return (<>
    {/* Custom Cursor Elements */}
    <div
      className={`custom-cursor-dot ${isHovered ? "hovered" : ""}`}
      style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
    />
    <div
      className={`custom-cursor-ring ${isHovered ? "hovered" : ""}`}
      style={{ left: `${cursorRingPos.x}px`, top: `${cursorRingPos.y}px` }}
    />

    {/* Mobile Menu */}
    <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
      {navItems.map(({ id, label }) => <Link key={id} href={`#${id}`} className={activeSection === id ? "active" : ""} onClick={() => setMenuOpen(false)}>{label}</Link>)}
    </div>

    {/* Nav */}
    <nav id="navbar">
      <Link href="#hero" className="nav-brand" onClick={() => setMenuOpen(false)}>
        <span>SB.</span>
      </Link>
      <ul className="nav-links">
        {navItems.map(({ id, label }) => <li key={id}><Link href={`#${id}`} className={activeSection === id ? "active" : ""}>{label}</Link></li>)}
      </ul>
      <button className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(p => !p)} aria-label="Toggle menu"><span /><span /><span /></button>
    </nav>

    {/* HERO */}
    <section id="hero">
      <div className="hero-grid">
        <div className="hero-left">
          <div className="hero-label">Available for work</div>
          <h1 className="visually-hidden">Shivam Bhardwaj - Best Software Engineer & Developer in Katihar, Bihar (Kumhari)</h1>
          <div className="hero-name">
            SHIVAM<br />
            <span className="hero-name-outline">BHARDWAJ</span>
          </div>
          <div className="hero-roles-wrapper">
            <span className="hero-role-text">{roleText}</span>
          </div>
          <p className="hero-desc">Building scalable web applications with robust architectures, secure APIs, and high-performance systems. {expMonths}+ months of production experience. Based in Kumhari, Katihar, Bihar.</p>
          <div className="hero-actions">
            <Link href="#projects" className="btn btn-primary">View Work</Link>
            <a href="/shivambhardwaj.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline">Download CV</a>
          </div>
          <div className="social-links">
            <a href="https://www.linkedin.com/in/shivambhardwaj1812" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn"><svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg></a>
            <a href="https://github.com/shivambhardwaj719/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub"><svg viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg></a>
            <a href="mailto:shivambhardwaj719@gmail.com" className="social-icon" aria-label="Email"><svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg></a>
            <a href="https://wa.me/916376082733" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="WhatsApp"><svg viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg></a>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-img-frame">
            <img src="images/profile_nobg.png" alt="Shivam Bhardwaj" className="hero-img" />
          </div>
        </div>
      </div>
      <div className="hero-scroll-indicator">
        <span>Scroll</span>
        <svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" transform="rotate(180 12 12)" /></svg>
      </div>
    </section>

    {/* TICKER */}
    <div className="ticker-section">
      <div className="ticker-track">
        {[0, 1].map(k => <span key={k} className="ticker-item">{TICKER.split("·").map((t, i) => <span key={i} style={{ display: "flex", alignItems: "center", gap: "2rem" }}>{t.trim()}<span className="dot" /></span>)}</span>)}
      </div>
    </div>

    {/* SERVICES / EXPERTISE BIG TEXT */}
    <section id="services">
      <div className="services-giant-text reveal">
        <span>Python</span>
        <span className="outline-text">Full Stack</span>
        <span>Developer</span>
      </div>
      <div className="services-grid">
        <div className="service-card reveal delay-1"><div className="service-num">01</div><h3 className="service-title">Backend Architecture</h3><p className="service-desc">Building scalable REST APIs with Django, FastAPI, and Node.js. JWT auth, RBAC, rate limiting, and microservices design.</p></div>
        <div className="service-card reveal delay-2"><div className="service-num">02</div><h3 className="service-title">System Design</h3><p className="service-desc">Multi-tenant SaaS infrastructure on AWS with Docker, Nginx, Celery async processing, Redis caching, and CI/CD pipelines.</p></div>
        <div className="service-card reveal delay-3"><div className="service-num">03</div><h3 className="service-title">AI & LLM Integration</h3><p className="service-desc">LangChain, OpenAI, Anthropic Claude APIs, RAG pipelines, vector embeddings, prompt engineering, and multi-agent systems.</p></div>
        <div className="service-card reveal delay-4"><div className="service-num">04</div><h3 className="service-title">Frontend Development</h3><p className="service-desc">Crafting pixel-perfect interactive UIs with React, Next.js, Redux Toolkit, Framer Motion, and modern form validations using React Hook Form & Zod.</p></div>
      </div>
    </section>

    {/* KEY FACTS */}
    <section id="keyfacts">
      <div className="facts-header reveal">
        <div><div className="facts-label">Key Facts</div><h2 className="facts-title">Numbers that define my journey</h2></div>
      </div>
      <div className="facts-grid">
        <div className="fact-card reveal delay-1"><div className="fact-number"><span className="counter" data-target={expMonths} suppressHydrationWarning>0</span><span className="fact-plus">+</span></div><div className="fact-label">Months Experience</div></div>
        <div className="fact-card reveal delay-2"><div className="fact-number"><span className="counter" data-target="5">0</span><span className="fact-plus">+</span></div><div className="fact-label">Projects Shipped</div></div>
        <div className="fact-card reveal delay-3"><div className="fact-number"><span className="counter" data-target="24">0</span><span className="fact-plus">+</span></div><div className="fact-label">Technologies</div></div>
        <div className="fact-card reveal delay-4"><div className="fact-number"><span className="counter" data-target="3">0</span><span className="fact-plus">+</span></div><div className="fact-label">Live Products</div></div>
      </div>
    </section>

    {/* SKILLS */}
    <section id="skills">
      <div className="skills-container">
        <div className="section-header">
          <span className="section-label reveal">Tech Stack</span>
          <h2 className="section-title reveal">Tools & Technologies</h2>
        </div>

        {/* Drag & Play sandbox container */}
        <div className="skills-playground" ref={containerRef}>
          {SKILLS.map((s, idx) => {
            const radius = bubbleRadius;

            return (
              <div
                key={`physics-skill-${idx}`}
                onMouseDown={(e) => handleMouseDown(e, idx)}
                onTouchStart={(e) => handleTouchStart(e, idx)}
                className="skill-bubble-interactive"
                title={s.n}
                style={{
                  position: "absolute",
                  left: "0",
                  top: "0",
                  width: `${radius * 2}px`,
                  height: `${radius * 2}px`,
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: "translate3d(0, 0, 0)",
                  willChange: "transform"
                }}
              >
                <img 
                  src={s.i} 
                  alt={s.n} 
                  style={{
                    width: `${radius * 1.14}px`,
                    height: `${radius * 1.14}px`
                  }}
                />
              </div>
            );
          })}
        </div>

      </div>
    </section>

    {/* PROJECTS */}
    <section id="projects">
      <div className="projects-container">
        <div className="section-header"><span className="section-label reveal">Selected Work</span><h2 className="section-title reveal">Projects</h2></div>
        <div className="projects-list">
          {PROJECTS.map(p => (
            <div key={p.num} className="project-card reveal">
              <div className="project-card-header">
                <div className="project-title-area">
                  <span className="project-card-num">{p.num}</span>
                  <h3 className="project-card-title">{p.title}</h3>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span className="project-card-role">{p.role}</span>
                  {p.link && p.link !== "#" && (
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="project-card-link">
                      Visit Site <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </a>
                  )}
                </div>
              </div>
              
              <div className="project-card-techs">
                {p.tags.map(t => (
                  <span key={t} className="project-card-tech-tag">{t}</span>
                ))}
              </div>

              <ul className="project-card-bullets">
                {p.bullets.map((b, idx) => (
                  <li key={idx} className="project-card-bullet">
                    <span className="bullet-dot" />
                    <p>{b}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* EXPERIENCE */}
    <section id="experience">
      <div className="exp-container">
        <div className="section-header"><span className="section-label reveal">Career</span><h2 className="section-title reveal">Experience</h2></div>
        <div className="exp-grid reveal">
          <div className="exp-left"><h3 className="exp-company"><a href="https://telepathyinfotech.com/" target="_blank" rel="noopener noreferrer">Telepathy Infotech</a></h3><div className="exp-period">July 2024 — Present · Jaipur, India</div></div>
          <div className="exp-details">
            <div className="exp-role">Associate Software Developer</div>
            <ul className="exp-list">
              <li>Architected multi-tenant SaaS infrastructure on AWS (EC2, S3, RDS) using Docker and Nginx with fully isolated environments.</li>
              <li>Engineered end-to-end RESTful API ecosystems with JWT authentication, RBAC, and rate limiting across 3+ production systems.</li>
              <li>Reduced long-running operation times by 40%+ with Celery and Redis for async task processing and intelligent caching.</li>
              <li>Enforced HIPAA-compliant data security on the OkCare hospital platform through AES encryption and strict access-control policies.</li>
              <li>Designed end-to-end backend architecture for Vijay ENT — Django-based microservices spanning OPD, IPD, master data, and configuration.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    {/* CONTACT */}
    <section id="contact">
      <div className="contact-container reveal">
        <h2 className="contact-giant">Let&apos;s build something<br /><span className="accent">great together.</span></h2>
        <div className="contact-links">
          <a href="https://www.linkedin.com/in/shivambhardwaj1812" target="_blank" rel="noopener noreferrer" className="contact-btn"><svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>LinkedIn</a>
          <a href="https://github.com/shivambhardwaj719/" target="_blank" rel="noopener noreferrer" className="contact-btn"><svg viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>GitHub</a>
          <a href="mailto:shivambhardwaj719@gmail.com" className="contact-btn"><svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>Email</a>
          <a href="https://wa.me/916376082733" target="_blank" rel="noopener noreferrer" className="contact-btn"><svg viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>WhatsApp</a>
        </div>
      </div>
    </section>

    <button className={`scroll-top ${showScrollTop ? "visible" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
      <svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" /></svg>
    </button>

    <footer><div className="container"><p>&copy; 2026 Shivam Bhardwaj. Built with Next.js.</p></div></footer>
  </>);
}
