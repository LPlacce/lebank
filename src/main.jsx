import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { FinanceProvider } from "./stores/financeStore.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <FinanceProvider>
        <RouterProvider router={router} />
      </FinanceProvider>
    </AuthProvider>
  </React.StrictMode>
);