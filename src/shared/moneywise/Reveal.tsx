import React from 'react'
import { motion, useReducedMotion, Variants } from 'framer-motion'

import { EASE } from './site'

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } },
}

type Props = {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section' | 'li' | 'article'
}

/** Fades content up the first time it scrolls into view. */
export function Reveal({ children, className, delay = 0, as = 'div' }: Props) {
  const reduce = useReducedMotion()
  const Tag = motion[as] as typeof motion.div
  if (reduce) return <div className={className}>{children}</div>
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: item.hidden,
        show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE, delay } },
      }}
    >
      {children}
    </Tag>
  )
}

/** A group whose StaggerItem children reveal one after another, 50ms apart. */
export function Stagger({
  children,
  className,
  as = 'div',
}: {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'ul' | 'ol' | 'tbody'
}) {
  const reduce = useReducedMotion()
  const Tag = motion[as] as typeof motion.div
  return (
    <Tag
      className={className}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
    >
      {children}
    </Tag>
  )
}

export const staggerItem = item
