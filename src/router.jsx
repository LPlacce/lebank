import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminFinance from "./pages/admin/AdminFinance";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/admin/login", element: <AdminLogin /> },
  { path: "/admin", element: <AdminDashboard /> },
  { path: "/admin/financeiro", element: <AdminFinance /> },
]);

export default router;