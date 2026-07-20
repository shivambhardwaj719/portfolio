"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BlogPost } from "@/lib/blogData";

export default function BlogClient({ blog }: { blog: BlogPost }) {
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
      <div className="blog-article-page" style={{ paddingTop: "120px", paddingBottom: "100px", minHeight: "100vh" }}>
        <article className="blog-content-container">
          
          <div className="blog-article-header">
            <Link href="/blogs" className="back-to-blogs">
              <span className="arrow">←</span> Back to Blogs
            </Link>
            <div className="blog-meta">
              <span className="blog-category badge">{blog.category}</span>
            </div>
            <h1 className="blog-article-title">{blog.title}</h1>
          </div>

          <div 
            className="blog-body"
            dangerouslySetInnerHTML={{ __html: blog.content }} 
          />
          
        </article>
      </div>

      <footer>
        <div className="container">
          <p>&copy; 2026 Shivam Bhardwaj. Built with Next.js.</p>
        </div>
      </footer>
    </>
  );
}
