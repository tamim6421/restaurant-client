import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router/Router.jsx";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./Provider/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <div className="max-w-[1200px] mx-auto">
      <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <HelmetProvider>
        <RouterProvider router={router}></RouterProvider>
        <Toaster />
      </HelmetProvider>
    </AuthProvider>
    </QueryClientProvider>
      </div>
    
  </React.StrictMode>
);
