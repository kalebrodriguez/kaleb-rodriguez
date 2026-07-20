import type { Transition, Variants } from 'framer-motion'

export const ease = [0.22, 1, 0.36, 1] as const

export const revealTransition: Transition = {
  duration: 0.55,
  ease,
}

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.04,
    },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: revealTransition,
  },
}

export const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: revealTransition,
}
