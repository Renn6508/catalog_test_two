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
    tl.from(logoRef.current, { opacity: 0, x: -20, duration: 0.7, ease: "power3.out" })
      .from(".nav-link-item", { opacity: 0, y: -10, stagger: 0.08, duration: 0.5, ease: "power2.out" }, "-=0.3");

    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#06060F]/90 backdrop-blur-xl border-b border-white/[0.05] py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <div ref={logoRef} className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#F2C94C] flex items-center justify-center">
            <span className="text-[#06060F] font-syne font-black text-sm">N</span>
          </div>
          <span className="font-syne font-bold text-lg text-white tracking-tight">
            Nex<span className="text-[#F2C94C]">Studio</span>
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link-item px-4 py-2 rounded-lg text-sm font-medium text-[#7070A0] hover:text-white hover:bg-white/[0.05] transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="https://wa.me/6281234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link-item hidden md:inline-flex btn-primary text-sm py-2.5 px-5"
        >
          Hubungi Kami
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-white/[0.05] text-white border border-white/[0.08]"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 pb-5 pt-2 space-y-1 border-t border-white/[0.05] mt-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 rounded-lg text-sm font-medium text-[#7070A0] hover:text-white hover:bg-white/[0.05] transition-all"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary block text-center mt-3"
          >
            Hubungi via WhatsApp
          </a>
        </div>
      </div>
    </nav>
  );
}