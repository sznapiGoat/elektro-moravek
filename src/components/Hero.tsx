import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, animate, useInView } from 'motion/react'
import { Phone, Star, MapPin, ArrowRight, ChevronDown } from 'lucide-react'

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const controls = animate(0, target, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate(v) { setDisplay(Math.round(v)) },
    })
    return () => controls.stop()
  }, [isInView, target])

  return <span ref={ref}>{display}{suffix}</span>
}

function EmergencyBadge() {
  return (
    <div className="inline-flex items-center gap-3 px-4 py-2 border border-amber-500/40 bg-amber-500/8">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full bg-amber-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 bg-amber-500" />
      </span>
      <span className="text-xs font-bold tracking-[0.2em] uppercase text-amber-400">
        NONSTOP POHOTOVOST 24/7
      </span>
      <span className="w-px h-3 bg-amber-500/40" />
      <span className="text-xs font-medium tracking-wider text-amber-500/80 uppercase">
        Praha a Středočeský kraj
      </span>
    </div>
  )
}

function TrustBadge() {
  return (
    <div className="inline-flex items-center gap-2.5 px-3.5 py-2 border border-zinc-700/60 bg-zinc-900/50">
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" aria-hidden="true" />
        ))}
      </div>
      <span className="text-xs font-bold text-zinc-100">5.0</span>
      <span className="w-px h-3 bg-zinc-700" />
      <span className="text-xs text-zinc-400 font-medium">50+ recenzí</span>
    </div>
  )
}

function MagneticCTA() {
  const ref = useRef<HTMLAnchorElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const onMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    setPos({
      x: (e.clientX - rect.left - rect.width / 2) * 0.35,
      y: (e.clientY - rect.top - rect.height / 2) * 0.35,
    })
  }, [])

  return (
    <motion.a
      ref={ref}
      href="tel:+420775551927"
      onMouseMove={onMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{
        x: pos.x,
        y: pos.y,
        boxShadow: [
          '0 0 16px 2px rgba(245,158,11,0.3)',
          '0 0 32px 6px rgba(245,158,11,0.55)',
          '0 0 16px 2px rgba(245,158,11,0.3)',
        ],
      }}
      transition={{
        x: { type: 'spring', stiffness: 180, damping: 16, mass: 0.6 },
        y: { type: 'spring', stiffness: 180, damping: 16, mass: 0.6 },
        boxShadow: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
      }}
      whileTap={{ scale: 0.97 }}
      style={{ willChange: 'transform' }}
      className="group flex items-center gap-3 px-7 py-4 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-sm tracking-wide uppercase transition-colors duration-150 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
      aria-label="Zavolat na +420 775 551 927"
    >
      <Phone className="w-4.5 h-4.5" aria-hidden="true" />
      +420 775 551 927
      <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true" />
    </motion.a>
  )
}

const STATS = [
  { target: 24, suffix: '/7', label: 'Pohotovost' },
  { target: 50, suffix: '+', label: 'Ověřených recenzí' },
  { target: 5, suffix: '.0', label: 'Hvězd hodnocení' },
]

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950"
      aria-label="Hlavní sekce"
    >
      {/* Technical grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: [
            'linear-gradient(rgba(245,158,11,1) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(245,158,11,1) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '72px 72px',
        }}
      />

      {/* Ambient radial glow */}
      <div
        className="absolute top-0 right-0 w-[640px] h-[640px] pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse at top right, rgba(245,158,11,0.07) 0%, transparent 65%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[480px] h-[480px] pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse at bottom left, rgba(245,158,11,0.04) 0%, transparent 65%)',
        }}
      />

      {/* Vertical rule accent */}
      <div
        className="absolute left-8 top-0 bottom-0 w-px opacity-20 pointer-events-none hidden lg:block"
        aria-hidden="true"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(245,158,11,0.6) 30%, rgba(245,158,11,0.6) 70%, transparent)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 pb-20 w-full">
        {/* Emergency status row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
          className="flex flex-wrap items-center gap-3 mb-10"
        >
          <EmergencyBadge />
          <TrustBadge />
        </motion.div>

        {/* Primary heading */}
        <h1 className="mb-4" aria-label="Elektro pohotovost Morávek – havarijní elektrikář Praha a Středočeský kraj">
          <span className="sr-only">Elektro pohotovost Morávek – </span>
          <div className="overflow-hidden mb-1">
            <motion.span
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block text-5xl sm:text-7xl lg:text-[88px] font-black tracking-tight leading-none text-zinc-100"
            >
              Elektro
            </motion.span>
          </div>
          <div className="overflow-hidden mb-2">
            <motion.span
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="block text-5xl sm:text-7xl lg:text-[88px] font-black tracking-tight leading-none text-amber-400"
            >
              pohotovost
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.span
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="block text-5xl sm:text-7xl lg:text-[88px] font-black tracking-tight leading-none text-zinc-100"
            >
              Morávek
            </motion.span>
          </div>
        </h1>

        {/* Descriptor line */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.85, ease: 'easeOut' }}
          className="flex items-center gap-3 mb-2"
        >
          <span className="w-8 h-px bg-amber-500/60" aria-hidden="true" />
          <p className="text-base sm:text-lg font-bold text-zinc-300 tracking-wide">
            Jan Morávek — havarijní elektrikář
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0, ease: 'easeOut' }}
          className="text-sm sm:text-base text-zinc-500 max-w-md mb-12 leading-relaxed"
        >
          Okamžitý výjezd při havárii. Opravy rozvaděčů, výměna jističů, elektroinstalace.
          Praha a Středočeský kraj nonstop.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.15, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-20"
        >
          <MagneticCTA />
          <a
            href="#kontakt"
            className="flex items-center gap-2 px-7 py-4 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 font-semibold text-sm tracking-wide uppercase transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            aria-label="Přejít na kontaktní sekci"
          >
            <MapPin className="w-4 h-4 text-zinc-600" aria-hidden="true" />
            Kde působíme
          </a>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="pt-10 border-t border-zinc-800/60"
        >
          <div className="grid grid-cols-3 gap-6 max-w-md">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.6 + i * 0.08, ease: 'easeOut' }}
                className="flex flex-col gap-1"
              >
                <span className="text-2xl sm:text-3xl font-black text-zinc-100 tabular-nums leading-none">
                  <CountUp target={stat.target} suffix={stat.suffix} />
                </span>
                <span className="text-xs text-zinc-600 font-medium uppercase tracking-wider leading-tight">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.5 }}
        aria-hidden="true"
      >
        <span className="text-[9px] font-bold tracking-[0.3em] text-zinc-700 uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-zinc-700" />
        </motion.div>
      </motion.div>
    </section>
  )
}
