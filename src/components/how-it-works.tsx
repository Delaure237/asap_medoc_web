'use client';

import { motion } from 'framer-motion';
import { B, STEPS, fadeUp, stagger } from '@/lib/brand';

export function HowItWorks() {
  return (
    <section id="how" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          className="text-center mb-14"
        >
          <motion.h2 variants={fadeUp} className="section-title">
            Comment devenir livreur ?
          </motion.h2>
          <motion.p variants={fadeUp} className="section-description mt-3">
            4 étapes simples pour commencer à livrer.
          </motion.p>
        </motion.div>
        <div className="h-px bg-gray-200 mb-14" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                className="relative text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Step number ring */}
                <div className="relative inline-block mb-4">
                  <motion.div
                    whileInView={{ rotate: 360 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.3, duration: 1, ease: 'easeOut' }}
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${B.primary}, ${B.primaryDark})` }}
                  >
                    <Icon size={24} />
                  </motion.div>
                  {/* Step number badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.5, type: 'spring', stiffness: 400 }}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center shadow-md"
                    style={{ background: B.dark }}
                  >
                    {i + 1}
                  </motion.div>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.desc}</p>
                {/* Animated connector line + traveling ball */}
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%]" style={{ width: '80%' }}>
                    <motion.div
                      className="h-px origin-left"
                      style={{ background: `linear-gradient(90deg, ${B.primary}40, ${B.primary}20)` }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 + 0.6, duration: 0.8, ease: 'easeOut' }}
                    />
                    <motion.div
                      className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full shadow-lg"
                      style={{ background: B.primary, boxShadow: `0 0 10px ${B.primary}80` }}
                      animate={{ left: ['0%', '100%', '0%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
