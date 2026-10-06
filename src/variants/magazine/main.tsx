import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './magazine.css'
import { Magazine } from './Magazine'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Magazine />
  </StrictMode>,
)
