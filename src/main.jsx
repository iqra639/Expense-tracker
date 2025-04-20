import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import './styles/ai-theme.css'
import './styles/ai-dashboard.css'
import './styles/ai-assistant.css'
import './styles/analytics.css'
import './styles/settings.css'
import './styles/budget.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import App from './App.jsx'

// Mock API server is disabled for now

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
