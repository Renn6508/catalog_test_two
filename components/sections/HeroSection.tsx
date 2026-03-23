"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight, Star, CheckCircle, Code } from "lucide-react";

const stats = [
  { value: "50+", label: "Klien Puas", icon: <Star className="text-[#E8A838]" size={18} /> },
  { value: "100+", label: "Proyek Selesai", icon: <CheckCircle className="text-[#3DD6B5]" size={18} /> },
  { value: "5 Thn", label: "Pengalaman", icon: <Code className="text-[#E85D75]" size={18} /> },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animations
      gsap.from(".hero-badge", { opacity: 0, y: 30, duration: 1, ease: "power4.out", delay: 0.1 });
      gsap.from(".hero-title-line", {
        opacity: 0, y: 50, stagger: 0.12, duration: 1.2, ease: "power3.out", delay: 0.2
      });
      gsap.from(".hero-desc", { opacity: 0, y: 20, duration: 1, ease: "power3.out", delay: 0.6 });
      gsap.from(".hero-cta", { opacity: 0, y: 20, stagger: 0.15, duration: 0.8, ease: "back.out(1.5)", delay: 0.8 });
      gsap.from(".hero-stat", { opacity: 0, y: 30, stagger: 0.12, duration: 0.8, ease: "power3.out", delay: 1.1 });

      // Floating orbs
      gsap.to(".hero-orb-1", {
        y: "random(-40, 40)", x: "random(-30, 30)", rotation: "random(-15, 15)",
        duration: 12, ease: "sine.inOut", repeat: -1, yoyo: true
      });
      gsap.to(".hero-orb-2", {
        y: "random(-50, 50)", x: "random(-40, 40)", rotation: "random(-20, 20)",
        duration: 16, ease: "sine.inOut", repeat: -1, yoyo: true
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="bg-dot-grid absolute inset-0 opacity-40" />
        <div className="hero-orb-1 absolute -top-[15%] -right-[10%] w-[500px] h-[500px] rounded-full bg-[#E8A838]/[0.06] blur-[120px]" />
        <div className="hero-orb-2 absolute bottom-[-10%] -left-[10%] w-[400px] h-[400px] rounded-full bg-[#E85D75]/[0.05] blur-[120px]" />
        <div className="absolute top-[30%] left-[30%] w-[250px] h-[250px] rounded-full bg-[#3DD6B5]/[0.04] blur-[100px]" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0B0B0F] to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-8 relative z-10 w-full">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[#E8A838]/20 bg-[#E8A838]/[0.06] mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8A838] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E8A838]"></span>
            </span>
            <span className="text-sm font-medium text-[#E8A838]/90 tracking-wide">Agensi Web Premium</span>
          </div>

          {/* Title */}
          <h1 className="font-syne font-extrabold text-5xl md:text-6xl lg:text-[5.5rem] leading-[1.05] mb-8 tracking-tight">
            <span className="hero-title-line block text-white">Ubah Ide</span>
            <span className="hero-title-line block">
              <span className="text-highlight">Menjadi</span>{" "}
              <span className="text-gradient-rose">Karya</span>
            </span>
            <span className="hero-title-line block">
              <span className="text-gradient-teal">Digital</span>{" "}
              <span className="text-white">Nyata</span>
            </span>
          </h1>

          <p className="hero-desc text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-jakarta">
            Hadirkan identitas bisnis Anda ke dunia digital dengan desain premium, responsif, dan teknologi terdepan dari NexStudio.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <a href="#layanan" className="hero-cta btn-primary w-full sm:w-auto text-lg group">
              Lihat Layanan
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="hero-cta btn-outline w-full sm:w-auto text-lg">
              Konsultasi Gratis
            </a>
          </div>

          {/* Stats Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0 sm:divide-x sm:divide-white/[0.08]">
            {stats.map((stat, i) => (
              <div key={i} className="hero-stat flex items-center gap-3 sm:px-8">
                <div className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                  {stat.icon}
                </div>
                <div className="text-left">
                  <h4 className="font-syne font-bold text-xl text-white leading-none">{stat.value}</h4>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}