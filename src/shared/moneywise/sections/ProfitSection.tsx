import React from 'react'
import { BarChart3, CalendarDays, Percent, Search, Tags } from 'lucide-react'

import { PageIntro } from '../PageIntro'
import { IMAGES, PageKey, peso } from '../site'
import { motion } from 'framer-motion'
import { Reveal, Stagger, staggerItem } from '../Reveal'
import { CountUp } from '../CountUp'
import { ProfitCalculator } from './ProfitCalculator'

type Props = Partial<typeof args> & { onNavigate?: (page: PageKey) => void }

export function ProfitSection(props: Props) {
  const { author, onNavigate } = { ...args, ...props }
  const totalIncome = INCOME_ITEMS.reduce((s, i) => s + i.amount, 0)
  const totalExpenses = EXPENSE_ITEMS.reduce((s, i) => s + i.amount, 0)
  const net = totalIncome - totalExpenses
  const margin = totalIncome > 0 ? Math.round((net / totalIncome) * 100) : 0
  const maxMonth = Math.max(...MONTHS.map((m) => m.profit))

  return (
    <div id="profit" className="scroll-mt-16 bg-paper font-sans text-ink">

      <PageIntro
        kicker="Profit Management"
        title="Profit is what your business really keeps"
        lead="Profit is the money left after all expenses have been paid from the income. It is the clearest sign of whether a business is truly succeeding."
        image={IMAGES.profit}
        imageAlt="A shop owner reviewing a rising bar chart on her laptop"
        onNavigate={onNavigate}
      />

      {/* Formula */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1fr_1.3fr] md:items-center">
          <Reveal>
            <h2 className="font-display text-[2.1rem] font-semibold leading-[1.05] tracking-tight text-emerald-deep sm:text-5xl">
              What is profit?
            </h2>
            <p className="mt-5 leading-relaxed text-muted">
              When income is <strong className="text-ink">greater</strong> than expenses,
              the business earns a profit. When expenses are greater than income, the
              business suffers a <strong className="text-loss">loss</strong>.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Net profit is the final amount after <em>every</em> cost — materials, rent,
              wages, bills, and others — has been subtracted.
            </p>
          </Reveal>

          <Reveal delay={0.06} className="rounded-3xl bg-emerald-deep p-7 text-white sm:p-10">
            <p className="text-sm text-mint">The formula</p>
            <Stagger className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3 font-display text-2xl font-semibold sm:text-3xl">
              <motion.span variants={staggerItem} className="rounded-xl bg-mint px-4 py-2 text-emerald-deep">Net Profit</motion.span>
              <motion.span variants={staggerItem} className="text-white/60">=</motion.span>
              <motion.span variants={staggerItem}>Total Income</motion.span>
              <motion.span variants={staggerItem} className="text-white/60">−</motion.span>
              <motion.span variants={staggerItem}>Total Expenses</motion.span>
            </Stagger>
          </Reveal>
        </div>
      </section>

      {/* Sample calculation */}
      <section className="bg-beige">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <h2 className="font-display text-[2.1rem] font-semibold leading-[1.05] tracking-tight text-emerald-deep sm:text-5xl">
            Sample calculation
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            A small milk tea shop recorded these totals for one month:
          </p>

          <Stagger className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            <motion.div variants={staggerItem} className="rounded-2xl bg-white p-6 sm:p-8">
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold text-brand">Total Income</p>
                  <ul className="mt-3 space-y-2 text-sm">
                    {INCOME_ITEMS.map((i) => (
                      <li key={i.label} className="flex justify-between gap-4">
                        <span className="text-muted">{i.label}</span>
                        <span className="tabular-nums">{peso(i.amount)}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 flex justify-between border-t border-line pt-3 font-semibold">
                    <span>Total</span>
                    <span className="tabular-nums text-brand">{peso(totalIncome)}</span>
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-loss">Total Expenses</p>
                  <ul className="mt-3 space-y-2 text-sm">
                    {EXPENSE_ITEMS.map((i) => (
                      <li key={i.label} className="flex justify-between gap-4">
                        <span className="text-muted">{i.label}</span>
                        <span className="tabular-nums">{peso(i.amount)}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 flex justify-between border-t border-line pt-3 font-semibold">
                    <span>Total</span>
                    <span className="tabular-nums text-loss">{peso(totalExpenses)}</span>
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={staggerItem} className="flex flex-col justify-center rounded-2xl border-2 border-brand bg-white p-6 sm:p-8">
              <p className="text-sm text-muted">Solution</p>
              <p className="mt-3 font-mono text-sm leading-7 text-ink sm:text-base">
                Net Profit = {peso(totalIncome)} − {peso(totalExpenses)}
              </p>
              <p
                className={`mt-2 font-display text-5xl font-semibold tabular-nums tracking-tight ${
                  net >= 0 ? 'text-brand' : 'text-loss'
                }`}
              >
                <CountUp value={net} format={peso} />
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                {net >= 0 ? (
                  <>
                    The shop earned a <strong className="text-ink">profit</strong>. It kept{' '}
                    <strong className="text-ink">{margin}%</strong> of every peso earned.
                  </>
                ) : (
                  <>
                    The shop had a <strong className="text-loss">loss</strong>. Expenses were
                    higher than income this month.
                  </>
                )}
              </p>
            </motion.div>
          </Stagger>
        </div>
      </section>

      <ProfitCalculator />

      {/* Monitoring */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="font-display text-[2.1rem] font-semibold leading-[1.05] tracking-tight text-emerald-deep sm:text-5xl">
              How to monitor your profit
            </h2>
            <Stagger as="ul" className="mt-8 divide-y divide-line border-y border-line">
              {MONITOR.map((m) => (
                <motion.li variants={staggerItem} key={m.title} className="flex gap-5 py-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
                    <m.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink">{m.title}</h3>
                    <p className="mt-1 leading-relaxed text-muted">{m.body}</p>
                  </div>
                </motion.li>
              ))}
            </Stagger>
          </div>

          <Reveal className="self-start rounded-2xl bg-beige p-6 sm:p-8">
            <p className="font-semibold text-ink">Monthly net profit</p>
            <p className="text-sm text-muted">Comparing months shows the trend at a glance.</p>
            <Stagger className="mt-8 flex h-48 items-end gap-2 sm:gap-3">
              {MONTHS.map((m) => (
                <div key={m.month} className="flex min-w-0 flex-1 flex-col items-center gap-2">
                  <span className="text-xs tabular-nums text-muted">{(m.profit / 1000).toFixed(1)}k</span>
                  <motion.div
                    variants={{
                      hidden: { scaleY: 0 },
                      show: { scaleY: 1, transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] } },
                    }}
                    className="w-full origin-bottom rounded-t-md bg-brand"
                    style={{ height: `${(m.profit / maxMonth) * 140}px`, opacity: m.month === 'Jun' ? 1 : 0.55 }}
                  />
                  <span className="text-xs font-medium text-ink">{m.month}</span>
                </div>
              ))}
            </Stagger>
          </Reveal>
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

const INCOME_ITEMS = [
  { label: 'Milk tea sales', amount: 72000 },
  { label: 'Snack sales', amount: 9500 },
  { label: 'Party orders', amount: 3500 },
]

const EXPENSE_ITEMS = [
  { label: 'Ingredients & cups', amount: 31000 },
  { label: 'Rent', amount: 10000 },
  { label: 'Wages', amount: 15000 },
  { label: 'Utilities', amount: 6500 },
]

const MONITOR = [
  { icon: CalendarDays, title: 'Compute profit regularly', body: 'Add up income and expenses every week or month — not only at the end of the year.' },
  { icon: BarChart3, title: 'Compare over time', body: 'Put this month beside last month to see if profit is rising or falling.' },
  { icon: Percent, title: 'Watch your profit margin', body: 'Divide net profit by income. A shrinking margin is an early warning sign.' },
  { icon: Tags, title: 'Check your prices', body: 'If costs went up, review whether your selling prices still cover them.' },
  { icon: Search, title: 'Find your best sellers', body: 'Focus on products that earn the most and reduce those that do not.' },
]

const MONTHS = [
  { month: 'Jan', profit: 14200 },
  { month: 'Feb', profit: 12800 },
  { month: 'Mar', profit: 16900 },
  { month: 'Apr', profit: 18400 },
  { month: 'May', profit: 20100 },
  { month: 'Jun', profit: 22500 },
]
