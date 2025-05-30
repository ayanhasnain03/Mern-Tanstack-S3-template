import { StrictMode } from 'react'
import { BrowserRouter } from "react-router";
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css'
import App from './App.tsx'
import { Toaster } from './components/atoms/sonner.tsx';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <BrowserRouter>
  <QueryClientProvider client={new QueryClient()}>
    <App />
    <Toaster richColors position="top-right" />
  </QueryClientProvider>
  </BrowserRouter>
  </StrictMode>,
)
