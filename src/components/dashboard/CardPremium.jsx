export default function CardPremium({ children, className = "", loading = false }) {
  if (loading) {
    return (
      <div className="bg-dark-card border border-dark-border rounded-2xl p-6 shadow-premium-dark animate-pulse">
        <div className="h-3 bg-dark-border rounded w-20 mb-3"></div>
        <div className="h-8 bg-dark-border rounded w-32 mb-2"></div>
        <div className="h-2 bg-dark-border rounded w-40"></div>
      </div>
    );
  }

  return (
    <div
      className={`bg-dark-card border border-dark-border rounded-2xl shadow-premium-dark ${className}`}
    >
      {children}
    </div>
  );
}
