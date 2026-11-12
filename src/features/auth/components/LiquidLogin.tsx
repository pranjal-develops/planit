import { useId, useState } from "react";

type LiquidLoginProps = {
  onSubmit?: (payload: { email: string; password: string; remember: boolean }) => void | Promise<void>;
};

export function LiquidLogin({ onSubmit }: LiquidLoginProps) {
  const emailId = useId();
  const passId = useId();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const payload = { email, password, remember };

    try {
      setLoading(true);
      await onSubmit?.(payload);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    //   bg-[#05070c]
    <div className="min-h-screen
     text-slate-200 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="relative p-px rounded-3xl">
          {/* Outer glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/15 via-white/5 to-transparent blur-xl" />

          {/* Glass card */}
          <div className="relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10">
            {/* Liquid blobs + shimmer */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-24 -left-20 w-64 h-64 rounded-full bg-[oklch(0.12_0.18_305)]/35 blur-3xl animate-pulse" />
              <div
                className="absolute top-10 -right-24 w-72 h-72 rounded-full bg-[oklch(0.15_0.22_190)]/30 blur-3xl animate-pulse"
                style={{ animationDelay: "600ms" }}
              />
              <div
                className="absolute bottom-0 left-1/4 w-56 h-56 rounded-full bg-[oklch(0.10_0.20_260)]/25 blur-3xl animate-pulse"
                style={{ animationDelay: "1200ms" }}
              />

              {/* Shimmer */}
              <div
                className="absolute -left-40 top-0 h-full w-40 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-sm animate-[shimmer_3.5s_ease-in-out_infinite]"
              />
            </div>

            <div className="relative p-7">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-200/90 text-sm">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400/90 shadow-[0_0_20px_rgba(52,211,153,0.6)]" />
                  Secure sign-in
                </div>

                <h1 className="mt-4 text-2xl font-semibold tracking-tight">Welcome back</h1>
                <p className="mt-1 text-sm text-slate-300/80">Enter your credentials to continue.</p>
              </div>

              {error && (
                <div className="mb-4 rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor={emailId} className="block text-sm mb-2 text-slate-300/90">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      id={emailId}
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-2xl px-4 py-3 bg-white/5 border border-white/10 outline-none
                                 focus:border-white/20 focus:ring-1 focus:ring-white/10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor={passId} className="block text-sm mb-2 text-slate-300/90">
                    Password
                  </label>
                  <input
                    id={passId}
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-2xl px-4 py-3 bg-white/5 border border-white/10 outline-none
                               focus:border-white/20 focus:ring-1 focus:ring-white/10"
                    required
                  />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <label className="inline-flex items-center gap-2 select-none text-sm text-slate-300/90">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="accent-emerald-400"
                    />
                    Remember me
                  </label>

                  <a href="#" className="text-sm text-slate-200/80 hover:text-white transition-colors">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl py-3 bg-white/10 border border-white/15
                             hover:bg-white/15 transition-colors disabled:opacity-60 disabled:cursor-not-allowed
                             text-slate-100 font-medium"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>

                <p className="text-center text-xs text-slate-300/70">
                  By continuing, you agree to our <a className="underline hover:text-white" href="#">Terms</a> and{" "}
                  <a className="underline hover:text-white" href="#">Privacy</a>.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframes for shimmer (Tailwind needs this if not already defined) */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-160px); opacity: 0.0; }
          15% { opacity: 1; }
          100% { transform: translateX(520px); opacity: 0.0; }
        }
        /* Tailwind arbitrary animation class used above: animate-[shimmer_3.5s_ease-in-out_infinite] */
        .animate-[shimmer_3.5s_ease-in-out_infinite] {
          animation: shimmer 3.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
