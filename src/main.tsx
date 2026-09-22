import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { SelectionProvider } from './SelectionContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SelectionProvider>
        <App />
      </SelectionProvider>
    </BrowserRouter>
  </StrictMode>,
)