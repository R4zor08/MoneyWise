import React, { useState } from 'react'
import { Ban, Check, ClipboardList, PiggyBank, Rocket, Wallet } from 'lucide-react'

import { PageKey } from '../site'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal, Stagger, staggerItem } from '../Reveal'
import { SplitWords } from '../SplitWords'

type Props = Partial<typeof args> & { onNavigate?: (page: PageKey) => void }

export function TipsSection(props: Props) {
  const { author, onNavigate } = { ...args, ...props }
  const [done, setDone] = useState<string[]>([])
  const toggle = (h: string) =>
    setDone((d) => (d.includes(h) ? d.filter((x) => x !== h) : [...d, h]))

  return (
    <div id="tips" className="scroll-mt-16 bg-paper font-sans text-ink">

      {/* Intro */}
      <section className="bg-emerald-deep text-white">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
            <div>
              <p className="text-sm font-semibold text-mint sm:text-base">Financial Tips</p>
              <h2 className="mt-3 font-display text-[2.6rem] font-semibold leading-[0.98] tracking-tight sm:text-7xl lg:text-8xl">
                <SplitWords text="Small habits." delay={0.05} inView />
                <br />
                <span className="text-mint">
                  <SplitWords text="Healthy business." delay={0.15} inView />
                </span>
              </h2>
            </div>
            <Reveal className="rounded-2xl bg-white/[0.07] p-6 ring-1 ring-white/15">
              <p className="text-sm text-mint">The golden rule</p>
              <p className="mt-2 font-display text-xl leading-snug">
                Never mix business money with personal money. Keep a separate wallet,
                cash box, or bank account for the business.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Tips: the one habit that matters most leads, the rest follow as a list */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <Reveal className="flex flex-col rounded-3xl bg-brand p-8 text-white sm:p-10 lg:sticky lg:top-24 lg:self-start">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-mint text-emerald-deep">
              <FEATURED.icon className="h-6 w-6" />
            </span>
            <p className="mt-8 text-sm font-semibold text-mint">Start here</p>
            <h2 className="mt-2 font-display text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl">
              {FEATURED.title}
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-white/85">{FEATURED.lead}</p>
            <ul className="mt-8 space-y-3.5 border-t border-white/20 pt-6">
              {FEATURED.points.map((p) => (
                <li key={p} className="flex gap-3 leading-relaxed">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-mint" strokeWidth={2.6} />
                  <span className="text-white/90">{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Stagger as="ol" className="divide-y divide-line border-y border-line">
            {REST.map((t) => (
              <motion.li variants={staggerItem} key={t.title} className="grid grid-cols-[2.5rem_1fr] gap-x-5 py-8">
                <t.icon className="mt-1 h-6 w-6 text-brand" />
                <div className="min-w-0">
                  <h3 className="font-display text-2xl font-semibold text-emerald-deep">{t.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-muted">{t.lead}</p>
                  <ul className="mt-4 space-y-2">
                    {t.points.map((p) => (
                      <li key={p} className="flex gap-3 text-sm leading-relaxed text-ink/85">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Weekly checklist */}
      <section className="bg-beige">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <h2 className="font-display text-[2.1rem] font-semibold leading-[1.05] tracking-tight text-emerald-deep sm:text-5xl">
              Your weekly money checklist
            </h2>
            <p className="mt-5 leading-relaxed text-muted">
              Try these habits every week. Tick them off as you go — small, regular
              checks prevent big problems later.
            </p>
            <p className="mt-6 flex items-baseline font-display text-5xl font-semibold text-brand tabular-nums">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={done.length}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                >
                  {done.length}
                </motion.span>
              </AnimatePresence>
              <span className="text-2xl text-muted">/{HABITS.length}</span>
            </p>
            <p className="text-sm text-muted">habits done this week</p>
            <div className="mt-4 h-1.5 max-w-xs overflow-hidden rounded-full bg-sand">
              <motion.div
                className="h-full origin-left rounded-full bg-brand"
                animate={{ scaleX: done.length / HABITS.length }}
                initial={false}
                transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              />
            </div>
          </Reveal>
          <Stagger as="ul" className="space-y-3">
            {HABITS.map((h) => {
              const on = done.includes(h)
              return (
                <motion.li variants={staggerItem} key={h}>
                  <button
                    onClick={() => toggle(h)}
                    aria-pressed={on}
                    className={`flex w-full items-center gap-4 rounded-xl bg-white px-5 py-4 text-left ring-1 transition-[box-shadow,transform] duration-150 ease-out active:scale-[0.99] ${
                      on ? 'ring-brand' : 'ring-line hover:ring-brand/40'
                    }`}
                  >
                    <span
                      className={`grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 transition-colors duration-150 ${
                        on ? 'border-brand bg-brand text-white' : 'border-line'
                      }`}
                    >
                      <AnimatePresence initial={false}>
                        {on && (
                          <motion.span
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 600, damping: 30 }}
                          >
                            <Check className="h-4 w-4" strokeWidth={3} />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                    <span className={on ? 'text-muted line-through' : 'text-ink'}>{h}</span>
                  </button>
                </motion.li>
              )
            })}
          </Stagger>
        </div>
      </section>

    </div>
  )
}

const args = {
  author: '[Your Complete Name]',
}

const argTypes = {
  author: { control: 'text' },
}

const TIPS = [
  {
    icon: PiggyBank,
    title: 'Save regularly',
    lead: 'Treat savings like a bill you must pay first, not whatever is left at the end.',
    points: [
      'Set aside 10–20% of every day’s income before spending anything.',
      'Build an emergency fund that can cover at least three months of expenses.',
      'Keep savings in a separate bank account so it is not easy to touch.',
      'Reinvest part of your profit to grow the business.',
    ],
  },
  {
    icon: Wallet,
    title: 'Stick to your budget',
    lead: 'A budget only works if you follow it and update it.',
    points: [
      'Review your budget at the start of every month.',
      'Adjust limits when prices or sales change.',
    ],
  },
  {
    icon: ClipboardList,
    title: 'Track every expense',
    lead: 'Small costs add up faster than you think.',
    points: [
      'Keep every receipt and record it the same day.',
      'Group expenses into categories to spot the biggest ones.',
    ],
  },
  {
    icon: Ban,
    title: 'Avoid unnecessary spending',
    lead: 'Ask “Will this help my business earn more?” before buying.',
    points: [
      'Separate needs from wants, and buy needs first.',
      'Compare prices from at least two suppliers.',
    ],
  },
  {
    icon: Rocket,
    title: 'Plan for the future',
    lead: 'Think beyond this month and set clear money goals.',
    points: [
      'Set goals such as new equipment or a second branch.',
      'Avoid borrowing unless you have a plan to repay it.',
    ],
  },
]

const [FEATURED, ...REST] = TIPS

const HABITS = [
  'Recorded all sales and expenses',
  'Counted the cash box and matched it to my records',
  'Set aside this week’s savings',
  'Checked spending against my budget',
  'Paid bills and suppliers on time',
]
