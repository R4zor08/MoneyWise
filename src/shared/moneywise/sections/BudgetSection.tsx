import React from 'react'
import { CalendarCheck, Eye, Scale, Target } from 'lucide-react'

import { PageIntro } from '../PageIntro'
import { IMAGES, PageKey, peso } from '../site'
import { motion } from 'framer-motion'
import { Reveal, Stagger, staggerItem } from '../Reveal'

type Props = Partial<typeof args> & { onNavigate?: (page: PageKey) => void }

export function BudgetSection(props: Props) {
  const { author, businessName, expectedSales, onNavigate } = { ...args, ...props }
  const planned = SAMPLE_BUDGET.reduce((s, r) => s + r.amount, 0)
  const left = expectedSales - planned

  return (
    <div id="budget" className="scroll-mt-16 bg-paper font-sans text-ink">

      <PageIntro
        kicker="Budget Management"
        title="Plan your money before you spend it"
        lead="A budget is a written plan that shows how much money a business expects to earn and how it will be spent over a period of time — usually a week, a month, or a year."
        image={IMAGES.budget}
        imageAlt="A notebook with a handwritten business budget, a calculator and sorted receipts"
        onNavigate={onNavigate}
      />

      {/* What + why */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <h2 className="font-display text-[2.1rem] font-semibold leading-[1.05] tracking-tight text-emerald-deep sm:text-5xl">
              What does budgeting mean?
            </h2>
            <p className="mt-5 leading-relaxed text-muted">
              Budgeting means deciding <strong className="text-ink">in advance</strong> how
              your business will use its money. Instead of spending and hoping there is
              enough left, you set limits for each type of cost and compare them against
              the income you expect.
            </p>
            <blockquote className="mt-8 border-l-4 border-brand pl-5 font-display text-xl leading-snug text-emerald-deep">
              “A budget tells your money where to go instead of wondering where it went.”
            </blockquote>
          </Reveal>

          <div>
            <h3 className="text-lg font-semibold text-ink">Why budgeting is important for business owners</h3>
            <Stagger className="mt-6 grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {WHY.map((w) => (
                <motion.div variants={staggerItem} key={w.title} className="border-t border-line pt-5">
                  <w.icon className="h-6 w-6 text-brand" />
                  <h4 className="mt-4 text-lg font-semibold text-ink">{w.title}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{w.body}</p>
                </motion.div>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-beige">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <h2 className="font-display text-[2.1rem] font-semibold leading-[1.05] tracking-tight text-emerald-deep sm:text-5xl">
            Five simple steps to create a business budget
          </h2>
          <Stagger as="ol" className="relative mt-12 grid gap-x-8 gap-y-10 md:grid-cols-5">
            <motion.span
              aria-hidden
              variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] } } }}
              className="absolute left-5 right-5 top-9 hidden h-px origin-left bg-brand/30 md:block"
            />
            {STEPS.map((s, i) => (
              <motion.li variants={staggerItem} key={s.title} className="relative md:pt-4">
                <div className="flex items-center gap-3 md:block">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand font-display text-lg font-semibold text-white">
                    {i + 1}
                  </span>
                  <h3 className="font-semibold text-ink md:mt-5">{s.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
              </motion.li>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Example */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:items-start">
          <Reveal>
            <h2 className="font-display text-[2.1rem] font-semibold leading-[1.05] tracking-tight text-emerald-deep sm:text-5xl">
              Example: a monthly budget
            </h2>
            <p className="mt-5 leading-relaxed text-muted">
              Here is a sample budget for <strong className="text-ink">{businessName}</strong>,
              a small neighborhood food business. The owner expects{' '}
              <strong className="text-ink">{peso(expectedSales)}</strong> in sales this month
              and plans every expense before the month begins.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Whatever is left after planned costs becomes savings or profit. If it is
              negative, the owner knows early that costs must be cut or sales increased.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="overflow-hidden rounded-2xl border border-line bg-white">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 bg-emerald-deep px-5 py-4 text-white sm:px-6">
              <span className="font-semibold">Monthly Budget</span>
              <span className="text-sm text-white/70">Expected sales {peso(expectedSales)}</span>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line text-left text-muted">
                  <th className="px-6 py-3 font-medium">Budget item</th>
                  <th className="hidden px-6 py-3 font-medium sm:table-cell">Type</th>
                  <th className="px-6 py-3 text-right font-medium">Planned</th>
                </tr>
              </thead>
              <tbody>
                {SAMPLE_BUDGET.map((r) => (
                  <tr key={r.item} className="border-b border-line last:border-0">
                    <td className="px-6 py-3.5 text-ink">{r.item}</td>
                    <td className="hidden px-6 py-3.5 sm:table-cell">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          r.type === 'Fixed' ? 'bg-sand text-ink' : 'bg-brand-soft text-emerald-deep'
                        }`}
                      >
                        {r.type}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-right tabular-nums text-ink">{peso(r.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="space-y-2 border-t-2 border-emerald-deep/15 bg-beige px-6 py-5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Total planned expenses</span>
                <span className="font-semibold tabular-nums">{peso(planned)}</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="font-semibold text-ink">Left for savings & profit</span>
                <span
                  className={`font-display text-2xl font-semibold tabular-nums ${
                    left >= 0 ? 'text-brand' : 'text-loss'
                  }`}
                >
                  {peso(left)}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  )
}

const args = {
  author: '[Your Complete Name]',
  businessName: "Aling Rosa's Carinderia",
  expectedSales: 60000,
}

const argTypes = {
  author: { control: 'text' },
  businessName: { control: 'text' },
  expectedSales: { control: 'number' },
}

const WHY = [
  { icon: Eye, title: 'Gives a clear picture', body: 'You can see exactly where money is coming from and where it is going.' },
  { icon: Scale, title: 'Prevents overspending', body: 'Spending limits stop small extra costs from piling up unnoticed.' },
  { icon: Target, title: 'Supports business goals', body: 'Money is set aside on purpose for growth, equipment, or savings.' },
  { icon: CalendarCheck, title: 'Prepares for slow months', body: 'Planning ahead helps the business survive weeks when sales are low.' },
]

const STEPS = [
  { title: 'Estimate your income', body: 'Look at past sales records to guess how much you will earn this month.' },
  { title: 'List fixed costs', body: 'Write down costs that stay the same: rent, salaries, permits.' },
  { title: 'List variable costs', body: 'Add costs that change with sales: ingredients, supplies, delivery.' },
  { title: 'Set aside savings', body: 'Plan a fixed amount for emergencies and future goals first.' },
  { title: 'Review and adjust', body: 'Compare actual spending with your plan every week and correct it.' },
]

const SAMPLE_BUDGET = [
  { item: 'Stall rent', type: 'Fixed', amount: 8000 },
  { item: 'Helper salary', type: 'Fixed', amount: 12000 },
  { item: 'Ingredients & supplies', type: 'Variable', amount: 22000 },
  { item: 'Electricity, water & LPG', type: 'Variable', amount: 4500 },
  { item: 'Packaging', type: 'Variable', amount: 2500 },
  { item: 'Emergency savings', type: 'Fixed', amount: 5000 },
]
