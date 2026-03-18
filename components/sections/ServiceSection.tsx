"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Clock, Check } from "lucide-react";
import { services, type ServiceItem } from "@/lib/services-data";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

type Category = "Semua" | "Website" | "Akademik" | "Desain";
const categories: Category[] = ["Semua", "Website", "Akademik", "Desain"];

function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0, y: 50, duration: 0.6, delay: index * 0.07, ease: "power3.out",
        scrollTrigger: { trigger: cardRef.current, start: "top 88%", toggleActions: "play none none reverse" },
      });
    });
    return () => ctx.revert();
  }, [index]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    e.currentTarget.style.setProperty("--mouse-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  return (
    <div ref={cardRef} className="service-card flex flex-col h-full group" onMouseMove={handleMouseMove}>
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-start justify-between mb-5">
          <div className="icon-box text-2xl" style={{ background: service.bgColor }}>{service.emoji}</div>
          <div className="flex items-center gap-2">
            {service.tag && (
              <span className={clsx(
                "text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full",
                service.tagStyle === "popular" && "badge-popular",
                service.tagStyle === "new" && "badge-new",
                service.tagStyle === "smk" && "bg-[#7BE495]/15 text-[#7BE495] border border-[#7BE495]/25"
              )}>{service.tag}</span>
            )}
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border"
              style={{ color: service.accentColor, background: service.bgColor, borderColor: `${service.accentColor}25` }}>
              {service.category}
            </span>
          </div>
        </div>

        <h3 className="font-syne font-bold text-lg text-white mb-1 leading-tight">{service.title}</h3>
        {service.subtitle && (
          <p className="text-xs font-medium mb-3" style={{ color: service.accentColor }}>{service.subtitle}</p>
        )}

        <p className="text-sm text-[#6666A0] leading-relaxed mb-5 flex-1">{service.description}</p>

        <ul className="space-y-2 mb-5">
          {service.features.slice(0, 4).map((feat, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-[#8888A8]">
              <Check size={13} className="text-[#F2C94C] flex-shrink-0" />{feat}
            </li>
          ))}
        </ul>

        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
          <div>
            <p className="text-[10px] text-[#4A4A70] uppercase tracking-wider mb-0.5">Mulai dari</p>
            <p className="font-syne font-bold text-white text-base">{service.priceFrom}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs text-[#4A4A70]">
              <Clock size={11} />{service.deliveryTime}
            </div>
            <a href={`https://wa.me/6281234567890?text=Halo, saya tertarik layanan ${encodeURIComponent(service.title)}`}
              target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:scale-110"
              style={{ background: service.bgColor, color: service.accentColor }}>
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("Semua");
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredServices = activeCategory === "Semua"
    ? services
    : services.filter((s) => s.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0, y: 40, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleCategoryChange = useCallback((cat: Category) => {
    if (cat === activeCategory) return;
    const cards = gridRef.current?.querySelectorAll(".service-card");
    if (cards) {
      gsap.to(cards, {
        opacity: 0, y: 15, duration: 0.2, stagger: 0.03, ease: "power2.in",
        onComplete: () => setActiveCategory(cat),
      });
    } else {
      setActiveCategory(cat);
    }
  }, [activeCategory]);

  useEffect(() => {
    if (!gridRef.current) return;
    gsap.fromTo(
      gridRef.current.querySelectorAll(".service-card"),
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: "power3.out" }
    );
  }, [activeCategory]);

  return (
    <section id="layanan" ref={sectionRef} className="py-24 md:py-32 relative">
      <div className="section-divider mb-0" />
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div ref={headingRef} className="mb-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="section-tag mb-4 inline-flex">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F2C94C]" />Katalog Layanan
              </span>
              <h2 className="font-syne font-extrabold text-3xl md:text-4xl lg:text-5xl text-white mt-4 leading-tight">
                Semua yang Anda<br /><span className="text-highlight">Butuhkan Ada di Sini</span>
              </h2>
            </div>
            <p className="text-[#6666A0] text-sm max-w-xs leading-relaxed">
              Dari website profesional hingga tugas akademik, kami siap membantu. Pilih layanan yang sesuai kebutuhan Anda.
            </p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mt-8">
            {categories.map((cat) => (
              <button key={cat} onClick={() => handleCategoryChange(cat)} className={clsx("category-pill", cat === activeCategory && "active")}>
                {cat === "Website" && "🌐"}{cat === "Akademik" && "📚"}{cat === "Desain" && "🎨"}{cat === "Semua" && "✦"}
                {cat}
                <span className="text-[10px] opacity-60">
                  ({cat === "Semua" ? services.length : services.filter((s) => s.category === cat).length})
                </span>
              </button>
            ))}
          </div>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredServices.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <p className="text-[#4A4A70] text-sm mb-4">
            Tidak menemukan yang dicari? Kami bisa buat layanan custom sesuai kebutuhan Anda.
          </p>
          <a href="https://wa.me/6281234567890?text=Halo, saya ingin tanya layanan custom"
            target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex">
            Tanya Layanan Custom <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}