"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BLOGS } from "@/lib/blogData";

export default function BlogsClient() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorRingPos, setCursorRingPos] = useState({ x: -100, y: -100 });

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

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".blog-card") ||
        target.closest(".social-icon")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };
    window.addEventListener("mouseover", handleMouseOver);
    return () => window.removeEventListener("mouseover", handleMouseOver);
  }, []);

  useEffect(() => { document.body.style.overflow = menuOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [menuOpen]);

  // Handle reveal animations for blogs
  useEffect(() => {
    const ro = new IntersectionObserver((es, o) => {
      es.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          o.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
    document.querySelectorAll(".reveal").forEach(el => ro.observe(el));
    return () => ro.disconnect();
  }, []);

  const navItems = [
    { id: "hero", label: "Home", path: "/#hero" },
    { id: "about", label: "About", path: "/#about" },
    { id: "skills", label: "Skills", path: "/#skills" },
    { id: "projects", label: "Work", path: "/#projects" },
    { id: "experience", label: "Career", path: "/#experience" },
    { id: "blogs", label: "Blogs", path: "/blogs" },
    { id: "contact", label: "Contact", path: "/#contact" }
  ];

  return (
    <>
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
        {navItems.map(({ id, label, path }) => (
          <Link key={id} href={path} className={id === "blogs" ? "active" : ""} onClick={() => setMenuOpen(false)}>
            {label}
          </Link>
        ))}
      </div>

      {/* Nav */}
      <nav id="navbar" className="scrolled" style={{ background: "rgba(10, 10, 10, 0.85)" }}>
        <Link href="/#hero" className="nav-brand" onClick={() => setMenuOpen(false)}>
          <span>SB.</span>
        </Link>
        <ul className="nav-links">
          {navItems.map(({ id, label, path }) => (
            <li key={id}>
              <Link href={path} className={id === "blogs" ? "active" : ""}>{label}</Link>
            </li>
          ))}
        </ul>
        <button className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(p => !p)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* Main Content Area */}
      <div style={{ paddingTop: "80px", minHeight: "100vh" }}>
        {/* BLOGS */}
        <section id="blogs">
          <div className="blogs-container">
            <div className="section-header" style={{ marginBottom: "3rem" }}>
              <span className="section-label reveal">Insights & Articles</span>
              <h2 className="section-title reveal" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>Latest Blogs</h2>
            </div>
            <div className="blogs-grid">
              {BLOGS.map((blog) => (
                <div key={blog.id} className="blog-card reveal">
                  <div className="blog-card-header">
                    <span className="blog-category">{blog.category}</span>
                  </div>
                  <h3 className="blog-title">{blog.title}</h3>
                  <p className="blog-desc">{blog.desc}</p>
                  <Link href={`/blogs/${blog.slug}`} className="blog-read-more">Read Article <span className="arrow">→</span></Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <footer>
        <div className="container">
          <p>&copy; 2026 Shivam Bhardwaj. Built with Next.js.</p>
        </div>
      </footer>
    </>
  );
}
