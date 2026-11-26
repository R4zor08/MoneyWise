import { useEffect } from 'react'
import Lenis from 'lenis'

let lenis: Lenis | null = null

/** Inertial, gliding page scroll (the effect from the reference video). Off for reduced motion. */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true })
    let raf = 0
    const tick = (time: number) => {
      lenis?.raf(time)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      lenis?.destroy()
      lenis = null
    }
  }, [])
}

/** Glide to an element (or the top) — falls back to native smooth scroll. */
export function scrollToTarget(target: HTMLElement | 0, offset = 0) {
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.3 })
    return
  }
  if (target === 0) window.scrollTo({ top: 0, behavior: 'smooth' })
  else window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY + offset, behavior: 'smooth' })
}
