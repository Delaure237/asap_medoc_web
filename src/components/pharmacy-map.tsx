'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { B, PHARMACY_POINTS, fadeUp, stagger } from '@/lib/brand';

function PharmacyMapWidget() {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [activeCity, setActiveCity] = useState<string | null>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const cities = ['Toutes', 'Douala', 'Yaoundé', 'Bafoussam', 'Kribi', 'Garoua'];
  const filteredPoints = activeCity && activeCity !== 'Toutes'
    ? PHARMACY_POINTS.filter((p) => p.city === activeCity)
    : PHARMACY_POINTS;

  useEffect(() => {
    fetch('/geo/cameroon.svg')
      .then((res) => res.text())
      .then((raw) => {
        // Parse and style the SVG paths
        const parser = new DOMParser();
        const doc = parser.parseFromString(raw, 'image/svg+xml');
        const svg = doc.querySelector('svg');
        if (!svg) return;

        // Set viewBox if not set
        if (!svg.getAttribute('viewBox')) {
          const w = svg.getAttribute('width') || '800';
          const h = svg.getAttribute('height') || '800';
          svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
        }

        // Style all paths
        svg.querySelectorAll('path').forEach((path) => {
          path.setAttribute('fill', '#FF3B3008');
          path.setAttribute('stroke', '#d1d5db');
          path.setAttribute('stroke-width', '1.5');
        });

        // Remove width/height so it fills container
        svg.removeAttribute('width');
        svg.removeAttribute('height');
        svg.setAttribute('class', 'absolute inset-0 w-full h-full');
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

        setSvgContent(svg.outerHTML);
      })
      .catch(() => {
        // Fallback: empty
      });
  }, []);

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 overflow-hidden">
      {/* Filter tabs */}
      <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-200 overflow-x-auto">
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => setActiveCity(city === 'Toutes' ? null : city)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
              (city === 'Toutes' && !activeCity) || activeCity === city
                ? 'text-white shadow-md'
                : 'text-gray-500 bg-white border border-gray-200 hover:border-gray-300'
            }`}
            style={
              (city === 'Toutes' && !activeCity) || activeCity === city
                ? { background: `linear-gradient(135deg, ${B.primary}, ${B.primaryDark})` }
                : undefined
            }
          >
            {city}
          </button>
        ))}
      </div>

      {/* Map area — taller ratio to match Cameroon's vertical shape */}
      <div className="relative aspect-[4/3] sm:aspect-[3/2] bg-gradient-to-b from-gray-100 to-gray-50">
        {/* Cameroon SVG */}
        {svgContent && (
          <div
            className="absolute inset-0"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        )}

        {/* City labels */}
        <motion.div
          className="absolute text-[10px] font-bold text-gray-300 uppercase tracking-wider"
          style={{ left: '30%', top: '74%' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Douala
        </motion.div>
        <motion.div
          className="absolute text-[10px] font-bold text-gray-300 uppercase tracking-wider"
          style={{ left: '42%', top: '76%' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
        >
          Yaoundé
        </motion.div>

        {/* Connection lines between clusters */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.line
            x1="34" y1="68" x2="49" y2="59"
            stroke={B.primary}
            strokeWidth="0.3"
            strokeDasharray="2 2"
            strokeOpacity={0.3}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 1.5 }}
          />
        </svg>

        {/* Pharmacy points */}
        {filteredPoints.map((point, i) => (
          <motion.div
            key={`${point.name}-${i}`}
            className="absolute group cursor-pointer"
            style={{ left: `${point.x}%`, top: `${point.y}%`, transform: 'translate(-50%, -50%)' }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.06, type: 'spring', stiffness: 300 }}
            onMouseEnter={() => setHoveredPoint(i)}
            onMouseLeave={() => setHoveredPoint(null)}
          >
            {/* Pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: B.primary, margin: '-6px' }}
              animate={{ scale: [1, 2.5, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2 + (i % 3) * 0.5, repeat: Infinity, delay: i * 0.2 }}
            />
            {/* Dot */}
            <div
              className="w-3 h-3 rounded-full border-2 border-white shadow-md relative z-10 transition-transform duration-200 hover:scale-150"
              style={{ background: B.primary }}
            />
            {/* Tooltip */}
            <AnimatePresence>
              {hoveredPoint === i && (
                <motion.div
                  initial={{ opacity: 0, y: 5, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.9 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-[10px] font-medium rounded-lg whitespace-nowrap shadow-xl z-50"
                >
                  {point.name}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-gray-200 bg-white">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: B.primary }} />
            <span>Pharmacie partenaire</span>
          </div>
          <div className="flex items-center gap-1.5">
            <motion.div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: B.primary }}
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span>Zone active</span>
          </div>
        </div>
        <span className="text-xs font-bold" style={{ color: B.primary }}>
          {filteredPoints.length} pharmacies
        </span>
      </div>
    </div>
  );
}

export function PharmacyMap() {
  return (
    <section id="network" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          className="text-center mb-14"
        >
          <motion.div variants={fadeUp} className="section-badge inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold mb-4">
            <MapPin size={14} /> Réseau
          </motion.div>
          <motion.h2 variants={fadeUp} className="section-title">
            120+ pharmacies partenaires
          </motion.h2>
          <motion.p variants={fadeUp} className="section-description mt-3 max-w-2xl mx-auto">
            Un réseau en pleine expansion à travers le Cameroun.
          </motion.p>
        </motion.div>
        <div className="-mx-4 sm:-mx-6 h-px bg-gray-200 mb-14" />

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <PharmacyMapWidget />
        </motion.div>
      </div>
    </section>
  );
}
