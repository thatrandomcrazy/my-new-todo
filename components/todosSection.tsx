"use client";

import { getFormData } from "zvijude/form/funcs";
import { Btn } from "zvijude/btns";
import { Input } from "zvijude/form";
import { addTask } from "@/actions";
import { TodoItem } from "./todoItem";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
  categoryId?: number | null;
}

interface Category {
  id: number;
  name: string;
}

export default function TodosList({
  todos = [],
  categories = [],
}: {
  todos?: Todo[];
  categories?: Category[];
}) {
  const categoryMap: Record<number, string> = {};
  for (const category of categories) {
    categoryMap[category.id] = category.name;
  }

  const todosByCategory = todos.reduce(
    (acc, todo) => {
      const categoryName = todo.categoryId
        ? categoryMap[todo.categoryId]
        : "Uncategorized";
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(todo);
      return acc;
    },
    {} as Record<string, Todo[]>,
  );

  async function handleAddTask(e) {
    const data = getFormData(e);
    await addTask(data);
    e.target.reset();
  }
  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Todo</h1>

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

      <div className="space-y-8">
        {Object.keys(todosByCategory).map((categoryName) => (
          <div key={categoryName}>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              {categoryName}
            </h2>
            <div className="space-y-3">
              {todosByCategory[categoryName].map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
