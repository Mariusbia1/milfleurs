import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function Accordion({ items }) {
  const [open, setOpen] = useState(0)

  return (
    <div className="divide-y divide-stone-200/80 border-y border-stone-200/80 dark:divide-white/10 dark:border-white/10">
      {items.map((item, i) => (
        <div key={item.question} className="py-2">
          <button
            className="flex w-full items-center justify-between py-4 text-left font-display text-base font-semibold text-ink transition hover:text-gold sm:text-lg dark:text-white"
            onClick={() => setOpen(open === i ? -1 : i)}
            aria-expanded={open === i}
          >
            <span>{item.question}</span>
            <ChevronDown
              className={`h-4 w-4 shrink-0 text-stone-400 transition-transform duration-200 ${
                open === i ? 'rotate-180 text-gold' : ''
              }`}
            />
          </button>
          {open === i && (
            <p className="pb-5 text-sm leading-relaxed text-stone-600 dark:text-white/70">
              {item.answer}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
