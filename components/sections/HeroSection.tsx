"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Star, CheckCircle, Code } from "lucide-react";
import Image from "next/image";

// Register plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { value: "50+", label: "Klien Puas", icon: <Star className="text-[#E8A838]" size={18} /> },
  { value: "100+", label: "Proyek Selesai", icon: <CheckCircle className="text-[#3DD6B5]" size={18} /> },
  { value: "5 Thn", label: "Pengalaman", icon: <Code className="text-[#E85D75]" size={18} /> },
];

export default function HeroSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial logo animation
      gsap.set(".logo svg", { opacity: 1 });

      // Draw SVG animation using stroke-dashoffset (like CodePen's drawSVG)
      const drawElements = document.querySelectorAll(".draw-circle");
      drawElements.forEach((el) => {
        const length = (el as SVGCircleElement).getTotalLength?.() || 1000;
        gsap.set(el, { strokeDasharray: length, strokeDashoffset: length });
        
        gsap.to(el, {
          strokeDashoffset: 0,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".heading",
            start: "clamp(top center)",
            end: "+=50%",
            scrub: 1.5,
          },
        });
      });

      // Draw arc path
      const arcPath = document.querySelector(".draw-arc");
      if (arcPath) {
        const arcLength = (arcPath as SVGPathElement).getTotalLength?.() || 800;
        gsap.set(arcPath, { strokeDasharray: arcLength, strokeDashoffset: arcLength });
        
        gsap.to(arcPath, {
          strokeDashoffset: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".heading",
            start: "clamp(top center)",
            end: "+=60%",
            scrub: 1,
          },
        });
      }

      // Image parallax effect - moves through the heading
      gsap.to(imageRef.current, {
        yPercent: -150,
        ease: "none",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      // Heading lines move at different speeds (like the CodePen)
      gsap.to(".hero-line-1", {
        yPercent: -80,
        ease: "none",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.3,
        },
      });

      gsap.to(".hero-line-2", {
        yPercent: -40,
        ease: "none",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.3,
        },
      });

      // Pin the header section
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: "top top",
        end: "+=150%",
        pin: true,
        pinSpacing: true,
      });

      // Fade out heading as you scroll
      gsap.to(".heading", {
        opacity: 0,
        scale: 0.8,
        ease: "none",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top top",
          end: "+=80%",
          scrub: 0.5,
        },
      });

      // Logo circles animation
      gsap.to(".circle-1", {
        rotation: 360,
        ease: "none",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 0.5,
        },
      });

      gsap.to(".circle-2", {
        rotation: -360,
        ease: "none",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 0.5,
        },
      });

      // Decorative dots float
      gsap.to(".float-dot", {
        y: "random(-30, 30)",
        x: "random(-20, 20)",
        duration: 6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.5,
          from: "random",
        },
      });

      // Initial entrance animation
      gsap.from(".hero-line", {
        y: 120,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.3,
      });

      gsap.from(".hero-image-wrapper", {
        y: 100,
        opacity: 0,
        duration: 1.4,
        ease: "power4.out",
        delay: 0.5,
      });

      gsap.from(".logo", {
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
        delay: 0.8,
      });

      gsap.from(".about-link", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 1,
      });

    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="hero-wrapper">
      {/* ===== PINNED HEADER SECTION (Like CodePen) ===== */}
      <header
        ref={headerRef}
        className="header relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0B0B0F]"
      >
        {/* Background grid */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="bg-dot-grid absolute inset-0 opacity-30" />
        </div>

        {/* Decorative floating dots */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <div className="float-dot absolute top-[15%] left-[10%] w-2 h-2 rounded-full bg-[#E8A838]/30" />
          <div className="float-dot absolute top-[25%] right-[15%] w-3 h-3 rounded-full bg-[#3DD6B5]/25" />
          <div className="float-dot absolute top-[60%] left-[20%] w-2.5 h-2.5 rounded-full bg-[#E85D75]/25" />
          <div className="float-dot absolute top-[70%] right-[25%] w-2 h-2 rounded-full bg-[#E8A838]/20" />
          <div className="float-dot absolute top-[40%] left-[5%] w-1.5 h-1.5 rounded-full bg-[#3DD6B5]/30" />
          <div className="float-dot absolute bottom-[20%] right-[10%] w-2 h-2 rounded-full bg-[#E85D75]/20" />
        </div>

        {/* Logo with SVG circles (like CodePen) - Top Left */}
        <div className="logo absolute top-28 left-8 md:left-12 z-20">
          <svg
            className="w-16 h-16 md:w-20 md:h-20"
            viewBox="0 0 100 100"
            fill="none"
          >
            {/* Outer circle - draws on scroll */}
            <circle
              className="draw-circle circle-1"
              cx="50"
              cy="50"
              r="45"
              stroke="#E8A838"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Middle circle */}
            <circle
              className="draw-circle circle-2"
              cx="50"
              cy="50"
              r="32"
              stroke="#3DD6B5"
              strokeWidth="1"
              fill="none"
            />
            {/* Inner filled circle */}
            <circle
              cx="50"
              cy="50"
              r="8"
              fill="#E8A838"
            />
          </svg>
        </div>

        {/* About link - Top Right */}
        <a
          href="#tentang"
          className="about-link absolute top-28 right-8 md:right-12 z-20 text-sm text-white/60 hover:text-[#E8A838] transition-colors duration-300 uppercase tracking-widest font-medium"
        >
          tentang
        </a>

        {/* ===== MAIN HEADING WITH IMAGE PASSING THROUGH ===== */}
        <div className="heading relative z-10 text-center w-full">
          {/* Line 1 - "Ubah" */}
          <div className="hero-line hero-line-1 relative overflow-visible">
            <h1 className="hero-title font-syne font-extrabold tracking-tight leading-[0.85] text-white">
              Ubah
            </h1>
          </div>

          {/* Image container - positioned to pass through the text */}
          <div
            ref={imageRef}
            className="hero-image-wrapper absolute left-1/2 -translate-x-1/2 z-20 w-[280px] h-[180px] md:w-[400px] md:h-[260px] lg:w-[500px] lg:h-[320px]"
            style={{ top: "20%" }}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
              <Image
                src="https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&q=80"
                alt="Creative workspace"
                fill
                className="object-cover"
                priority
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F]/60 via-transparent to-transparent" />
            </div>
          </div>

          {/* Line 2 - "Menjadi Karya" */}
          <div className="hero-line hero-line-2 relative overflow-visible mt-2 md:mt-4">
            <h1 className="hero-title font-syne font-extrabold tracking-tight leading-[0.85]">
              <span className="text-highlight">Menjadi</span>{" "}
              <span className="text-gradient-rose">Karya</span>
            </h1>
          </div>

          {/* Line 3 - "Digital Nyata" */}
          <div className="hero-line relative overflow-visible mt-2 md:mt-4">
            <h1 className="hero-title font-syne font-extrabold tracking-tight leading-[0.85]">
              <span className="text-gradient-teal">Digital</span>{" "}
              <span className="text-white">Nyata</span>
            </h1>
          </div>
        </div>

        {/* Decorative SVG circles around heading (like CodePen) */}
        <div className="absolute inset-0 z-[5] pointer-events-none flex items-center justify-center">
          <svg
            className="w-[90vw] h-[90vh] max-w-[1200px]"
            viewBox="0 0 800 600"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Large decorative circle - draws on scroll */}
            <circle
              className="draw-circle"
              cx="400"
              cy="300"
              r="280"
              stroke="rgba(232, 168, 56, 0.15)"
              strokeWidth="1"
              fill="none"
            />
            {/* Second decorative circle */}
            <circle
              className="draw-circle"
              cx="400"
              cy="300"
              r="200"
              stroke="rgba(61, 214, 181, 0.1)"
              strokeWidth="1"
              fill="none"
            />
            {/* Accent arc */}
            <path
              className="draw-arc"
              d="M 150 300 A 250 250 0 0 1 650 300"
              stroke="rgba(232, 93, 117, 0.12)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
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

      {/* ===== CONTENT SECTION (appears after pinned header) ===== */}
      <section className="content-section relative z-10 py-24 bg-[#0B0B0F]">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Description */}
            <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-jakarta">
              Hadirkan identitas bisnis Anda ke dunia digital dengan desain premium,
              responsif, dan teknologi terdepan dari NexStudio.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20">
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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0 sm:divide-x sm:divide-white/[0.08]">
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
