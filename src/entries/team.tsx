import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import { Team } from '../pages/Team.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Team />
  </StrictMode>,
)
