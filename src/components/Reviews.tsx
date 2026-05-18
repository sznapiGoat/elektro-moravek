import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { Star, Quote } from 'lucide-react'

interface Review {
  id: string
  author: string
  handle: string
  platform: 'Google' | 'Mapy.cz'
  rating: 5
  text: string
  size?: 'large' | 'normal'
}

const REVIEWS: Review[] = [
  {
    id: 'alkoukal',
    author: 'Alkoukal',
    handle: 'Google recenze',
    platform: 'Google',
    rating: 5,
    text: 'Pana Morávka mohu vřele všem doporučit. Přijel rychle, jak slíbil a na čas. Práce odvedená na jedničku, poradí Vám, vyřeší každý problém.',
    size: 'large',
  },
  {
    id: 'stocklova',
    author: 'Jana Stocklova',
    handle: 'Google recenze',
    platform: 'Google',
    rating: 5,
    text: 'Super servis, pracují okamžitě, krátká doba, práce odvedená skvěle, čistě, poradí, vyřídí všechny potřebné věci.',
    size: 'normal',
  },
  {
    id: 'moravkova',
    author: 'Janna Morávková',
    handle: 'Mapy.cz recenze',
    platform: 'Mapy.cz',
    rating: 5,
    text: 'Vše v pořádku. Rychlá komunikace i dodání. Doporučuji.',
    size: 'normal',
  },
]

function StarRow({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Hodnocení ${count} z 5 hvězd`}>
      {[...Array(count)].map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" aria-hidden="true" />
      ))}
    </div>
  )
}

function PlatformBadge({ platform }: { platform: Review['platform'] }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-zinc-700/60 bg-zinc-800/40">
      <span
        className={`w-1.5 h-1.5 ${platform === 'Google' ? 'bg-blue-400' : 'bg-amber-400'}`}
        aria-hidden="true"
      />
      <span className="font-mono text-[9px] font-bold tracking-widest text-zinc-500 uppercase">
        {platform}
      </span>
    </span>
  )
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const ref = useRef<HTMLQuoteElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px 0px' })

  return (
    <motion.blockquote
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ y: -2, boxShadow: '0 8px 28px rgba(180, 83, 9, 0.10)' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`
        relative flex flex-col gap-5 p-6 border border-zinc-800/70 bg-zinc-900/40
        hover:border-zinc-700/60 hover:bg-zinc-900/60 transition-colors duration-200
        ${review.size === 'large' ? 'lg:row-span-2' : ''}
      `}
    >
      {/* Quote mark */}
      <Quote
        className="absolute top-5 right-5 w-7 h-7 text-zinc-800"
        aria-hidden="true"
      />

      {/* Platform + stars */}
      <div className="flex items-center gap-3">
        <PlatformBadge platform={review.platform} />
        <StarRow count={review.rating} />
      </div>

      {/* Review text */}
      <p className="text-sm sm:text-base text-zinc-300 leading-relaxed flex-1 pr-6">
        {review.text}
      </p>

      {/* Author */}
      <footer className="flex items-center gap-3 pt-4 border-t border-zinc-800/60">
        <div
          className="w-7 h-7 bg-amber-500/15 flex items-center justify-center font-black text-amber-400 text-xs"
          aria-hidden="true"
        >
          {review.author.charAt(0).toUpperCase()}
        </div>
        <div>
          <cite className="not-italic text-sm font-bold text-zinc-200 block leading-none">
            {review.author}
          </cite>
          <span className="text-[10px] text-zinc-600 font-medium uppercase tracking-wider">
            {review.handle}
          </span>
        </div>
      </footer>
    </motion.blockquote>
  )
}

export default function Reviews() {
  const headingRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headingRef, { once: true, margin: '-80px 0px' })

  return (
    <section id="recenze" className="bg-zinc-950 py-24 sm:py-32 border-t border-zinc-800/40" aria-labelledby="reviews-heading">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <div ref={headingRef} className="mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="font-mono text-[10px] font-bold text-amber-500/70 tracking-[0.3em] uppercase">
                TRUST SCORE
              </span>
              <span className="flex-1 h-px bg-zinc-800/80 max-w-16" aria-hidden="true" />
            </motion.div>
            <motion.h2
              id="reviews-heading"
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08, ease: 'easeOut' }}
              className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-100 mb-3"
            >
              Co říkají zákazníci
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
              className="text-sm text-zinc-500 max-w-xs"
            >
              Ověřené recenze z Google a Mapy.cz. Celkové hodnocení 5.0 hvězd.
            </motion.p>
          </div>

          {/* Aggregate score */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.25, ease: 'easeOut' }}
            className="flex items-center gap-4 p-5 border border-amber-500/30 bg-amber-500/5 shrink-0"
          >
            <div>
              <div className="text-4xl font-black text-amber-400 leading-none tabular-nums">5.0</div>
              <div className="flex items-center gap-1 mt-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" aria-hidden="true" />
                ))}
              </div>
            </div>
            <div className="w-px h-10 bg-amber-500/20" aria-hidden="true" />
            <div>
              <div className="text-2xl font-black text-zinc-100 leading-none">50+</div>
              <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider mt-1">recenzí</div>
            </div>
          </motion.div>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4" role="list">
          {/* Large card — spans 2 rows on desktop */}
          <div className="lg:row-span-2" role="listitem">
            <ReviewCard review={REVIEWS[0]} index={0} />
          </div>
          {/* Two smaller cards stacked */}
          <div className="flex flex-col gap-4" role="listitem">
            <ReviewCard review={REVIEWS[1]} index={1} />
            <ReviewCard review={REVIEWS[2]} index={2} />
          </div>
        </div>

      </div>
    </section>
  )
}
