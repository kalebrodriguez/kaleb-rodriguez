import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { profile } from '../data/content'
import { ease } from './motion'

// The surface. The brain itself is drawn by <Tissue />; this is the type and
// instrument readouts laid over it, which drift away as the dive begins.
export function Hero() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, -120])
  // Function form keeps opacity off the browser's ScrollTimeline path.
  const fade = useTransform(scrollY, (v) => Math.max(0, 1 - v / 420))

  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 40 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1, ease, delay },
        }

  return (
    <section id="top" className="relative h-[100svh] min-h-[640px]">
      <motion.div style={reduce ? undefined : { y, opacity: fade }} className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-20 sm:px-8 sm:pb-24">
        <motion.p {...enter(0.1)} className="readout mb-6">
          <span className="text-spike">●</span> Neuroscience × Software — {profile.location}
        </motion.p>
        <h1 className="font-display text-[19vw] font-semibold leading-[0.82] sm:text-[11vw] lg:text-[9.5rem]">
          <motion.span {...enter(0.2)} className="block">
            Kaleb
          </motion.span>
          <motion.span {...enter(0.32)} className="block text-transparent [-webkit-text-stroke:1.5px_var(--color-text)]">
            Rodriguez
          </motion.span>
        </h1>
        <motion.p {...enter(0.5)} className="mt-8 max-w-md text-lg leading-relaxed text-text/80">
          High-school senior researching neurodegeneration and building software that
          reaches real people.
        </motion.p>
        <motion.div {...enter(0.6)} className="mt-8 flex flex-wrap gap-3">
          <a href="#research" className="btn btn-spike">
            Start the dive <ArrowDown size={17} />
          </a>
          <a href="#contact" className="btn btn-line">
            Get in touch <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </motion.div>

      {/* Instrument readouts in the corners */}
      <motion.div
        style={reduce ? undefined : { opacity: fade }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-20 mx-auto hidden max-w-7xl justify-between px-8 sm:flex"
      >
        <span className="readout">Specimen — human cortex, in silico</span>
        <span className="readout">Obj 1× · Scroll to magnify</span>
      </motion.div>
      <motion.div
        style={reduce ? undefined : { opacity: fade }}
        aria-hidden="true"
        className="readout absolute bottom-8 right-8 hidden items-center gap-2 sm:flex"
      >
        Scroll <ArrowDown size={14} className="animate-bounce" />
      </motion.div>
    </section>
  )
}
