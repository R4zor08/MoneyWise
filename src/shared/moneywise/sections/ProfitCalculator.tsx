import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { TrendingDown, TrendingUp } from 'lucide-react'

import { EASE, peso } from '../site'

/** Try-it-yourself: type income and expenses, see net profit and margin update live. */
export function ProfitCalculator() {
  const [income, setIncome] = useState(50000)
  const [expenses, setExpenses] = useState(38000)
  const net = income - expenses
  const margin = income > 0 ? Math.round((net / income) * 100) : 0
  const gain = net >= 0
  const spentShare = income > 0 ? Math.min(1, expenses / income) : 1

  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <div className="grid gap-10 rounded-3xl border border-line bg-white p-6 sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <div>
          <p className="text-sm font-semibold text-brand">Try it yourself</p>
          <h2 className="mt-2 font-display text-[2.1rem] font-semibold leading-[1.05] tracking-tight text-emerald-deep sm:text-5xl">
            Profit calculator
          </h2>
          <p className="mt-4 leading-relaxed text-muted">
            Enter your business's totals for one month and see the result of the
            formula instantly.
          </p>

          <div className="mt-8 space-y-5">
            <Field label="Total Income" value={income} onChange={setIncome} tone="brand" />
            <Field label="Total Expenses" value={expenses} onChange={setExpenses} tone="loss" />
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl bg-emerald-deep p-6 text-white sm:p-8">
          <div>
            <p className="font-mono text-sm text-white/60">
              {peso(income)} − {peso(expenses)} =
            </p>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.p
                key={net}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.18, ease: EASE }}
                className={`mt-2 font-display text-5xl font-semibold tabular-nums tracking-tight sm:text-6xl ${
                  gain ? 'text-mint' : 'text-[#ffb59f]'
                }`}
              >
                {peso(net)}
              </motion.p>
            </AnimatePresence>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium">
              {gain ? <TrendingUp className="h-4 w-4 text-mint" /> : <TrendingDown className="h-4 w-4 text-[#ffb59f]" />}
              {gain ? `Profit · ${margin}% margin` : 'Loss · expenses exceed income'}
            </p>
          </div>

          <div className="mt-10">
            <div className="flex justify-between text-xs text-white/60">
              <span>Spent</span>
              <span>Kept</span>
            </div>
            <div className="mt-2 flex h-3 overflow-hidden rounded-full bg-mint">
              <motion.div
                className="h-full bg-white/25"
                animate={{ width: `${spentShare * 100}%` }}
                transition={{ duration: 0.25, ease: EASE }}
              />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              {gain
                ? `For every ₱100 earned, the business keeps about ₱${Math.max(0, margin)}.`
                : 'Cut costs or raise sales until income is higher than expenses.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  value,
  onChange,
  tone,
}: {
  label: string
  value: number
  onChange: (n: number) => void
  tone: 'brand' | 'loss'
}) {
  return (
    <label className="block">
      <span className={`text-sm font-semibold ${tone === 'brand' ? 'text-brand' : 'text-loss'}`}>{label}</span>
      <div className="mt-2 flex items-center rounded-xl border border-line bg-paper px-4 transition-[border-color,box-shadow] duration-150 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20">
        <span className="text-lg text-muted">₱</span>
        <input
          type="number"
          inputMode="numeric"
          min={0}
          step={500}
          value={value}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
          className="w-full min-w-0 bg-transparent px-2 py-3.5 text-lg font-semibold tabular-nums text-ink outline-none"
        />
      </div>
    </label>
  )
}
