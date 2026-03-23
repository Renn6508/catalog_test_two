import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServiceSection";
import UIUXSection from "@/components/sections/UIUIXSection";
import ProcessSection from "@/components/sections/ProcessSection";
import TestimonialsSection from "@/components/sections/TestimonialSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";
import WAFloatButton from "@/components/WAFloatButton";

export default function Home() {
  return (
    <main className="relative bg-[#0B0B0F] min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <UIUXSection />
      <ProcessSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <WAFloatButton />
    </main>
  );
}