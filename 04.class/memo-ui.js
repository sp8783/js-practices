import readline from "readline";
import Enquirer from "enquirer";

export class MemoUI {
  constructor(controller) {
    this.controller = controller;
  }

  async promptForMemoContent() {
    const rl = readline.createInterface({
      input: process.stdin,
    });
    return new Promise((resolve) => {
      let content = "";
      console.log("Enter memo content. Press Ctrl-D when done.");
      rl.on("line", (line) => {
        content += line + "\n";
      });
      rl.on("close", () => {
        console.log();
        resolve(content.trim());
      });
    });
  }

  async promptForMemoId(memos) {
    const enquirer = new Enquirer();
    const response = await enquirer.prompt({
      type: "select",
      name: "id",
      message: "Choose a memo:",
      choices: memos.map((memo) => ({
        message: memo.firstLine,
        value: memo.id,
      })),
    });
    return response.id;
  }

  async showSuccessMessage(customMessage) {
    console.log(`Success: ${customMessage}`);
  }

  async showErrorMessage(customMessage, err = null) {
    console.error(`Error: ${customMessage}`);
    if (err instanceof Error) {
      console.error(err.message);
    }
  }

  async showMemos(memos) {
    memos.forEach((memo) => {
      console.log(`${memo.firstLine}`);
    });
  }

  async showMemo(memo) {
    console.log(memo.content);
  }
}
