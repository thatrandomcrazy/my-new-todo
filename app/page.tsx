import { getCategories, getTodos } from "@/actions";
import MainSection from "@/components/MainSection";

export default async function Home() {
  const todos = await getTodos();
  const categories = await getCategories();
  return (
    <div>
      <MainSection todos={todos} categories={categories} />
    </div>
  );
}
