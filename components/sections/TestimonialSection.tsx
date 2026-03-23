"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials } from "@/lib/service-data";
import { Star, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function TestimonialCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div className="flex-shrink-0 w-[320px] md:w-[370px] glass-card rounded-3xl p-6 mx-3 relative group overflow-hidden">
      {/* Hover glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(242,201,76,0.15), transparent)" }} />

      <div className="relative z-10">
        <div className="w-9 h-9 rounded-lg bg-[#F2C94C]/10 border border-[#F2C94C]/15 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
          <Quote size={14} className="text-[#F2C94C]" />
        </div>

        <div className="flex gap-0.5 mb-4">
          {[...Array(t.rating)].map((_, i) => <Star key={i} size={13} fill="#F2C94C" className="text-[#F2C94C]" />)}
        </div>

        <p className="text-sm text-gray-300 leading-relaxed mb-6 min-h-[70px]">&quot;{t.text}&quot;</p>

        <div className="flex items-center gap-3 pt-5 border-t border-white/5">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0 border border-white/[0.08]"
            style={{ background: t.avatarBg }}>{t.avatar}</div>
          <div className="min-w-0 flex-1">
            <p className="text-white font-semibold text-sm truncate group-hover:text-[#F2C94C] transition-colors">{t.name}</p>
            <p className="text-gray-600 text-xs truncate">{t.role}</p>
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
    }, sectionRef);

    // CSS-based smooth marquee — much smoother than GSAP for infinite scroll
    const setupMarquee = (track: HTMLDivElement | null, speed: number, reverse: boolean) => {
      if (!track) return;
      const totalWidth = track.scrollWidth / 2; // half because we duplicated the items
      track.style.willChange = "transform";

      const anim = track.animate(
        [
          { transform: reverse ? `translateX(-${totalWidth}px)` : "translateX(0)" },
          { transform: reverse ? "translateX(0)" : `translateX(-${totalWidth}px)` },
        ],
        {
          duration: speed,
          iterations: Infinity,
          easing: "linear",
        }
      );
      return anim;
    };

    const anim1 = setupMarquee(track1Ref.current, 60000, false);
    const anim2 = setupMarquee(track2Ref.current, 65000, true);

    return () => {
      ctx.revert();
      anim1?.cancel();
      anim2?.cancel();
    };
  }, []);

  return (
    <section id="testimoni" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden border-t border-white/5">
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(242,201,76,0.04), transparent)" }} />

      <div className="max-w-6xl mx-auto px-5 md:px-8 mb-16 relative z-10">
        <div className="testimonial-header text-center">
          <span className="section-tag mb-4"><Star size={14} fill="currentColor" /> Kepuasan Klien</span>
          <h2 className="font-syne font-extrabold text-4xl md:text-5xl lg:text-6xl text-white mt-4 mb-6 tracking-tight">
            Mereka Puas, <span className="text-highlight">Kami Bangga</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Ratusan klien telah mempercayakan kebutuhan digital profesional mereka kepada kualitas NexStudio.
          </p>

          {/* Rating badge */}
          <div className="inline-flex items-center gap-4 mt-8 glass-pill px-6 py-3 rounded-2xl">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#F2C94C" className="text-[#F2C94C]" />)}
            </div>
            <div className="w-px h-5 bg-white/[0.08]" />
            <span className="font-syne font-bold text-lg text-white">5.0</span>
            <span className="text-gray-500 text-sm">Review Sempurna</span>
          </div>
        </div>
      </div>

      {/* Marquee Row 1 */}
      <div className="relative overflow-hidden mb-6">
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-[#030308] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-[#030308] to-transparent z-20 pointer-events-none" />
        <div ref={track1Ref} className="flex" style={{ width: "max-content" }}>
          {[...testimonials, ...testimonials].map((item, i) => (
            <TestimonialCard key={`r1-${i}`} t={item} />
          ))}
        </div>
      </div>

      {/* Marquee Row 2 */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-[#030308] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-[#030308] to-transparent z-20 pointer-events-none" />
        <div ref={track2Ref} className="flex" style={{ width: "max-content" }}>
          {[...testimonials, ...testimonials].map((item, i) => (
            <TestimonialCard key={`r2-${i}`} t={item} />
          ))}
        </div>
      </div>
    </section>
  );
}