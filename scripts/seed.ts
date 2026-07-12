import { docClient } from "../lib/db";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { TableName } from "../lib/schema";
import { mockCarModels } from "../lib/mock-data";

async function seed() {
  console.log("🌱 Заполнение таблицы models...");

  for (const model of mockCarModels) {
    await docClient.send(
      new PutCommand({
        TableName: TableName.MODELS,
        Item: model,
      })
    );
    console.log(`  ✓ ${model.brand} ${model.name}`);
  }

  console.log("🎉 Сидирование завершено!");
}

seed().catch((e) => {
  console.error("❌ Ошибка:", e);
  process.exit(1);
});
