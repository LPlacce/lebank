import CardPremium from "./CardPremium";

export default function FinanceCard({
  title,
  value,
  subtitle,
  icon,
  logo,
  loading = false,
}) {
  return (
    <CardPremium loading={loading} className="p-6 sm:p-8">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          {logo && <div className="flex items-center">{logo}</div>}
          <h3 className="text-xs text-dark-textSecondary uppercase tracking-wide font-display">
            {title}
          </h3>
        </div>
        {icon && !logo && (
          <span className="text-xl sm:text-2xl opacity-80" style={{ color: "#E7C888" }}>
            {icon}
          </span>
        )}
      </div>
      <div className="mb-3">
        <p className="text-2xl sm:text-3xl font-bold text-dark-text tracking-tight font-display">
          {value}
        </p>
      </div>
      {subtitle && (
        <p className="text-xs sm:text-sm text-dark-textSecondary mt-2">{subtitle}</p>
      )}
    </CardPremium>
  );
}
