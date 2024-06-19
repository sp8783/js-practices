import timers from "timers/promises";
import sqlite3 from "sqlite3";
import { run, all } from "./sqlite3-promise-wrapper.js";

console.log("▼正常系ログ");
const db = new sqlite3.Database(":memory:");

run(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE);",
)
  .then(() => run(db, "INSERT INTO books (title) VALUES (?);", "Railsの教科書"))
  .then((result) => {
    console.log(`ID:${result.lastID}のデータが追加されました`);
    return all(db, "SELECT * FROM books;");
  })
  .then((rows) => {
    rows.forEach((row) => {
      console.log(`ID:${row.id}, Title:${row.title}`);
    });
    return run(db, "DROP TABLE books;");
  });

await timers.setTimeout(100);
console.log("▼異常系ログ");

run(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE);",
)
  .then(() => run(db, "INSERT INTO books (title) VALUES (?);", "Railsの教科書"))
  .then((result) => {
    console.log(`ID:${result.lastID}のデータが追加されました`);
    return run(db, "INSERT INTO books (title) VALUES (?);", "Railsの教科書"); // ここで一意制約エラーを発生させるため、同じタイトルのレコードを挿入する
  })
  .then((result) => {
    console.log(`ID:${result.lastID}のデータが追加されました`);
  })
  .catch((err) => {
    if (err instanceof Error && err.code === "SQLITE_CONSTRAINT") {
      console.error(err.message);
    } else {
      throw err;
    }
  })
  .then(() => run(db, "SELECT * FROM foods;")) // ここでレコード取得のエラーを発生させるため、存在しないテーブル名（foods）を指定する
  .then((rows) =>
    rows.forEach((row) => {
      console.log(`ID:${row.id}, Title:${row.title}`);
    }),
  )
  .catch((err) => {
    if (err instanceof Error && err.code === "SQLITE_ERROR") {
      console.error(err.message);
    } else {
      throw err;
    }
  })
  .then(() => run(db, "DROP TABLE books;"));
