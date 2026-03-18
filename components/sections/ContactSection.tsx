"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, MessageCircle, Clock, CheckCircle, ChevronDown } from "lucide-react";
import { services } from "@/lib/services-data";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", service: "", message: "" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        opacity: 0, x: -40, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      gsap.from(infoRef.current, {
        opacity: 0, x: 40, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      gsap.from(".contact-info-item", {
        opacity: 0, y: 20, stagger: 0.1, duration: 0.5, ease: "power2.out",
        scrollTrigger: { trigger: infoRef.current, start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Halo NexStudio! 👋\n\nNama: ${formData.name}\nLayanan: ${formData.service}\nPesan: ${formData.message}`;
    window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(msg)}`, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="kontak" ref={sectionRef} className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-50 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-5 md:px-8 relative">
        <div className="text-center mb-14">
          <span className="section-tag mb-4 inline-flex"><MessageCircle size={12} />Hubungi Kami</span>
          <h2 className="font-syne font-extrabold text-3xl md:text-4xl lg:text-5xl text-white mt-4 mb-4">
            Siap Memulai<br /><span className="text-highlight">Proyek Anda?</span>
          </h2>
          <p className="text-[#6666A0] text-sm max-w-sm mx-auto">
            Ceritakan kebutuhan Anda dan kami akan merespons dalam kurang dari 1 jam.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start max-w-5xl mx-auto">
          {/* Form */}
          <div ref={formRef} className="lg:col-span-3">
            <div className="bg-[#111128] border border-white/[0.06] rounded-2xl p-6 md:p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                    <CheckCircle size={32} className="text-green-400" />
                  </div>
                  <h3 className="font-syne font-bold text-white text-xl">Pesan Terkirim!</h3>
                  <p className="text-[#6666A0] text-sm max-w-xs">Anda akan diarahkan ke WhatsApp. Kami segera merespons.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#7070A0] mb-2 uppercase tracking-wider">Nama Anda</label>
                    <input type="text" required placeholder="Contoh: Budi Santoso" className="form-input"
                      value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#7070A0] mb-2 uppercase tracking-wider">Layanan yang Diinginkan</label>
                    <div className="relative">
                      <select required className="form-input appearance-none cursor-pointer pr-10"
                        value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })}>
                        <option value="" disabled>Pilih layanan...</option>
                        {services.map((s) => <option key={s.id} value={s.title} className="bg-[#111128]">{s.title}</option>)}
                        <option value="Lainnya" className="bg-[#111128]">Lainnya / Custom</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4A4A70] pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#7070A0] mb-2 uppercase tracking-wider">Ceritakan Kebutuhan Anda</label>
                    <textarea required rows={4} placeholder="Jelaskan kebutuhan atau pertanyaan Anda di sini..."
                      className="form-input resize-none"
                      value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center">
                    <MessageCircle size={16} />Kirim via WhatsApp<Send size={14} />
                  </button>
                  <p className="text-center text-xs text-[#4A4A70]">Formulir ini akan membuka WhatsApp. Konsultasi 100% gratis.</p>
                </form>
              )}
            </div>
          </div>

          {/* Info */}
          <div ref={infoRef} className="lg:col-span-2 space-y-4">
            <div className="contact-info-item bg-[#111128] border border-white/[0.06] rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#F2C94C]/10 flex items-center justify-center">
                  <Clock size={16} className="text-[#F2C94C]" />
                </div>
                <h4 className="font-syne font-bold text-white text-sm">Respon Cepat</h4>
              </div>
              <p className="text-xs text-[#6666A0] leading-relaxed">
                Kami merespons dalam <span className="text-white font-semibold">kurang dari 1 jam</span> di jam kerja (08.00–21.00 WIB).
              </p>
            </div>

            <div className="contact-info-item bg-[#111128] border border-white/[0.06] rounded-2xl p-5">
              <h4 className="font-syne font-bold text-white text-sm mb-1">Langsung via WhatsApp</h4>
              <p className="text-xs text-[#6666A0] mb-4">Lebih suka chat langsung? Hubungi kami di:</p>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 hover:bg-green-500/15 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <div>
                  <p className="text-green-400 font-semibold text-sm">+62 812-3456-7890</p>
                  <p className="text-[#4A4A70] text-xs">Chat langsung</p>
                </div>
              </a>
            </div>

            <div className="contact-info-item bg-[#1C1C38] border border-[#F2C94C]/15 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🛡️</span>
                <h4 className="font-syne font-bold text-white text-sm">Garansi Kepuasan</h4>
              </div>
              <ul className="space-y-2">
                {["Revisi gratis sesuai paket", "DP dikembalikan jika tidak cocok", "Pengerjaan tepat waktu", "File milik Anda sepenuhnya"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-[#8888A8]">
                    <CheckCircle size={11} className="text-[#F2C94C] flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}