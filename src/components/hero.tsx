'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Star, Zap } from 'lucide-react';
import { STATS, STEPS } from '@/lib/brand';

export function Hero() {
  const [activeCardTab, setActiveCardTab] = useState<'network' | 'steps'>('network');
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 1.06]);
  const springY = useSpring(heroY, { stiffness: 100, damping: 30 });

  return (
    <section className="relative min-h-[100vh] overflow-hidden">
      <motion.div style={{ y: springY, scale: heroScale }} className="absolute inset-0 -top-16 -bottom-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/bg.png')" }}
        />
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,22,32,0.58)_0%,rgba(10,22,32,0.34)_38%,rgba(10,22,32,0.24)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_28%)]" />

      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative z-10 w-full px-4 sm:px-6 lg:px-10"
      >
        <div className="flex min-h-[100vh] items-end justify-between gap-8 pb-10 pt-28 lg:pt-24">
          <div className="max-w-[700px] text-white">
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5 inline-flex items-center rounded-full border border-white/15 bg-white/[0.08] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm"
            >
              Rejoignez les livreurs ASAP Medoc
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-[3rem] font-black leading-[0.94] tracking-[-0.06em] text-white sm:text-[4.4rem] lg:text-[6.2rem] xl:text-[7rem]"
            >
              Livrez des médicaments,
              <span className="mt-2 block text-white/95">gagnez à votre rythme.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a
                href="#join-form"
                className="inline-flex min-h-14 items-center gap-3 rounded-full bg-[#ff3b30] px-7 text-base font-semibold text-white shadow-lg shadow-[#ff3b30]/30 transition-colors hover:bg-[#e93228]"
              >
                Devenir livreur
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="#how"
                className="inline-flex min-h-14 items-center rounded-full border border-white/35 bg-white/[0.08] px-7 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/[0.16]"
              >
                Comment ça marche ?
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 26, y: 26 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="hidden w-full max-w-[420px] self-end lg:block"
          >
            <div className="rounded-[28px] bg-slate-950/55 p-5 shadow-[0_30px_80px_rgba(1,8,16,0.5)] backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white/10 p-1.5 shadow-sm">
                    <Image
                      src="/ASAP_ICON.png"
                      alt="ASAP Medoc"
                      width={32}
                      height={32}
                      className="h-full w-full object-contain rounded-xl"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">ASAP Medoc</p>
                    <p className="mt-0.5 text-xs text-white/55">Votre réseau de livraison</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ff7067]" /> Cameroun
                </span>
              </div>

              <div className="mb-4 flex gap-2 rounded-2xl bg-white/[0.08] p-1.5" role="tablist" aria-label="Aperçu de la plateforme">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeCardTab === 'network'}
                  onClick={() => setActiveCardTab('network')}
                  className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${activeCardTab === 'network' ? 'bg-[#f6b73c] text-slate-950' : 'text-white/75 hover:bg-white/10'}`}
                >
                  Réseau
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeCardTab === 'steps'}
                  onClick={() => setActiveCardTab('steps')}
                  className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${activeCardTab === 'steps' ? 'bg-[#f6b73c] text-slate-950' : 'text-white/75 hover:bg-white/10'}`}
                >
                  Votre parcours
                </button>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeCardTab}
                  role="tabpanel"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="min-h-[248px] rounded-[22px] bg-white/[0.06] p-4"
                >
                  {activeCardTab === 'network' ? (
                    <div className="grid h-full grid-cols-2 gap-3">
                      {STATS.map((stat) => {
                        const Icon = stat.icon;
                        return (
                          <div key={stat.label} className="rounded-2xl bg-white/[0.06] p-4">
                            <Icon className="mb-3 h-5 w-5 text-[#f6b73c]" />
                            <p className="text-2xl font-bold text-white">{stat.display}</p>
                            <p className="mt-1 text-xs leading-snug text-white/65">{stat.label}</p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex h-full flex-col justify-center gap-3">
                      {STEPS.map((step, index) => {
                        const Icon = step.icon;
                        return (
                          <div key={step.title} className="flex items-center gap-3 rounded-xl bg-white/[0.06] px-3 py-2.5">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ff3b30]/20 text-[#ff8c84]">
                              <Icon className="h-4 w-4" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-[10px] font-medium uppercase tracking-wider text-white/45">Étape {index + 1}</span>
                              <span className="block truncate text-sm font-semibold text-white">{step.title}</span>
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="text-xs text-white/60">Rejoignez le réseau de livreurs</span>
                <a href="#join-form" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#ff3b30] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#e93228]">
                  Candidater
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
