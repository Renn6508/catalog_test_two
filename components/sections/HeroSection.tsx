"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight, Star, CheckCircle, Code } from "lucide-react";

const stats = [
  { value: "50+", label: "Klien Puas", icon: <Star className="text-[#F2C94C]" size={18} /> },
  { value: "100+", label: "Proyek Selesai", icon: <CheckCircle className="text-[#00F0FF]" size={18} /> },
  { value: "5 Thn", label: "Pengalaman", icon: <Code className="text-[#7000FF]" size={18} /> },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Glow background animations
      gsap.to(".glow-blob-1", {
        x: "random(-100, 100)", y: "random(-100, 100)", rotation: "random(-30, 30)",
        duration: 15, ease: "sine.inOut", repeat: -1, yoyo: true
      });
      gsap.to(".glow-blob-2", {
        x: "random(-150, 150)", y: "random(-150, 150)", rotation: "random(-45, 45)",
        duration: 20, ease: "sine.inOut", repeat: -1, yoyo: true
      });

      // Intro animations
      gsap.from(".hero-badge", { opacity: 0, y: 30, duration: 1, ease: "power4.out", delay: 0.1 });
      gsap.from(".hero-title span", {
        opacity: 0, y: 40, rotationX: -20, stagger: 0.1, duration: 1.2, ease: "power3.out", delay: 0.2
      });
      gsap.from(".hero-desc", { opacity: 0, y: 20, duration: 1, ease: "power3.out", delay: 0.6 });
      gsap.from(".hero-cta", { opacity: 0, scale: 0.9, stagger: 0.15, duration: 0.8, ease: "back.out(1.5)", delay: 0.8 });
      
      // Floating cards
      gsap.from(".hero-stat-card", {
        opacity: 0, y: 30, rotation: -5, stagger: 0.1, duration: 1, ease: "power3.out", delay: 1
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden"
    >
      {/* Animated Aurora Background */}
      <div ref={backgroundRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="bg-grid absolute inset-0 opacity-20" />
        <div className="glow-blob-1 absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-radial from-[#7000FF]/25 to-transparent blur-[80px]" />
        <div className="glow-blob-2 absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-radial from-[#00F0FF]/20 to-transparent blur-[80px]" />
        <div className="absolute top-[20%] left-[20%] w-[300px] h-[300px] rounded-full bg-gradient-radial from-[#F2C94C]/15 to-transparent blur-[60px] animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030308]/50 to-[#030308] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10 w-full grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <div ref={contentRef} className="text-center lg:text-left">
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00F0FF]"></span>
            </span>
            <span className="text-sm font-medium text-gray-300">Agensi Web Premium</span>
          </div>

          <h1 className="hero-title font-syne font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-6 tracking-tight text-white flex flex-wrap gap-x-4 justify-center lg:justify-start">
            <span>Ubah</span>
            <span>Ide</span>
            <span className="text-highlight">Menjadi</span>
            <span className="text-gradient-cyan">Karya</span>
            <span className="text-gradient-purple">Digital</span>
            <span>Nyata</span>
          </h1>

          <p className="hero-desc text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Hadirkan identitas bisnis Anda ke dunia digital dengan desain premium, responsif, dan teknologi terdepan dari NexStudio.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <a href="#layanan" className="hero-cta btn-premium w-full sm:w-auto text-lg group">
              Lihat Layanan
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="hero-cta btn-glass w-full sm:w-auto text-lg">
              Konsultasi Gratis
            </a>
          </div>
        </div>

        {/* Right Content / Visual */}
        <div ref={visualRef} className="relative hidden lg:block h-[600px]">
          {/* Main Floating Glass Panel */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[500px] glass-card rounded-3xl border border-white/10 p-6 flex flex-col justify-between overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,240,255,0.3)]">
            {/* Inner Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-[#7000FF]/20 to-transparent blur-3xl rounded-full" />
            
            <div className="space-y-4">
               <div className="flex justify-between items-center">
                 <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00F0FF] to-[#7000FF] p-0.5">
                   <div className="w-full h-full bg-[#030308] rounded-[10px] flex items-center justify-center">
                     <span className="font-syne font-bold text-white">NX</span>
                   </div>
                 </div>
                 <div className="flex gap-2">
                   <div className="w-3 h-3 rounded-full bg-[#FFDF80]" />
                   <div className="w-3 h-3 rounded-full bg-[#00F0FF]" />
                   <div className="w-3 h-3 rounded-full bg-[#7000FF]" />
                 </div>
               </div>
               <div className="h-32 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center">
                 <div className="w-20 h-20 rounded-full border-4 border-[#00F0FF]/30 flex items-center justify-center relative">
                   <div className="w-16 h-16 rounded-full border-4 border-t-[#00F0FF] border-r-transparent border-b-[#7000FF] border-l-transparent animate-spin" />
                   <Star className="absolute text-[#F2C94C]" size={20} />
                 </div>
               </div>
            </div>

            <div className="space-y-3 relative z-10">
              <div className="h-4 w-3/4 rounded-md bg-white/10" />
              <div className="h-4 w-1/2 rounded-md bg-white/10" />
              <div className="h-10 w-full rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#7000FF] opacity-80" />
            </div>
          </div>

          {/* Floating Stat Badges */}
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className={`hero-stat-card glass-pill absolute flex items-center gap-4 p-4 rounded-2xl ${
                i === 0 ? "top-[10%] -left-[10%]" : 
                i === 1 ? "bottom-[15%] -left-[5%]" : 
                "bottom-[30%] -right-[15%]"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-[#030308] border border-white/10 flex items-center justify-center">
                {stat.icon}
              </div>
              <div>
                <h4 className="font-syne font-bold text-xl text-white">{stat.value}</h4>
                <p className="text-xs text-gray-400 font-medium tracking-wide uppercase">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}