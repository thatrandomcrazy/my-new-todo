"use server";

import { db } from "@/scripts/db_conn";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// ---------- TODOS ----------
export async function getTodos() {
  const store = await cookies();
  const userId = store.get("userId")?.value;
  if (!userId) return [];

  return db("todos")
    .leftJoin("categories", "todos.categoryId", "categories.id")
    .select("todos.*", "categories.name as categoryName")
    .where("todos.user_id", userId)
    .orderBy("todos.categoryId")
    .orderBy("todos.createdAt", "desc");
}

export async function addTask({ text, categoryId }: any) {
  const store = await cookies();
  const userId = store.get("userId")?.value;
  if (!userId) throw new Error("User not logged in");
  if (!categoryId) throw new Error("Category must be selected");

  await db("todos").insert({
    text,
    categoryId,
    user_id: userId,
    createdAt: db.fn.now(),
  });

  revalidatePath("/");
}

export async function deleteTask(id: number) {
  await db("todos").where({ id }).del();
  revalidatePath("/");
}

export async function toggleCompleted(id: number, completed: boolean) {
  await db("todos")
    .where({ id })
    .update({
      completed: !completed,
      completedAt: completed ? null : db.fn.now(),
    });
  revalidatePath("/");
}

export async function updateTaskCategory(id: number, categoryId: number) {
  await db("todos").where({ id }).update({ categoryId });
  revalidatePath("/");
}

// ---------- CATEGORIES ----------
export async function getCategories() {
  const store = await cookies();
  const userId = store.get("userId")?.value;
  if (!userId) return [];

  return db("categories").where("user_id", userId).orderBy("name", "asc");
}

export async function addCategory(data: any) {
  const store = await cookies();
  const userId = store.get("userId")?.value;
  if (!userId) throw new Error("User not logged in");

  await db("categories").insert({
    ...data,
    user_id: userId,
  });

  revalidatePath("/");
}
// ---------- AUTH ----------
export async function signUp({ name, email }: { name: string; email: string }) {
  const exists = await db("users").where({ email }).first();
  if (exists) throw new Error("User exists");

  const [user] = await db("users")
    .insert({ name, email, createdAt: db.fn.now() })
    .returning("*");

  const store = await cookies();
  store.set("userId", String(user.id), { path: "/", httpOnly: true });
  return user;
}

export async function signIn({ name, email }: { name: string; email: string }) {
  const user = await db("users").where({ name, email }).first();
  if (!user) throw new Error("Invalid credentials");

  const store = await cookies();
  store.set("userId", String(user.id), { path: "/", httpOnly: true });
  return user;
}

export async function signOut() {
  const store = await cookies();
  store.delete("userId");
  revalidatePath("/");
}

export async function getCurrentUser() {
  const store = await cookies();
  const id = store.get("userId")?.value;
  return id ? db("users").where({ id }).first() : null;
}
