import { useState, useEffect } from "react";
import { useAdminGuard } from "../../hooks/useAdminGuard";
import { useFinance } from "../../stores/financeStore.jsx";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import { useToast } from "../../components/ui/use-toast.js";

export default function AdminFinance() {
  useAdminGuard();
  const { btcAmount, reais, emprestado, updateFinanceData } = useFinance();
  const { toast, currentToast } = useToast();

  const [formData, setFormData] = useState({
    btcAmount: 0,
    reais: 0,
    emprestado: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData({
      btcAmount: btcAmount || 0,
      reais: reais || 0,
      emprestado: emprestado || 0,
    });
  }, [btcAmount, reais, emprestado]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simula salvamento (em produção, seria uma chamada API)
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Atualiza o store global
      if (updateFinanceData) {
        updateFinanceData({
          btcAmount: Number(formData.btcAmount),
          reais: Number(formData.reais),
          emprestado: Number(formData.emprestado),
        });
      }

      // Salva no localStorage como backup
      const newData = {
        btcAmount: Number(formData.btcAmount),
        reais: Number(formData.reais),
        emprestado: Number(formData.emprestado),
      };
      
      localStorage.setItem("finance_data", JSON.stringify(newData));

      // Dispara evento customizado para atualizar o dashboard do cliente
      window.dispatchEvent(new Event("financeDataUpdated"));

      toast({
        title: "Sucesso!",
        description: "Dados atualizados com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível salvar os dados.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6 sm:p-8">
          <div className="max-w-4xl">
            <div className="bg-dark-card border border-dark-border rounded-2xl p-6 sm:p-8 shadow-premium-dark">
              <h2 className="text-xl font-semibold text-dark-text font-display mb-6">
                Editar Dados Financeiros
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-dark-textSecondary">
                    Saldo em BTC
                  </label>
                  <input
                    type="number"
                    step="0.00001"
                    value={formData.btcAmount}
                    onChange={(e) =>
                      setFormData({ ...formData, btcAmount: e.target.value })
                    }
                    className="w-full rounded-xl border border-dark-border bg-dark-bg px-4 py-3 text-sm text-dark-text outline-none transition-all duration-300 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30"
                    placeholder="0.01500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-dark-textSecondary">
                    Saldo em Reais (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.reais}
                    onChange={(e) =>
                      setFormData({ ...formData, reais: e.target.value })
                    }
                    className="w-full rounded-xl border border-dark-border bg-dark-bg px-4 py-3 text-sm text-dark-text outline-none transition-all duration-300 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30"
                    placeholder="2000.00"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-dark-textSecondary">
                    Valor Emprestado (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.emprestado}
                    onChange={(e) =>
                      setFormData({ ...formData, emprestado: e.target.value })
                    }
                    className="w-full rounded-xl border border-dark-border bg-dark-bg px-4 py-3 text-sm text-dark-text outline-none transition-all duration-300 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30"
                    placeholder="12500.00"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-brand-blue px-4 py-3.5 text-sm font-semibold tracking-wide text-white shadow-premium-dark transition-all duration-300 hover:opacity-90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 focus:ring-offset-dark-bg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Salvando..." : "Salvar alterações"}
                </button>
              </form>

              {currentToast && (
                <div
                  className={`mt-4 p-4 rounded-xl border ${
                    currentToast.variant === "destructive"
                      ? "bg-red-500/20 border-red-500/50 text-red-400"
                      : "bg-brand-green/20 border-brand-green/50 text-brand-green"
                  }`}
                >
                  <p className="font-semibold">{currentToast.title}</p>
                  <p className="text-sm">{currentToast.description}</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

