// src/main.jsx - KODE FINAL DIPERBAIKI

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx';
import './index.css';

// Wagmi, RainbowKit, & TanStack Query Imports
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { http } from 'viem';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // <-- IMPORT BARU

// --- Definisi Chain Monad Testnet (Tetap Sama) ---
const monadTestnet = {
  id: 80085,
  name: 'Monad Testnet',
  nativeCurrency: { name: 'Monad', symbol: 'MON', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://monad-testnet.g.alchemy.com/v2/Vzk1J44kz8MpsWdvJ_UOb'] },
  },
  testnet: true,
};
// --- End of Chain Definition ---

// --- Buat Query Client (BARU) ---
const queryClient = new QueryClient();

// --- Konfigurasi Wagmi v2 (Tetap Sama) ---
const config = getDefaultConfig({
  appName: 'The Gøpel',
  projectId: '8a2a4cc0c27b9640b32df15c1b9e4205',
  chains: [monadTestnet],
  transports: {
    [monadTestnet.id]: http()
  },
});
// --- End of Wagmi Configuration ---

// --- Router Configuration (Tetap Sama) ---
import HomePage from './pages/HomePage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      {
        index: true,
        element: <HomePage />, 
      },
      // Route untuk top-collections sudah dihapus
    ],
  },
]);
// --- End of Router Configuration ---

// --- Render Aplikasi dengan SEMUA Provider ---
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <RouterProvider router={router} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
);