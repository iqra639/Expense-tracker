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

// Import and start the mock API server
import { startMockServer } from './mockApi'

// Start the mock server in development or when no backend is available
if (import.meta.env.DEV || !import.meta.env.VITE_API_URL) {
  console.log('Starting mock server...')
  startMockServer()
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
