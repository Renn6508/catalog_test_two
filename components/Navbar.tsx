"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#layanan", label: "Layanan" },
  { href: "#proses", label: "Proses" },
  { href: "#testimoni", label: "Testimoni" },
  { href: "#kontak", label: "Kontak" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.from(logoRef.current, { opacity: 0, x: -20, duration: 0.8, ease: "power3.out" })
      .from(".nav-link-item", { opacity: 0, y: -10, stagger: 0.1, duration: 0.6, ease: "power2.out" }, "-=0.4");

    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-500" style={{ paddingTop: scrolled ? "0.5rem" : "1rem" }}>
      <div
        className={`w-full max-w-5xl flex items-center justify-between px-6 py-3 transition-all duration-500 ${
          scrolled
            ? "bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <div ref={logoRef} className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#00F0FF] to-[#7000FF] flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.35)]">
            <span className="text-white font-syne font-black text-lg">N</span>
          </div>
          <span className="font-syne font-bold text-xl text-white tracking-tight">
            Nex<span className="text-highlight">Studio</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link-item relative px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white transition-colors duration-300 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-[#00F0FF] to-[#7000FF] group-hover:w-2/3 transition-all duration-300 rounded-full" />
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="https://wa.me/6281234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link-item hidden md:inline-flex btn-premium text-sm !py-2 !px-5"
        >
          Mulai Proyek
        </a>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.1] text-white hover:bg-white/[0.1] transition-all"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute top-[calc(100%+8px)] left-4 right-4 transition-all duration-300 overflow-hidden rounded-2xl ${
          mobileOpen ? "max-h-96 opacity-100 scale-100 shadow-[0_20px_40px_rgba(0,0,0,0.5)]" : "max-h-0 opacity-0 scale-95 pointer-events-none"
        }`}
        style={{ transformOrigin: "top center" }}
      >
        <div className="glass-card flex flex-col p-4 gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3.5 rounded-xl text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/[0.08] transition-all"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-premium mt-2 justify-center"
          >
            Konsultasi Gratis
          </a>
        </div>
      </div>
    </nav>
  );
}