'use client';

import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { B, BENEFITS, fadeUp, stagger } from '@/lib/brand';
import { TiltCard } from '@/components/ui';

export function Benefits() {
  return (
    <section id="benefits" className="py-20 sm:py-28" style={{ background: B.light }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          className="text-center mb-14"
        >
          <motion.div variants={fadeUp} className="section-badge inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold mb-4">
            <TrendingUp size={14} /> Avantages
          </motion.div>
          <motion.h2 variants={fadeUp} className="section-title">
            Pourquoi devenir livreur ASAP&nbsp;Medoc ?
          </motion.h2>
          <motion.p variants={fadeUp} className="section-description mt-3 max-w-2xl mx-auto">
            Des avantages concrets pour chaque livreur.
          </motion.p>
        </motion.div>
        <div className="-mx-4 sm:-mx-6 h-px bg-gray-200 mb-14" />

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {BENEFITS.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div key={b.key} variants={fadeUp}>
                <TiltCard className="group relative bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 overflow-hidden cursor-default hover:shadow-2xl hover:border-gray-300 transition-all duration-500 h-full">
                  {/* Embossed number */}
                  <span
                    className="absolute top-4 right-5 text-[80px] font-black leading-none text-gray-100 select-none group-hover:text-gray-200/80 transition-colors duration-500"
                    style={{ fontFamily: 'system-ui' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {/* Icon with animated bg */}
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-white shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${B.primary}, ${B.primaryDark})` }}
                  >
                    <Icon size={22} />
                  </motion.div>
                  <h3 className="relative z-10 text-lg font-bold text-gray-900 mb-2">{b.title}</h3>
                  <p className="relative z-10 text-sm text-gray-500 leading-relaxed">{b.desc}</p>
                  {/* Hover gradient bar — animated width */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
                    <div
                      className="h-full w-0 group-hover:w-full transition-all duration-700 ease-out"
                      style={{ background: `linear-gradient(90deg, ${B.primary}, ${B.primaryDark})` }}
                    />
                  </div>
                  {/* Corner glow on hover */}
                  <div
                    className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl"
                    style={{ background: B.primary }}
                  />
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
