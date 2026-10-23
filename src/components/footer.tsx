'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { B } from '@/lib/brand';

// Official brand SVGs
const LinkedInIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const FacebookIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const TwitterXIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const WhatsAppIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.27-2.42 5.82a8.17 8.17 0 0 1-5.82 2.42c-1.46 0-2.9-.39-4.16-1.14l-.3-.18-3.1 1.02.83-3.02-.2-.31a8.18 8.18 0 0 1-1.27-4.37c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.53.61.2 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29" />
  </svg>
);

const socialLinks = [
  {
    name: 'Instagram',
    link: 'https://www.instagram.com/asapmedoc',
    Icon: InstagramIcon,
    color: 'hover:text-[#E4405F]',
    tooltipBg: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]',
  },
  {
    name: 'Twitter (X)',
    link: 'https://x.com/asapmedoc',
    Icon: TwitterXIcon,
    color: 'hover:text-white',
    tooltipBg: 'bg-black',
  },
  {
    name: 'WhatsApp',
    link: 'https://wa.me/237673474225',
    Icon: WhatsAppIcon,
    color: 'hover:text-[#25D366]',
    tooltipBg: 'bg-[#25D366]',
  },
];

export function Footer() {
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);

  return (
    <footer style={{ background: '#0a0a0a' }}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <div>
            <a href="/" className="inline-flex items-center gap-2">
              <Image src="/ASAP_ICON.png" alt="ASAP Medoc" width={28} height={28} className="rounded-md" />
              <span className="text-lg font-bold text-white">
                ASAP <span style={{ color: B.primary }}>Medoc</span>
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              Livraison rapide de médicaments au Cameroun. Paiement instantané, horaires flexibles, assurance incluse.
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h4 className="text-sm font-semibold text-white">Liens rapides</h4>
            <ul className="mt-4 space-y-3">
              {[
                { href: '#benefits', label: 'Avantages' },
                { href: '#how', label: 'Comment ça marche' },
                { href: '#earnings', label: 'Gains' },
                { href: '#network', label: 'Réseau' },
                { href: '#testimonials', label: 'Témoignages' },
                { href: '#faq', label: 'FAQ' },
                { href: '#join-form', label: 'Devenir livreur' },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-gray-400 transition hover:text-white">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Réseaux sociaux */}
          <div>
            <h4 className="text-sm font-semibold text-white">Suivez-nous</h4>
            <div className="mt-4 flex gap-3">
              {socialLinks.map((item, idx) => (
                <div key={item.name} className="relative">
                  <AnimatePresence>
                    {hoveredIcon === idx && (
                      <motion.div
                        initial={{ opacity: 0, y: 5, scale: 0.9 }}
                        animate={{ opacity: 1, y: -38, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.9 }}
                        className={`absolute left-1/2 -translate-x-1/2 px-2.5 py-1 ${item.tooltipBg} text-white text-[11px] font-bold rounded-lg shadow-2xl whitespace-nowrap z-20 pointer-events-none`}
                      >
                        {item.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    onMouseEnter={() => setHoveredIcon(idx)}
                    onMouseLeave={() => setHoveredIcon(null)}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-300 ${item.color} transition-all duration-300 hover:scale-110 hover:border-white/20`}
                  >
                    <item.Icon className="h-4 w-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-gray-400">
              <li>Douala, Cameroun</li>
              <li>contact@asapmedoc.com</li>
              <li>
                <a href="tel:+237673474225" className="hover:text-white transition-colors">
                  +237 6 73 47 42 25
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 sm:flex-row">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} ASAP Medoc. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-500 transition hover:text-gray-300">Confidentialité</a>
            <a href="#" className="text-sm text-gray-500 transition hover:text-gray-300">Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
