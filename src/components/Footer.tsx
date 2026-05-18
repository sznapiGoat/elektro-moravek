import { Zap, Phone, MapPin } from 'lucide-react'

const MAPS_URL = 'https://www.google.com/maps/place/Elektropr%C3%A1ce+Mor%C3%A1vek/@49.8722056,14.5107395,3127m/data=!3m1!1e3!4m16!1m9!3m8!1s0x470b85e037d8bcf1:0xe295da8be23f221c!2sElektropr%C3%A1ce+Mor%C3%A1vek!8m2!3d49.8752778!4d14.5118052!9m1!1b1!16s%2Fg%2F11mvw93c79!3m5!1s0x470b85e037d8bcf1:0xe295da8be23f221c!8m2!3d49.8752778!4d14.5118052!16s%2Fg%2F11mvw93c79?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D'

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
