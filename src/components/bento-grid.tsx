'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Package, Wallet, Star, TrendingUp, Bell, MapPin,
  Clock, CheckCircle, Smartphone, Zap, Building2, User, Truck,
} from 'lucide-react';
import { B } from '@/lib/brand';

/* ─── Data ─── */
const DELIVERY_NOTIFS = [
  { id: 1, pharmacy: 'Pharmacie Akwa', address: 'Rue Joss, Douala', distance: '1.2 km', reward: '2 500 FCFA' },
  { id: 2, pharmacy: 'Pharmacie Bastos', address: 'Carrefour Bastos, Yaoundé', distance: '0.8 km', reward: '1 800 FCFA' },
  { id: 3, pharmacy: 'Pharmacie Ndokoti', address: 'Ndokoti, Douala', distance: '2.1 km', reward: '3 200 FCFA' },
];

const PAYMENT_NOTIFS = [
  { id: 1, amount: '2 500', method: 'Orange Money', time: 'À l\u2019instant' },
  { id: 2, amount: '1 800', method: 'MTN MoMo', time: 'Il y a 2 min' },
  { id: 3, amount: '3 200', method: 'Orange Money', time: 'Il y a 5 min' },
];

/* ═══════════════════════════════════════════════════════════════════ */
/*  SECTION                                                            */
/* ═══════════════════════════════════════════════════════════════════ */
export function BentoGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  /* ── JS-driven infinite scroll (no CSS animation jump) ── */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let pos = 0;
    let raf: number;
    const speed = 0.5; // px per frame

    function tick() {
      if (!el) return;
      pos += speed;
      const halfWidth = el.scrollWidth / 2;
      if (pos >= halfWidth) pos -= halfWidth;
      el.style.transform = `translate3d(-${pos}px, 0, 0)`;
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const cards = (
    <>
      <Divider /><Card><DeliveryNotifications active={isInView} /></Card>
      <Divider /><Card><AnimatedBarChart active={isInView} /></Card>
      <Divider /><Card wide><IntegrationMap active={isInView} /></Card>
      <Divider /><Card><PaymentNotifications active={isInView} /></Card>
      <Divider /><Card wide><AnimatedAreaChart active={isInView} /></Card>
      <Divider /><Card><LiveCounter active={isInView} /></Card>
      <Divider /><Card><AnimatedRating active={isInView} /></Card>
      <Divider />
    </>
  );

  return (
    <section id="app-showcase" className="py-20 sm:py-28 bg-white relative overflow-hidden" ref={sectionRef}>
      {/* Header */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="section-badge inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold mb-4">
            <Smartphone size={14} /> L&apos;expérience livreur
          </div>
          <h2 className="section-title">Tout se passe en temps réel</h2>
          <p className="section-description mt-3 max-w-2xl mx-auto">Courses, paiements, statistiques, tout dans votre poche.</p>
        </motion.div>
      </div>

      {/* ── Scroll container with frame lines ── */}
      <div className="relative mx-4 sm:mx-6 md:mx-10 lg:mx-16">
        <div className="h-px bg-gray-200" />
        <div className="h-px bg-gray-200 mt-4" />

        <div className="relative overflow-hidden py-8">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, white, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, white, transparent)' }} />

          {/* JS-driven scroll — 2 identical copies side by side */}
          <div ref={scrollRef} className="flex items-stretch will-change-transform" style={{ width: 'max-content' }}>
            <div className="flex shrink-0 items-stretch">{cards}</div>
            <div className="flex shrink-0 items-stretch" aria-hidden>{cards}</div>
          </div>
        </div>

        <div className="h-px bg-gray-200" />
        <div className="h-px bg-gray-200 mt-4" />
      </div>
    </section>
  );
}

/* ── Card wrapper — generous padding ── */
function Card({ children, wide }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <div className={`${wide ? 'w-[480px]' : 'w-[360px]'} shrink-0 px-8 py-6 h-[320px] overflow-hidden flex flex-col`}>
      {children}
    </div>
  );
}

/* ── Vertical divider (edge-to-edge with top/bottom lines) ── */
function Divider() {
  return <div className="w-px shrink-0 bg-gray-200" />;
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  DELIVERY NOTIFICATIONS                                            */
/* ═══════════════════════════════════════════════════════════════════ */
function DeliveryNotifications({ active }: { active: boolean }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!active) return;
    const timer = setInterval(() => setIdx((p) => (p + 1) % DELIVERY_NOTIFS.length), 3000);
    return () => clearInterval(timer);
  }, [active]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white" style={{ background: B.primary }}><Bell size={14} /></div>
        <p className="text-xs font-semibold text-gray-900">Nouvelles courses</p>
      </div>
      <div className="flex-1 space-y-2 relative">
        <AnimatePresence mode="popLayout">
          {DELIVERY_NOTIFS.map((notif, i) => {
            const order = (i - idx + DELIVERY_NOTIFS.length) % DELIVERY_NOTIFS.length;
            return (
              <motion.div
                key={notif.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: order === 0 ? 1 : order === 1 ? 0.4 : 0.15, y: 0, scale: 1 - order * 0.02 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-xl border border-gray-100 p-2.5 shadow-sm"
              >
                <div className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0" style={{ background: `${B.primary}08` }}>
                    <Package size={12} style={{ color: B.primary }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-gray-900 truncate">{notif.pharmacy}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin size={8} className="text-gray-300 shrink-0" />
                      <p className="text-[9px] text-gray-400 truncate">{notif.address}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[9px] text-gray-400 flex items-center gap-0.5"><Clock size={8} />{notif.distance}</span>
                      <span className="text-[9px] font-bold" style={{ color: B.primary }}>{notif.reward}</span>
                    </div>
                  </div>
                  {order === 0 && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="shrink-0 px-2 py-0.5 rounded text-[9px] font-bold text-white" style={{ background: '#22C55E' }}>
                      Accepter
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  INTEGRATION MAP — Pharmacie → Livreur → Client                    */
/* ═══════════════════════════════════════════════════════════════════ */
function IntegrationMap({ active }: { active: boolean }) {
  const actors = [
    { icon: Building2, label: 'Pharmacie', x: 50, y: 20, color: '#6366F1' },
    { icon: Truck, label: 'Livreur', x: 210, y: 130, color: B.primary },
    { icon: User, label: 'Client', x: 370, y: 20, color: '#22C55E' },
  ];

  return (
    <div className="h-full relative flex items-center justify-center">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 420 280" fill="none">
        {/* Connection lines */}
        <motion.path
          d="M75,55 Q140,140 210,155"
          stroke="#e5e7eb"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={active ? { pathLength: 1 } : {}}
          transition={{ delay: 0.5, duration: 1 }}
        />
        <motion.path
          d="M235,155 Q300,140 370,55"
          stroke="#e5e7eb"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={active ? { pathLength: 1 } : {}}
          transition={{ delay: 1, duration: 1 }}
        />
        {/* Traveling dots */}
        {active && (
          <>
            <motion.circle
              r="4" fill={B.primary}
              animate={{ cx: [75, 140, 210], cy: [55, 120, 155], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
            <motion.circle
              r="4" fill="#22C55E"
              animate={{ cx: [235, 300, 370], cy: [155, 120, 55], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 1 }}
            />
          </>
        )}
      </svg>

      {/* Actor nodes */}
      {actors.map((actor, i) => {
        const Icon = actor.icon;
        return (
          <motion.div
            key={actor.label}
            className="absolute flex flex-col items-center gap-1.5"
            style={{ left: actor.x - 28, top: actor.y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={active ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 + i * 0.3, type: 'spring', stiffness: 300 }}
          >
            <motion.div
              className="w-14 h-14 rounded-2xl border-2 bg-white flex items-center justify-center shadow-md"
              style={{ borderColor: actor.color }}
              animate={active ? { y: [0, -4, 0] } : {}}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
            >
              <Icon size={22} style={{ color: actor.color }} />
            </motion.div>
            <span className="text-[10px] font-semibold text-gray-600">{actor.label}</span>
          </motion.div>
        );
      })}

      {/* Center label */}
      <motion.div
        className="absolute bg-white border border-gray-200 rounded-full px-3 py-1 shadow-sm"
        style={{ left: 160, top: 220 }}
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : {}}
        transition={{ delay: 1.5 }}
      >
        <span className="text-[10px] font-semibold text-gray-500">Livraison en cours...</span>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  PAYMENT NOTIFICATIONS                                             */
/* ═══════════════════════════════════════════════════════════════════ */
function PaymentNotifications({ active }: { active: boolean }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!active) return;
    const timer = setInterval(() => setIdx((p) => (p + 1) % PAYMENT_NOTIFS.length), 2500);
    return () => clearInterval(timer);
  }, [active]);

  const notif = PAYMENT_NOTIFS[idx];

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white" style={{ background: '#22C55E' }}><Wallet size={14} /></div>
        <p className="text-xs font-semibold text-gray-900">Paiement instantané</p>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={notif.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.35 }}
          className="bg-white rounded-xl border border-green-100 p-3.5 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 400 }}
              className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center"
            >
              <CheckCircle size={18} className="text-green-500" />
            </motion.div>
            <div>
              <p className="text-base font-black text-gray-900">+{notif.amount} <span className="text-[10px] font-semibold text-gray-400">FCFA</span></p>
              <p className="text-[10px] text-gray-400">{notif.method} · {notif.time}</p>
            </div>
          </div>
          <motion.div className="mt-2.5 h-1 rounded-full bg-green-100 overflow-hidden">
            <motion.div className="h-full bg-green-500 rounded-full" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 2.5, ease: 'linear' }} />
          </motion.div>
        </motion.div>
      </AnimatePresence>
      <div className="grid grid-cols-2 gap-2 mt-3">
        <div className="bg-white rounded-lg border border-gray-100 p-2 text-center">
          <p className="text-sm font-bold text-green-600">7 500</p>
          <p className="text-[9px] text-gray-400">FCFA aujourd&apos;hui</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-100 p-2 text-center">
          <p className="text-sm font-bold text-gray-900">3</p>
          <p className="text-[9px] text-gray-400">paiements</p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  BAR CHART                                                         */
/* ═══════════════════════════════════════════════════════════════════ */
function AnimatedBarChart({ active }: { active: boolean }) {
  const bars = [
    { label: 'L', v: 35 }, { label: 'M', v: 52 }, { label: 'M', v: 68 },
    { label: 'J', v: 45 }, { label: 'V', v: 82 }, { label: 'S', v: 95 }, { label: 'D', v: 88 },
  ];
  const colors = [`${B.primary}40`, `${B.primary}50`, `${B.primary}70`, `${B.primary}50`, B.primary, B.primary, B.primary];

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <TrendingUp size={14} style={{ color: B.primary }} />
          <p className="text-xs font-semibold text-gray-900">Gains hebdo</p>
        </div>
        <span className="text-[10px] text-gray-400">Mai 2026</span>
      </div>
      <div className="flex-1 flex items-end gap-1.5">
        {bars.map((bar, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
            <motion.div
              className="w-full rounded-t"
              style={{ background: colors[i] }}
              animate={{ height: [`0%`, `${bar.v}%`, `${bar.v}%`, '0%'] }}
              transition={{ duration: 5, repeat: Infinity, times: [0, 0.2 + i * 0.02, 0.75, 1], ease: 'easeInOut' }}
            />
            <span className="text-[8px] text-gray-400">{bar.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[9px]">
        <span className="text-gray-400">Total</span>
        <span className="font-bold text-gray-900">285 000 FCFA</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  AREA CHART — thin line, filled area                               */
/* ═══════════════════════════════════════════════════════════════════ */
function AnimatedAreaChart({ active }: { active: boolean }) {
  const points = [8, 22, 15, 35, 28, 48, 40, 55, 50, 68, 60, 75, 70, 85];
  const w = 400;
  const h = 200;
  const step = w / (points.length - 1);

  let pathD = '';
  points.forEach((p, i) => {
    const x = i * step;
    const y = h - (p / 100) * h;
    if (i === 0) { pathD += `M${x},${y}`; return; }
    const prevX = (i - 1) * step;
    const prevY = h - (points[i - 1] / 100) * h;
    const cpx1 = prevX + step * 0.4;
    const cpx2 = x - step * 0.4;
    pathD += ` C${cpx1},${prevY} ${cpx2},${y} ${x},${y}`;
  });
  const areaD = pathD + ` L${w},${h} L0,${h} Z`;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <Package size={14} style={{ color: B.primary }} />
          <p className="text-xs font-semibold text-gray-900">Livraisons cette semaine</p>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] text-green-600 font-medium">+18%</span>
        </div>
      </div>
      <div className="flex-1">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" preserveAspectRatio="none">
          {[0.25, 0.5, 0.75].map((r) => (
            <line key={r} x1="0" y1={h * r} x2={w} y2={h * r} stroke="#f3f4f6" strokeWidth="1" />
          ))}
          <motion.path d={areaD} fill="url(#areaGradient)" animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 6, repeat: Infinity, times: [0, 0.3, 0.8, 1] }} />
          <motion.path
            d={pathD} fill="none" stroke={B.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            animate={{ pathLength: [0, 1, 1, 0] }}
            transition={{ duration: 6, repeat: Infinity, times: [0, 0.4, 0.8, 1], ease: 'easeInOut' }}
          />
          <motion.circle
            cx={(points.length - 1) * step} cy={h - (points[points.length - 1] / 100) * h} r="4"
            fill="white" stroke={B.primary} strokeWidth="2"
            animate={{ opacity: [0, 0, 1, 1, 0], scale: [0, 0, 1.2, 1, 0] }}
            transition={{ duration: 6, repeat: Infinity, times: [0, 0.35, 0.4, 0.8, 1] }}
          />
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={B.primary} stopOpacity="0.15" />
              <stop offset="100%" stopColor={B.primary} stopOpacity="0.01" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  LIVE COUNTER                                                      */
/* ═══════════════════════════════════════════════════════════════════ */
function LiveCounter({ active }: { active: boolean }) {
  const [courses, setCourses] = useState(0);
  const [kms, setKms] = useState(0);

  useEffect(() => {
    if (!active) return;
    function run() {
      let frame = 0;
      const total = 40;
      const timer = setInterval(() => {
        frame++;
        const eased = 1 - Math.pow(1 - frame / total, 3);
        setCourses(Math.floor(eased * 12));
        setKms(Math.floor(eased * 47));
        if (frame >= total) clearInterval(timer);
      }, 50);
      return timer;
    }
    let t = run();
    const loop = setInterval(() => { setCourses(0); setKms(0); t = run(); }, 7000);
    return () => { clearInterval(t); clearInterval(loop); };
  }, [active]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-1.5 mb-3">
        <Zap size={14} style={{ color: B.primary }} />
        <p className="text-xs font-semibold text-gray-900">Aujourd&apos;hui</p>
      </div>
      <div className="flex-1 flex flex-col justify-center gap-3">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-gray-900 tabular-nums">{courses}</span>
            <span className="text-xs text-gray-400">courses</span>
          </div>
          <div className="mt-1.5 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${B.primary}, ${B.primaryDark})` }}
              animate={{ width: ['0%', '75%', '75%', '0%'] }}
              transition={{ duration: 7, repeat: Infinity, times: [0, 0.25, 0.85, 1], ease: 'easeInOut' }}
            />
          </div>
          <p className="text-[9px] text-gray-400 mt-0.5">Objectif : 16</p>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-bold text-gray-900 tabular-nums">{kms}</span>
          <span className="text-xs text-gray-400">km</span>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 bg-white rounded-lg border border-gray-100 p-1.5 text-center">
            <p className="text-sm font-bold" style={{ color: B.primary }}>36K</p>
            <p className="text-[8px] text-gray-400">FCFA</p>
          </div>
          <div className="flex-1 bg-white rounded-lg border border-gray-100 p-1.5 text-center">
            <p className="text-sm font-bold text-green-600">98%</p>
            <p className="text-[8px] text-gray-400">succès</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  RATING + REVIEW                                                   */
/* ═══════════════════════════════════════════════════════════════════ */
const REVIEWS = [
  { stars: 5, text: 'Super app, paiement rapide et courses toujours disponibles !', author: 'Paul N., Douala' },
  { stars: 4, text: 'Très pratique, je gère mes horaires comme je veux.', author: 'Marie T., Yaoundé' },
  { stars: 5, text: 'Meilleure plateforme de livraison au Cameroun !', author: 'Samuel K., Douala' },
];

function AnimatedRating({ active }: { active: boolean }) {
  const [reviewIdx, setReviewIdx] = useState(0);

  useEffect(() => {
    if (!active) return;
    const timer = setInterval(() => setReviewIdx((p) => (p + 1) % REVIEWS.length), 4000);
    return () => clearInterval(timer);
  }, [active]);

  const review = REVIEWS[reviewIdx];

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <motion.div
        animate={{ scale: [0, 1.1, 1] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 8 }}
        className="text-4xl font-black text-gray-900 mb-1.5 tabular-nums"
      >
        4.8
      </motion.div>
      <div className="flex items-center gap-0.5 mb-3">
        {[1, 2, 3, 4, 5].map((s) => (
          <motion.div
            key={s}
            animate={{ opacity: [0, 1], scale: [0, 1], rotate: [0, 360] }}
            transition={{ delay: s * 0.1, duration: 0.4, repeat: Infinity, repeatDelay: 8 }}
          >
            <Star size={16} fill={s <= 4 ? B.accent : `${B.accent}40`} stroke={s <= 4 ? B.accent : `${B.accent}40`} />
          </motion.div>
        ))}
      </div>
      <p className="text-[10px] text-gray-400 mb-3">1 247 avis</p>
      {/* Cycling reviews */}
      <AnimatePresence mode="wait">
        <motion.div
          key={reviewIdx}
          className="bg-white rounded-lg border border-gray-100 p-2.5 w-full shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-1 mb-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={8} fill={s <= review.stars ? B.accent : '#e5e7eb'} stroke={s <= review.stars ? B.accent : '#e5e7eb'} />
            ))}
          </div>
          <p className="text-[9px] text-gray-600 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
          <p className="text-[8px] text-gray-400 mt-1">— {review.author}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
