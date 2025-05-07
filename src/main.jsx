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

// Import the mock API server
import { startMockServer } from './mockApi'

// Disable mock server since we're using a real backend
console.log('Mock server is disabled - using real backend API')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
