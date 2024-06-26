import sqlite3 from "sqlite3";
import { Memo } from "./memo.js";

export class MemoDatabase {
  constructor() {
    this.db = new sqlite3.Database("memo.db");
    this.#run(
      "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT NOT NULL);",
    );
  }

  async createMemo(content) {
    await this.#run("INSERT INTO memos (content) VALUES (?);", content);
  }

  async findAllMemos() {
    const memos = await this.#all("SELECT * FROM memos;");
    return memos.map((memo) => new Memo(memo.id, memo.content));
  }

  async findMemo(id) {
    const memo = await this.#get("SELECT * FROM memos WHERE id = ?;", id);
    return new Memo(memo.id, memo.content);
  }

  async deleteMemo(id) {
    await this.#run("DELETE FROM memos WHERE id = ?;", id);
  }

  #run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this);
        }
      });
    });
  }

  #get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  #all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}
