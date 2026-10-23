'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { B, TESTIMONIALS, fadeUp, stagger } from '@/lib/brand';

function TestimonialCard({ testimonial }: { testimonial: typeof TESTIMONIALS[number] }) {
  return (
    <div className="mb-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center gap-3">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div>
          <div className="text-sm font-semibold text-gray-900">{testimonial.name}</div>
          <div className="text-xs text-gray-400">{testimonial.role}</div>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-gray-600">
        &ldquo;{testimonial.text}&rdquo;
      </p>
      <div className="mt-3 flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            size={12}
            fill={s <= testimonial.stars ? B.accent : 'none'}
            stroke={s <= testimonial.stars ? B.accent : '#d1d5db'}
          />
        ))}
        <span className="ml-2 text-xs font-medium" style={{ color: B.primary }}>{testimonial.date}</span>
      </div>
    </div>
  );
}

function TestimonialColumns() {
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const col1 = col1Ref.current;
    const col2 = col2Ref.current;
    if (!col1 || !col2) return;

    let raf1: number;
    let raf2: number;
    let pos1 = 0;
    let pos2 = col2.scrollHeight / 2;

    function animateCol1() {
      if (!col1) return;
      pos1 += 0.4;
      if (pos1 >= col1.scrollHeight / 2) pos1 = 0;
      col1.scrollTop = pos1;
      raf1 = requestAnimationFrame(animateCol1);
    }

    function animateCol2() {
      if (!col2) return;
      pos2 -= 0.4;
      if (pos2 <= 0) pos2 = col2.scrollHeight / 2;
      col2.scrollTop = pos2;
      raf2 = requestAnimationFrame(animateCol2);
    }

    raf1 = requestAnimationFrame(animateCol1);
    raf2 = requestAnimationFrame(animateCol2);

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, []);

  const col1Items = TESTIMONIALS.slice(0, 3);
  const col2Items = TESTIMONIALS.slice(3, 6);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex gap-5"
      style={{ height: '500px' }}
    >
      {/* Fade top */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-10" style={{ height: '60px', background: 'linear-gradient(to bottom, white, transparent)' }} />
      {/* Fade bottom */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10" style={{ height: '60px', background: 'linear-gradient(to top, white, transparent)' }} />

      {/* Column 1 — scrolls down */}
      <div ref={col1Ref} className="flex-1 overflow-hidden" style={{ scrollbarWidth: 'none' }}>
        <div>
          {[...col1Items, ...col1Items].map((item, i) => (
            <TestimonialCard key={`a-${i}`} testimonial={item} />
          ))}
        </div>
      </div>

      {/* Column 2 — scrolls up */}
      <div ref={col2Ref} className="hidden flex-1 overflow-hidden sm:block" style={{ scrollbarWidth: 'none' }}>
        <div>
          {[...col2Items, ...col2Items].map((item, i) => (
            <TestimonialCard key={`b-${i}`} testimonial={item} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — title + stats */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="flex flex-col justify-center"
          >
            <motion.div variants={fadeUp} className="section-badge inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold mb-4 w-fit">
              <Star size={14} /> Témoignages
            </motion.div>
            <motion.h2 variants={fadeUp} className="section-title">
              Ils livrent avec
              <br />
              ASAP Medoc et{' '}
              <span className="relative inline-block">
                <span className="relative z-10">adorent</span>
                <span className="absolute inset-0 -inset-x-2 -inset-y-1 rounded-lg -z-0 bg-gray-200" />
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} className="section-description mt-4 max-w-md">
              Rejoignez des centaines de livreurs satisfaits à travers le Cameroun.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10">
              <a
                href="#join-form"
                className="btn-shine-dark relative inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold text-white transition-colors hover:opacity-90 overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${B.primary}, ${B.primaryDark})` }}
              >
                <span className="relative z-10">Rejoindre les livreurs</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right — auto-scrolling testimonial cards */}
          <TestimonialColumns />
        </div>
      </div>
    </section>
  );
}
