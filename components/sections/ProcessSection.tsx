"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/lib/service-data";
import { MessageCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0, y: 40, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
      });
      // Garis tumbuh seiring scroll
      gsap.fromTo(lineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        { scaleY: 1, ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%", end: "bottom 80%", scrub: 1 } }
      );
      gsap.from(".process-step", {
        opacity: 0, x: -30, stagger: 0.15, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: ".process-steps-container", start: "top 80%" },
      });
      gsap.from(".step-icon", {
        scale: 0, stagger: 0.12, duration: 0.5, ease: "back.out(2)",
        scrollTrigger: { trigger: ".process-steps-container", start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="proses" ref={sectionRef} className="py-24 md:py-32 relative bg-[#0C0C1E]">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#06060F] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#06060F] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div ref={headingRef} className="text-center mb-16">
          <span className="section-tag mb-4 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F2C94C]" />Cara Kerja Kami
          </span>
          <h2 className="font-syne font-extrabold text-3xl md:text-4xl lg:text-5xl text-white mt-4 mb-4">
            Proses Mudah & <span className="text-highlight">Transparan</span>
          </h2>
          <p className="text-[#6666A0] text-sm max-w-sm mx-auto leading-relaxed">
            5 langkah sederhana dari konsultasi hingga serah terima. Tidak perlu ribet, kami pandu Anda.
          </p>
        </div>

        <div className="relative max-w-2xl mx-auto process-steps-container">
          {/* Garis vertikal */}
          <div className="absolute left-[23px] top-0 bottom-0 w-[2px] bg-white/[0.04]">
            <div ref={lineRef} className="w-full h-full"
              style={{ background: "linear-gradient(to bottom, #F2C94C, #60A5FA, #7BE495, #C084FC, #FB923C)" }} />
          </div>

          <div className="space-y-10">
            {processSteps.map((step, i) => (
              <div key={i} className="process-step relative flex items-start gap-6 pl-14">
                <div className="step-icon absolute left-0 w-12 h-12 rounded-full border-2 flex items-center justify-center flex-shrink-0 bg-[#0C0C1E]"
                  style={{ borderColor: step.color }}>
                  <span className="text-xl">{step.icon}</span>
                </div>
                <div className="flex-1 bg-[#111128] border border-white/[0.06] rounded-2xl p-5 hover:border-white/10 transition-colors duration-200">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-syne font-black text-xs" style={{ color: step.color }}>{step.number}</span>
                    <h3 className="font-syne font-bold text-white text-base">{step.title}</h3>
                  </div>
                  <p className="text-sm text-[#6666A0] leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-[#4A4A70] text-sm mb-5">Siap memulai? Hubungi kami sekarang untuk konsultasi gratis!</p>
          <a href="https://wa.me/6281234567890?text=Halo, saya ingin konsultasi tentang layanan NexStudio"
            target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex">
            <MessageCircle size={16} />Mulai Konsultasi Gratis
          </a>
        </div>
      </div>
    </section>
  );
}