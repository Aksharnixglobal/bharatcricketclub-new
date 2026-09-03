import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import { Fixtures } from '../pages/Fixtures.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Fixtures />
  </StrictMode>,
)
