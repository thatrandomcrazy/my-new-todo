import { getCategories, getTodos } from "@/actions";
import TodosList from "@/components/todosSection";

export default async function Home() {
  const todos = await getTodos();
  const categories = await getCategories();
  return (
    <div>
      <TodosList todos={todos} categories={categories} />
    </div>
  );
}
