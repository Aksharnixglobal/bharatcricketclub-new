import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import { Donate } from '../pages/Donate.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Donate />
  </StrictMode>,
)
