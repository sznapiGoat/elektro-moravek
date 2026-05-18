import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import {
  AlertTriangle,
  Building2,
  ShieldCheck,
  Settings,
  Lightbulb,
} from 'lucide-react'

interface Service {
  id: string
  code: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  subtitle: string
  items: readonly string[]
  accent: boolean
}

const SERVICES: Service[] = [
  {
    id: 'pohotovost',
    code: 'SVC-01',
    icon: AlertTriangle,
    title: 'Pohotovostní servis',
    subtitle: 'Havarijní výjezd nonstop',
    items: ['Opravy rozvaděčů', 'Výměna jističů', 'Havárie a výpadky', 'Diagnostika poruch'],
    accent: true,
  },
  {
    id: 'instalace',
    code: 'SVC-02',
    icon: Building2,
    title: 'Kompletní elektroinstalace',
    subtitle: 'Domy a byty',
    items: ['Nové rozvody', 'Rekonstrukce rozvodů', 'Kabely CYKY', 'Rozvaděče na míru'],
    accent: false,
  },
  {
    id: 'revize',
    code: 'SVC-03',
    icon: ShieldCheck,
    title: 'Revize & Hromosvody',
    subtitle: 'Certifikované kontroly',
    items: ['Pravidelné revize', 'Ochrana objektů', 'Hromosvody', 'Výchozí revizní zprávy'],
    accent: false,
  },
  {
    id: 'montaze',
    code: 'SVC-04',
    icon: Settings,
    title: 'Montáže & Modernizace',
    subtitle: 'Upgrade elektroinstalace',
    items: ['Výměna zásuvek', 'Výměna vypínačů', 'Inteligentní osvětlení', 'LED modernizace'],
    accent: false,
  },
  {
    id: 'verejne',
    code: 'SVC-05',
    icon: Lightbulb,
    title: 'Veřejné osvětlení',
    subtitle: 'Obce a firmy',
    items: ['Opravy lamp', 'Údržba sítí', 'Nové instalace', 'Energetické úspory'],
    accent: false,
  },
]

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' })
  const Icon = service.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`
        relative group flex flex-col gap-5 p-6 border transition-all duration-200 cursor-default
        ${service.accent
          ? 'border-amber-500/50 bg-amber-500/5 hover:bg-amber-500/8 hover:border-amber-500/70'
          : 'border-zinc-800/70 bg-zinc-900/40 hover:bg-zinc-900/70 hover:border-zinc-700/70'}
      `}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-4">
        <div
          className={`
            w-10 h-10 flex items-center justify-center shrink-0
            ${service.accent ? 'bg-amber-500/15' : 'bg-zinc-800/60'}
          `}
        >
          <Icon
            className={`w-5 h-5 ${service.accent ? 'text-amber-400' : 'text-zinc-400'}`}
            aria-hidden="true"
          />
        </div>
        <span
          className={`
            font-mono text-[10px] font-bold tracking-widest mt-1
            ${service.accent ? 'text-amber-500/70' : 'text-zinc-600'}
          `}
          aria-hidden="true"
        >
          {service.code}
        </span>
      </div>

      {/* Title block */}
      <div>
        <h3 className={`text-base font-black tracking-tight mb-0.5 ${service.accent ? 'text-amber-300' : 'text-zinc-100'}`}>
          {service.title}
        </h3>
        <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
          {service.subtitle}
        </p>
      </div>

      {/* Items — rendered as a clean grid, no list markers */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-auto pt-4 border-t border-zinc-800/60">
        {service.items.map((item) => (
          <div key={item} className="flex items-center gap-2">
            <span
              className={`w-1 h-1 shrink-0 ${service.accent ? 'bg-amber-500' : 'bg-zinc-600'}`}
              aria-hidden="true"
            />
            <span className="text-xs text-zinc-400 leading-snug">{item}</span>
          </div>
        ))}
      </div>

      {/* Accent line on hover */}
      <div
        className={`
          absolute inset-x-0 top-0 h-px transition-opacity duration-200
          ${service.accent
            ? 'bg-amber-500/60 opacity-100'
            : 'bg-amber-500/40 opacity-0 group-hover:opacity-100'}
        `}
        aria-hidden="true"
      />
    </motion.div>
  )
}

export default function Services() {
  const headingRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headingRef, { once: true, margin: '-80px 0px' })

  return (
    <section id="sluzby" className="bg-zinc-950 py-24 sm:py-32" aria-labelledby="services-heading">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Section header */}
        <div ref={headingRef} className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="font-mono text-[10px] font-bold text-amber-500/70 tracking-[0.3em] uppercase">
              SVC INDEX
            </span>
            <span className="flex-1 h-px bg-zinc-800/80 max-w-16" aria-hidden="true" />
          </motion.div>
          <motion.h2
            id="services-heading"
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08, ease: 'easeOut' }}
            className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-100 mb-3"
          >
            Technické služby
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
            className="text-sm text-zinc-500 max-w-sm"
          >
            Kompletní portfolio elektro prací pro domácnosti i firmy. Praha a Středočeský kraj.
          </motion.p>
        </div>

        {/* 5-card grid: 2+2+1 on desktop, 1-col mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.slice(0, 3).map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
          {/* Bottom row: 2 cards centered on desktop */}
          <div className="sm:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 lg:max-w-[66.666%]">
            {SERVICES.slice(3).map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i + 3} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
