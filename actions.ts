"use server";

import { db } from "@/scripts/db_conn";
import { revalidatePath } from "next/cache";

export async function addTask(data: any) {
  const { text, categoryId } = data;
  console.log("category id", categoryId);

  if (!categoryId) {
    throw new Error("Category must be selected");
  }

  await db("todos").insert({
    text,
    categoryId: Number(categoryId),
    createdAt: db.fn.now(),
  });

  revalidatePath("/");
}

export async function deleteTask(taskId: number) {
  await db("todos").where("id", taskId).del();
  revalidatePath("/");
}

export async function toggleCompleted(taskId: number, completed: boolean) {
  const updateData = {
    completed: !completed,
    completedAt: !completed ? db.fn.now() : null,
  };

  console.log("task completed");
  await db("todos").where("id", taskId).update(updateData);
  revalidatePath("/");
}

export async function getTodos() {
  return await db("todos")
    .select("*")
    .orderBy("categoryId", "asc")
    .orderBy("createdAt", "desc");
}

export async function getCategories() {
  return await db("categories").select("*").orderBy("name", "asc");
}

export async function addCategory(data) {
  await db("categories").insert(data);
  revalidatePath("/");
}

export async function updateTaskCategory(taskId: number, categoryId: number) {
  await db("todos").where("id", taskId).update({ categoryId });
  revalidatePath("/");
}
