import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import './index.css';

import App from './App.tsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './auth/context/AuthContext.tsx';
import { NotificationProvider } from './notifications/context/NotificationContext.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>,
);
