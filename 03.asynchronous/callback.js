import sqlite3 from "sqlite3";
import timers from "timers/promises";

console.log("▼正常系ログ");
const db = new sqlite3.Database(":memory:");

db.run(
  `
CREATE TABLE books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE
);
`,
  (err) => {
    if (err) {
      console.log(err);
    } else {
      db.run(
        `INSERT INTO books (title) VALUES ('Railsの教科書');`,
        function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log(`ID:${this.lastID}のデータが追加されました`);
            db.all(`SELECT * FROM books;`, function (err, rows) {
              if (err) {
                console.log(err);
              } else {
                rows.forEach((row) => {
                  console.log(`ID:${row.id}, Title: ${row.title}`);
                });
                db.run(`DROP TABLE books;`, function (err) {
                  if (err) {
                    console.log(err);
                  }
                });
              }
            });
          }
        },
      );
    }
  },
);

await timers.setTimeout(100);
console.log("▼異常系ログ");

db.run(
  `
CREATE TABLE books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE
);
`,
  (err) => {
    if (err) {
      console.log(err);
    } else {
      db.run(
        `INSERT INTO books (title) VALUES ('Railsの教科書');`,
        function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log(`ID:${this.lastID}のデータが追加されました`);
            // ここで一意制約エラーを発生させるため、同じタイトルのレコードを挿入する
            db.run(
              `INSERT INTO books (title) VALUES ('Railsの教科書');`,
              function (err) {
                if (err) {
                  console.log(err);
                } else {
                  console.log(`ID:${this.lastID}のデータが追加されました`);
                }
                // ここでレコード取得のエラーを発生させるため、存在しないテーブル名（foods）を指定する
                db.all(`SELECT * FROM foods;`, function (err, rows) {
                  if (err) {
                    console.log(err);
                  } else {
                    rows.forEach((row) => {
                      console.log(`ID:${row.id}, Title: ${row.title}`);
                    });
                    db.run(`DROP TABLE books;`, function (err) {
                      if (err) {
                        console.log(err);
                      }
                      db.close();
                    });
                  }
                });
              },
            );
          }
        },
      );
    }
  },
);