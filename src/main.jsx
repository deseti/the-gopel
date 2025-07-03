// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import './index.css'

// Import your page components
import HomePage from './pages/HomePage.jsx';
import TopCollectionsPage from './pages/TopCollectionsPage.jsx';

// Define the routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, // This makes HomePage the default child route
        element: <HomePage />,
      },
      {
        path: "top-collections",
        element: <TopCollectionsPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)