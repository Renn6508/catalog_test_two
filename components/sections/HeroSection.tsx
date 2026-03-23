"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Star, CheckCircle, Code } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "50+", label: "Klien Puas", icon: <Star className="text-[#E8A838]" size={18} /> },
  { value: "100+", label: "Proyek Selesai", icon: <CheckCircle className="text-[#3DD6B5]" size={18} /> },
  { value: "5 Thn", label: "Pengalaman", icon: <Code className="text-[#E85D75]" size={18} /> },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const bgLayer1Ref = useRef<HTMLDivElement>(null);
  const bgLayer2Ref = useRef<HTMLDivElement>(null);
  const bgLayer3Ref = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animations
      gsap.from(".hero-badge", { opacity: 0, y: 30, duration: 1, ease: "power4.out", delay: 0.1 });
      gsap.from(".hero-title-line", {
        opacity: 0, y: 50, stagger: 0.12, duration: 1.2, ease: "power3.out", delay: 0.2
      });
      gsap.from(".hero-desc", { opacity: 0, y: 20, duration: 1, ease: "power3.out", delay: 0.6 });
      gsap.fromTo(".hero-cta", { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "back.out(1.5)", delay: 0.8 });
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
      gsap.to(".hero-orb-3", {
        y: "random(-30, 30)", x: "random(-50, 50)", rotation: "random(-25, 25)",
        duration: 14, ease: "sine.inOut", repeat: -1, yoyo: true
      });
      gsap.to(".hero-shape", {
        rotation: 360, duration: 60, ease: "none", repeat: -1
      });

      const scrubCfg = {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
      };

      // ── Multi-layer Parallax ──
      // Layer 1: far bg orbs — move fastest + scale up
      gsap.to(bgLayer1Ref.current, {
        y: -600, scale: 1.3, opacity: 0.2,
        ease: "none", scrollTrigger: scrubCfg,
      });
      // Layer 2: mid decorative shapes — move fast
      gsap.to(bgLayer2Ref.current, {
        y: -400, scale: 1.1,
        ease: "none", scrollTrigger: scrubCfg,
      });
      // Layer 3: grid / noise — subtle drift
      gsap.to(bgLayer3Ref.current, {
        y: -150,
        ease: "none", scrollTrigger: scrubCfg,
      });

      // Content layers — each at different speed for depth
      gsap.to(titleRef.current, {
        y: -280, opacity: 0, scale: 0.92,
        ease: "none", scrollTrigger: scrubCfg,
      });
      gsap.to(descRef.current, {
        y: -200, opacity: 0,
        ease: "none", scrollTrigger: scrubCfg,
      });
      gsap.to(ctaRef.current, {
        y: -140, opacity: 0,
        ease: "none", scrollTrigger: scrubCfg,
      });
      gsap.to(statsRef.current, {
        y: -60, opacity: 0,
        ease: "none", scrollTrigger: scrubCfg,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden"
    >
      {/* ── Background Layer 1: Far orbs ── */}
      <div ref={bgLayer1Ref} className="absolute inset-0 z-0 pointer-events-none">
        <div className="hero-orb-1 absolute -top-[20%] -right-[15%] w-[600px] h-[600px] rounded-full bg-[#E8A838]/[0.06] blur-[140px]" />
        <div className="hero-orb-2 absolute bottom-[-15%] -left-[15%] w-[500px] h-[500px] rounded-full bg-[#E85D75]/[0.05] blur-[140px]" />
        <div className="hero-orb-3 absolute top-[20%] left-[40%] w-[350px] h-[350px] rounded-full bg-[#3DD6B5]/[0.04] blur-[120px]" />
      </div>

      {/* ── Background Layer 2: Decorative geometric shapes ── */}
      <div ref={bgLayer2Ref} className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <div className="hero-shape absolute top-[10%] right-[8%] w-[300px] h-[300px] border border-white/[0.03] rounded-full" />
        <div className="hero-shape absolute bottom-[15%] left-[5%] w-[200px] h-[200px] border border-white/[0.04] rounded-full" style={{ animationDirection: "reverse" }} />
        <div className="absolute top-[60%] right-[20%] w-3 h-3 rounded-full bg-[#E8A838]/20" />
        <div className="absolute top-[25%] left-[15%] w-2 h-2 rounded-full bg-[#3DD6B5]/25" />
        <div className="absolute top-[45%] right-[35%] w-1.5 h-1.5 rounded-full bg-[#E85D75]/20" />
      </div>

      {/* ── Background Layer 3: Grid pattern ── */}
      <div ref={bgLayer3Ref} className="absolute inset-0 z-[2] pointer-events-none">
        <div className="bg-dot-grid absolute inset-0 opacity-30" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0B0B0F] to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="max-w-6xl mx-auto px-5 md:px-8 relative z-10 w-full">
        <div className="text-center max-w-4xl mx-auto">
          {/* Title block */}
          <div ref={titleRef}>
            {/* Badge */}
            <div className="hero-badge inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[#E8A838]/20 bg-[#E8A838]/[0.06] mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8A838] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E8A838]"></span>
              </span>
              <span className="text-sm font-medium text-[#E8A838]/90 tracking-wide">Agensi Web Premium</span>
            </div>

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
          </div>

          {/* Description */}
          <div ref={descRef}>
            <p className="hero-desc text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-jakarta">
              Hadirkan identitas bisnis Anda ke dunia digital dengan desain premium, responsif, dan teknologi terdepan dari NexStudio.
            </p>
          </div>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20">
            <a href="#layanan"
              className="hero-cta group inline-flex items-center gap-3 px-9 py-4 rounded-full font-bold text-lg bg-gradient-to-r from-[#E8A838] to-[#F0D078] text-[#0B0B0F] shadow-[0_4px_25px_rgba(232,168,56,0.35)] hover:shadow-[0_8px_40px_rgba(232,168,56,0.5)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Lihat Layanan
              <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </a>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
              className="hero-cta group inline-flex items-center gap-3 px-9 py-4 rounded-full font-bold text-lg border-2 border-white/20 text-white backdrop-blur-sm bg-white/[0.04] hover:bg-white/[0.1] hover:border-white/40 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-60"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#25D366]"></span>
              </span>
              Konsultasi Gratis
            </a>
          </div>
        </div>

        {/* Stats Bar */}
        <div ref={statsRef} className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0 sm:divide-x sm:divide-white/[0.08]">
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
    </section>
  );
}