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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animations
      gsap.from(".hero-line", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.2,
      });

      gsap.from(".hero-badge", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power4.out",
        delay: 0.1,
      });

      gsap.from(".hero-content-fade", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.8,
      });

      // Floating orbs animation
      gsap.to(".hero-orb-1", {
        y: "random(-40, 40)",
        x: "random(-30, 30)",
        rotation: "random(-15, 15)",
        duration: 12,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to(".hero-orb-2", {
        y: "random(-50, 50)",
        x: "random(-40, 40)",
        rotation: "random(-20, 20)",
        duration: 16,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to(".hero-orb-3", {
        y: "random(-30, 30)",
        x: "random(-50, 50)",
        rotation: "random(-25, 25)",
        duration: 14,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Pin the header and create the scroll effect
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: false,
      });

      // Heading animation - scale up and fade out as you scroll
      gsap.to(headingRef.current, {
        scale: 1.5,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top top",
          end: "+=80%",
          scrub: 0.5,
        },
      });

      // Each line animates differently for depth effect
      gsap.to(".hero-line-1", {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top top",
          end: "+=80%",
          scrub: 0.5,
        },
      });

      gsap.to(".hero-line-2", {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top top",
          end: "+=80%",
          scrub: 0.5,
        },
      });

      gsap.to(".hero-line-3", {
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top top",
          end: "+=80%",
          scrub: 0.5,
        },
      });

      // Background layers parallax
      gsap.to(".hero-bg-layer", {
        y: -200,
        ease: "none",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 0.3,
        },
      });

      // Content section fade in as header fades out
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 90%",
            end: "top 50%",
            scrub: 0.5,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      {/* ===== PINNED HEADER SECTION ===== */}
      <header
        ref={headerRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      >
        {/* Background orbs */}
        <div className="hero-bg-layer absolute inset-0 z-0 pointer-events-none">
          <div className="hero-orb-1 absolute -top-[20%] -right-[15%] w-[600px] h-[600px] rounded-full bg-[#E8A838]/[0.08] blur-[140px]" />
          <div className="hero-orb-2 absolute bottom-[-15%] -left-[15%] w-[500px] h-[500px] rounded-full bg-[#E85D75]/[0.06] blur-[140px]" />
          <div className="hero-orb-3 absolute top-[20%] left-[40%] w-[350px] h-[350px] rounded-full bg-[#3DD6B5]/[0.05] blur-[120px]" />
        </div>

        {/* Decorative shapes */}
        <div className="hero-bg-layer absolute inset-0 z-[1] pointer-events-none overflow-hidden">
          <div className="absolute top-[10%] right-[8%] w-[300px] h-[300px] border border-white/[0.03] rounded-full animate-[spin_60s_linear_infinite]" />
          <div className="absolute bottom-[15%] left-[5%] w-[200px] h-[200px] border border-white/[0.04] rounded-full animate-[spin_60s_linear_infinite_reverse]" />
          <div className="absolute top-[60%] right-[20%] w-3 h-3 rounded-full bg-[#E8A838]/20" />
          <div className="absolute top-[25%] left-[15%] w-2 h-2 rounded-full bg-[#3DD6B5]/25" />
          <div className="absolute top-[45%] right-[35%] w-1.5 h-1.5 rounded-full bg-[#E85D75]/20" />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 z-[2] pointer-events-none">
          <div className="bg-dot-grid absolute inset-0 opacity-30" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0B0B0F] to-transparent" />
        </div>

        {/* Badge */}
        <div className="absolute top-28 left-1/2 -translate-x-1/2 z-20">
          <div className="hero-badge inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[#E8A838]/20 bg-[#E8A838]/[0.06]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8A838] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E8A838]"></span>
            </span>
            <span className="text-sm font-medium text-[#E8A838]/90 tracking-wide">
              Agensi Web Premium
            </span>
          </div>
        </div>

        {/* Main Heading - Large text like CodePen */}
        <div
          ref={headingRef}
          className="relative z-10 text-center px-4 max-w-[95vw]"
        >
          <h1 className="font-syne font-extrabold tracking-tight leading-[0.9]">
            <span className="hero-line hero-line-1 block text-[clamp(2.5rem,12vw,10rem)] text-white">
              Ubah Ide
            </span>
            <span className="hero-line hero-line-2 block text-[clamp(2.5rem,12vw,10rem)]">
              <span className="text-highlight">Menjadi</span>{" "}
              <span className="text-gradient-rose">Karya</span>
            </span>
            <span className="hero-line hero-line-3 block text-[clamp(2.5rem,12vw,10rem)]">
              <span className="text-gradient-teal">Digital</span>{" "}
              <span className="text-white">Nyata</span>
            </span>
          </h1>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
          <div className="flex flex-col items-center gap-2 opacity-60">
            <span className="text-xs text-white/60 uppercase tracking-widest">Scroll</span>
            <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
              <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </header>

      {/* ===== CONTENT SECTION (appears as you scroll) ===== */}
      <section ref={contentRef} className="relative z-10 py-24 bg-[#0B0B0F]">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Description */}
            <p className="hero-content-fade text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-jakarta">
              Hadirkan identitas bisnis Anda ke dunia digital dengan desain premium,
              responsif, dan teknologi terdepan dari NexStudio.
            </p>

            {/* CTAs */}
            <div className="hero-content-fade flex flex-col sm:flex-row items-center justify-center gap-5 mb-20">
              <a
                href="#layanan"
                className="group inline-flex items-center gap-3 px-9 py-4 rounded-full font-bold text-lg bg-gradient-to-r from-[#E8A838] to-[#F0D078] text-[#0B0B0F] shadow-[0_4px_25px_rgba(232,168,56,0.35)] hover:shadow-[0_8px_40px_rgba(232,168,56,0.5)] hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Lihat Layanan
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1.5 transition-transform duration-300"
                />
              </a>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-9 py-4 rounded-full font-bold text-lg border-2 border-white/20 text-white backdrop-blur-sm bg-white/[0.04] hover:bg-white/[0.1] hover:border-white/40 hover:scale-105 active:scale-95 transition-all duration-300"
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
          <div className="hero-content-fade flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0 sm:divide-x sm:divide-white/[0.08]">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-3 sm:px-8">
                <div className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                  {stat.icon}
                </div>
                <div className="text-left">
                  <h4 className="font-syne font-bold text-xl text-white leading-none">
                    {stat.value}
                  </h4>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
