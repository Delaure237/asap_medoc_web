'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { B, fadeUp, stagger } from '@/lib/brand';
import { MagneticButton } from '@/components/ui';

export function CtaBanner() {
  return (
    <section className="py-20 relative overflow-hidden bg-gray-100">
      {/* Animated dots */}
      <motion.div
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle, #6b7280 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* Floating shapes */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full border border-gray-300/60"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute -bottom-16 -left-16 w-60 h-60 rounded-full border border-gray-300/60"
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="section-title">
            Prêt à commencer ?
          </motion.h2>
          <motion.p variants={fadeUp} className="section-description mt-4 max-w-xl mx-auto">
            Inscrivez-vous en 5 minutes et commencez à livrer dès cette semaine.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8">
            <MagneticButton
              href="#join-form"
              className="btn-shine relative inline-flex items-center justify-center bg-white hover:bg-gray-50 rounded-full px-10 py-4 text-lg font-bold shadow-2xl transition-all overflow-hidden"
              style={{ color: B.primary }}
            >
              Devenir livreur maintenant
              <span className="ml-3 w-7 h-7 rounded-full bg-[#FF3B30] flex items-center justify-center">
                <ArrowRight className="h-4 w-4 text-white" />
              </span>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
