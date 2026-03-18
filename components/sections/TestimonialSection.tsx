"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials } from "@/lib/service-data";
import { Star, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function TestimonialCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div className="flex-shrink-0 w-72 md:w-80 bg-[#111128] border border-white/[0.06] rounded-2xl p-5 mx-2.5 hover:border-white/10 transition-colors duration-200">
      <div className="w-8 h-8 rounded-lg bg-[#F2C94C]/10 flex items-center justify-center mb-4">
        <Quote size={14} className="text-[#F2C94C]" />
      </div>
      <div className="flex gap-0.5 mb-3">
        {[...Array(t.rating)].map((_, i) => <Star key={i} size={12} fill="#F2C94C" className="text-[#F2C94C]" />)}
      </div>
      <p className="text-sm text-[#8888A8] leading-relaxed mb-5">"{t.text}"</p>
      <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
          style={{ background: t.avatarBg }}>{t.avatar}</div>
        <div className="min-w-0">
          <p className="text-white font-semibold text-sm truncate">{t.name}</p>
          <p className="text-[#4A4A70] text-xs truncate">{t.role}</p>
        </div>
        <div className="ml-auto">
          <span className="text-[10px] text-[#F2C94C] bg-[#F2C94C]/10 border border-[#F2C94C]/20 px-2 py-0.5 rounded-full whitespace-nowrap">
            {t.service}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0, y: 40, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
      });
      gsap.from([track1Ref.current, track2Ref.current], {
        opacity: 0, y: 20, stagger: 0.15, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      // Marquee jalur 1 — kiri
      gsap.to(track1Ref.current, { x: `-${100 / 2}%`, duration: 30, ease: "none", repeat: -1 });
      // Marquee jalur 2 — kanan (berlawanan)
      gsap.fromTo(track2Ref.current, { x: `-${100 / 2}%` }, { x: "0%", duration: 35, ease: "none", repeat: -1 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const half1 = testimonials.slice(0, 3);
  const half2 = testimonials.slice(3);

  return (
    <section id="testimoni" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8 mb-14">
        <div ref={headingRef} className="text-center">
          <span className="section-tag mb-4 inline-flex"><Star size={12} fill="currentColor" />Apa Kata Klien</span>
          <h2 className="font-syne font-extrabold text-3xl md:text-4xl lg:text-5xl text-white mt-4 mb-4">
            Mereka Puas, <span className="text-highlight">Kami Bangga</span>
          </h2>
          <p className="text-[#6666A0] text-sm max-w-sm mx-auto">
            Ratusan klien telah mempercayakan kebutuhan digital mereka kepada kami.
          </p>
          <div className="inline-flex items-center gap-2 mt-6 bg-[#111128] border border-white/[0.06] rounded-xl px-5 py-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#F2C94C" className="text-[#F2C94C]" />)}
            </div>
            <span className="font-syne font-bold text-white">5.0</span>
            <span className="text-[#4A4A70] text-sm">/ dari 80+ ulasan</span>
          </div>
        </div>
      </div>

      {/* Marquee Row 1 */}
      {[{ ref: track1Ref, data: half1 }, { ref: track2Ref, data: half2 }].map(({ ref, data }, ri) => (
        <div key={ri} className={`relative overflow-hidden ${ri === 0 ? "mb-4" : ""}`}>
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#06060F] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#06060F] to-transparent z-10 pointer-events-none" />
          <div ref={ref} className="flex" style={{ width: "max-content" }}>
            {[...data, ...data, ...data, ...data].map((item, i) => (
              <TestimonialCard key={i} t={item} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}