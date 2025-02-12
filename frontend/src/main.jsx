import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PantryProvider } from './store/pantryContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PantryProvider>
      <App />
    </PantryProvider>
  </StrictMode>,
)
