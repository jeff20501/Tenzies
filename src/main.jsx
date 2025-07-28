import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Tenzies/Main.css'
import App from './Tenzies/Main'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
