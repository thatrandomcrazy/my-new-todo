"use client";

import { Btn } from "zvijude/btns";
import { Checkbox } from "zvijude/form";
import { deleteTask, toggleCompleted } from "@/actions";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
  category?: string;
}

export function TodoItem({ todo }: { todo: Todo }) {
  return (
    <div
      className={`flex items-center gap-4 p-3 border rounded-lg ${
        todo.completed
          ? "bg-gray-50 border-gray-200"
          : "bg-white border-gray-300"
      }`}
    >
      <form action={() => toggleCompleted(todo.id, todo.completed)}>
        <Checkbox
          name="completed"
          lbl=""
          defaultChecked={todo.completed}
          onChange={(e) =>
            (e.currentTarget.form as HTMLFormElement).requestSubmit()
          }
        />
      </form>

      <div className="flex-1 flex flex-col">
        <span
          className={
            todo.completed ? "line-through text-gray-500" : "text-gray-900"
          }
        >
          {todo.text}
        </span>
        {todo.category && (
          <span className="text-xs text-blue-500">{todo.category}</span>
        )}
      </div>

      {todo.completed && todo.completedAt && (
        <span className="text-xs text-gray-400" suppressHydrationWarning>
          {new Date(todo.completedAt).toLocaleDateString("en-US")}
        </span>
      )}

      <form action={() => deleteTask(todo.id)}>
        <Btn
          type="submit"
          lbl="Delete"
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm"
        />
      </form>
    </div>
  );
}
