'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Loader2, Send } from 'lucide-react';
import { B, VEHICLE_OPTIONS, fadeUp, stagger } from '@/lib/brand';

export function JoinForm() {
  const [form, setForm] = useState({ fullName: '', phone: '', city: '', vehicleType: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.city || !form.vehicleType) return;
    setLoading(true);
    setError('');
    try {
      const endpoint = process.env.NEXT_PUBLIC_API_URL
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/leads`
        : '/api/leads';

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'courier', ...form }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.message || data?.error || 'Une erreur est survenue. Veuillez réessayer.');
      }
      setSuccess(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Une erreur est survenue. Veuillez réessayer.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const set = (key: string, val: string) => setForm((p) => ({ ...p, [key]: val }));

  return (
    <section id="join-form" className="py-20 sm:py-28 relative" style={{ background: B.light }}>
      {/* Gradient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-[0.04] blur-3xl pointer-events-none" style={{ background: `radial-gradient(circle, ${B.primary}, transparent 70%)` }} />

      <motion.div
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
        className="mx-auto max-w-xl px-4 sm:px-6 relative z-10"
      >
        <motion.div variants={fadeUp} className="text-center mb-10">
          <h2 className="section-title">Devenez livreur ASAP&nbsp;Medoc</h2>
          <p className="section-description mt-3">
            Remplissez le formulaire et commencez à livrer dès cette semaine.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl p-8 text-center border bg-white"
              style={{ borderColor: `${B.primary}30` }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
              >
                <CheckCircle className="h-14 w-14 mx-auto mb-4" style={{ color: B.primary }} />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Candidature envoyée !</h3>
              <p className="text-gray-500">
                Notre équipe vous contactera sur WhatsApp dans les prochaines 48h avec les prochaines étapes.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              variants={fadeUp}
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-lg shadow-black/[0.03] space-y-4 relative overflow-hidden"
            >
              {/* Animated gradient border top */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: `linear-gradient(90deg, ${B.primary}, ${B.primaryDark}, ${B.primary})`, backgroundSize: '200% 100%' }}
                animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />

              <div>
                <label htmlFor="cf-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet *
                </label>
                <input
                  id="cf-name"
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(e) => set('fullName', e.target.value)}
                  placeholder="Jean Mbarga"
                  className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF3B30]/40 focus:border-[#FF3B30] transition-all duration-200"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cf-phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone (WhatsApp) *
                  </label>
                  <input
                    id="cf-phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => set('phone', e.target.value)}
                    placeholder="+237 6XX XXX XXX"
                    className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF3B30]/40 focus:border-[#FF3B30] transition-all duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="cf-city" className="block text-sm font-medium text-gray-700 mb-1">
                    Ville *
                  </label>
                  <input
                    id="cf-city"
                    type="text"
                    required
                    value={form.city}
                    onChange={(e) => set('city', e.target.value)}
                    placeholder="Douala"
                    className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF3B30]/40 focus:border-[#FF3B30] transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="cf-vehicle" className="block text-sm font-medium text-gray-700 mb-1">
                  Type de véhicule *
                </label>
                <select
                  id="cf-vehicle"
                  required
                  value={form.vehicleType}
                  onChange={(e) => set('vehicleType', e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF3B30]/40 focus:border-[#FF3B30] transition-all duration-200 appearance-none bg-white"
                >
                  <option value="" disabled>Choisir un véhicule</option>
                  {VEHICLE_OPTIONS.map((v) => (
                    <option key={v.value} value={v.value}>{v.label}</option>
                  ))}
                </select>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-600 text-center"
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.01, boxShadow: '0 8px 30px rgba(255,59,48,0.3)' }}
                whileTap={{ scale: 0.98 }}
                className="btn-shine-dark relative w-full flex items-center justify-center gap-2 py-3 text-base font-semibold rounded-xl text-white transition-all disabled:opacity-60 overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${B.primary}, ${B.primaryDark})` }}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                Envoyer ma candidature
              </motion.button>
              <p className="text-xs text-gray-400 text-center">
                Vos informations sont confidentielles et ne seront jamais partagées.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
