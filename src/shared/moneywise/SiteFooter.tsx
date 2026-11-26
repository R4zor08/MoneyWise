import React from 'react'
import { ArrowUp, Leaf } from 'lucide-react'

import { PageKey } from './site'

type Props = {
  author: string
  onNavigate?: (page: PageKey) => void
}

/** One quiet line: who made it, and a way back up. The sticky header already carries the menu. */
export function SiteFooter({ author, onNavigate }: Props) {
  return (
    <footer className="bg-emerald-deep text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-mint text-emerald-deep">
            <Leaf className="h-4 w-4" strokeWidth={2.4} />
          </span>
          <p className="min-w-0 text-sm text-white/70">
            <span className="font-display text-base font-semibold text-white">MoneyWise</span>
            <span className="mx-2 text-white/30">·</span>
            Created by <span className="font-medium text-white">{author}</span>
          </p>
        </div>

        <div className="flex items-center justify-between gap-5 sm:justify-end">
          <p className="text-xs text-white/60">© 2026 MoneyWise</p>
          <button
            onClick={() => onNavigate?.('home')}
            className="group inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium text-white/80 ring-1 ring-white/20 transition-[background-color,color,transform] duration-150 ease-out hover:bg-white/10 hover:text-white active:scale-[0.97]"
          >
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-150 ease-out group-hover:-translate-y-0.5" />
            Top
          </button>
        </div>
      </div>
    </footer>
  )
}
