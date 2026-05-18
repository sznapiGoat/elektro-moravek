import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { Phone, Mail, MapPin, Building2, Zap } from 'lucide-react'

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' })

  return (
    <section id="kontakt" className="bg-zinc-950 py-24 sm:py-32 border-t border-zinc-800/40" aria-labelledby="contact-heading">
      <div ref={ref} className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="font-mono text-[10px] font-bold text-amber-500/70 tracking-[0.3em] uppercase">
              CONTACT MODULE
            </span>
            <span className="flex-1 h-px bg-zinc-800/80 max-w-16" aria-hidden="true" />
          </motion.div>
          <motion.h2
            id="contact-heading"
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08, ease: 'easeOut' }}
            className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-100 mb-3"
          >
            Kontakt
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
            className="text-sm text-zinc-500 max-w-sm"
          >
            Dostupný nonstop. Při havárii nečekejte — volejte přímo.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Emergency CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden p-8 border border-amber-500/40 bg-amber-500/5"
          >
            {/* Decorative top line */}
            <div className="absolute inset-x-0 top-0 h-px bg-amber-500/60" aria-hidden="true" />

            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-amber-500/15 flex items-center justify-center">
                <Zap className="w-4.5 h-4.5 text-amber-400" aria-hidden="true" />
              </div>
              <div>
                <div className="text-xs font-bold text-amber-500/80 uppercase tracking-widest">Pohotovost 24/7</div>
                <div className="text-xs text-zinc-600 font-medium uppercase tracking-wider">Okamžitý výjezd</div>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-2">Telefon</div>
              <a
                href="tel:+420775551927"
                className="text-3xl sm:text-4xl font-black text-amber-400 hover:text-amber-300 transition-colors tracking-tight"
                aria-label="Zavolat na +420 775 551 927"
              >
                +420 775 551 927
              </a>
            </div>

            <a
              href="tel:+420775551927"
              className="flex items-center justify-center gap-2.5 w-full py-4 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-sm tracking-wide uppercase transition-colors duration-150"
              aria-label="Zavolat nyní – pohotovostní linka"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              Zavolat nyní
            </a>
          </motion.div>

          {/* Info grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4"
          >
            {/* Email */}
            <div className="flex items-start gap-4 p-5 border border-zinc-800/70 bg-zinc-900/40 hover:border-zinc-700/70 transition-colors duration-150">
              <div className="w-9 h-9 bg-zinc-800/60 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-zinc-400" aria-hidden="true" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Email</div>
                <a
                  href="mailto:ele.jkmm@gmail.com"
                  className="text-sm font-semibold text-zinc-200 hover:text-amber-400 transition-colors"
                >
                  ele.jkmm@gmail.com
                </a>
              </div>
            </div>

            {/* Region */}
            <div className="flex items-start gap-4 p-5 border border-zinc-800/70 bg-zinc-900/40">
              <div className="w-9 h-9 bg-zinc-800/60 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-zinc-400" aria-hidden="true" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Oblast působení</div>
                <div className="text-sm font-semibold text-zinc-200 leading-snug">Praha a Středočeský kraj</div>
                <div className="text-xs text-zinc-600 mt-0.5">Kamenný Přívoz, Pohoří a okolí</div>
              </div>
            </div>

            {/* IČO */}
            <div className="flex items-start gap-4 p-5 border border-zinc-800/70 bg-zinc-900/40">
              <div className="w-9 h-9 bg-zinc-800/60 flex items-center justify-center shrink-0">
                <Building2 className="w-4 h-4 text-zinc-400" aria-hidden="true" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Identifikace</div>
                <div className="text-sm font-semibold text-zinc-200">Jan Morávek</div>
                <div className="font-mono text-xs text-zinc-600 mt-0.5">IČO 06153194</div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}
