import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import { Leagues } from '../pages/Leagues.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Leagues />
  </StrictMode>,
)
