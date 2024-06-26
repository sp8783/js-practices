export class Memo {
  constructor(id, content) {
    this.id = id;
    this.content = content;
  }

  get firstLine() {
    return this.content.split("\n")[0];
  }
}
