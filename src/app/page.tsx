'use client';

import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { Marquee } from '@/components/ui';
import { Stats } from '@/components/stats';
import { AppShowcase } from '@/components/app-showcase';
import { Earnings } from '@/components/earnings';
import { PharmacyMap } from '@/components/pharmacy-map';
import { Benefits } from '@/components/benefits';
import { HowItWorks } from '@/components/how-it-works';
import { Requirements } from '@/components/requirements';
import { Testimonials } from '@/components/testimonials';
import { Faq } from '@/components/faq';
import { JoinForm } from '@/components/join-form';
import { BentoGrid } from '@/components/bento-grid';
import { CtaBanner } from '@/components/cta-banner';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Navbar />
      <Hero />
      <Marquee />

      {/* ═══ Ruled wrapper ═══ */}
      <div className="relative">
        {/* Left stripe margin */}
        <div className="absolute top-0 bottom-0 left-0 w-6 sm:w-10 md:w-16 lg:w-24 xl:w-32 pointer-events-none overflow-hidden z-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 5px, #d1d5db 5px, #d1d5db 6px)', opacity: 0.4 }} />
        </div>
        {/* Right stripe margin */}
        <div className="absolute top-0 bottom-0 right-0 w-6 sm:w-10 md:w-16 lg:w-24 xl:w-32 pointer-events-none overflow-hidden z-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 5px, #d1d5db 5px, #d1d5db 6px)', opacity: 0.4 }} />
        </div>
        <div className="absolute top-0 bottom-0 left-6 sm:left-10 md:left-16 lg:left-24 xl:left-32 w-px bg-gray-300 z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-6 sm:right-10 md:right-16 lg:right-24 xl:right-32 w-px bg-gray-300 z-20 pointer-events-none" />

        <Stats />
        <div className="h-px bg-gray-200" />
        <BentoGrid />
        <div className="h-px bg-gray-200" />
        <AppShowcase />
        <div className="h-px bg-gray-200" />
        <Earnings />
        <div className="h-px bg-gray-200" />
        <PharmacyMap />
        <div className="h-px bg-gray-200" />
        <Benefits />
        <div className="h-px bg-gray-200" />
        <HowItWorks />
        <div className="h-px bg-gray-200" />
        <Requirements />
        <div className="h-px bg-gray-200" />
        <Testimonials />
        <div className="h-px bg-gray-200" />
        <Faq />
        <div className="h-px bg-gray-200" />
        <JoinForm />
      </div>
      {/* ═══ End ruled wrapper ═══ */}

      <CtaBanner />
      <Footer />
    </div>
  );
}
