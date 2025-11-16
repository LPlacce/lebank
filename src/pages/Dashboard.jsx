import { useEffect } from "react";
import { useAuthGuard } from "../hooks/useAuthGuard";
import { useFinance } from "../stores/financeStore.jsx";
import Header from "../components/dashboard/Header";
import FinanceCard from "../components/dashboard/FinanceCard";
import BTCChart from "../components/dashboard/BTCChart";
import SantanderLogo from "../components/dashboard/SantanderLogo";

export default function Dashboard() {
  useAuthGuard();
  const { btcAmount, reais, emprestado, btcPrice, btcHistory, loading, refreshData } = useFinance();

  // Atualiza os dados quando o admin salvar alterações
  useEffect(() => {
    const handleStorageChange = () => {
      refreshData();
    };

    const handleFinanceUpdate = () => {
      refreshData();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("financeDataUpdated", handleFinanceUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("financeDataUpdated", handleFinanceUpdate);
    };
  }, [refreshData]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatBTC = (value) => {
    if (!value || value === 0) return "0.00000";
    return Number(value).toFixed(5);
  };

  const btcValueInReais = btcAmount && btcPrice ? btcAmount * btcPrice : 0;

  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="max-w-xl sm:max-w-2xl lg:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <Header />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <FinanceCard
            title="Saldo em BTC"
            value={
              loading
                ? "Carregando..."
                : btcPrice > 0 && btcAmount > 0
                ? formatCurrency(btcValueInReais)
                : "R$ 0,00"
            }
            subtitle={
              loading
                ? ""
                : btcPrice > 0 && btcAmount > 0
                ? `${formatBTC(btcAmount)} BTC • Saque permitido apenas com 14 dias de antecedência`
                : "Saque permitido apenas com 14 dias de antecedência"
            }
            icon="₿"
            loading={loading}
          />
          <FinanceCard
            title="Saldo Santander"
            value={formatCurrency(reais)}
            subtitle="Saldo disponível para movimentação"
            logo={<SantanderLogo className="w-5 h-5 mr-2" />}
            loading={loading}
          />
          <FinanceCard
            title="Outros Valores"
            value={formatCurrency(emprestado)}
            subtitle="valores complementares"
            icon="📊"
            loading={loading}
          />
        </div>

        <div className="mt-6 sm:mt-8 lg:mt-10">
          <BTCChart history={btcHistory} loading={loading} />
        </div>
      </div>
    </div>
  );
}
