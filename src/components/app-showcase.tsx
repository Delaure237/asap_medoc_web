'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Smartphone, CheckCircle } from 'lucide-react';
import { B, APP_FEATURES, fadeLeft, fadeRight, stagger } from '@/lib/brand';
import { TiltCard } from '@/components/ui';

export function AppShowcase() {
  return (
    <section id="app-features" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Subtle bg gradient */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.03] pointer-events-none" style={{ background: `radial-gradient(circle, ${B.primary}, transparent 70%)` }} />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Text */}
          <motion.div variants={fadeLeft}>
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: 'auto' }}
              viewport={{ once: true }}
              className="section-badge inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold mb-6 overflow-hidden"
            >
              <Smartphone size={14} /> Application mobile
            </motion.span>
            <h2 className="section-title mb-4">
              Tout dans votre poche
            </h2>
            <p className="section-description mb-6">
              Gérez vos livraisons, suivez vos gains en temps réel et optimisez vos itinéraires
              depuis une application intuitive conçue pour les livreurs.
            </p>
            <div className="space-y-3">
              {APP_FEATURES.map((f, i) => (
                <motion.div
                  key={f}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1, type: 'spring' }}
                  >
                    <CheckCircle size={18} style={{ color: B.primary }} />
                  </motion.div>
                  <p className="text-gray-700 text-sm font-medium">{f}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* App home screenshot */}
          <motion.div variants={fadeRight} className="relative flex items-center justify-center">
            <TiltCard className="relative">
              <div className="relative aspect-[9/16] w-full max-w-[400px] overflow-hidden rounded-[2.5rem] shadow-2xl">
                <Image
                  src="/home.png"
                  alt="Écran d’accueil de l’application ASAP Medoc"
                  width={540}
                  height={960}
                  sizes="(min-width: 1024px) 400px, 85vw"
                  className="h-full w-full object-contain"
                />
              </div>
            </TiltCard>
            {/* Animated glow */}
            <motion.div
              animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.05, 1] }}
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
