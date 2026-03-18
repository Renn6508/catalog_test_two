"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles, Star, Zap } from "lucide-react";
import { stats } from "@/lib/service-data";

gsap.registerPlugin(ScrollTrigger);

function Counter({ end, suffix }: { end: number; suffix: string }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: ref.current,
      start: "top 85%",
      onEnter: () => {
        gsap.to(obj, {
          val: end,
          duration: 1.8,
          ease: "power2.out",
          onUpdate: () => setCurrent(Math.round(obj.val)),
        });
      },
    });
  }, [end]);

  return (
    <span ref={ref} className="counter-num text-3xl md:text-4xl">
      {current}{suffix}
    </span>
  );
}

const floatingTags = [
  { label: "Company Profile 🏢", color: "#4F9EFF", anim: "float 5s ease-in-out infinite" },
  { label: "Undangan Digital 💌", color: "#FF7BAC", anim: "float 6s ease-in-out infinite 0.5s" },
  { label: "Joki SMK RPL 💻", color: "#7BE495", anim: "float 7s ease-in-out infinite 1s" },
  { label: "UI/UX Figma ✏️", color: "#60A5FA", anim: "float 5.5s ease-in-out infinite 1.5s" },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from(badgeRef.current, { opacity: 0, y: -20, duration: 0.6, ease: "back.out(2)" });
      tl.from(".hero-word", { opacity: 0, y: 50, rotationX: -20, stagger: 0.08, duration: 0.7, ease: "power3.out" }, "-=0.2");
      tl.from(subRef.current, { opacity: 0, y: 25, duration: 0.6, ease: "power2.out" }, "-=0.3");
      tl.from(".cta-btn", { opacity: 0, y: 20, stagger: 0.1, duration: 0.5, ease: "power2.out" }, "-=0.2");
      tl.from(statsRef.current, { opacity: 0, y: 20, duration: 0.5, ease: "power2.out" }, "-=0.2");
      tl.from(".float-tag", { opacity: 0, scale: 0.7, stagger: 0.1, duration: 0.5, ease: "back.out(2)" }, "-=0.4");

      // Parallax blobs
      gsap.to(".hero-blob-1", {
        y: -80,
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1.5 },
      });
      gsap.to(".hero-blob-2", {
        y: -50, x: 30,
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 2 },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 overflow-hidden bg-grid"
    >
      {/* Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="hero-blob-1 absolute w-[600px] h-[600px] rounded-full opacity-[0.12] blur-[100px]"
          style={{ background: "radial-gradient(circle, #F2C94C 0%, transparent 70%)", top: "-10%", left: "-5%" }} />
        <div className="hero-blob-2 absolute w-[500px] h-[500px] rounded-full opacity-[0.08] blur-[80px]"
          style={{ background: "radial-gradient(circle, #60A5FA 0%, transparent 70%)", bottom: "0%", right: "-5%" }} />
        <div className="absolute w-[300px] h-[300px] rounded-full opacity-[0.06] blur-[60px]"
          style={{ background: "radial-gradient(circle, #EB5757 0%, transparent 70%)", top: "60%", left: "40%" }} />
      </div>

      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-100 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div>
            <div ref={badgeRef} className="mb-6">
              <span className="section-tag"><Sparkles size={12} />Jasa Digital Terpercaya</span>
            </div>

            <h1 ref={headingRef} className="font-syne font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-white mb-6">
              <span className="hero-word inline-block mr-3">Wujudkan</span>
              <span className="hero-word inline-block mr-3">Kehadiran</span>
              <span className="hero-word inline-block mr-3 text-highlight glow-text">Digital</span>
              <span className="hero-word inline-block mr-3">Anda</span>
              <br />
              <span className="hero-word inline-block text-[#7070A0] text-3xl md:text-4xl lg:text-5xl">Bersama Kami</span>
            </h1>

            <p ref={subRef} className="text-[#7070A0] text-base md:text-lg leading-relaxed mb-8 max-w-md">
              Layanan profesional pembuatan website, desain UI/UX, dan solusi digital lainnya —{" "}
              <span className="text-white/70">cepat, terjangkau, berkualitas.</span>
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              <a href="#layanan" className="cta-btn btn-primary">
                Lihat Layanan <ArrowRight size={16} />
              </a>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="cta-btn btn-secondary">
                <span className="text-green-400">●</span> Konsultasi Gratis
              </a>
            </div>

            <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="text-center sm:text-left">
                  <div className="flex items-end gap-0.5 justify-center sm:justify-start">
                    <Counter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-xs text-[#4A4A70] mt-1 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right – Visual cluster */}
          <div className="hidden lg:block relative h-[480px]">
            {/* Central card */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 bg-[#111128] border border-white/[0.08] rounded-2xl p-5 shadow-2xl z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#F2C94C]/10 flex items-center justify-center text-xl">🚀</div>
                <div>
                  <p className="text-xs text-[#4A4A70] font-medium">Total Layanan</p>
                  <p className="font-syne font-bold text-white text-lg">9 Kategori</p>
                </div>
              </div>
              <div className="space-y-2.5">
                {[
                  { label: "Website", value: 5, color: "#4F9EFF" },
                  { label: "Akademik", value: 2, color: "#7BE495" },
                  { label: "Desain", value: 2, color: "#F97316" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#7070A0]">{item.label}</span>
                      <span className="text-white font-semibold">{item.value} layanan</span>
                    </div>
                    <div className="h-1 bg-white/[0.05] rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${(item.value / 9) * 100}%`, background: item.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating tags */}
            {floatingTags.map((tag, i) => (
              <div
                key={i}
                className="float-tag absolute"
                style={{
                  left: i % 2 === 0 ? "5%" : "65%",
                  top: i < 2 ? `${15 + i * 15}%` : `${55 + (i - 2) * 18}%`,
                  animation: tag.anim,
                }}
              >
                <div className="px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border shadow-lg"
                  style={{ background: `${tag.color}15`, borderColor: `${tag.color}30`, color: tag.color }}>
                  {tag.label}
                </div>
              </div>
            ))}

            {/* Rating badge */}
            <div className="float-tag absolute bottom-12 right-4 bg-[#111128] border border-white/[0.08] rounded-xl p-3 flex items-center gap-2 shadow-xl"
              style={{ animation: "float 7s ease-in-out infinite 1s" }}>
              <div className="flex">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#F2C94C" className="text-[#F2C94C]" />)}
              </div>
              <span className="text-xs font-semibold text-white">5.0 Rating</span>
            </div>

            {/* Fast delivery badge */}
            <div className="float-tag absolute top-10 right-12 bg-[#111128] border border-white/[0.08] rounded-xl p-3 flex items-center gap-2 shadow-xl"
              style={{ animation: "float 8s ease-in-out infinite 0.5s" }}>
              <Zap size={14} className="text-[#F2C94C]" />
              <span className="text-xs font-semibold text-white">Fast Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-[#F2C94C]" />
        <p className="text-[10px] tracking-[0.2em] uppercase text-[#7070A0]">Scroll</p>
      </div>
    </section>
  );
}