import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Compass, PiggyBank, ShieldCheck } from 'lucide-react'

import { SiteHeader } from '../shared/moneywise/SiteHeader'
import { SiteFooter } from '../shared/moneywise/SiteFooter'
import { PAGES, PageKey } from '../shared/moneywise/site'
import { Stagger, staggerItem } from '../shared/moneywise/Reveal'
import { scrollToTarget, useSmoothScroll } from '../shared/moneywise/SmoothScroll'
import { BudgetSection } from '../shared/moneywise/sections/BudgetSection'
import { IncomeSection } from '../shared/moneywise/sections/IncomeSection'
import { ProfitSection } from '../shared/moneywise/sections/ProfitSection'
import { TipsSection } from '../shared/moneywise/sections/TipsSection'
import { AboutSection } from '../shared/moneywise/sections/AboutSection'
import { CinematicHero } from './components/CinematicHero'
import { ScrollStatement } from './components/ScrollStatement'
import { MoneyCycle } from './components/MoneyCycle'

type Props = Partial<typeof args>

export default function Home(props: Props) {
  const { author, welcome } = { ...args, ...props }
  const [active, setActive] = useState<PageKey>('home')
  useSmoothScroll()

  // Scroll-spy: highlight the menu item for the chapter in the middle of the screen.
  useEffect(() => {
    const els = PAGES.map((p) => document.getElementById(p.key)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id as PageKey))
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const go = (key: PageKey) => {
    if (key === 'home') {
      scrollToTarget(0)
      return
    }
    const el = document.getElementById(key)
    if (el) scrollToTarget(el)
  }

  return (
    <div className="min-h-full bg-paper font-sans text-ink">
      <SiteHeader active={active} onNavigate={go} />

      <div id="home" className="scroll-mt-16">
        <CinematicHero welcome={welcome} onNavigate={go} />

        {/* Why it matters */}
        <section className="mx-auto max-w-6xl px-5 pb-20 pt-24 sm:px-8 md:pb-28 md:pt-36">
          <p className="text-sm font-semibold text-brand sm:text-base">
            Why financial management matters
          </p>
          <ScrollStatement
            className="mt-5"
            text="Many small businesses don't close because they can't sell. They close because no one knew where the money was going."
          />
          <Stagger className="mt-16 grid gap-10 border-t border-line pt-10 md:grid-cols-3 md:gap-12">
            {REASONS.map((r) => (
              <motion.div key={r.title} variants={staggerItem}>
                <r.icon className="h-7 w-7 text-brand" />
                <h3 className="mt-5 font-display text-2xl font-semibold text-emerald-deep">{r.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{r.body}</p>
              </motion.div>
            ))}
          </Stagger>
        </section>

        <MoneyCycle onNavigate={go} />
      </div>

      <BudgetSection onNavigate={go} />
      <IncomeSection onNavigate={go} />
      <ProfitSection onNavigate={go} />
      <TipsSection onNavigate={go} />
      <AboutSection onNavigate={go} />

      <SiteFooter author={author} onNavigate={go} />
    </div>
  )
}

export const args = {
  author: 'Mac Devey Francisco',
  welcome:
    'Welcome! MoneyWise is a friendly guide for small business owners who want to understand their money — how to plan a budget, track income and expenses, and grow real profit.',
}

export const argTypes = {
  author: { control: 'text' },
  welcome: { control: 'text' },
}

const REASONS = [
  {
    icon: ShieldCheck,
    title: 'Keeps the business running',
    body: 'Knowing your cash on hand means you can always pay suppliers, rent, and workers on time.',
  },
  {
    icon: Compass,
    title: 'Leads to better decisions',
    body: 'Clear records show which products sell, which costs are too high, and where to improve.',
  },
  {
    icon: PiggyBank,
    title: 'Prepares you for the future',
    body: 'Saving a part of every peso earned builds a cushion for emergencies and room to grow.',
  },
]
