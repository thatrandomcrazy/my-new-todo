"use client";

import { useState } from "react";
import { userSchema } from "@/lib/schemas/userSchema";
import { z } from "zod";
import { signUp } from "@/actions";

interface Props {
  onClose: () => void;
}

export default function SignUpModal({ onClose }: Props) {
  const [form, setForm] = useState({ name: "", email: "" });
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      userSchema.parse(form);
      await signUp(form);
      onClose();
    } catch (err) {
      if (err instanceof z.ZodError) setError(err.issues[0].message);
      else if (err instanceof Error) setError(err.message);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow w-80 space-y-4"
      >
        <h2 className="text-xl font-bold">Sign Up</h2>

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
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
