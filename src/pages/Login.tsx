import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider, githubProvider } from "@/lib/firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/profiles";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(
        err?.code === "auth/invalid-credential"
          ? "Incorrect email or password."
          : "Login failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: "google" | "github") => {
    setError(null);
    try {
      setLoading(true);
      const authProvider = provider === "google" ? googleProvider : githubProvider;
      await signInWithPopup(auth, authProvider);
      navigate(from, { replace: true });
    } catch (err: any) {
      if (err?.code === "auth/popup-closed-by-user") return;
      if (err?.code === "auth/account-exists-with-different-credential") {
        setError("An account already exists with this email using a different sign-in method.");
      } else {
        setError(`${provider === "google" ? "Google" : "GitHub"} sign-in failed. Try again.`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      <img
        src="/storyverse-hero.jpg"
        alt="Storyverse background"
        className="absolute inset-0 h-full w-full object-cover opacity-90"
      />
      <div className="absolute inset-0 creator-grid opacity-15" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/35 via-background/10 to-background/60" />

      <div className="relative z-10 min-h-screen grid lg:grid-cols-2 gap-8 items-center px-6 md:px-12 py-10">
        <div className="hidden lg:flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Storyverse Logo" className="h-12 w-auto object-contain" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Creator Studio</span>
          </div>
          <h1 className="font-display text-4xl leading-tight">
            Welcome back to your storyverse.
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Keep your series moving with episode planning, AI story hooks, and posting intel built for emerging creators.
          </p>
          <div className="grid gap-3 max-w-xl">
            {[
              "Episode pipeline: idea → script → posted",
              "Hook + outline suggestions in seconds",
              "Audience signals that guide your next arc",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-border bg-card/60 px-4 py-3 backdrop-blur">
                <p className="text-sm text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleLogin}
          className="relative w-full max-w-md mx-auto space-y-5 rounded-3xl border border-border bg-card/90 backdrop-blur p-8 shadow-xl"
        >
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Storyverse Logo" className="h-10 w-auto object-contain" />
            <p className="text-xs text-muted-foreground">Welcome back</p>
          </div>

          <h2 className="text-2xl font-semibold">Sign in to your studio</h2>

          {error && (
            <div className="bg-destructive/15 border border-destructive/30 text-destructive px-4 py-3 rounded">
              {error}
            </div>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 px-4 bg-background/60 border border-muted-foreground/30 rounded-xl"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 px-4 bg-background/60 border border-muted-foreground/30 rounded-xl"
          />

          <button
            disabled={loading}
            className="w-full h-12 bg-primary text-primary-foreground font-semibold rounded-xl disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div className="relative flex items-center gap-3 my-1">
            <div className="flex-1 border-t border-border" />
            <span className="text-xs text-muted-foreground">or continue with</span>
            <div className="flex-1 border-t border-border" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled={loading}
              onClick={() => handleOAuthLogin("google")}
              className="flex items-center justify-center gap-2 h-12 rounded-xl border border-border bg-background/60 hover:bg-accent transition-colors disabled:opacity-70"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm font-medium">Google</span>
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => handleOAuthLogin("github")}
              className="flex items-center justify-center gap-2 h-12 rounded-xl border border-border bg-background/60 hover:bg-accent transition-colors disabled:opacity-70"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="text-sm font-medium">GitHub</span>
            </button>
          </div>

          <p className="text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <button type="button" onClick={() => navigate("/signup")} className="underline text-foreground">
              Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
