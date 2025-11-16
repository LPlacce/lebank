import { useAdminGuard } from "../../hooks/useAdminGuard";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";

export default function AdminDashboard() {
  useAdminGuard();

  return (
    <div className="min-h-screen bg-dark-bg flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6 sm:p-8">
          <div className="max-w-4xl">
            <div className="bg-dark-card border border-dark-border rounded-2xl p-6 sm:p-8 shadow-premium-dark">
              <h2 className="text-xl font-semibold text-dark-text font-display mb-4">
                Bem-vindo ao Painel Administrativo
              </h2>
              <p className="text-dark-textSecondary">
                Use o menu lateral para navegar entre as funcionalidades administrativas.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

