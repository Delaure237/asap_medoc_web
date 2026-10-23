'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { FAQS, fadeUp, stagger } from '@/lib/brand';

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      className="bg-gray-50 border border-gray-200 rounded-xl px-5 hover:bg-gray-100/50 transition-all duration-300 hover:shadow-sm"
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left font-semibold text-gray-800 text-base"
      >
        {question}
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
          <ChevronDown size={18} className="shrink-0 ml-4 text-gray-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-gray-600 leading-relaxed pb-5">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Faq() {
  return (
    <section id="faq" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="section-title text-center mb-3">
            Questions fréquentes
          </motion.h2>
          <motion.p variants={fadeUp} className="section-description text-center mb-8">
            Tout ce que vous devez savoir avant de commencer.
          </motion.p>
          <div className="-mx-4 sm:-mx-6 h-px bg-gray-200 mb-10" />
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <FaqItem question={faq.q} answer={faq.a} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
