import CardPremium from "./CardPremium";

export default function BTCChart({ history = [], loading = false }) {
  if (loading || !history.length) {
    return (
      <CardPremium loading={true} className="p-6 sm:p-8">
        <h3 className="text-xs text-dark-textSecondary uppercase tracking-wide mb-4 sm:mb-6 font-display">
          Histórico BTC (7 dias)
        </h3>
        <div className="h-20 sm:h-24 bg-dark-border rounded-xl animate-pulse"></div>
      </CardPremium>
    );
  }

  if (history.length === 0) {
    return (
      <CardPremium className="p-6 sm:p-8">
        <h3 className="text-xs text-dark-textSecondary uppercase tracking-wide font-display mb-4">
          Histórico BTC (7 dias)
        </h3>
        <div className="h-20 sm:h-24 flex items-center justify-center text-dark-textSecondary text-sm">
          Sem dados disponíveis
        </div>
      </CardPremium>
    );
  }

  const validHistory = history.filter((price) => price && !isNaN(price) && price > 0);
  
  if (validHistory.length === 0) {
    return (
      <CardPremium className="p-6 sm:p-8">
        <h3 className="text-xs text-dark-textSecondary uppercase tracking-wide font-display mb-4">
          Histórico BTC (7 dias)
        </h3>
        <div className="h-20 sm:h-24 flex items-center justify-center text-dark-textSecondary text-sm">
          Sem dados válidos
        </div>
      </CardPremium>
    );
  }

  const max = Math.max(...validHistory);
  const min = Math.min(...validHistory);
  const range = max - min || 1;

  const points = validHistory.map((price, index) => {
    const x = validHistory.length > 1 ? (index / (validHistory.length - 1)) * 100 : 50;
    const normalizedPrice = ((price - min) / range) * 100;
    const y = 100 - normalizedPrice;
    return `${x},${y}`;
  }).join(" ");

  const currentPrice = validHistory[validHistory.length - 1];
  const previousPrice = validHistory.length > 1 ? validHistory[validHistory.length - 2] : currentPrice;
  const change = previousPrice > 0 ? ((currentPrice - previousPrice) / previousPrice) * 100 : 0;
  const isPositive = change >= 0;

  return (
    <CardPremium className="p-6 sm:p-8">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-xs text-dark-textSecondary uppercase tracking-wide font-display">
          Histórico BTC (7 dias)
        </h3>
        <div
          className={`flex items-center gap-1 text-xs font-medium ${
            isPositive ? "text-brand-green" : "text-red-400"
          }`}
        >
          <span>{isPositive ? "↑" : "↓"} {Math.abs(change).toFixed(2)}%</span>
        </div>
      </div>
      <div className="h-20 sm:h-24 relative">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline
            points={points}
            fill="none"
            stroke="#E7C888"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          <defs>
            <linearGradient id="btcGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E7C888" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#E7C888" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon
            points={`0,100 ${points} 100,100`}
            fill="url(#btcGradient)"
          />
        </svg>
      </div>
      <div className="mt-3 text-xs text-dark-textSecondary">
        Última atualização: {new Date().toLocaleTimeString("pt-BR")}
      </div>
    </CardPremium>
  );
}
