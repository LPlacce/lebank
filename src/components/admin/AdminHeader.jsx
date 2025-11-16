import { useNavigate } from "react-router-dom";

export default function AdminHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login", { replace: true });
  };

  return (
    <header className="flex items-center justify-between bg-dark-card border-b border-dark-border px-6 py-4">
      <div>
        <h1 className="text-2xl font-bold text-dark-text font-display">
          Painel Administrativo — Le Bank
        </h1>
        <p className="text-sm text-dark-textSecondary mt-1">Administrador</p>
      </div>

      <button
        onClick={handleLogout}
        className="px-4 py-2 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-all duration-300 text-sm font-medium"
      >
        Sair
      </button>
    </header>
  );
}


