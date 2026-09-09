import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Research } from './components/Research'
import { Projects } from './components/Projects'
import { Experience } from './components/Experience'
import { SkillsAwards } from './components/SkillsAwards'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { ScrollProgress } from './components/ScrollProgress'
import { Atmosphere } from './components/Atmosphere'
import { DetailProvider } from './components/DetailDrawer'

export default function App() {
  return (
    <DetailProvider>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>
      <Atmosphere />
      <ScrollProgress />
      <div className="relative z-10">
        <Nav />
        <main>
          <Hero />
          <About />
          <Research />
          <Projects />
          <Experience />
          <SkillsAwards />
          <Contact />
        </main>
        <Footer />
      </div>
    </DetailProvider>
  )
}
