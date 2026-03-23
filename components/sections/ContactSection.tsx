"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, MessageCircle, Clock, CheckCircle, ChevronDown, ShieldCheck } from "lucide-react";
import { services } from "@/lib/service-data";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", service: "", message: "" });
  const [focus, setFocus] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      gsap.from(infoRef.current, {
        opacity: 0, y: 40, duration: 0.8, ease: "power3.out", delay: 0.2,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
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
    <section id="kontak" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-gradient-radial from-[#00F0FF]/15 to-transparent blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10 w-full">
        <div className="text-center mb-16">
          <span className="section-tag mb-4"><MessageCircle size={14} /> Hubungi Kami</span>
          <h2 className="font-syne font-extrabold text-4xl md:text-5xl lg:text-6xl text-white mt-4 mb-6 tracking-tight">
            Siap Memulai <span className="text-gradient-purple">Proyek Anda?</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Punya ide brilian? Mari diskusikan. Kami akan merespons dalam sekejap. Konsultasi 100% Gratis.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start max-w-6xl mx-auto">
          {/* Form */}
          <div ref={formRef} className="lg:col-span-3">
            <div className="glass-card rounded-[2rem] p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00F0FF] to-[#7000FF]" />
              
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-20 gap-5 text-center h-full">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00F0FF]/20 to-[#7000FF]/20 border border-[#00F0FF]/30 flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.3)]">
                    <CheckCircle size={40} className="text-[#00F0FF]" />
                  </div>
                  <h3 className="font-syne font-bold text-white text-3xl">Pesan Terkirim!</h3>
                  <p className="text-gray-400 text-lg max-w-sm">Mohon sediakan aplikasi WhatsApp Anda. Kami segera menjawab!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Input */}
                  <div className={`relative transition-all duration-300 rounded-xl ${focus === 'name' ? 'shadow-[0_0_20px_rgba(0,240,255,0.2)]' : ''}`}>
                    <label className="block text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-widest pl-1">Nama Anda</label>
                    <input 
                      type="text" required placeholder="Contoh: Budi Santoso" 
                      className="w-full bg-[#030308]/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#00F0FF] transition-colors"
                      value={formData.name} 
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                      onFocus={() => setFocus('name')} onBlur={() => setFocus(null)}
                    />
                  </div>
                  
                  {/* Service Input */}
                  <div className={`relative transition-all duration-300 rounded-xl ${focus === 'service' ? 'shadow-[0_0_20px_rgba(112,0,255,0.2)]' : ''}`}>
                    <label className="block text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-widest pl-1">Layanan</label>
                    <div className="relative">
                      <select 
                        required 
                        className="w-full bg-[#030308]/50 border border-white/10 rounded-xl px-5 py-4 text-white appearance-none cursor-pointer pr-12 focus:outline-none focus:border-[#7000FF] transition-colors"
                        value={formData.service} 
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        onFocus={() => setFocus('service')} onBlur={() => setFocus(null)}
                      >
                        <option value="" disabled className="bg-[#030308] text-gray-500">Pilih layanan incaran Anda...</option>
                        {services.map((s) => <option key={s.id} value={s.title} className="bg-[#030308]">{s.title}</option>)}
                        <option value="Lainnya" className="bg-[#030308]">Lainnya / Custom Request</option>
                      </select>
                      <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  
                  {/* Message Input */}
                  <div className={`relative transition-all duration-300 rounded-xl ${focus === 'message' ? 'shadow-[0_0_20px_rgba(242,201,76,0.2)]' : ''}`}>
                    <label className="block text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-widest pl-1">Detail Kebutuhan</label>
                    <textarea 
                      required rows={5} placeholder="Jelaskan secara singkat apa yang Anda butuhkan..."
                      className="w-full bg-[#030308]/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#F2C94C] transition-colors resize-none"
                      value={formData.message} 
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })} 
                      onFocus={() => setFocus('message')} onBlur={() => setFocus(null)}
                    />
                  </div>

                  <button type="submit" className="btn-premium w-full !py-4 text-lg">
                    <MessageCircle size={20} /> Kirim Pesan via WhatsApp <Send size={18} className="ml-1" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Info Panels */}
          <div ref={infoRef} className="lg:col-span-2 space-y-5">
            <div className="glass-card rounded-3xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00F0FF]/20 to-transparent border border-[#00F0FF]/30 flex items-center justify-center">
                  <Clock size={24} className="text-[#00F0FF]" />
                </div>
              </div>
              <h4 className="font-syne font-bold text-white text-xl mb-2">Respon Sangat Cepat</h4>
              <p className="text-gray-400 leading-relaxed">
                Manajer proyek kami akan menjawab pertanyaan Anda kurang dari <span className="text-white font-bold">1 Jam</span> pada waktu operasional s(08.00–21.00 WIB).
              </p>
            </div>

            <div className="glass-card rounded-3xl p-6 glow-border-cyan group border-transparent">
              <h4 className="font-syne font-bold text-white text-lg mb-4">Chat Langsung WhatsApp</h4>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 bg-[#25D366]/10 border border-[#25D366]/20 rounded-2xl px-5 py-4 hover:bg-[#25D366]/20 hover:border-[#25D366]/40 transition-all duration-300"
              >
                <div className="bg-[#25D366] text-[#030308] p-2 rounded-full">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[#25D366] font-bold tracking-wide">+62 812-3456-7890</p>
                  <p className="text-gray-400 text-sm">Online & Siap Membantu</p>
                </div>
              </a>
            </div>

            <div className="glass-card rounded-3xl p-6 bg-gradient-to-br from-[#030308] to-white/[0.02] border-[#F2C94C]/20">
              <div className="flex items-center gap-3 mb-5">
                <ShieldCheck size={24} className="text-[#F2C94C]" />
                <h4 className="font-syne font-bold text-white text-lg">Garansi Premium</h4>
              </div>
              <ul className="space-y-3">
                {["Revisi ekstra detail sesuai paket", "Refund DP jika konsep tidak cocok", "Jaminan tepat waktu 100%", "Semua aset digital 100% hak klien"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#F2C94C] shadow-[0_0_8px_#F2C94C] flex-shrink-0" />
                    <span>{item}</span>
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