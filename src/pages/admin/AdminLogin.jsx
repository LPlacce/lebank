import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  // Redireciona se já estiver autenticado
  useEffect(() => {
    const adminToken = localStorage.getItem("admin_token");
    if (adminToken) {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    if (usuario === "gustavoplacceadm" && senha === "gustavoadm") {
      localStorage.setItem("admin_token", "admin_authenticated");
      navigate("/admin", { replace: true });
    } else {
      setErro("Usuário ou senha incorretos.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg px-4 py-10">
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-dark-border bg-dark-card px-8 py-10 shadow-premium-dark">
        <header className="mb-10 space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-dark-textSecondary font-display">
            acesso administrativo
          </p>
          <h1 className="text-3xl font-semibold text-dark-text sm:text-4xl font-display">
            Le Bank{" "}
            <span className="block text-3xl font-bold text-brand-gold sm:text-4xl">
              Admin
            </span>
          </h1>
          <p className="text-sm text-dark-textSecondary">
            Acesso restrito ao painel administrativo
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          {erro && (
            <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/50 text-red-400 text-sm">
              {erro}
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-xs font-medium uppercase tracking-[0.2em] text-dark-textSecondary font-display">
              Usuário
            </label>
            <input
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full rounded-xl border border-dark-border bg-dark-bg px-4 py-3.5 text-sm text-dark-text outline-none transition-all duration-300 placeholder:text-dark-textSecondary focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30"
              placeholder="Digite seu usuário"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium uppercase tracking-[0.2em] text-dark-textSecondary font-display">
              Senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full rounded-xl border border-dark-border bg-dark-bg px-4 py-3.5 text-sm text-dark-text outline-none transition-all duration-300 placeholder:text-dark-textSecondary focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30"
              placeholder="Digite sua senha"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded-xl bg-brand-blue px-4 py-3.5 text-sm font-semibold tracking-wide text-white shadow-premium-dark transition-all duration-300 hover:opacity-90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 focus:ring-offset-dark-bg"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

