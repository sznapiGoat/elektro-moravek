import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import { X, ZoomIn } from 'lucide-react'

const IMAGES = [
  { src: '/images/moravek_1.jpeg', alt: 'Elektro práce Morávek – rozvaděč', code: 'IMG-01' },
  { src: '/images/moravek_2.jpeg', alt: 'Elektro práce Morávek – instalace', code: 'IMG-02' },
  { src: '/images/moravek_3.jpeg', alt: 'Elektro práce Morávek – montáž', code: 'IMG-03' },
  { src: '/images/moravek_4.jpeg', alt: 'Elektro práce Morávek – revize', code: 'IMG-04' },
  { src: '/images/moravek_5.jpeg', alt: 'Elektro práce Morávek – realizace', code: 'IMG-05' },
]

function GridPlaceholder({ code }: { code: string }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-zinc-900"
      aria-hidden="true"
      style={{
        backgroundImage: [
          'linear-gradient(rgba(245,158,11,0.05) 1px, transparent 1px)',
          'linear-gradient(90deg, rgba(245,158,11,0.05) 1px, transparent 1px)',
        ].join(', '),
        backgroundSize: '24px 24px',
      }}
    >
      <span className="font-mono text-[10px] font-bold tracking-widest text-zinc-700 uppercase">{code}</span>
    </div>
  )
}

interface ImageItemProps {
  img: (typeof IMAGES)[number]
  index: number
  onZoom: (index: number) => void
}

function ImageItem({ img, index, onZoom }: ImageItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' })
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  const isWide = index === 0 || index === 3

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={`
        relative group overflow-hidden border border-zinc-800/70 bg-zinc-900 cursor-zoom-in
        ${isWide ? 'sm:col-span-2 lg:col-span-2' : ''}
        aspect-[4/3]
      `}
      role="button"
      tabIndex={0}
      aria-label={`Zvětšit: ${img.alt}`}
      onClick={() => onZoom(index)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onZoom(index) }}
    >
      {error || !loaded ? <GridPlaceholder code={img.code} /> : null}
      <img
        src={img.src}
        alt={img.alt}
        loading={index < 3 ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`
          absolute inset-0 w-full h-full object-cover transition-all duration-300
          group-hover:scale-105 group-hover:brightness-90
          ${loaded && !error ? 'opacity-100' : 'opacity-0'}
        `}
      />

      {/* Code tag */}
      <span
        className="absolute top-3 left-3 font-mono text-[9px] font-bold tracking-widest text-zinc-500 uppercase bg-zinc-950/70 px-1.5 py-0.5"
        aria-hidden="true"
      >
        {img.code}
      </span>

      {/* Zoom icon on hover */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150"
        aria-hidden="true"
      >
        <div className="w-10 h-10 bg-zinc-950/80 flex items-center justify-center">
          <ZoomIn className="w-5 h-5 text-amber-400" />
        </div>
      </div>
    </motion.div>
  )
}

function Lightbox({ index, onClose }: { index: number; onClose: () => void }) {
  const img = IMAGES[index]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/95 backdrop-blur-sm p-4"
        role="dialog"
        aria-modal="true"
        aria-label={img.alt}
        onClick={onClose}
      >
        <button
          className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center border border-zinc-700 bg-zinc-900 text-zinc-400 hover:text-zinc-100 hover:border-zinc-500 transition-colors"
          onClick={onClose}
          aria-label="Zavřít"
        >
          <X className="w-5 h-5" />
        </button>

        <motion.img
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.94, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          src={img.src}
          alt={img.alt}
          onClick={(e) => e.stopPropagation()}
          className="max-w-full max-h-[85vh] object-contain border border-zinc-700/40"
        />
      </motion.div>
    </AnimatePresence>
  )
}

export default function Gallery() {
  const headingRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headingRef, { once: true, margin: '-80px 0px' })
  const [zoomIndex, setZoomIndex] = useState<number | null>(null)

  return (
    <section id="galerie" className="bg-zinc-950 py-24 sm:py-32 border-t border-zinc-800/40" aria-labelledby="gallery-heading">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <div ref={headingRef} className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="font-mono text-[10px] font-bold text-amber-500/70 tracking-[0.3em] uppercase">
              FIELD DOCUMENTATION
            </span>
            <span className="flex-1 h-px bg-zinc-800/80 max-w-16" aria-hidden="true" />
          </motion.div>
          <motion.h2
            id="gallery-heading"
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08, ease: 'easeOut' }}
            className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-100 mb-3"
          >
            Realizace
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
            className="text-sm text-zinc-500 max-w-sm"
          >
            Dokumentace provedených prací. Od havarijních výjezdů po kompletní elektroinstalace.
          </motion.p>
        </div>

        {/* 5-image grid: 2 wide + 3 standard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Row 1: 2 wide images */}
          {IMAGES.slice(0, 2).map((img, i) => (
            <div key={img.code} className="lg:col-span-2">
              <ImageItem img={img} index={i} onZoom={setZoomIndex} />
            </div>
          ))}
          {/* Row 2: 3 standard images */}
          {IMAGES.slice(2).map((img, i) => (
            <div
              key={img.code}
              className={`
                ${i === 2 ? 'sm:col-span-2 lg:col-span-2' : 'lg:col-span-1'}
              `}
            >
              <ImageItem img={img} index={i + 2} onZoom={setZoomIndex} />
            </div>
          ))}
        </div>

      </div>

      {zoomIndex !== null && (
        <Lightbox index={zoomIndex} onClose={() => setZoomIndex(null)} />
      )}
    </section>
  )
}
