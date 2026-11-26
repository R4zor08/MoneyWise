import React, { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

import { EASE, PageKey } from './site'
import { SplitWords } from './SplitWords'

type Props = {
  kicker: string
  title: string
  lead: string
  image: string
  imageAlt: string
  onNavigate?: (page: PageKey) => void
}

/** Cinematic chapter opener: a full-bleed photo that zooms as you scroll, with huge type over it. */
export function PageIntro({ kicker, title, lead, image, imageAlt, onNavigate }: Props) {
  const shown = useRef<HTMLHeadingElement>(null)
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25])
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative isolate flex min-h-[520px] overflow-hidden bg-emerald-deep sm:min-h-[600px]" style={{ height: '72svh' }}>
      <motion.img
        src={image}
        alt={imageAlt}
        style={reduce ? undefined : { scale, y }}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-emerald-deep/60" />

      <motion.div
        style={reduce ? undefined : { y: textY, opacity: fade }}
        className="mx-auto flex w-full max-w-6xl flex-col justify-end px-5 pb-12 pt-8 sm:px-8 sm:pb-16"
      >
        <div>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: EASE }}
            className="flex items-center gap-3 text-sm font-semibold text-mint sm:text-base"
          >
            <span aria-hidden className="h-px w-8 bg-mint/60" />
            {kicker}
          </motion.p>
          <h2 ref={shown} className="mt-3 max-w-5xl font-display text-[2.6rem] font-semibold leading-[0.98] tracking-tight text-white sm:text-7xl lg:text-8xl">
            <SplitWords text={title} delay={0.08} inView />
          </h2>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: EASE, delay: 0.45 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg"
          >
            {lead}
          </motion.p>
        </div>
      </motion.div>
    </section>
  )
}
