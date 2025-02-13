import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PantryProvider } from './store/pantryContext.jsx';
import { AuthProvider } from './store/authContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <PantryProvider>
        <App />
      </PantryProvider>
    </AuthProvider>
  </StrictMode>,
)
