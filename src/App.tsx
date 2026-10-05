import { Loader } from './components/Loader'
import { Tissue } from './components/Tissue'
import { Crosshair, DepthGauge, Nav } from './components/Chrome'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Research } from './components/Research'
import { Projects } from './components/Projects'
import { Experience } from './components/Experience'
import { Skills } from './components/Skills'
import { Latest } from './components/Latest'
import { Contact, Footer } from './components/Contact'
import { DetailProvider } from './components/DetailDrawer'

export default function App() {
  return (
    <DetailProvider>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-spike focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
      >
        Skip to content
      </a>
      <Loader />
      <Tissue />
      <div className="grain" aria-hidden="true" />
      <Crosshair />
      <DepthGauge />
      <Nav />
      <main className="relative z-10 overflow-x-clip">
        <Hero />
        <About />
        <Research />
        <Projects />
        <Experience />
        <Skills />
        <Latest />
        <Contact />
      </main>
      <Footer />
    </DetailProvider>
  )
}
