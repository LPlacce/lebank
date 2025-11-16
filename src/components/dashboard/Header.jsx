import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="mb-6 sm:mb-8">
      <header className="flex items-center justify-between py-4 sm:py-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-brand-blue to-brand-gold flex items-center justify-center text-dark-bg font-bold text-base sm:text-lg font-display shadow-premium-dark">
            L
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold text-dark-text font-display">Le Bank</h1>
        </div>

        <button
          onClick={handleLogout}
          className="p-2 rounded-xl hover:bg-dark-border transition-all duration-300 hover:opacity-80"
          aria-label="Sair"
        >
          <svg
            className="w-5 h-5 text-dark-textSecondary hover:text-dark-text transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
      </header>
      <p className="text-lg sm:text-xl font-medium text-brand-gold font-display ml-14 sm:ml-16">
        Olá, Levi
      </p>
    </div>
  );
}
