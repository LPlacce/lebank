import { createContext, useContext, useState, useEffect, useCallback } from "react";
import financeMock from "../mock/finance.json";

const FinanceContext = createContext();

export function FinanceProvider({ children }) {
  const [btcAmount, setBtcAmount] = useState(0);
  const [reais, setReais] = useState(0);
  const [emprestado, setEmprestado] = useState(0);
  const [btcPrice, setBtcPrice] = useState(0);
  const [btcHistory, setBtcHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFinanceData = useCallback(async () => {
    try {
      // Verifica se há dados salvos no localStorage (atualizados pelo admin)
      const savedData = localStorage.getItem("finance_data");
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setBtcAmount(parsed.btcAmount || financeMock.btcAmount);
        setReais(parsed.reais || financeMock.reais);
        setEmprestado(parsed.emprestado || financeMock.emprestado);
      } else {
        // Simula delay de API
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        setBtcAmount(financeMock.btcAmount);
        setReais(financeMock.reais);
        setEmprestado(financeMock.emprestado);
      }
    } catch (error) {
      // Fallback para mock
      setBtcAmount(financeMock.btcAmount);
      setReais(financeMock.reais);
      setEmprestado(financeMock.emprestado);
    }
  }, []);

  const updateFinanceData = useCallback((data) => {
    setBtcAmount(data.btcAmount);
    setReais(data.reais);
    setEmprestado(data.emprestado);
  }, []);

  const fetchBTCPrice = useCallback(async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl"
      );
      const data = await response.json();
      if (data.bitcoin?.brl) {
        setBtcPrice(data.bitcoin.brl);
      }
    } catch (error) {
      // Fallback para preço mockado se a API falhar
      setBtcPrice(315000);
    }
  }, []);

  const fetchBTCHistory = useCallback(async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=brl&days=7"
      );
      const data = await response.json();
      if (data.prices && Array.isArray(data.prices)) {
        const prices = data.prices.map(([_, price]) => price);
        setBtcHistory(prices);
      }
    } catch (error) {
      // Fallback para histórico mockado
      setBtcHistory([310000, 312000, 314000, 315000, 316000, 315500, 315000]);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([
        loadFinanceData(),
        fetchBTCPrice(),
        fetchBTCHistory(),
      ]);
      setLoading(false);
    };
    init();
  }, [loadFinanceData, fetchBTCPrice, fetchBTCHistory]);

  // Atualiza preço do BTC a cada 5 minutos
  useEffect(() => {
    const interval = setInterval(() => {
      fetchBTCPrice();
      fetchBTCHistory();
    }, 5 * 60 * 1000); // 5 minutos

    return () => clearInterval(interval);
  }, [fetchBTCPrice, fetchBTCHistory]);

  const value = {
    btcAmount,
    reais,
    emprestado,
    btcPrice,
    btcHistory,
    loading,
    updateFinanceData,
    refreshData: () => {
      loadFinanceData();
      fetchBTCPrice();
      fetchBTCHistory();
    },
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error("useFinance deve ser usado dentro de FinanceProvider");
  }
  return context;
}

