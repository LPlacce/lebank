import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useAdminGuard() {
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem("admin_token");
    if (!adminToken) {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  return { isAuthenticated: !!localStorage.getItem("admin_token") };
}


