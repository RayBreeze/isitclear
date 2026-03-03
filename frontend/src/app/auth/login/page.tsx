"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import DotGrid from "@/components/DotGrid";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // -----------------------------
  // EMAIL LOGIN
  // -----------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error, data } = await authClient.signIn.email({
        email: form.email,
        password: form.password,
      });

      if (error) {
        setError(error.message || "Invalid credentials");
        setLoading(false);
        return;
      }

      if (!data?.user) {
        setError("Login failed. Please try again.");
        setLoading(false);
        return;
      }

      // 🔥 Small delay to ensure cookie is set
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Fetch full user profile with role & onboarding state
      const res = await fetch("/api/me", { credentials: "include" });
      if (!res.ok) {
        // If /api/me fails, just send them to onboarding as a safe default
        window.location.href = "/onboarding";
        return;
      }

      const user = await res.json();

      // 🔐 Onboarding check
      if (!user.onboardingComplete) {
        window.location.href = "/onboarding";
        return;
      }

      // 🎯 Role-based redirect
      const role = String(user.role || "").toLowerCase();

      if (role === "student") {
        window.location.href = "/dashboard/student";
      } else if (role === "teacher") {
        window.location.href = "/dashboard/teacher";
      } else {
        // fallback safety
        window.location.href = "/onboarding";
      }

    } catch (err) {
      setError("Something went wrong.");
      setLoading(false);
    }
  };

  // -----------------------------
  // GOOGLE LOGIN
  // -----------------------------
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  // -----------------------------
  // GITHUB LOGIN
  // -----------------------------
  const handleGithubLogin = async () => {
    setLoading(true);
    setError("");

    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
    });
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden px-6">
      
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-30">
        <DotGrid
          dotSize={3}
          gap={36}
          baseColor="#8b5cf6"
          activeColor="#5227FF"
          proximity={120}
          speedTrigger={100}
          shockRadius={200}
          shockStrength={4}
          maxSpeed={4000}
          resistance={800}
          returnDuration={1.2}
        />
      </div>

      {/* Brand */}
      <div className="relative z-10 mb-10 text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-violet-500">
          Is It Clear?
        </h1>
        <p className="mt-2 text-gray-500 text-sm">
          Welcome back.
        </p>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-2xl p-8">
        
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Sign in to your account
        </h2>

        {/* Social Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-3 px-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center gap-3 font-medium text-gray-700 transition disabled:opacity-50"
          >
            Continue with Google
          </button>

          <button
            onClick={handleGithubLogin}
            disabled={loading}
            className="w-full py-3 px-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center gap-3 font-medium text-gray-700 transition disabled:opacity-50"
          >
            Continue with GitHub
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">
              or continue with email
            </span>
          </div>
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          {error && (
            <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-violet-600 text-white font-medium hover:bg-violet-700 active:scale-[0.98] transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/auth/register")}
            className="text-violet-600 font-medium cursor-pointer hover:underline"
          >
            Create one
          </span>
        </p>
      </div>

      <p className="relative z-10 mt-10 text-xs text-gray-400">
        © {new Date().getFullYear()} Is It Clear
      </p>
    </div>
  );
}