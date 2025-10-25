"use client";

import { Btn } from "zvijude/btns";

export interface Category {
  id: number;
  name: string;
}

export function CategoryItem({ category }: { category: Category }) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg bg-white">
      <span className="text-gray-800 font-medium">{category.name}</span>

      <form action="#">
        <Btn
          type="button"
          lbl="Delete"
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm"
        />
      </form>
    </div>
  );
}
