import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { UsersProvider } from './Context/UsersContext.jsx'
import { ProductsProvider } from './Context/ProductsContext.jsx'
import './reset.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UsersProvider>
      <ProductsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProductsProvider>
    </UsersProvider>
  </StrictMode>,
)
