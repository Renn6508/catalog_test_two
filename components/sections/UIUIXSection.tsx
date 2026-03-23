"use client";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Star, Zap, MonitorSmartphone, LayoutTemplate } from "lucide-react";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

const plans = {
  UIUX: [
    { title: "Basic", desc: "Desain UI dasar, 3-5 halaman web/mobile.", price: "Rp 200.000", features: ["1 Konsep desain", "Maks. 5 Halaman", "Figma File (View Only)", "1x Revisi minor", "Desktop ATAU Mobile"], recommended: false },
    { title: "Pro", desc: "Solusi lengkap untuk aplikasi profesional.", price: "Rp 400.000", features: ["2 Konsep desain", "Maks. 12 Halaman", "Figma File (Edit, Handoff)", "3x Revisi", "Prototyping Dasar", "Desktop DAN Mobile", "Design System Mini"], recommended: true },
    { title: "Enterpise", desc: "Desain UI/UX mendalam dan berskala besar.", price: "Custom", features: ["Unlimited Halaman", "Figma File (Full Access)", "Unlimited Revisi", "Prototyping Lanjut & UX Copy", "Design System Lengkap", "User Research & Testing"], recommended: false },
  ],
  Website: [
    { title: "Starter", desc: "Website landing page simpel yang cepat dan responsif.", price: "Rp 500.000", features: ["1 Halaman (Landing Page)", "Waktu Pengerjaan 3-5 Hari", "Desain template modern", "Responsive (Mobile & Desktop)", "SEO Dasar", "Tombol WhatsApp"], recommended: false },
    { title: "Scale", desc: "Website company profile profesional untuk kredibilitas.", price: "Rp 1.500.000", features: ["Hingga 5 Halaman", "Waktu Pengerjaan 7-10 Hari", "Desain Kustom (Custom UI)", "Cms / Admin Panel", "Optimasi SEO", "Domain & Hosting 1 Tahun", "Integrasi Analytics"], recommended: true },
    { title: "Custom", desc: "Sistem aplikasi web atau e-commerce kustom.", price: "Kontak Kami", features: ["Halaman Sesuai Kebutuhan", "Database Terstruktur", "Payment Gateway", "Dashboard Admin Canggih", "Full API Integration", "Maintenance 1 Bulan"], recommended: false },
  ],
};

function PricingCard({ plan }: { plan: any }) {
  return (
    <div className={clsx(
      "pricing-card opacity-0 rounded-2xl p-8 relative flex flex-col h-full transition-all duration-500",
      plan.recommended
        ? "bg-[#13131A] border-2 border-[#E8A838]/30 shadow-[0_8px_40px_rgba(232,168,56,0.08)] hover:-translate-y-2"
        : "glass-card hover:-translate-y-2"
    )}>
      {/* Recommended glow */}
      {plan.recommended && (
        <div className="absolute -top-20 right-0 w-40 h-40 bg-[#E8A838]/[0.06] blur-[80px] rounded-full pointer-events-none" />
      )}

      {plan.recommended && (
        <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 px-5 py-1.5 bg-gradient-to-r from-[#E8A838] to-[#F0D078] rounded-b-xl z-20">
          <span className="text-[10px] uppercase tracking-widest font-black text-[#0B0B0F] flex items-center gap-1">
            <Star size={10} fill="currentColor" /> Paling Diminati
          </span>
        </div>
      )}

      <div className="relative z-10 flex-1">
        <h3 className="font-syne font-bold text-2xl text-white mb-2">{plan.title}</h3>
        <p className="text-sm font-medium text-gray-500 mb-6 min-h-[40px] leading-relaxed">{plan.desc}</p>

        <div className="mb-8 flex items-end gap-1">
          <span className={clsx("font-syne font-extrabold text-4xl tracking-tight", plan.recommended ? "text-highlight" : "text-white")}>
            {plan.price}
          </span>
          {plan.price !== "Custom" && plan.price !== "Kontak Kami" && (
            <span className="text-sm text-gray-600 mb-1">/ mulai</span>
          )}
        </div>

        <ul className="space-y-3.5 mb-8">
          {plan.features.map((item: string, i: number) => (
            <li key={i} className="flex flex-start gap-3 items-start">
              <div className={clsx(
                "w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5",
                plan.recommended ? "bg-[#E8A838]/15 text-[#E8A838]" : "bg-white/[0.06] text-gray-400"
              )}>
                <Check size={12} strokeWidth={3} />
              </div>
              <span className={clsx("text-sm", plan.recommended ? "text-gray-300" : "text-gray-500")}>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
        className={clsx(
          "w-full py-3.5 rounded-xl text-center text-sm font-bold relative z-10 transition-all",
          plan.recommended ? "btn-primary" : "btn-outline"
        )}
      >
        Pilih Paket
      </a>
    </div>
  );
}

export default function UIUIXSection() {
  const [activeTab, setActiveTab] = useState<"UIUX" | "Website">("UIUX");
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".pricing-header", {
        opacity: 0, y: 30, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
      });
      gsap.to(".pricing-card", {
        opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "back.out(1.2)",
        scrollTrigger: { trigger: cardsRef.current, start: "top 85%" }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleTabChange = (tab: "UIUX" | "Website") => {
    if (tab === activeTab) return;
    gsap.to(".pricing-card", {
      opacity: 0, scale: 0.95, duration: 0.3, stagger: -0.05, ease: "power2.inOut",
      onComplete: () => {
        setActiveTab(tab);
        gsap.to(".pricing-card", { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.2)" });
      }
    });
  };

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative border-t border-white/[0.04]">
      <div className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 md:px-8 relative">
        <div className="pricing-header text-center mb-16">
          <span className="section-tag mb-4"><Zap size={14} /> Transparan & Kompetitif</span>
          <h2 className="font-syne font-extrabold text-4xl md:text-5xl lg:text-6xl text-white mt-4 mb-6 tracking-tight">
            Paket <span className="text-gradient-teal">Harga Spesial</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Dapatkan solusi premium dengan harga terjangkau. Tidak ada biaya tersembunyi.
          </p>

          {/* Tab Switcher */}
          <div className="inline-flex items-center p-1.5 bg-[#13131A] border border-white/[0.06] rounded-xl mt-10">
            <button
              onClick={() => handleTabChange("UIUX")}
              className={clsx(
                "flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all duration-300",
                activeTab === "UIUX"
                  ? "bg-gradient-to-r from-[#E8A838] to-[#F0D078] text-[#0B0B0F] shadow-[0_2px_12px_rgba(232,168,56,0.3)]"
                  : "text-gray-500 hover:text-white"
              )}
            >
              <MonitorSmartphone size={16} /> UI/UX Design
            </button>
            <button
              onClick={() => handleTabChange("Website")}
              className={clsx(
                "flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all duration-300",
                activeTab === "Website"
                  ? "bg-gradient-to-r from-[#E8A838] to-[#F0D078] text-[#0B0B0F] shadow-[0_2px_12px_rgba(232,168,56,0.3)]"
                  : "text-gray-500 hover:text-white"
              )}
            >
              <LayoutTemplate size={16} /> Website Dev
            </button>
          </div>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans[activeTab].map((plan, i) => (
            <PricingCard key={i} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}