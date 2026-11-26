import React, { useRef } from 'react'
import { motion, MotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion'

/** A huge sentence whose words light up one by one as it scrolls through the screen. */
export function ScrollStatement({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')

  return (
    <p
      ref={ref}
      className={`font-display text-[2rem] font-semibold leading-[1.12] tracking-tight text-emerald-deep sm:text-5xl lg:text-6xl ${className}`}
    >
      {words.map((w, i) => (
        <Word
          key={i}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          still={!!reduce}
        >
          {w}
        </Word>
      ))}
    </p>
  )
}

function Word({
  children,
  progress,
  range,
  still,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
  still: boolean
}) {
  const opacity = useTransform(progress, range, [0.15, 1])
  return (
    <motion.span style={still ? undefined : { opacity }} className="inline-block">
      {children}
      {'\u00a0'}
    </motion.span>
  )
}
