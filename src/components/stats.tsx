'use client';

import { motion } from 'framer-motion';
import { STATS, fadeUp, stagger } from '@/lib/brand';

export function Stats() {
  return (
    <section id="stats" className="py-16 sm:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <div className="section-badge inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold mb-4">
            ASAP Medoc en chiffres
          </div>
          <p className="section-description">
            Un réseau de livraison de médicaments en pleine croissance,
            <span className="text-gray-900 font-normal"> pensé pour les livreurs</span> au Cameroun.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-200"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="text-center px-4 sm:px-8 py-2"
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-900 tracking-tight">
                {stat.display}
              </div>
              <p className="mt-2 text-xs sm:text-sm text-gray-400 font-normal">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
