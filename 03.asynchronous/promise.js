import timers from "timers/promises";
import sqlite3 from "sqlite3";
import { run, all } from "./sqlite3-promise-wrapper.js";

const db = new sqlite3.Database(":memory:");

console.log("▼正常系ログ");
run(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE);",
)
  .then(() => run(db, "INSERT INTO books (title) VALUES (?);", "Railsの教科書"))
  .then((result) => {
    console.log(`ID:${result.lastID}のデータが追加されました`);
    return all(db, "SELECT * FROM books;");
  })
  .then((rows) =>
    rows.forEach((row) => console.log(`ID:${row.id}, Title:${row.title}`)),
  )
  .then(() => run(db, "DROP TABLE books;"));

await timers.setTimeout(100);

console.log("▼異常系ログ");
run(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE);",
)
  .then(() => run(db, "INSERT INTO books (title) VALUES (?);", "Railsの教科書"))
  .then((result) => {
    console.log(`ID:${result.lastID}のデータが追加されました`);
    return run(db, "INSERT INTO books (title) VALUES (?);", "Railsの教科書"); // 一意制約エラーを発生させるため、同じタイトルのレコードを挿入する
  })
  .catch((err) => console.error(err.message))
  .then(() => run(db, "SELECT * FROM foods;")) // レコード取得のエラーを発生させるため、存在しないテーブル名（foods）を指定する
  .catch((err) => console.error(err.message))
  .then(() => run(db, "DROP TABLE books;"));
