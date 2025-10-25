"use client";

import { getFormData } from "zvijude/form/funcs";
import { Btn } from "zvijude/btns";
import { Input } from "zvijude/form";
import { addTask } from "@/actions";
import { type Category } from "../items/CategoryItem";

interface Props {
  categories: Category[];
}

export function AddTodoForm({ categories }: Props) {
  async function handleAddTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = getFormData(e.nativeEvent);
    await addTask(data);
    form.reset();
  }
  return (
    <form onSubmit={handleAddTask} className="flex items-end gap-4 mb-8">
      <div className="flex-1">
        <Input
          name="text"
          lbl="Todo Content"
          placeholder="Enter your todo..."
          required
        />
      </div>

      <div className="flex-1">
        <label className="block text-sm text-gray-600 mb-1">Category</label>
        <select
          name="categoryId"
          className="w-full border rounded px-2 py-1 bg-white"
          required
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <Btn type="submit" lbl="Create" />
    </form>
  );
}
