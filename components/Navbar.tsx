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
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.from(logoRef.current, { opacity: 0, x: -20, duration: 0.8, ease: "power3.out" })
      .from(".nav-link-item", { opacity: 0, y: -10, stagger: 0.1, duration: 0.6, ease: "power2.out" }, "-=0.4");

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    >
      <div
        className={`w-full transition-all duration-500 ${
          scrolled
            ? "bg-[#0B0B0F]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div ref={logoRef} className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-[#E8A838] to-[#F0D078] flex items-center justify-center shadow-[0_4px_12px_rgba(232,168,56,0.3)]">
              <span className="text-[#0B0B0F] font-syne font-black text-sm">N</span>
            </div>
            <span className="font-syne font-bold text-lg text-white tracking-tight">
              Nex<span className="text-highlight">Studio</span>
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link-item relative px-4 py-2 text-sm font-medium text-gray-400 hover:text-[#E8A838] transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#E8A838] group-hover:w-2/3 transition-all duration-300 rounded-full" />
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link-item hidden md:inline-flex btn-primary text-sm !py-2.5 !px-5"
          >
            Mulai Proyek
          </a>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.08] text-gray-300 hover:text-[#E8A838] hover:border-[#E8A838]/30 transition-all"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 transition-all duration-400 overflow-hidden ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-[#0B0B0F]/95 backdrop-blur-xl border-b border-white/[0.06] flex flex-col px-6 py-4 gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:text-[#E8A838] hover:bg-white/[0.03] transition-all"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-3 justify-center text-sm"
          >
            Konsultasi Gratis
          </a>
        </div>
      </div>
    </nav>
  );
}