export interface PricingVariant {
  name: string;
  price: string;
  priceNote?: string;
  features: string[];
  recommended?: boolean;
  badge?: string;
}

export interface ServiceItem {
  id: string;
  emoji: string;
  category: "Website" | "Akademik" | "Desain";
  categoryColor: string;
  title: string;
  subtitle?: string;
  description: string;
  priceFrom: string;
  priceTo: string;
  accentColor: string;
  bgColor: string;
  tag?: string;
  tagStyle?: "popular" | "new" | "smk";
  variants?: PricingVariant[];
  features: string[];
  deliveryTime: string;
}

export const services: ServiceItem[] = [
  {
    id: "company-profile",
    emoji: "🏢",
    category: "Website",
    categoryColor: "#4F9EFF",
    title: "Website Company Profile",
    subtitle: "Tampilan Profesional untuk Bisnis Anda",
    description:
      "Website company profile modern, responsive, dan SEO-friendly. Tampilkan identitas bisnis Anda secara profesional di dunia digital.",
    priceFrom: "Rp 500.000",
    priceTo: "Rp 2.500.000",
    accentColor: "#4F9EFF",
    bgColor: "rgba(79,158,255,0.08)",
    features: [
      "Responsive mobile-first",
      "Halaman Profil, Layanan, Kontak",
      "SEO dasar",
      "Formulir kontak",
      "Gratis revisi 2x",
    ],
    deliveryTime: "3–7 hari",
    variants: [
      {
        name: "Starter",
        price: "Rp 500.000",
        features: ["5 Halaman", "Design template", "Responsive", "Contact Form", "SEO Basic"],
      },
      {
        name: "Pro",
        price: "Rp 1.200.000",
        features: ["10 Halaman", "Custom Design", "CMS Blog", "Google Analytics", "SEO Lanjutan", "Revisi 3x"],
        recommended: true,
        badge: "Terlaris",
      },
      {
        name: "Premium",
        price: "Rp 2.500.000",
        features: ["Unlimited Halaman", "Full Custom Design", "Animasi Premium", "E-commerce Ready", "Domain .com 1 Tahun", "Support 3 Bulan"],
      },
    ],
  },
  {
    id: "undangan-digital",
    emoji: "💌",
    category: "Website",
    categoryColor: "#FF7BAC",
    title: "Website Undangan Digital",
    subtitle: "Pernikahan · Ulang Tahun · Acara Spesial",
    description:
      "Gantikan undangan kertas dengan website undangan interaktif yang elegan. Dilengkapi RSVP online, countdown timer, dan galeri foto.",
    priceFrom: "Rp 75.000",
    priceTo: "Rp 350.000",
    accentColor: "#FF7BAC",
    bgColor: "rgba(255,123,172,0.08)",
    tag: "Populer",
    tagStyle: "popular",
    features: [
      "Countdown timer otomatis",
      "RSVP online",
      "Galeri foto/video",
      "Peta lokasi",
      "Musik latar",
    ],
    deliveryTime: "1–3 hari",
  },
  {
    id: "ucapan-selamat",
    emoji: "🎉",
    category: "Website",
    categoryColor: "#FFB347",
    title: "Website Ucapan Selamat",
    subtitle: "Hadiah Digital yang Berkesan",
    description:
      "Buat momen spesial lebih bermakna dengan website ucapan personal. Cocok untuk wisuda, ulang tahun, perayaan lulus, dan momen berharga lainnya.",
    priceFrom: "Rp 50.000",
    priceTo: "Rp 200.000",
    accentColor: "#FFB347",
    bgColor: "rgba(255,179,71,0.08)",
    features: [
      "Animasi confetti/efek",
      "Foto & pesan personal",
      "Musik latar pilihan",
      "Link shareable",
      "Aktif 1 tahun",
    ],
    deliveryTime: "Sehari jadi",
  },
  {
    id: "website-portofolio",
    emoji: "🗂️",
    category: "Website",
    categoryColor: "#34D399",
    title: "Website Portofolio",
    subtitle: "Tampilkan Karya & Keahlian Anda",
    description:
      "Website portofolio profesional untuk freelancer, desainer, developer, dan kreator. Buat rekruter dan klien terkesan dari kesan pertama.",
    priceFrom: "Rp 300.000",
    priceTo: "Rp 800.000",
    accentColor: "#34D399",
    bgColor: "rgba(52,211,153,0.08)",
    features: [
      "Desain modern & minimalis",
      "Galeri proyek interaktif",
      "Animasi scroll halus",
      "Halaman about & contact",
      "Dark/light mode",
    ],
    deliveryTime: "3–5 hari",
  },
  {
    id: "toko-online",
    emoji: "🛒",
    category: "Website",
    categoryColor: "#FB923C",
    title: "Website Toko Online",
    subtitle: "Jual Lebih Banyak, Jangkau Lebih Luas",
    description:
      "Website e-commerce lengkap dengan manajemen produk, keranjang belanja, dan integrasi payment gateway untuk bisnis online Anda.",
    priceFrom: "Rp 750.000",
    priceTo: "Rp 3.000.000",
    accentColor: "#FB923C",
    bgColor: "rgba(251,146,60,0.08)",
    tag: "Baru",
    tagStyle: "new",
    features: [
      "Katalog produk lengkap",
      "Keranjang & checkout",
      "Payment gateway",
      "Dashboard admin",
      "Order management",
    ],
    deliveryTime: "7–14 hari",
  },
  {
    id: "joki-kodingan",
    emoji: "💻",
    category: "Akademik",
    categoryColor: "#7BE495",
    title: "Joki Tugas Kodingan",
    subtitle: "Khusus Siswa SMK Rekayasa Perangkat Lunak",
    description:
      "Solusi cepat dan tepat untuk tugas pemrograman SMK RPL. HTML/CSS, JavaScript, PHP, Laravel, Python, dan berbagai bahasa pemrograman lainnya.",
    priceFrom: "Rp 25.000",
    priceTo: "Rp 200.000",
    accentColor: "#7BE495",
    bgColor: "rgba(123,228,149,0.08)",
    tag: "SMK RPL",
    tagStyle: "smk",
    features: [
      "HTML/CSS/JS",
      "PHP & Laravel",
      "Python & Java",
      "Database MySQL",
      "Full project + dokumentasi",
    ],
    deliveryTime: "Sesuai deadline",
    variants: [
      {
        name: "Mini Task",
        price: "Rp 25.000",
        priceNote: "per tugas",
        features: ["HTML/CSS sederhana", "JavaScript dasar", "Waktu pengerjaan cepat"],
      },
      {
        name: "Standard",
        price: "Rp 75.000",
        priceNote: "per tugas",
        features: ["PHP / Laravel", "Python / Java", "CRUD Database", "Komentar kode"],
        recommended: true,
        badge: "Paling Dipilih",
      },
      {
        name: "Full Project",
        price: "Mulai Rp 150.000",
        priceNote: "negosiasi",
        features: ["Proyek UAS/PKL", "Dokumentasi lengkap", "Presentasi siap", "Revisi tak terbatas", "Support sampai selesai"],
      },
    ],
  },
  {
    id: "joki-flowchart",
    emoji: "📊",
    category: "Akademik",
    categoryColor: "#C084FC",
    title: "Joki Flowchart Flowgorithm",
    subtitle: "Algoritma & Pemrograman Visual",
    description:
      "Pembuatan flowchart dan algoritma menggunakan Flowgorithm untuk tugas sekolah maupun kuliah. Cepat, rapi, dan sesuai kaidah yang benar.",
    priceFrom: "Rp 15.000",
    priceTo: "Rp 75.000",
    accentColor: "#C084FC",
    bgColor: "rgba(192,132,252,0.08)",
    features: [
      "Flowgorithm (.fprg)",
      "Algoritma terstruktur",
      "Ekspor ke gambar/PDF",
      "Penjelasan alur",
      "Revisi 1x gratis",
    ],
    deliveryTime: "1–2 hari",
  },
  {
    id: "desain-layout",
    emoji: "🎨",
    category: "Desain",
    categoryColor: "#F97316",
    title: "Desain Layout Company Profile",
    subtitle: "Identitas Bisnis yang Memukau",
    description:
      "Desain layout company profile profesional untuk presentasi, cetak, atau digital. Tampilkan brand Anda dengan visual yang kuat dan konsisten.",
    priceFrom: "Rp 100.000",
    priceTo: "Rp 400.000",
    accentColor: "#F97316",
    bgColor: "rgba(249,115,22,0.08)",
    features: [
      "Format A4 / custom",
      "Desain print-ready",
      "File PSD/AI/PDF",
      "Warna brand sesuai",
      "Tipografi profesional",
    ],
    deliveryTime: "2–4 hari",
  },
  {
    id: "uiux-figma",
    emoji: "✏️",
    category: "Desain",
    categoryColor: "#60A5FA",
    title: "UI/UX Design Figma",
    subtitle: "Design Antarmuka Aplikasi Web & Mobile",
    description:
      "Desain UI/UX profesional menggunakan Figma. Dari wireframe hingga high-fidelity design yang siap handoff ke developer.",
    priceFrom: "Rp 200.000",
    priceTo: "Rp 1.500.000",
    accentColor: "#60A5FA",
    bgColor: "rgba(96,165,250,0.08)",
    tag: "Ada Prototype",
    tagStyle: "new",
    features: [
      "Wireframe & mockup",
      "Design system / components",
      "Mobile & Desktop view",
      "File Figma terorganisir",
      "Handoff ke developer",
    ],
    deliveryTime: "3–7 hari",
    variants: [
      {
        name: "Design Only",
        price: "Mulai Rp 200.000",
        features: [
          "Wireframe low/hi-fi",
          "High-fidelity Design",
          "Components Library",
          "Mobile & Desktop",
          "File Figma (.fig)",
          "2 Revisi",
        ],
      },
      {
        name: "Design + Prototype",
        price: "Mulai Rp 500.000",
        features: [
          "Semua fitur Design Only",
          "Interactive Prototype",
          "User Flow lengkap",
          "Animasi transisi halus",
          "Presentasi deck siap",
          "Usability testing guide",
          "Revisi tak terbatas",
        ],
        recommended: true,
        badge: "⭐ Rekomendasi",
      },
    ],
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Rizky Firmansyah",
    role: "Owner UMKM Batik",
    avatar: "RF",
    avatarBg: "#4F9EFF",
    text: "Website company profile-nya bagus banget! Tampilan profesional dan klien jadi lebih percaya sama bisnis saya.",
    rating: 5,
    service: "Company Profile",
  },
  {
    id: 2,
    name: "Dewi Anggraini",
    role: "Calon Pengantin",
    avatar: "DA",
    avatarBg: "#FF7BAC",
    text: "Undangan digitalnya keren, banyak tamu yang tanya bikin dimana. Lebih hemat dan berkesan daripada undangan biasa!",
    rating: 5,
    service: "Undangan Digital",
  },
  {
    id: 3,
    name: "Budi Santoso",
    role: "Siswa SMK RPL Kelas XII",
    avatar: "BS",
    avatarBg: "#7BE495",
    text: "Tugas Laravel-ku selesai tepat waktu dan dapet nilai bagus. Kodenya bersih dan ada penjelasannya, jadi paham juga.",
    rating: 5,
    service: "Joki Kodingan",
  },
  {
    id: 4,
    name: "Sari Indah",
    role: "Mahasiswa Teknik Informatika",
    avatar: "SI",
    avatarBg: "#C084FC",
    text: "Flowchartnya rapi dan sesuai standar dosen. Pengerjaannya cepat, semalam selesai. Highly recommended!",
    rating: 5,
    service: "Flowgorithm",
  },
  {
    id: 5,
    name: "Ahmad Zainal",
    role: "Founder Startup Lokal",
    avatar: "AZ",
    avatarBg: "#60A5FA",
    text: "UI/UX-nya clean dan modern banget. Prototype interaktifnya membantu banget waktu presentasi ke investor.",
    rating: 5,
    service: "UI/UX Figma",
  },
  {
    id: 6,
    name: "Lina Puspita",
    role: "Freelancer Desainer",
    avatar: "LP",
    avatarBg: "#F97316",
    text: "Company profile-nya hasil desainnya profesional banget, klien saya langsung suka. Proses revisinya juga enak.",
    rating: 5,
    service: "Desain Layout",
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Konsultasi",
    description: "Ceritakan kebutuhan Anda melalui WhatsApp. Kami akan diskusi scope, referensi, timeline, dan estimasi biaya.",
    icon: "💬",
    color: "#F2C94C",
  },
  {
    number: "02",
    title: "Kesepakatan & DP",
    description: "Setelah deal, lakukan pembayaran DP 50% untuk memulai pengerjaan proyek Anda.",
    icon: "🤝",
    color: "#60A5FA",
  },
  {
    number: "03",
    title: "Pengerjaan",
    description: "Tim kami mengerjakan proyek Anda dengan penuh dedikasi sesuai timeline yang disepakati. Update progress berkala.",
    icon: "⚙️",
    color: "#7BE495",
  },
  {
    number: "04",
    title: "Review & Revisi",
    description: "Kami kirimkan preview untuk di-review. Anda bisa request revisi sesuai paket yang dipilih hingga puas.",
    icon: "🔍",
    color: "#C084FC",
  },
  {
    number: "05",
    title: "Selesai & Pelunasan",
    description: "Setelah disetujui, lakukan pelunasan 50% dan kami serahkan semua file/akses ke tangan Anda.",
    icon: "🚀",
    color: "#FB923C",
  },
];

export const stats = [
  { value: 80, suffix: "+", label: "Proyek Selesai" },
  { value: 98, suffix: "%", label: "Klien Puas" },
  { value: 50, suffix: "+", label: "Klien Aktif" },
  { value: 2, suffix: " Thn", label: "Pengalaman" },
];