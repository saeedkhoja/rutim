import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LeadProvider } from './store'
import { initPixel } from './pixel'
import { captureUtm } from './lead'
import App from './App'
import './styles.css'

captureUtm()
initPixel()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LeadProvider>
      <App />
    </LeadProvider>
  </StrictMode>,
)
