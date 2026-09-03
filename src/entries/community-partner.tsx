import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import { CommunityPartner } from '../pages/CommunityPartner.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CommunityPartner />
  </StrictMode>,
)
