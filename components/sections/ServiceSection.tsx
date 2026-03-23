"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, Star, Sparkles } from "lucide-react";
import { services } from "@/lib/service-data";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

const categories = ["Semua", "Website", "Akademik", "Desain"];

function ServiceCard({ service }: { service: (typeof services)[0] }) {
  return (
    <div className="service-card glass-card rounded-3xl p-6 md:p-8 flex flex-col items-start relative group overflow-hidden">
      
      {/* Hover glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(0,240,255,0.15), transparent)" }} />

      {/* Header */}
      <div className="flex justify-between items-start w-full mb-6 relative z-10">
        <div className="w-14 h-14 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-3xl group-hover:scale-110 group-hover:border-[#00F0FF]/20 transition-all duration-500">
          {service.emoji}
        </div>
        <div className="flex flex-col items-end gap-2">
          {service.tag && (
            <span className={clsx(
              "inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full",
              service.tagStyle === "popular"
                ? "text-[#030308] bg-gradient-to-r from-[#F2C94C] to-[#FFDF80] shadow-[0_2px_10px_rgba(242,201,76,0.3)]"
                : service.tagStyle === "new"
                ? "text-[#00F0FF] border border-[#00F0FF]/25 bg-[#00F0FF]/[0.06]"
                : "text-[#7000FF] border border-[#7000FF]/25 bg-[#7000FF]/[0.06]"
            )}>
              {service.tagStyle === "popular" && <Star size={10} fill="#030308" />}
              {service.tag}
            </span>
          )}
          <span className="text-[10px] font-bold tracking-widest text-[#00F0FF] uppercase border border-white/[0.08] bg-white/[0.03] px-3 py-1 rounded-full whitespace-nowrap">
            {service.category}
          </span>
        </div>
      </div>

      <h3 className="font-syne font-bold text-xl md:text-2xl text-white mb-2 relative z-10 group-hover:text-[#00F0FF] transition-colors">{service.title}</h3>
      <p className="text-sm font-medium text-gray-500 mb-4 relative z-10">{service.subtitle}</p>
      <p className="text-sm text-gray-400 mb-8 leading-relaxed relative z-10">{service.description}</p>

      {/* Features */}
      <ul className="w-full space-y-3 mb-8 relative z-10">
        {service.features.slice(0, 4).map((feature, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-gray-400">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_6px_#00F0FF] flex-shrink-0" />
            <span className="leading-snug">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Price & Delivery */}
      <div className="mt-auto w-full pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4 relative z-10">
        <div>
          <p className="text-[10px] font-bold tracking-widest text-gray-600 uppercase mb-1">Mulai Dari</p>
          <p className="font-syne font-bold text-2xl text-white group-hover:text-highlight transition-all">
            {service.priceFrom}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-gray-500 bg-white/[0.02] px-3 py-1.5 border border-white/[0.06] rounded-full">
          <Clock size={12} className="text-[#00F0FF]" />
          <span className="whitespace-nowrap">{service.deliveryTime}</span>
        </div>
      </div>

      {/* CTA */}
      <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
        className="w-full mt-6 py-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-sm font-bold text-center text-white hover:bg-gradient-to-r hover:from-[#00F0FF] hover:to-[#0080FF] hover:border-transparent hover:text-[#030308] transition-all duration-500 relative z-10"
      >
        Pesan Sekarang
      </a>
    </div>
  );
}

export default function ServiceSection() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const filteredServices = services.filter((s) => activeCategory === "Semua" || s.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-header", {
        opacity: 0, y: 30, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
      });

      // Initial entrance animation
      ScrollTrigger.create({
        trigger: gridRef.current,
        start: "top 85%",
        onEnter: () => {
          if (!hasAnimated.current) {
            hasAnimated.current = true;
            gsap.fromTo(".service-card",
              { opacity: 0, y: 40 },
              { opacity: 1, y: 0, stagger: 0.12, duration: 1, ease: "power2.out" }
            );
          }
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Animate cards in after category change
  useEffect(() => {
    if (hasAnimated.current) {
      gsap.fromTo(".service-card",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power2.out", clearProps: "all" }
      );
    }
  }, [activeCategory]);

  const handleCategoryChange = (cat: string) => {
    if (cat === activeCategory) return;
    // Fade out current cards first, then switch
    gsap.to(".service-card", {
      opacity: 0, y: -10, duration: 0.4, ease: "power2.in", stagger: 0.04,
      onComplete: () => setActiveCategory(cat)
    });
  };

  return (
    <section id="layanan" ref={sectionRef} className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-[#030308]" />
      
      <div className="max-w-6xl mx-auto px-5 md:px-8 relative z-10 w-full">
        {/* Header */}
        <div className="service-header flex flex-col md:flex-row gap-8 justify-between items-end mb-16">
          <div className="max-w-xl">
            <span className="section-tag mb-4"><Sparkles size={14} /> Layanan Premium</span>
            <h2 className="font-syne font-extrabold text-4xl md:text-5xl lg:text-6xl text-white mt-4 mb-6 leading-tight tracking-tight">
              Karya & Keahlian <br /><span className="text-gradient-purple">Tingkat Tinggi</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Dari website perusahaan elit hingga desain antarmuka canggih, kami siap membantu mewujudkan standar tertinggi untuk Anda.
            </p>
          </div>

          {/* Category Filter Desktop */}
          <div className="hidden lg:flex flex-wrap items-center gap-1 p-1.5 bg-white/[0.02] border border-white/[0.08] rounded-xl backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={clsx(
                  "px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-300",
                  cat === activeCategory
                    ? "bg-gradient-to-r from-[#00F0FF] to-[#7000FF] text-white shadow-[0_2px_12px_rgba(0,240,255,0.3)]"
                    : "text-gray-500 hover:text-white hover:bg-white/[0.04]"
                )}
              >
                {cat}
                <span className="text-[10px] opacity-60 ml-1.5">
                  ({cat === "Semua" ? services.length : services.filter((s) => s.category === cat).length})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Mobile */}
        <div className="lg:hidden w-full overflow-x-auto pb-6 mb-4 no-scrollbar">
          <div className="flex gap-2 w-max">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={clsx(
                  "px-5 py-2.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap border",
                  cat === activeCategory
                    ? "bg-[#00F0FF]/10 text-[#00F0FF] border-[#00F0FF]/25"
                    : "bg-white/[0.02] border-white/[0.06] text-gray-500"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}