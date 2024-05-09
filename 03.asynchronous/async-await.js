import timers from "timers/promises";
import sqlite3 from "sqlite3";
import { run, all } from "./sqlite3-promise-wrapper.js";

const db = new sqlite3.Database(":memory:");

console.log("▼正常系ログ");
await run(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE);",
);
const result = await run(
  db,
  "INSERT INTO books (title) VALUES (?);",
  "Railsの教科書",
);
console.log(`ID:${result.lastID}のデータが追加されました`);
const rows = await all(db, "SELECT * FROM books;");
rows.forEach((row) => console.log(`ID:${row.id}, Title:${row.title}`));
await run(db, "DROP TABLE books;");

await timers.setTimeout(100);

console.log("▼異常系ログ");
await run(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE);",
);
const result2 = await run(
  db,
  "INSERT INTO books (title) VALUES (?);",
  "Railsの教科書",
);
console.log(`ID:${result2.lastID}のデータが追加されました`);
try {
  await run(db, "INSERT INTO books (title) VALUES (?);", "Railsの教科書"); // 一意制約エラーを発生させるため、同じタイトルのレコードを挿入する
} catch (err) {
  if (err.code === "SQLITE_CONSTRAINT") {
    console.error(err.message);
  }
}
try {
  await run(db, "SELECT * FROM foods;"); // レコード取得のエラーを発生させるため、存在しないテーブル名（foods）を指定する
} catch (err) {
  if (err.code === "SQLITE_ERROR") {
    console.error(err.message);
  }
}
await run(db, "DROP TABLE books;");
