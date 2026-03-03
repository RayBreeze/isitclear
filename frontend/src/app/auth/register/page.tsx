"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import DotGrid from "@/components/DotGrid";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // -----------------------------
  // EMAIL REGISTER
  // -----------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error } = await authClient.signUp.email({
        email: form.email,
        password: form.password,
        name: form.name,
      });

      if (error) {
        setError(error.message || "Failed to create account");
        setLoading(false);
        return;
      }

      // 🔥 Wait for session to exist (important)
      const sessionResult = await authClient.getSession();

      if (!sessionResult?.data?.user) {
        setError("Session not created. Try logging in.");
        setLoading(false);
        return;
      }

      // New users always go to onboarding first
      router.push("/onboarding");
    } catch (err) {
      setError("Something went wrong.");
      setLoading(false);
    }
  };

  // -----------------------------
  // GOOGLE
  // -----------------------------
  const handleGoogleSignUp = async () => {
    setLoading(true);
    setError("");

    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/onboarding",
    });
  };

  // -----------------------------
  // GITHUB
  // -----------------------------
  const handleGithubSignUp = async () => {
    setLoading(true);
    setError("");

    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/onboarding",
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
          Clarity begins with a simple step.
        </p>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-2xl p-8">
        
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Create your account
        </h2>

        {/* Social Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={handleGoogleSignUp}
            disabled={loading}
            className="w-full py-3 px-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center gap-3 font-medium text-gray-700 transition disabled:opacity-50"
          >
            Continue with Google
          </button>

          <button
            onClick={handleGithubSignUp}
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
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

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
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/auth/login")}
            className="text-violet-600 font-medium cursor-pointer hover:underline"
          >
            Sign in
          </span>
        </p>
      </div>

      <p className="relative z-10 mt-10 text-xs text-gray-400">
        © {new Date().getFullYear()} Is It Clear
      </p>
    </div>
  );
}