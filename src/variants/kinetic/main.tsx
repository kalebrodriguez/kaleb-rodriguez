import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './kinetic.css'
import { Kinetic } from './Kinetic'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Kinetic />
  </StrictMode>,
)
