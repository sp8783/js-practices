import { MemoDatabase } from "./memo-database.js";
import { MemoUI } from "./memo-ui.js";

export class MemoController {
  constructor() {
    this.db = new MemoDatabase();
    this.ui = new MemoUI(this);
  }

  async execute(args) {
    if (args.l) {
      await this.#listMemos();
    } else if (args.r) {
      await this.#readMemo();
    } else if (args.d) {
      await this.#deleteMemo();
    } else {
      await this.#createMemo();
    }
  }

  async #createMemo() {
    try {
      const content = await this.ui.promptForMemoContent();
      if (!content) {
        throw new Error("Content is empty");
      }
      await this.db.createMemo(content);
      this.ui.showSuccessMessage("Memo created");
    } catch (err) {
      this.ui.showErrorMessage("Failed to create memo", err);
    }
  }

  async #listMemos() {
    try {
      const memos = await this.db.findAllMemos();
      if (memos.length === 0) {
        throw new Error("No memo exists");
      }
      this.ui.showMemos(memos);
    } catch (err) {
      this.ui.showErrorMessage("Failed to list memos", err);
    }
  }

  async #readMemo() {
    try {
      const id = await this.#getMemoId();
      const memo = await this.db.findMemo(id);
      this.ui.showMemo(memo);
    } catch (err) {
      this.ui.showErrorMessage("Failed to read memo", err);
    }
  }

  async #deleteMemo() {
    try {
      const id = await this.#getMemoId();
      await this.db.deleteMemo(id);
      this.ui.showSuccessMessage("Memo deleted");
    } catch (err) {
      this.ui.showErrorMessage("Failed to delete memo", err);
    }
  }

  async #getMemoId() {
    const memos = await this.db.findAllMemos();
    if (memos.length === 0) {
      throw new Error("No memo exists");
    }
    return await this.ui.promptForMemoId(memos);
  }
}
