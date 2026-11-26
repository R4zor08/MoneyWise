import React, { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { Leaf, Menu, X } from 'lucide-react'

import { PAGES, PageKey, EASE } from './site'

type Props = {
  active: PageKey
  onNavigate?: (page: PageKey) => void
}

/** Full-width transparent bar: clear over the hero, a light frosted veil once you scroll, with a reading-progress line. */
export function SiteHeader({ active, onNavigate }: Props) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 300, damping: 40, restDelta: 0.001 })
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > window.innerHeight * 0.85))
  const clear = !scrolled && !open

  const go = (k: PageKey) => {
    setOpen(false)
    onNavigate?.(k)
  }

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-[background-color,border-color] duration-200 ease-out ${
        clear ? 'border-white/15 bg-transparent' : 'border-line/70 bg-paper/70 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <button onClick={() => go('home')} className="flex shrink-0 items-center gap-2.5">
          <span
            className={`grid h-9 w-9 place-items-center rounded-lg transition-colors duration-200 ${
              clear ? 'bg-mint text-emerald-deep' : 'bg-brand text-white'
            }`}
          >
            <Leaf className="h-5 w-5" strokeWidth={2.2} />
          </span>
          <span
            className={`font-display text-xl font-semibold tracking-tight transition-colors duration-200 ${
              clear ? 'text-white' : 'text-emerald-deep'
            }`}
          >
            MoneyWise
          </span>
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          {PAGES.map((p) => {
            const isActive = p.key === active
            return (
              <button
                key={p.key}
                onClick={() => go(p.key)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-150 ${
                  clear
                    ? isActive
                      ? 'text-white'
                      : 'text-white/75 hover:text-white'
                    : isActive
                      ? 'text-emerald-deep'
                      : 'text-muted hover:text-ink'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="mw-nav-pill"
                    className={`absolute inset-0 rounded-full ${clear ? 'bg-white/15' : 'bg-brand-soft'}`}
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  />
                )}
                <span className="relative">{p.short}</span>
              </button>
            )
          })}
        </nav>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className={`grid h-10 w-10 place-items-center rounded-lg transition-colors duration-150 lg:hidden ${
            clear ? 'text-white hover:bg-white/15' : 'text-ink hover:bg-beige'
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? 'x' : 'menu'}
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.15, ease: EASE }}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className={`absolute inset-x-0 bottom-[-1px] h-0.5 origin-left ${clear ? 'bg-mint' : 'bg-brand'}`}
      />

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="overflow-hidden border-t border-line bg-paper/95 backdrop-blur-md lg:hidden"
          >
            <div className="mx-auto max-w-6xl px-5 py-3 sm:px-8">
              {PAGES.map((p, i) => (
                <motion.button
                  key={p.key}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, ease: EASE, delay: i * 0.035 }}
                  onClick={() => go(p.key)}
                  className={`block w-full rounded-lg px-4 py-3 text-left text-base font-medium ${
                    p.key === active ? 'bg-brand-soft text-emerald-deep' : 'text-ink'
                  }`}
                >
                  {p.label}
                </motion.button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
