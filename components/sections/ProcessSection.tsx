"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ListChecks } from "lucide-react";
import { processSteps } from "@/lib/service-data";

gsap.registerPlugin(ScrollTrigger);

const stepColors = ["#00F0FF", "#7000FF", "#F2C94C", "#00F0FF", "#7000FF"];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".process-header", {
        opacity: 0, y: 30, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
      });

      gsap.fromTo(lineRef.current,
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1
          }
        }
      );

      gsap.from(".process-step", {
        opacity: 0, x: 50, stagger: 0.2, duration: 0.8, ease: "back.out(1.2)",
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%" }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="proses" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none blur-[100px]"
        style={{ background: "radial-gradient(circle, rgba(112,0,255,0.12) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none blur-[100px]"
        style={{ background: "radial-gradient(circle, rgba(0,240,255,0.08) 0%, transparent 70%)" }} />

      <div className="max-w-4xl mx-auto px-5 md:px-8 relative z-10 w-full">
        <div className="process-header text-center mb-20">
          <span className="section-tag mb-4"><ListChecks size={14} /> Cara Kerja</span>
          <h2 className="font-syne font-extrabold text-4xl md:text-5xl lg:text-6xl text-white mt-4 mb-6 leading-tight tracking-tight">
            Proses Mudah & <span className="text-highlight">Transparan</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Hanya butuh 5 langkah sederhana dari konsultasi hingga proyek Anda siap diluncurkan. Tidak perlu ribet.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Glowing Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2">
            <div ref={lineRef} className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#00F0FF] via-[#7000FF] to-transparent" 
              style={{ boxShadow: "0 0 15px rgba(0,240,255,0.5)" }} />
          </div>

          <div className="space-y-12">
            {processSteps.map((step, index) => (
              <div key={index} className={`process-step relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>

                {/* Node Icon */}
                <div className="absolute left-6 md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10">
                  <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${stepColors[index]}15, #030308)`, boxShadow: `0 0 20px rgba(0,0,0,0.5)` }}>
                    <span className="text-lg relative z-10">{step.icon}</span>
                  </div>
                </div>

                {/* Content Card */}
                <div className="w-full md:w-1/2 pl-16 md:pl-0 flex">
                  <div className={`glass-card p-6 md:p-8 rounded-3xl w-full relative group ${index % 2 === 0 ? "md:pr-16" : "md:pl-16"} transition-all duration-300 hover:-translate-y-2`}>

                    {/* Watermark number */}
                    <div className="absolute -top-4 right-4 font-syne font-black text-[120px] leading-none text-white/[0.02] select-none pointer-events-none group-hover:text-white/[0.04] transition-colors">
                      {index + 1}
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-white font-black text-sm"
                          style={{ background: `linear-gradient(135deg, ${stepColors[index]}, ${stepColors[index]}AA)`, boxShadow: `0 4px 10px ${stepColors[index]}50` }}>
                          {index + 1}
                        </span>
                        <h3 className="font-syne font-bold text-2xl text-white group-hover:text-[#00F0FF] transition-colors">{step.title}</h3>
                      </div>
                      <p className="text-gray-400 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}