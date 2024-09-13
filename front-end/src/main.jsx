if (typeof global === 'undefined') {
  window.global = window;
}
import 'setimmediate';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'draft-js/dist/Draft.css'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
