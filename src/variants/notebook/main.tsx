import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './notebook.css'
import { Notebook } from './Notebook'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Notebook />
  </StrictMode>,
)
