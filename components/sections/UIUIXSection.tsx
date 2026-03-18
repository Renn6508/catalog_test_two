"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, ArrowRight, Layers, Zap, Star } from "lucide-react";
import { services } from "@/lib/service-data";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

const figmaService = services.find((s) => s.id === "uiux-figma")!;
const cpService = services.find((s) => s.id === "company-profile")!;

function PricingCard({ variant, accentColor }: {
  variant: NonNullable<typeof figmaService.variants>[0];
  accentColor: string;
}) {
  return (
    <div className={clsx(
      "relative rounded-2xl p-6 flex flex-col h-full transition-all duration-300 pricing-card",
      variant.recommended ? "pricing-recommended" : "bg-[#111128] border border-white/[0.06]"
    )}>
      {variant.recommended && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <div className="bg-gradient-to-r from-[#F2C94C] to-[#F97316] text-[#06060F] text-[10px] font-black uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1">
            <Star size={9} fill="currentColor" />{variant.badge ?? "Direkomendasikan"}
          </div>
        </div>
      )}
      <div className="mb-5 mt-2">
        <h4 className="font-syne font-bold text-white text-lg mb-1">{variant.name}</h4>
        <p className="text-[#7070A0] text-xs">
          {variant.recommended ? "Paling lengkap & value terbaik" : "Ideal untuk kebutuhan dasar"}
        </p>
      </div>
      <div className="mb-6 pb-5 border-b border-white/[0.06]">
        <p className="font-syne font-extrabold text-2xl" style={{ color: variant.recommended ? "#F2C94C" : "white" }}>
          {variant.price}
        </p>
        {variant.priceNote && <p className="text-xs text-[#4A4A70] mt-0.5">{variant.priceNote}</p>}
      </div>
      <ul className="space-y-3 flex-1 mb-6">
        {variant.features.map((feat, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm">
            <div className="w-4 h-4 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0"
              style={{ background: variant.recommended ? "rgba(242,201,76,0.15)" : "rgba(255,255,255,0.06)" }}>
              <Check size={9} style={{ color: variant.recommended ? "#F2C94C" : "#7070A0" }} />
            </div>
            <span className={variant.recommended ? "text-white/80" : "text-[#7070A0]"}>{feat}</span>
          </li>
        ))}
      </ul>
      <a href={`https://wa.me/6281234567890?text=Halo, saya tertarik paket ${encodeURIComponent(variant.name)} UI/UX Figma`}
        target="_blank" rel="noopener noreferrer"
        className={clsx("flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-bold transition-all duration-200",
          variant.recommended ? "btn-primary" : "btn-secondary")}>
        Pilih Paket <ArrowRight size={14} />
      </a>
    </div>
  );
}

export default function UIUXSection() {
  const [activeTab, setActiveTab] = useState<"uiux" | "website">("uiux");
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
      });
      gsap.from(".pricing-card", {
        opacity: 0, y: 50, scale: 0.95, stagger: 0.12, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: cardsRef.current, start: "top 80%" },
      });
      gsap.to(".pricing-glow", {
        y: -40,
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 2 },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleTabChange = (tab: "uiux" | "website") => {
    if (tab === activeTab) return;
    if (cardsRef.current) {
      gsap.to(cardsRef.current, {
        opacity: 0, y: 10, duration: 0.2,
        onComplete: () => {
          setActiveTab(tab);
          gsap.to(cardsRef.current, { opacity: 1, y: 0, duration: 0.35 });
        },
      });
    }
  };

  return (
    <section ref={sectionRef} id="pricing" className="py-24 md:py-32 relative overflow-hidden">
      <div className="pricing-glow absolute -left-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.06] blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #60A5FA, transparent 70%)" }} />
      <div className="pricing-glow absolute -right-20 top-1/3 w-[400px] h-[400px] rounded-full opacity-[0.05] blur-[80px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #F2C94C, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div ref={headingRef} className="text-center mb-14">
          <span className="section-tag mb-4 inline-flex"><Layers size={12} />Paket Harga Lengkap</span>
          <h2 className="font-syne font-extrabold text-3xl md:text-4xl lg:text-5xl text-white mt-4 mb-4 leading-tight">
            Harga Transparan,<br /><span className="text-highlight">Kualitas Tak Diragukan</span>
          </h2>
          <p className="text-[#6666A0] text-sm max-w-md mx-auto leading-relaxed">
            Pilih paket yang sesuai dengan kebutuhan dan anggaran Anda. Semua harga sudah termasuk revisi.
          </p>
        </div>

        {/* Tab */}
        <div className="flex justify-center mb-10">
          <div className="bg-[#111128] border border-white/[0.06] rounded-xl p-1 flex gap-1">
            {([["uiux", "✏️ UI/UX Figma", "#60A5FA"], ["website", "🏢 Company Profile", "#4F9EFF"]] as const).map(([tab, label, color]) => (
              <button key={tab} onClick={() => handleTabChange(tab)}
                className={clsx("px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-250",
                  activeTab === tab ? "text-white shadow-lg" : "text-[#7070A0] hover:text-white")}
                style={activeTab === tab ? { background: color } : {}}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div ref={cardsRef}>
          {activeTab === "uiux" && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                <div className="bg-[#111128] border border-white/[0.05] rounded-2xl p-5 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#60A5FA]/10 flex items-center justify-center flex-shrink-0">
                    <Layers size={16} className="text-[#60A5FA]" />
                  </div>
                  <div>
                    <h4 className="font-syne font-bold text-white text-sm mb-1">Design Only</h4>
                    <p className="text-xs text-[#6666A0] leading-relaxed">
                      Cocok untuk Anda yang butuh tampilan visual saja — siap diserahkan ke developer.
                    </p>
                  </div>
                </div>
                <div className="bg-[#1C1C38] border border-[#F2C94C]/20 rounded-2xl p-5 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F2C94C]/10 flex items-center justify-center flex-shrink-0">
                    <Zap size={16} className="text-[#F2C94C]" />
                  </div>
                  <div>
                    <h4 className="font-syne font-bold text-white text-sm mb-1">Design + Prototype ⭐</h4>
                    <p className="text-xs text-[#7070A0] leading-relaxed">
                      Prototype interaktif — cocok untuk presentasi investor atau uji user experience.
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto">
                {figmaService.variants?.map((variant, i) => (
                  <PricingCard key={i} variant={variant} accentColor={figmaService.accentColor} />
                ))}
              </div>
            </div>
          )}

          {activeTab === "website" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cpService.variants?.map((variant, i) => (
                <div key={i} className={clsx(
                  "relative rounded-2xl p-5 flex flex-col pricing-card",
                  variant.recommended ? "pricing-recommended" : "bg-[#111128] border border-white/[0.06]"
                )}>
                  {variant.recommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <div className="bg-gradient-to-r from-[#4F9EFF] to-[#60A5FA] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                        {variant.badge}
                      </div>
                    </div>
                  )}
                  <h4 className="font-syne font-bold text-white mb-1 mt-1">{variant.name}</h4>
                  <p className="font-syne font-extrabold text-xl mb-4" style={{ color: variant.recommended ? "#4F9EFF" : "white" }}>
                    {variant.price}
                  </p>
                  <ul className="space-y-2 flex-1 mb-4">
                    {variant.features.map((feat, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs text-[#7070A0]">
                        <Check size={11} className="text-[#4F9EFF]" />{feat}
                      </li>
                    ))}
                  </ul>
                  <a href={`https://wa.me/6281234567890?text=Halo, saya tertarik paket ${encodeURIComponent(variant.name)} Company Profile`}
                    target="_blank" rel="noopener noreferrer"
                    className={clsx("text-center py-2.5 rounded-xl text-xs font-bold transition-all",
                      variant.recommended ? "bg-[#4F9EFF] text-white hover:bg-[#60A5FA]" : "btn-secondary")}>
                    Pilih Paket
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-10 text-center">
          <p className="text-xs text-[#4A4A70]">
            * Harga dapat berubah tergantung kompleksitas.{" "}
            <a href="https://wa.me/6281234567890" className="text-[#F2C94C] hover:underline">Konsultasi gratis</a> untuk estimasi akurat.
          </p>
        </div>
      </div>
    </section>
  );
}