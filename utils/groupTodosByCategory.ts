import { type Todo } from "../components/items/TodoItem";
import { type Category } from "../components/items/CategoryItem";

export function groupTodosByCategory(
  todos: Todo[],
  categories: Category[],
): Record<string, Todo[]> {
  const categoryMap: Record<number, string> = {};
  for (const category of categories) {
    categoryMap[category.id] = category.name;
  }

  return todos.reduce(
    (acc, todo) => {
      const categoryName = todo.categoryId
        ? categoryMap[todo.categoryId]
        : "Uncategorized";
      if (!acc[categoryName]) acc[categoryName] = [];
      acc[categoryName].push(todo);
      return acc;
    },
    {} as Record<string, Todo[]>,
  );
}
