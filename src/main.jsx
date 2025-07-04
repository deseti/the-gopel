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
  id: 10143,
  name: 'Monad Testnet',
  nativeCurrency: { name: 'Monad', symbol: 'MON', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://testnet-rpc.monad.xyz'] },
  },
  testnet: true,
};
// --- End of Chain Definition ---

// --- Buat Query Client (BARU) ---
const queryClient = new QueryClient();

// --- Konfigurasi Wagmi v2 (Tetap Sama) ---
const config = getDefaultConfig({
  appName: 'The Gøpel',
  projectId: 'Id wallet',
  chains: [monadTestnet],
  transports: {
    [monadTestnet.id]: http()
  },
});
// --- End of Wagmi Configuration ---

// --- Router Configuration (Tetap Sama) ---
import HomePage from './pages/HomePage.jsx';
import MintPage from './pages/MintPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      {
        index: true,
        element: <HomePage />, 
      },
      {
        path: "/mint",
        element: <MintPage />,
      },
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