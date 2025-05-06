import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import VoiceWindow from "./components/Windows/VoiceWindow";

const queryClientProvider = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/voice',
    element: <VoiceWindow />
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClientProvider}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
