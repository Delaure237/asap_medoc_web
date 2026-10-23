'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { B, REQUIREMENTS, fadeUp, stagger } from '@/lib/brand';
import { MagneticButton } from '@/components/ui';

export function Requirements() {
  return (
    <section id="requirements" className="py-20 sm:py-28" style={{ background: B.light }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="section-title text-center mb-4">
            Conditions requises
          </motion.h2>
          <motion.p variants={fadeUp} className="section-description text-center mb-8">
            Ce dont vous avez besoin pour devenir livreur.
          </motion.p>
          <div className="-mx-4 sm:-mx-6 h-px bg-gray-200 mb-10" />
          <div className="space-y-3">
            {REQUIREMENTS.map((r, i) => (
              <motion.div
                key={r}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: 8, transition: { duration: 0.2 } }}
                className="flex items-center gap-4 bg-white rounded-xl px-5 py-4 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 cursor-default"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 + 0.2, type: 'spring', stiffness: 500 }}
                >
                  <CheckCircle size={20} style={{ color: B.primary }} className="shrink-0" />
                </motion.div>
                <span className="text-sm text-gray-700 font-medium">{r}</span>
              </motion.div>
            ))}
          </div>
          <motion.div variants={fadeUp} className="text-center mt-10">
            <MagneticButton
              href="#join-form"
              className="btn-shine-dark relative inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold text-white overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${B.primary}, ${B.primaryDark})` }}
            >
              Envoyer ma candidature
              <span className="ml-3 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
