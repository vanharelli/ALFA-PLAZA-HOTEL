import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// SILÊNCIO DE PRODUÇÃO
if (import.meta.env.PROD) {
  console.log = () => {};
  console.debug = () => {};
  console.info = () => {};
  console.warn = () => {};
  console.error = () => {};
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
