'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { B } from '@/lib/brand';

const NAV_LINKS = [
  { label: 'Accueil', href: '#' },
  { label: 'Avantages', href: '#benefits' },
  { label: 'Comment ça marche', href: '#how' },
  { label: 'Gains', href: '#earnings' },
  { label: 'Réseau', href: '#network' },
  { label: 'Témoignages', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
];

export function Navbar() {
  const [mobileNav, setMobileNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-black/[0.03]' : 'bg-transparent'
      }`}
    >
      <div className="relative mx-auto flex h-[72px] w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <motion.a href="#" className="flex items-center gap-2" whileHover={{ scale: 1.03 }}>
          <Image src="/ASAP_ICON.png" alt="ASAP Medoc" width={36} height={36} className="rounded-lg" />
          <span className={`font-bold text-lg transition-colors duration-300 ${scrolled ? 'text-gray-900' : 'text-white'}`}>
            ASAP Medoc
          </span>
        </motion.a>

        <div className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
          <div className={`flex items-center gap-1 rounded-full border p-1 backdrop-blur-xl transition-colors duration-300 ${
            scrolled ? 'border-gray-200 bg-white/80 shadow-sm' : 'border-white/20 bg-white/[0.1]'
          }`}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-colors ${
                  scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white/90 hover:bg-white/10'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <motion.a
          href="#join-form"
          whileHover={{ scale: 1.04, boxShadow: '0 8px 30px rgba(255,59,48,0.35)' }}
          whileTap={{ scale: 0.97 }}
          className="hidden h-10 items-center overflow-hidden rounded-full bg-[#ff3b30] text-sm font-semibold text-white lg:inline-flex"
        >
          <span className="px-5">Devenir livreur</span>
          <span className="flex h-full items-center border-l border-white/25 px-3">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </motion.a>

        <button
          className="lg:hidden p-2 rounded-lg text-white"
          aria-label={mobileNav ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setMobileNav(!mobileNav)}
        >
          <AnimatePresence mode="wait">
            {mobileNav ? (
              <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X className={scrolled ? 'text-gray-900' : 'text-white'} />
              </motion.div>
            ) : (
              <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu className={scrolled ? 'text-gray-900' : 'text-white'} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {mobileNav && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-3">
              {NAV_LINKS.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileNav(false)}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="block text-sm text-gray-700 font-medium hover:text-[#ff3b30] transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href="#join-form"
                onClick={() => setMobileNav(false)}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="block w-full text-center rounded-full py-2.5 text-sm font-semibold text-white shadow-md shadow-[#ff3b30]/30"
                style={{ background: B.primary }}
              >
                Devenir livreur
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
