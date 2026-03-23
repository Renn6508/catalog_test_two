import { Heart } from "lucide-react";

const footerLinks = {
  Layanan: [
    { label: "Website Company Profile", href: "#layanan" },
    { label: "Undangan Digital", href: "#layanan" },
    { label: "Joki Tugas Kodingan", href: "#layanan" },
    { label: "Flowchart Flowgorithm", href: "#layanan" },
    { label: "UI/UX Design Figma", href: "#layanan" },
  ],
  Info: [
    { label: "Tentang Kami", href: "#" },
    { label: "Proses Kerja", href: "#proses" },
    { label: "Testimoni", href: "#testimoni" },
    { label: "Kontak", href: "#kontak" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-[#0B0B0F] pt-20 overflow-hidden border-t border-white/[0.04]">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#E8A838]/30 to-transparent" />

      {/* Background orb */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] bg-[#E8A838]/[0.02] blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-5 md:px-8 pb-10 relative z-10 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-[#E8A838] to-[#F0D078] flex items-center justify-center shadow-[0_4px_12px_rgba(232,168,56,0.3)]">
                <span className="text-[#0B0B0F] font-syne font-black text-sm">N</span>
              </div>
              <span className="font-syne font-bold text-xl text-white tracking-tight">
                Nex<span className="text-highlight">Studio</span>
              </span>
            </div>
            <p className="text-gray-500 leading-relaxed max-w-sm mb-8 text-sm">
              Agensi Spesialis Web & Desain Premium. Kami mengubah ide brilian Anda menjadi mahakarya digital yang memukau dan fungsional.
            </p>
            <div className="flex items-center gap-4">
              {[
                { href: "https://wa.me/6281234567890", svg: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/> },
              ].map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer"
                  className="w-11 h-11 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center hover:bg-[#25D366]/10 hover:border-[#25D366]/30 hover:scale-105 transition-all duration-300 group">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-gray-500 group-hover:text-[#25D366] transition-colors">{social.svg}</svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h5 className="font-syne font-bold text-white text-base mb-6">{title}</h5>
              <ul className="space-y-3.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm font-medium text-gray-600 hover:text-[#E8A838] hover:translate-x-1 inline-block transition-all duration-300">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-600 font-medium">
          <p>© 2025 NexStudio. Premium Digital Agency.</p>
          <p className="flex items-center gap-2">
            Engineered with <Heart size={14} fill="#E8A838" className="text-[#E8A838]" /> in Indonesia
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#E8A838] transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-[#E8A838] transition-colors duration-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}