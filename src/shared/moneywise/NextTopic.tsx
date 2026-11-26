import React from 'react'
import { ArrowRight, Home } from 'lucide-react'

import { PAGES, PageKey } from './site'
import { Reveal } from './Reveal'

type Props = {
  next: PageKey
  onNavigate?: (page: PageKey) => void
}

/** End-of-page wayfinding: continue to the next topic, or go back home. */
export function NextTopic({ next, onNavigate }: Props) {
  const page = PAGES.find((p) => p.key === next)!
  return (
    <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
      <Reveal className="flex flex-col gap-6 rounded-2xl bg-brand px-7 py-9 text-white sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <div>
          <p className="text-sm text-mint">Up next</p>
          <p className="mt-1 font-display text-2xl font-semibold sm:text-3xl">{page.label}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate?.('home')}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/30 px-5 py-3 text-sm font-semibold transition-colors duration-150 hover:bg-white/10"
          >
            <Home className="h-4 w-4" /> Back to Home
          </button>
          <button
            onClick={() => onNavigate?.(next)}
            className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-5 py-3 text-sm font-semibold text-emerald-deep transition-[background-color,transform] duration-150 ease-out hover:bg-beige active:scale-[0.97]"
          >
            Continue <ArrowRight className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-1" />
          </button>
        </div>
      </Reveal>
    </section>
  )
}
