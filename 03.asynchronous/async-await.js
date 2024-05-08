import sqlite3 from "sqlite3";
import timers from "timers/promises";

const db = new sqlite3.Database(":memory:");

function createBooksTable() {
  return new Promise((resolve, reject) => {
    db.run(
      `
      CREATE TABLE books (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL UNIQUE
      );
      `,
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      },
    );
  });
}

function insertBook(title) {
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO books (title) VALUES ('${title}');`, function (err) {
      if (err) {
        reject(err);
      } else {
        console.log(`ID:${this.lastID}のデータが追加されました`);
        resolve();
      }
    });
  });
}

function printAllRecords(table) {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM ${table};`, function (err, rows) {
      if (err) {
        reject(err);
      } else {
        rows.forEach((row) => {
          console.log(`ID:${row.id}, Title: ${row.title}`);
        });
        resolve();
      }
    });
  });
}

function dropBooksTable() {
  return new Promise((resolve, reject) => {
    db.run(`DROP TABLE books;`, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function main() {
  console.log("▼正常系ログ");
  await createBooksTable();
  await insertBook("Railsの教科書").catch((err) => console.log(err));
  await printAllRecords("books").catch((err) => console.log(err));
  await dropBooksTable();

  await timers.setTimeout(100);
  console.log("▼異常系ログ");
  await createBooksTable();
  await insertBook("Railsの教科書").catch((err) => console.log(err)); // 一意制約エラーを発生させるため、同じタイトルのレコードを挿入する
  await insertBook("Railsの教科書").catch((err) => console.log(err)); // レコード取得のエラーを発生させるため、存在しないテーブル名（foods）を指定する
  await printAllRecords("foods").catch((err) => console.log(err));
  await dropBooksTable();
}

main();
