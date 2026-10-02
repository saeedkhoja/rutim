import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LangProvider } from './i18n'
import { LeadProvider } from './store'
import { initPixel } from './pixel'
import App from './App'
import './styles.css'

initPixel()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LangProvider>
      <LeadProvider>
        <App />
      </LeadProvider>
    </LangProvider>
  </StrictMode>,
)
