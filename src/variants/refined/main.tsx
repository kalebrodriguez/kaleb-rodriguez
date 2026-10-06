import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './refined.css'
import { Refined } from './Refined'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Refined />
  </StrictMode>,
)
