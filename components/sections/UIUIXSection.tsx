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
      "pricing-card opacity-0 rounded-3xl p-8 relative flex flex-col h-full transform transition-all duration-500 hover:-translate-y-2",
      plan.recommended 
        ? "glow-border-cyan bg-[#030308] border border-transparent shadow-[0_20px_50px_rgba(0,240,255,0.15)]" 
        : "glass-card"
    )}>
      {/* Background glow for recommended */}
      {plan.recommended && (
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-[#7000FF]/20 to-transparent blur-3xl rounded-full pointer-events-none" />
      )}

      {plan.recommended && (
        <div className="absolute -top-[1.2px] left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-[#00F0FF] to-[#7000FF] rounded-b-xl z-20 shadow-[0_5px_15px_rgba(0,240,255,0.4)]">
          <span className="text-[10px] uppercase tracking-widest font-black text-white flex items-center gap-1">
            <Star size={10} fill="currentColor" /> Paling Diminati
          </span>
        </div>
      )}

      <div className="relative z-10 flex-1">
        <h3 className="font-syne font-bold text-2xl text-white mb-2">{plan.title}</h3>
        <p className="text-sm font-medium text-gray-400 mb-6 min-h-[40px] leading-relaxed">{plan.desc}</p>
        
        <div className="mb-8 flex items-end gap-1">
          <span className={clsx("font-syne font-extrabold text-4xl tracking-tight", plan.recommended ? "text-highlight" : "text-white")}>
            {plan.price}
          </span>
          {plan.price !== "Custom" && plan.price !== "Kontak Kami" && (
             <span className="text-sm text-gray-500 mb-1">/ mulai</span>
          )}
        </div>

        <ul className="space-y-4 mb-8">
          {plan.features.map((item: string, i: number) => (
            <li key={i} className="flex flex-start gap-3 items-start">
              <div className={clsx("w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm", plan.recommended ? "bg-[#00F0FF]/20 text-[#00F0FF]" : "bg-white/10 text-white")}>
                <Check size={12} strokeWidth={3} />
              </div>
              <span className={clsx("text-sm", plan.recommended ? "text-gray-200" : "text-gray-400")}>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" 
        className={clsx(
          "w-full py-3.5 rounded-xl text-center text-sm font-bold relative z-10 transition-all",
          plan.recommended ? "btn-premium" : "btn-glass"
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
      // Initial Load
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
    <section ref={sectionRef} className="py-24 md:py-32 relative bg-[#030308] border-t border-white/5">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-5 md:px-8 relative">
        <div className="pricing-header text-center mb-16">
          <span className="section-tag mb-4"><Zap size={14} /> Transparan & Kompetitif</span>
          <h2 className="font-syne font-extrabold text-4xl md:text-5xl lg:text-6xl text-white mt-4 mb-6 tracking-tight">
            Paket <span className="text-gradient-cyan">Harga Spesial</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Dapatkan solusi premium dengan harga terjangkau. Tidak ada biaya tersembunyi.
          </p>

          {/* Premium Tab Switcher */}
          <div className="inline-flex items-center p-1.5 bg-white/[0.03] border border-white/10 rounded-2xl backdrop-blur-md mt-10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            <button
              onClick={() => handleTabChange("UIUX")}
              className={clsx(
                "flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300",
                activeTab === "UIUX" 
                  ? "bg-[#030308] text-white shadow-[0_5px_15px_rgba(0,0,0,0.3)] border border-white/10" 
                  : "text-gray-500 hover:text-white"
              )}
            >
              <MonitorSmartphone size={16} className={activeTab === "UIUX" ? "text-[#00F0FF]" : ""} /> UI/UX Design
            </button>
            <button
              onClick={() => handleTabChange("Website")}
              className={clsx(
                "flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300",
                activeTab === "Website" 
                  ? "bg-[#030308] text-white shadow-[0_5px_15px_rgba(0,0,0,0.3)] border border-white/10" 
                  : "text-gray-500 hover:text-white"
              )}
            >
              <LayoutTemplate size={16} className={activeTab === "Website" ? "text-[#7000FF]" : ""} /> Website Dev
            </button>
          </div>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans[activeTab].map((plan, i) => (
            <PricingCard key={i} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}