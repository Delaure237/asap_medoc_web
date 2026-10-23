'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, DollarSign } from 'lucide-react';
import { B, fadeUp, fadeLeft, fadeRight, stagger } from '@/lib/brand';
import { MagneticButton, TiltCard } from '@/components/ui';

function EarningsPhoneMockup() {
  return (
    <div className="relative aspect-[9/16] w-full max-w-[400px] overflow-hidden rounded-[2.5rem] shadow-2xl">
      <Image
        src="/gain.png"
        alt="Écran Gains de l’application ASAP Medoc"
        width={540}
        height={960}
        sizes="(min-width: 1024px) 400px, 85vw"
        className="h-full w-full object-contain"
      />
    </div>
  );
}

export function Earnings() {
  return (
    <section id="earnings" className="py-20 sm:py-28 relative overflow-hidden" style={{ background: B.light }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Text side */}
          <motion.div variants={fadeLeft}>
            <motion.span
              className="section-badge inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold mb-6"
              variants={fadeUp}
            >
              <DollarSign size={14} /> Revenus
            </motion.span>
            <h2 className="section-title mb-2">
              Gagnez jusqu&apos;à
            </h2>
            <div className="mb-4">
              <p className="text-5xl sm:text-6xl md:text-7xl font-semibold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                350 000
              </p>
              <strong className="text-2xl sm:text-3xl font-bold text-gray-500 ml-2">FCFA/mois</strong>
            </div>
            <p className="section-description mb-8">
              Nos meilleurs livreurs gagnent jusqu&apos;à 350&nbsp;000&nbsp;FCFA par mois en livrant à temps plein.
              Paiement instantané sur Mobile Money à la fin de chaque livraison.
            </p>
            <div className="grid grid-cols-4 divide-x divide-gray-200 mb-8">
              {[
                { value: '1 000+', label: 'FCFA / livraison' },
                { value: '+25%', label: 'Bonus weekend' },
                { value: '100%', label: 'Pourboires pour vous' },
                { value: 'Instant', label: 'Paiement par course' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  className="text-center px-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                >
                  <p className="text-xl sm:text-2xl font-semibold text-gray-900 tracking-tight">{item.value}</p>
                  <p className="text-[10px] sm:text-xs text-gray-400 mt-1">{item.label}</p>
                </motion.div>
              ))}
            </div>
            <MagneticButton
              href="#join-form"
              className="btn-shine-dark relative inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold text-white overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${B.primary}, ${B.primaryDark})` }}
            >
              Commencer à gagner
              <div className="ml-3 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </MagneticButton>
          </motion.div>

          {/* Earnings phone mockup */}
          <motion.div variants={fadeRight} className="relative flex items-center justify-center">
            <TiltCard className="relative">
              <EarningsPhoneMockup />
            </TiltCard>
            <motion.div
              animate={{ opacity: [0.1, 0.25, 0.1], scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -inset-8 -z-10 rounded-[3rem] blur-3xl"
              style={{ background: `linear-gradient(135deg, ${B.primary}, ${B.primaryDark})` }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
