import React, { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'

import { EASE, IMAGES, PageKey } from '../../shared/moneywise/site'
import { SplitWords } from '../../shared/moneywise/SplitWords'

type Props = { welcome: string; onNavigate?: (page: PageKey) => void }

/** Full-bleed hero: the photo zooms and drifts as you scroll while the headline lifts away. */
export function CinematicHero({ welcome, onNavigate }: Props) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1.35])
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%'])
  const fade = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  return (
    <section
      ref={ref}
      className="relative isolate -mt-16 flex min-h-[640px] overflow-hidden bg-emerald-deep"
      style={{ height: '100svh' }}
    >
      <motion.img
        src={IMAGES.hero}
        alt="A bakery owner recording sales in a notebook with a calculator"
        style={reduce ? undefined : { scale, y: imgY }}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center]"
      />
      <div className="absolute inset-0 -z-10 bg-emerald-deep/65" />

      <motion.div
        style={reduce ? undefined : { y: textY, opacity: fade }}
        className="mx-auto flex w-full max-w-6xl flex-col justify-end px-5 pb-12 sm:px-8 sm:pb-16"
      >
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="text-sm font-semibold text-mint sm:text-base"
        >
          MoneyWise – Smart Financial Management
        </motion.p>
        <h1 className="mt-4 font-display text-[3.4rem] font-semibold leading-[0.92] tracking-tight text-white sm:text-8xl lg:text-[8.5rem]">
          <SplitWords text="Smart money." delay={0.1} />
          <br />
          <span className="text-mint">
            <SplitWords text="Strong business." delay={0.25} />
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: EASE, delay: 0.5 }}
            className="max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
          >
            {welcome}
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: EASE, delay: 0.6 }}
            className="flex flex-wrap gap-3"
          >
            <button
              onClick={() => onNavigate?.('budget')}
              className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-mint px-6 py-3.5 text-sm font-semibold text-emerald-deep transition-[background-color,transform] duration-150 ease-out hover:bg-white active:scale-[0.97]"
            >
              Start with budgeting
              <ArrowRight className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => onNavigate?.('tips')}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full px-6 py-3.5 text-sm font-semibold text-white ring-1 ring-white/35 transition-[background-color,transform] duration-150 ease-out hover:bg-white/10 active:scale-[0.97]"
            >
              Read financial tips
            </button>
          </motion.div>
        </div>

        <div className="mt-10 hidden items-center gap-2 text-xs text-white/60 md:flex">
          <motion.span
            animate={reduce ? undefined : { y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="h-4 w-4" />
          </motion.span>
          Scroll to explore
        </div>
      </motion.div>
    </section>
  )
}
