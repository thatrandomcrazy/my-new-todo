"use client";

import { useRef } from "react";
import { getFormData } from "zvijude/form/funcs";
import { Btn } from "zvijude/btns";
import { Input } from "zvijude/form";
import { addCategory } from "@/actions";

export function AddCategoryForm({
  onCategoryAdded,
}: {
  onCategoryAdded: () => void;
}) {
  const formRef = useRef<HTMLFormElement>(null); // 🔹 reference to form

  async function handleAddCategory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return; // safety check

    const data = getFormData(e.nativeEvent);
    await addCategory(data);

    formRef.current.reset(); // 🔹 reset safely
    onCategoryAdded();
  }

  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-3">Create Category</h2>
      <form
        ref={formRef}
        onSubmit={handleAddCategory}
        className="flex gap-4 items-end"
      >
        <Input
          name="name"
          lbl="Category Name"
          placeholder="Enter category name..."
          required
        />
        <Btn type="submit" lbl="Add Category" />
      </form>
    </section>
  );
}
