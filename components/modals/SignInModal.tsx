"use client";

import { useState } from "react";
import { userSchema } from "@/lib/schemas/userSchema";
import { z } from "zod";
import { signIn } from "@/actions";

interface Props {
  onSignUpClick: () => void;
  onSuccess: () => void;
}

export default function SignInModal({ onSignUpClick, onSuccess }: Props) {
  const [form, setForm] = useState({ name: "", email: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      userSchema.parse(form);
      await signIn(form);
      onSuccess(); // ✅ tell parent we are signed in
    } catch (err) {
      if (err instanceof z.ZodError) setError(err.issues[0].message);
      else if (err instanceof Error) setError(err.message);
      else setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow w-80 space-y-4"
      >
        <h2 className="text-xl font-bold">Sign In</h2>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="border p-2 w-full rounded"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 w-full rounded"
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <p className="text-sm text-center">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={onSignUpClick}
            className="text-blue-600 underline"
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
}
