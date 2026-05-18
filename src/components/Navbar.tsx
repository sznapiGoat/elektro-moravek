import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Phone, Zap, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '#sluzby', label: 'Služby' },
  { href: '#recenze', label: 'Recenze' },
  { href: '#galerie', label: 'Galerie' },
  { href: '#kontakt', label: 'Kontakt' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/60'
          : 'bg-transparent'
      )}
    >
      <nav
        className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between"
        aria-label="Hlavní navigace"
      >
        <a
          href="#"
          className="flex items-center gap-2.5 group"
          aria-label="Elektro pohotovost Morávek – zpět na začátek"
        >
          <div className="w-8 h-8 bg-amber-500 flex items-center justify-center">
            <Zap className="w-4.5 h-4.5 text-zinc-950" aria-hidden="true" />
          </div>
          <span className="font-black text-sm tracking-widest uppercase text-zinc-100 leading-none">
            Morávek<span className="text-amber-500">.</span>
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-8" role="list">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors duration-150 tracking-wide"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="tel:+420775551927"
          className="hidden md:flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm transition-colors duration-150 tracking-wide"
          aria-label="Zavolat na číslo +420 775 551 927"
        >
          <Phone className="w-3.5 h-3.5" aria-hidden="true" />
          +420 775 551 927
        </a>

        <button
          className="md:hidden w-9 h-9 flex items-center justify-center text-zinc-400 hover:text-zinc-100 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Zavřít menu' : 'Otevřít menu'}
          aria-expanded={open}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-zinc-950 border-b border-zinc-800"
          >
            <ul className="px-5 py-4 space-y-1" role="list">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={() => setOpen(false)}
                    className="block py-2.5 text-sm font-medium text-zinc-300 hover:text-amber-400 transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li className="pt-3 pb-1">
                <a
                  href="tel:+420775551927"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm transition-colors"
                  aria-label="Zavolat na číslo +420 775 551 927"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  Zavolat nyní: +420 775 551 927
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
