import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import { Leaders } from '../pages/Leaders.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Leaders />
  </StrictMode>,
)
