import { ArrowUpRight } from 'lucide-react'
import { updates } from '../data/content'
import { Rise, Stop } from './Stop'

// Brainstem: the latest signals coming through.
export function Latest() {
  return (
    <Stop
      id="latest"
      title={
        <>
          Latest <span className="text-spike">signals</span>.
        </>
      }
    >
      <ul className="border-t border-line">
        {updates.map((u, i) => {
          const body = (
            <div className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-line py-6 sm:gap-10">
              <span className="readout w-20 tabular-nums sm:w-24">{u.date}</span>
              <span>
                <span className="readout block !text-spike">{u.source}</span>
                <span className="font-display mt-1 block text-xl leading-snug transition-colors group-hover:text-spike sm:text-2xl">
                  {u.title}
                </span>
              </span>
              <svg viewBox="0 0 60 24" className="hidden h-6 w-14 text-muted transition-colors group-hover:text-spike sm:block" aria-hidden="true">
                <path d="M0,16 L22,16 L26,4 L30,22 L34,16 L60,16" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
          )
          return (
            <li key={u.id}>
              <Rise delay={i * 0.04}>
                {u.href ? (
                  <a href={u.href} target="_blank" rel="noopener noreferrer" className="block">
                    {body}
                  </a>
                ) : (
                  body
                )}
              </Rise>
            </li>
          )
        })}
      </ul>
      <Rise>
        <a
          href="https://github.com/kalebrodriguez"
          target="_blank"
          rel="noopener noreferrer"
          className="readout mt-8 inline-flex items-center gap-2 hover:!text-spike"
        >
          More on GitHub <ArrowUpRight size={14} />
        </a>
      </Rise>
    </Stop>
  )
}
