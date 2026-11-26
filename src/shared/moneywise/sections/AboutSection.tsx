import React from 'react'
import { ArrowRight, BookOpen, HeartHandshake, Sprout, Users } from 'lucide-react'

import { PageIntro } from '../PageIntro'
import { PageKey } from '../site'
import { IMAGES } from '../site'
import { motion } from 'framer-motion'
import { Reveal, Stagger, staggerItem } from '../Reveal'

type Props = Partial<typeof args> & { onNavigate?: (page: PageKey) => void }

export function AboutSection(props: Props) {
  const { author, mission, onNavigate } = { ...args, ...props }

  return (
    <div id="about" className="scroll-mt-16 bg-paper font-sans text-ink">

      <PageIntro
        kicker="About MoneyWise"
        title="Making money management simple for everyone"
        lead="MoneyWise was created as an educational website for Business and Financial Management. It brings the basics of handling business money together in one easy-to-read place."
        image={IMAGES.about}
        imageAlt="Two young entrepreneurs reviewing figures at their market stall"
        onNavigate={onNavigate}
      />

      {/* Mission */}
      <section className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 md:py-24">
        <Reveal>
          <p className="text-sm font-semibold text-brand">Our mission</p>
          <p className="mt-5 font-display text-2xl font-medium leading-snug tracking-tight text-emerald-deep sm:text-4xl">
            “{mission}”
          </p>
        </Reveal>
      </section>

      {/* Purpose + how it helps */}
      <section className="bg-beige">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 md:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <h2 className="font-display text-[2.1rem] font-semibold leading-[1.05] tracking-tight text-emerald-deep sm:text-5xl">
              The purpose of MoneyWise
            </h2>
            <p className="mt-5 leading-relaxed text-muted">
              Many small business owners are experts at what they sell, but have never
              been taught how to manage the money behind it. MoneyWise provides useful
              information, simple financial guides, and practical tips so they can manage
              their budget, expenses, and profit wisely.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              It is also a learning resource for students who want to understand how
              real businesses handle their finances.
            </p>
          </Reveal>

          <div>
            <h3 className="text-lg font-semibold text-ink">How this website helps</h3>
            <Stagger as="ul" className="mt-5 divide-y divide-line border-y border-line">
              {HOW.map((h) => (
                <motion.li variants={staggerItem} key={h.title} className="flex gap-5 py-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-brand">
                    <h.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{h.title}</p>
                    <p className="mt-1 leading-relaxed text-muted">{h.body}</p>
                  </div>
                </motion.li>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal className="flex flex-col items-start gap-6 rounded-2xl bg-brand px-7 py-10 text-white sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <div>
            <p className="font-display text-2xl font-semibold sm:text-3xl">Want to go over it again?</p>
            <p className="mt-1 text-white/75">Start the money cycle again from the first step.</p>
          </div>
          <button
            onClick={() => onNavigate?.('budget')}
            className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-5 py-3 text-sm font-semibold text-emerald-deep transition-[background-color,transform] duration-150 ease-out hover:bg-mint active:scale-[0.97]"
          >
            Budget Management <ArrowRight className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-1" />
          </button>
        </Reveal>
      </section>

    </div>
  )
}

const args = {
  author: '[Your Complete Name]',
  mission:
    'To help small business owners make smarter money decisions through simple, practical, and easy-to-understand financial guidance.',
}

const argTypes = {
  author: { control: 'text' },
  mission: { control: 'text' },
}

const HOW = [
  { icon: BookOpen, title: 'Explains in plain language', body: 'Every topic avoids heavy jargon and uses everyday business examples.' },
  { icon: Sprout, title: 'Teaches step by step', body: 'Pages follow the money cycle: budget, income and expenses, then profit.' },
  { icon: Users, title: 'Uses real-life examples', body: 'Sample budgets, records, and calculations show how the ideas work.' },
  { icon: HeartHandshake, title: 'Gives practical tips', body: 'Simple habits owners can start using in their business today.' },
]
