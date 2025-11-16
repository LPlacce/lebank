import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, DollarSign, LogOut } from "lucide-react";

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login", { replace: true });
  };

  const menuItems = [
    {
      path: "/admin",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      path: "/admin/financeiro",
      label: "Editar dados financeiros",
      icon: DollarSign,
    },
  ];

  return (
    <aside className="w-64 bg-dark-card border-r border-dark-border min-h-screen p-6">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-dark-text font-display">Le Bank</h2>
        <p className="text-xs text-dark-textSecondary mt-1">Painel Administrativo</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-brand-blue/20 text-brand-blue border border-brand-blue/30"
                  : "text-dark-textSecondary hover:bg-dark-border hover:text-dark-text"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 pt-8 border-t border-dark-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 w-full transition-all duration-300"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Sair</span>
        </button>
      </div>
    </aside>
  );
}


