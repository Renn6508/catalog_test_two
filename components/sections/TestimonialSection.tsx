"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials } from "@/lib/service-data";
import { Star, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function TestimonialCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div className="flex-shrink-0 w-[300px] md:w-[350px] glass-card rounded-3xl p-6 mx-3 relative group overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-radial from-[#F2C94C]/10 to-transparent blur-2xl group-hover:from-[#F2C94C]/20 transition-all duration-500 pointer-events-none" />

      <div className="relative z-10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F2C94C]/20 to-[#FFDF80]/5 flex items-center justify-center mb-5 border border-[#F2C94C]/20 shadow-[0_4px_15px_rgba(242,201,76,0.15)] group-hover:scale-110 transition-transform duration-300">
          <Quote size={16} className="text-[#F2C94C]" />
        </div>
        
        <div className="flex gap-1 mb-4">
          {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} fill="#F2C94C" className="text-[#F2C94C] drop-shadow-[0_0_5px_rgba(242,201,76,0.5)]" />)}
        </div>
        
        <p className="text-sm text-gray-300 leading-relaxed mb-6 min-h-[70px]">&quot;{t.text}&quot;</p>
        
        <div className="flex items-center gap-3 pt-5 border-t border-white/5">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg border border-white/10 flex-shrink-0"
            style={{ background: t.avatarBg }}>{t.avatar}</div>
          <div className="min-w-0 flex-1">
            <p className="text-white font-bold text-sm truncate group-hover:text-[#F2C94C] transition-colors">{t.name}</p>
            <p className="text-gray-500 text-xs truncate">{t.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-header", {
        opacity: 0, y: 30, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      // Marquee jalurs
      gsap.to(track1Ref.current, { x: `-${100 / 2}%`, duration: 40, ease: "none", repeat: -1 });
      gsap.fromTo(track2Ref.current, { x: `-${100 / 2}%` }, { x: "0%", duration: 45, ease: "none", repeat: -1 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const half1 = testimonials.slice(0, 3);
  const half2 = testimonials.slice(3);

  return (
    <section id="testimoni" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden bg-[#030308] border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#F2C94C]/5 to-transparent blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-8 mb-16 relative z-10">
        <div className="testimonial-header text-center">
          <span className="section-tag mb-4"><Star size={14} fill="currentColor" /> Kepuasan Klien</span>
          <h2 className="font-syne font-extrabold text-4xl md:text-5xl lg:text-6xl text-white mt-4 mb-6 tracking-tight">
            Mereka Puas, <span className="text-highlight">Kami Bangga</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Ratusan klien telah mempercayakan kebutuhan digital profesional mereka kepada kualitas NexStudio.
          </p>
          
          <div className="inline-flex items-center gap-4 mt-8 glass-pill px-6 py-3 rounded-2xl">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#F2C94C" className="text-[#F2C94C] drop-shadow-[0_0_8px_rgba(242,201,76,0.6)]" />)}
            </div>
            <div className="w-px h-6 bg-white/20" />
            <span className="font-syne font-bold text-xl text-white">5.0</span>
            <span className="text-gray-400 text-sm">Review Sempurna</span>
          </div>
        </div>
      </div>

      {/* Marquee Rows */}
      {[{ ref: track1Ref, data: half1 }, { ref: track2Ref, data: half2 }].map(({ ref, data }, ri) => (
        <div key={ri} className={`relative overflow-hidden ${ri === 0 ? "mb-6" : ""}`}>
          <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-[#030308] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-[#030308] to-transparent z-20 pointer-events-none" />
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