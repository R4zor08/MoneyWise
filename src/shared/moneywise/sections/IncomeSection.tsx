import React from 'react'
import {
  ArrowDownLeft,
  ArrowUpRight,
  BookOpenCheck,
  FileSearch,
  Landmark,
  LineChart,
  ShieldAlert,
} from 'lucide-react'

import { PageIntro } from '../PageIntro'
import { IMAGES, PageKey, peso } from '../site'
import { motion } from 'framer-motion'
import { Reveal, Stagger, staggerItem } from '../Reveal'

type Props = Partial<typeof args> & { onNavigate?: (page: PageKey) => void }

export function IncomeSection(props: Props) {
  const { author, onNavigate } = { ...args, ...props }
  let balance = 0
  const rows = LEDGER.map((r) => {
    balance += r.kind === 'in' ? r.amount : -r.amount
    return { ...r, balance }
  })

  return (
    <div id="income" className="scroll-mt-16 bg-paper font-sans text-ink">

      <PageIntro
        kicker="Income and Expenses"
        title="Money in, money out"
        lead="Every business has two kinds of money movement: income that comes in, and expenses that go out. Knowing the difference is the first step to understanding your business."
        image={IMAGES.income}
        imageAlt="A cafe owner accepting a card payment from a smiling customer"
        onNavigate={onNavigate}
      />

      {/* The difference */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <h2 className="max-w-2xl font-display text-[2.1rem] font-semibold leading-[1.05] tracking-tight text-emerald-deep sm:text-5xl">
          What is the difference?
        </h2>
        <Stagger className="mt-10 grid gap-5 md:grid-cols-2">
          <motion.article variants={staggerItem} className="flex flex-col rounded-2xl bg-brand-soft p-7 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand text-white">
                <ArrowDownLeft className="h-5 w-5" />
              </span>
              <h3 className="font-display text-2xl font-semibold text-emerald-deep">Income</h3>
            </div>
            <p className="mt-4 leading-relaxed text-ink/80">
              Money the business <strong>receives</strong>. It increases the money you
              have, mainly by selling products or services.
            </p>
            <p className="mt-6 text-sm font-semibold text-emerald-deep">Examples in a small business</p>
            <ul className="mt-3 space-y-2.5">
              {INCOME.map((x) => (
                <li key={x} className="flex gap-2.5 text-ink/85">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {x}
                </li>
              ))}
            </ul>
          </motion.article>

          <motion.article variants={staggerItem} className="flex flex-col rounded-2xl bg-loss-soft p-7 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-loss text-white">
                <ArrowUpRight className="h-5 w-5" />
              </span>
              <h3 className="font-display text-2xl font-semibold text-ink">Expenses</h3>
            </div>
            <p className="mt-4 leading-relaxed text-ink/80">
              Money the business <strong>spends</strong> to operate. It decreases the
              money you have, but is needed to keep the business running.
            </p>
            <p className="mt-6 text-sm font-semibold text-loss">Examples in a small business</p>
            <ul className="mt-3 space-y-2.5">
              {EXPENSES.map((x) => (
                <li key={x} className="flex gap-2.5 text-ink/85">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-loss" />
                  {x}
                </li>
              ))}
            </ul>
          </motion.article>
        </Stagger>

        <p className="mt-8 rounded-xl border border-line bg-white px-6 py-4 text-center text-ink">
          <strong className="text-brand">Easy way to remember:</strong> if money comes{' '}
          <em>into</em> your cash box, it is income. If it goes <em>out</em>, it is an expense.
        </p>
      </section>

      {/* Sample record */}
      <section className="bg-beige">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-[1fr_1.5fr] md:items-start">
          <Reveal>
            <h2 className="font-display text-[2.1rem] font-semibold leading-[1.05] tracking-tight text-emerald-deep sm:text-5xl">
              What a simple record looks like
            </h2>
            <p className="mt-5 leading-relaxed text-muted">
              A cash record lists every transaction with its date, a short description,
              and whether money came in or went out. The running balance shows how much
              cash the business has after each entry.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              A notebook, a spreadsheet, or a free phone app all work — what matters is
              recording <strong className="text-ink">every day</strong>.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="min-w-0 overflow-x-auto rounded-2xl border border-line bg-white">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="border-b border-line text-left text-muted">
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Description</th>
                  <th className="px-5 py-3 text-right font-medium">In</th>
                  <th className="px-5 py-3 text-right font-medium">Out</th>
                  <th className="px-5 py-3 text-right font-medium">Balance</th>
                </tr>
              </thead>
              <Stagger as="tbody">
                {rows.map((r) => (
                  <motion.tr variants={staggerItem} key={r.date + r.desc} className="border-b border-line last:border-0">
                    <td className="whitespace-nowrap px-5 py-3.5 text-muted">{r.date}</td>
                    <td className="px-5 py-3.5 text-ink">{r.desc}</td>
                    <td className="px-5 py-3.5 text-right tabular-nums text-brand">
                      {r.kind === 'in' ? peso(r.amount) : ''}
                    </td>
                    <td className="px-5 py-3.5 text-right tabular-nums text-loss">
                      {r.kind === 'out' ? peso(r.amount) : ''}
                    </td>
                    <td className="px-5 py-3.5 text-right font-semibold tabular-nums text-ink">
                      {peso(r.balance)}
                    </td>
                  </motion.tr>
                ))}
              </Stagger>
            </table>
          </Reveal>
        </div>
      </section>

      {/* Why record */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <h2 className="max-w-2xl font-display text-[2.1rem] font-semibold leading-[1.05] tracking-tight text-emerald-deep sm:text-5xl">
          Why recording transactions is important
        </h2>
        <Stagger className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map((w) => (
            <motion.div variants={staggerItem} key={w.title} className="border-t border-line pt-6">
              <w.icon className="h-6 w-6 text-brand" />
              <h3 className="mt-4 text-lg font-semibold text-ink">{w.title}</h3>
              <p className="mt-1.5 leading-relaxed text-muted">{w.body}</p>
            </motion.div>
          ))}
        </Stagger>
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

const INCOME = [
  'Daily sales of food, drinks, or products',
  'Payments for services, like repairs or catering',
  'Delivery or service fees charged to customers',
  'Rent received from renting out equipment or space',
]

const EXPENSES = [
  'Raw materials and ingredients',
  'Rent for the store or stall',
  'Salaries and wages of workers',
  'Electricity, water, and internet bills',
  'Transportation and delivery costs',
]

const LEDGER = [
  { date: 'May 1', desc: 'Starting cash', kind: 'in' as const, amount: 5000 },
  { date: 'May 1', desc: 'Sales for the day', kind: 'in' as const, amount: 3200 },
  { date: 'May 2', desc: 'Bought rice and vegetables', kind: 'out' as const, amount: 1450 },
  { date: 'May 2', desc: 'Sales for the day', kind: 'in' as const, amount: 2850 },
  { date: 'May 3', desc: 'Paid electricity bill', kind: 'out' as const, amount: 980 },
  { date: 'May 3', desc: 'Catering order', kind: 'in' as const, amount: 4500 },
]

const WHY = [
  { icon: LineChart, title: 'Shows if you are earning', body: 'You can compute your real profit instead of guessing.' },
  { icon: FileSearch, title: 'Finds money leaks', body: 'Records reveal costs that are too high or not needed.' },
  { icon: BookOpenCheck, title: 'Helps you plan', body: 'Past records make your next budget more accurate.' },
  { icon: Landmark, title: 'Needed for taxes & loans', body: 'Banks and the government ask for proof of income and expenses.' },
  { icon: ShieldAlert, title: 'Prevents loss and theft', body: 'Daily counts make missing cash easy to notice early.' },
]
