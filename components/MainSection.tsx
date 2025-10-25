"use client";

import { useState } from "react";
import { type Todo, TodoItem } from "./items/TodoItem";
import { type Category } from "./items/CategoryItem";
import { AddTodoForm } from "./forms/AddTodoForm";
import { AddCategoryForm } from "./forms/AddCategoryForm";
import { groupTodosByCategory } from "../utils/groupTodosByCategory";
import { getCategories } from "@/actions";
import SignInModal from "./modals/SignInModal";
import SignUpModal from "./modals/SignUpModal";

export default function MainSection({
  todos = [],
  categories: initialCategories = [],
}: {
  todos?: Todo[];
  categories?: Category[];
}) {
  const [categories, setCategories] = useState(initialCategories);
  const [showSignIn, setShowSignIn] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);

  async function refreshCategories() {
    const updated = await getCategories();
    setCategories(updated);
  }

  const todosByCategory = groupTodosByCategory(todos, categories);

  if (showSignIn)
    return (
      <SignInModal
        onSignUpClick={() => {
          setShowSignIn(false);
          setShowSignUp(true);
        }}
        onSuccess={() => setShowSignIn(false)}
      />
    );

  if (showSignUp) return <SignUpModal onClose={() => setShowSignUp(false)} />;

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <button
        onClick={() => {
          setShowSignIn(true);
          setShowSignUp(false);
        }}
        className="absolute top-4 left-4 text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
      >
        Logout
      </button>
      <h1 className="text-2xl font-bold mb-6">Create Todo</h1>

      {/* --- Add Category --- */}
      <AddCategoryForm onCategoryAdded={refreshCategories} />

      {/* --- Add Todo --- */}
      <AddTodoForm categories={categories} />

      {/* --- Todos Grouped by Category --- */}
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
