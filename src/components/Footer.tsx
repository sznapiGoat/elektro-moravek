import { Zap, Phone, MapPin } from 'lucide-react'

const MAPS_URL = 'https://www.google.com/maps?cid=5862024888204172403'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/60" role="contentinfo">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-amber-500 flex items-center justify-center shrink-0">
              <Zap className="w-3.5 h-3.5 text-zinc-950" aria-hidden="true" />
            </div>
            <div>
              <div className="font-black text-xs tracking-widest uppercase text-zinc-100">
                Elektro pohotovost Morávek
              </div>
              <div className="font-mono text-[9px] text-zinc-600 tracking-widest">IČO 06153194</div>
            </div>
          </div>

          {/* Emergency line */}
          <a
            href="tel:+420775551927"
            className="flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-amber-400 transition-colors duration-200 tracking-wide uppercase"
            aria-label="Pohotovostní linka +420 775 551 927"
          >
            <Phone className="w-3.5 h-3.5" aria-hidden="true" />
            +420 775 551 927
          </a>

          {/* Address → Google Maps */}
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[10px] font-medium text-zinc-600 hover:text-amber-400 transition-colors duration-200 tracking-wide"
            aria-label="Otevřít adresu v Google Maps: Pohoří, Chotouň ev. č. 423, 254 01"
          >
            <MapPin className="w-3 h-3 shrink-0" aria-hidden="true" />
            Pohoří, Chotouň ev. č. 423, 254 01
          </a>

          {/* Copyright */}
          <div className="font-mono text-[10px] text-zinc-700 tracking-wider">
            © {year} Jan Morávek
          </div>
        </div>
      </div>
    </footer>
  )
}
