'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';
import { B, MARQUEE_ITEMS } from '@/lib/brand';

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  ANIMATED COUNTER                                                          */
/* ═��═════════════════════════════��═══════════════════════════════════════��═══ */
export function AnimatedCounter({ value, suffix, duration = 2 }: { value: number; suffix: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const isDecimal = value % 1 !== 0;
    const steps = 60;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * value;
      setDisplay(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
      if (step >= steps) {
        setDisplay(value);
        clearInterval(timer);
      }
    }, (duration * 1000) / steps);
    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {isInView ? display.toLocaleString('fr-FR') : '0'}
      {suffix}
    </span>
  );
}

/* ═���═════════════════════��═════════════════════════════��═════════════════════ */
/*  MAGNETIC BUTTON                                                           */
/* ═══════════════���═══════════════════════════════════════════════════════════ */
export function MagneticButton({
  children,
  href,
  className = '',
  style,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * 0.3);
      y.set((e.clientY - cy) * 0.3);
    },
    [x, y],
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ ...style, x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.a>
  );
}

/* ════════════════════════���═════════════════════════════════���════════════════ */
/*  TILT CARD                                                                 */
/* ═══════════════════════════════════════════════════════════════════════════ */
export function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const xp = (e.clientX - rect.left) / rect.width - 0.5;
      const yp = (e.clientY - rect.top) / rect.height - 0.5;
      rotateY.set(xp * 12);
      rotateX.set(yp * -12);
    },
    [rotateX, rotateY],
  );

  const reset = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX: springRX, rotateY: springRY, transformPerspective: 800 }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  );
}

/* ═════════════════════════════════════════════��═══════════════════════════���═ */
/*  MARQUEE TICKER                                                            */
/* ═══════════════════════════════════════════════════════════════════════════ */
export function Marquee() {
  return (
    <div className="relative overflow-hidden py-5 border-y border-gray-200" style={{ background: B.dark }}>
      <div className="flex animate-marquee whitespace-nowrap">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
          <span key={i} className="mx-8 text-sm font-semibold text-white/70 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: B.primary }} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  WORD-BY-WORD TEXT REVEAL                                                  */
/* ═════════���═��═══════════════════════════════════════════════════════════════ */
export function TextReveal({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            delay: delay + i * 0.08,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
