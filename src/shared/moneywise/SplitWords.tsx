import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

import { EASE } from './site'

/** Each word rises out of a mask, one after another — the big-headline entrance. */
export function SplitWords({
  text,
  delay = 0,
  step = 0.045,
  inView = false,
}: {
  text: string
  delay?: number
  step?: number
  /** Wait until the headline scrolls into view instead of playing on load. */
  inView?: boolean
}) {
  const reduce = useReducedMotion()
  if (reduce) return <>{text}</>
  return (
    <>
      {text.split(' ').map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '105%' }}
            {...(inView
              ? { whileInView: { y: '0%' }, viewport: { once: true } }
              : { animate: { y: '0%' } })}
            transition={{ duration: 0.3, ease: EASE, delay: delay + i * step }}
          >
            {w}
            {'\u00a0'}
          </motion.span>
        </span>
      ))}
    </>
  )
}
