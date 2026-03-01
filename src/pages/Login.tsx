import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

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
