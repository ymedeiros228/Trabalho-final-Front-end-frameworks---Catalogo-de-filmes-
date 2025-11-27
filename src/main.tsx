import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { FavoritesProvider } from './context/FavoritesContext'

const container = document.getElementById('root')

if (container) {
  const root = createRoot(container)
  root.render(
    <BrowserRouter>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </BrowserRouter>
  )
}
