import React, { useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import { EASE, IMAGES, PageKey } from '../../shared/moneywise/site'

/** Pinned section: the screen holds still while scrolling steps through budget → income → expenses → profit. */
export function MoneyCycle({ onNavigate }: { onNavigate?: (page: PageKey) => void }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(STEPS.length - 1, Math.max(0, Math.floor(v * STEPS.length)))
    if (next !== active) setActive(next)
  })

  const step = STEPS[active]

  return (
    <section ref={ref} className="relative bg-emerald-deep text-white" style={{ height: `${STEPS.length * 85}svh` }}>
      <div
        className="sticky top-16 flex flex-col overflow-hidden"
        style={{ height: 'calc(100svh - 4rem)' }}
      >
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-8 sm:px-8 md:py-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-semibold leading-none tracking-tight sm:text-5xl">
              The money cycle
            </h2>
            <ol className="flex gap-1.5">
              {STEPS.map((s, i) => (
                <li key={s.title} className="h-1 w-8 overflow-hidden rounded-full bg-white/15 sm:w-14">
                  <motion.div
                    className="h-full origin-left bg-mint"
                    initial={false}
                    animate={{ scaleX: i <= active ? 1 : 0 }}
                    transition={{ duration: 0.25, ease: EASE }}
                  />
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-6 grid min-h-0 flex-1 gap-6 md:mt-10 md:grid-cols-[1fr_1.1fr] md:items-center md:gap-12">
            {/* Copy */}
            <div className="order-2 md:order-1">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -24 }}
                  transition={{ duration: 0.25, ease: EASE }}
                >
                  <p className="font-display text-6xl font-semibold leading-none text-mint/30 sm:text-8xl">
                    0{active + 1}
                  </p>
                  <h3 className="mt-2 font-display text-5xl font-semibold leading-none tracking-tight sm:text-7xl">
                    {step.title}
                  </h3>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-white/75 sm:text-lg">
                    {step.body}
                  </p>
                  <button
                    onClick={() => onNavigate?.(step.page)}
                    className="group mt-7 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-5 py-3 text-sm font-semibold text-emerald-deep transition-[background-color,transform] duration-150 ease-out hover:bg-mint active:scale-[0.97]"
                  >
                    {step.cta}
                    <ArrowRight className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-1" />
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Picture */}
            <div className="relative order-1 h-44 overflow-hidden rounded-3xl sm:h-64 md:order-2 md:h-[min(460px,100%)]">
              <AnimatePresence initial={false}>
                <motion.img
                  key={active}
                  src={step.image}
                  alt={step.alt}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const STEPS: { title: string; body: string; cta: string; page: PageKey; image: string; alt: string }[] = [
  {
    title: 'Budget',
    body: 'Plan how money will be earned and spent before the month begins, so every peso has a job.',
    cta: 'Budget Management',
    page: 'budget',
    image: IMAGES.hero,
    alt: 'A business owner planning in her notebook',
  },
  {
    title: 'Income',
    body: 'All the money that comes into the business — mostly from sales of products and services.',
    cta: 'Income and Expenses',
    page: 'income',
    image: IMAGES.income,
    alt: 'A customer paying at a cafe counter',
  },
  {
    title: 'Expenses',
    body: 'All the money that goes out to keep the business running: supplies, rent, wages, and bills.',
    cta: 'Income and Expenses',
    page: 'income',
    image: IMAGES.budget,
    alt: 'Receipts for gas, groceries and supplies beside a calculator',
  },
  {
    title: 'Profit',
    body: 'What the business keeps after expenses are subtracted from income — the real measure of success.',
    cta: 'Profit Management',
    page: 'profit',
    image: IMAGES.profit,
    alt: 'A shop owner reviewing a rising profit chart',
  },
]
