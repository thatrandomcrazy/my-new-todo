import { db } from "./db_conn";

async function test() {
  const hasTodos = await db.schema.hasTable("todos");
  if (hasTodos) {
    const hasCategoryName = await db.schema.hasColumn("todos", "category_name");
    if (hasCategoryName) {
      await db.schema.alterTable("todos", (table) => {
        table.dropColumn("category_name");
      });
      console.log("✅ removed category_name column from todos");
    } else {
      console.log("ℹ️ category_name column not found — nothing to remove");
    }
  } else {
    console.log("❌ todos table not found");
  }

  await db.destroy();
}

test();
