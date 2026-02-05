import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { logoutUser } from "../utils/Auth";
import VelorentLogo from "../components/ui/VelorentLogo";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const [idleTimer, setIdleTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });

      const { success, message, username: user, role } = response.data;

      if (success) {
        localStorage.setItem("username", user);
        localStorage.setItem("role", role);

        setupIdleTimer();
        navigate("/dashboard");
      } else {
        setError(message || "Login failed");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Network error, please try again.");
    }
  };

  const logout = async () => {
    logoutUser(navigate);
  };

  const handleActivity = () => {
    if (idleTimer) clearTimeout(idleTimer);
    setIdleTimer(setTimeout(logout, 60000)); // 1 minute
  };

  const setupIdleTimer = () => {
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
  };

  useEffect(() => {
    setupIdleTimer();

    return () => {
      if (idleTimer) clearTimeout(idleTimer);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idleTimer]);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-card text-card-foreground border border-border rounded-[var(--radius)] shadow-sm p-6">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <VelorentLogo fontSize="3rem" />
          </div>

          {/* Title */}
          <h1
            className="text-center font-semibold text-xl mb-6"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Sign in
          </h1>

          {/* Error */}
          {error && (
            <div
              className="
                mb-4 rounded-[var(--radius)]
                border border-destructive/30
                bg-destructive/10
                px-3 py-2 text-sm text-destructive
              "
              role="alert"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label
                className="block text-sm font-medium text-muted-foreground mb-1"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="
                  w-full rounded-[var(--radius)]
                  border border-border bg-input-background
                  px-3 py-2 text-sm
                  placeholder:text-muted-foreground/80
                  focus:outline-none focus:ring-2 focus:ring-ring
                "
              />
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-sm font-medium text-muted-foreground mb-1"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="
                  w-full rounded-[var(--radius)]
                  border border-border bg-input-background
                  px-3 py-2 text-sm
                  placeholder:text-muted-foreground/80
                  focus:outline-none focus:ring-2 focus:ring-ring
                "
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="
                w-full rounded-[var(--radius)]
                bg-primary text-primary-foreground
                px-4 py-2.5 text-sm font-semibold
                hover:opacity-95
                focus:outline-none focus:ring-2 focus:ring-ring
              "
            >
              Login
            </button>

            {/* Forgot */}
            <div className="text-center pt-1">
              <button
                type="button"
                className="text-sm font-medium text-primary hover:underline"
                onClick={() => {
                  // TODO: wire to your forgot flow/route later
                  // navigate("/forgot-password");
                }}
              >
                Forgot password?
              </button>
            </div>
          </form>
        </div>

        {/* Small footer (optional, matches clean SaaS look) */}
        <div className="text-center text-xs text-muted-foreground mt-4">
          © {new Date().getFullYear()} Velorent
        </div>
      </div>
    </div>
  );
};

export default Login;
