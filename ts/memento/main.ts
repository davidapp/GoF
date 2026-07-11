/**
 * 备忘录模式（Memento）
 * 场景：文本编辑器 —— 保存内容快照，支持 undo 恢复到之前的状态。
 *
 * 核心思想：在不破坏封装性的前提下，捕获对象的内部状态并在外部保存，
 * 以便之后可以将该对象恢复到先前的状态。
 */

// ---------- 备忘录（Memento）：对外只读，只有 Originator 能读取其完整内容 ----------
class EditorMemento {
  constructor(private readonly content: string) {}

  // 包内可见的“getState”，仅供 TextEditor 在 restore 时调用
  getContent(): string {
    return this.content;
  }
}

// ---------- 发起人（Originator） ----------
class TextEditor {
  private content = "";

  type(text: string): void {
    this.content += text;
  }

  getContent(): string {
    return this.content;
  }

  // 创建备忘录，封装当前状态
  save(): EditorMemento {
    return new EditorMemento(this.content);
  }

  // 从备忘录恢复状态
  restore(memento: EditorMemento): void {
    this.content = memento.getContent();
  }
}

// ---------- 管理者（Caretaker）：只负责保存/取出备忘录，不关心其内容 ----------
class History {
  private readonly mementos: EditorMemento[] = [];

  push(memento: EditorMemento): void {
    this.mementos.push(memento);
  }

  pop(): EditorMemento | undefined {
    return this.mementos.pop();
  }

  get size(): number {
    return this.mementos.length;
  }
}

// ---------- 演示 ----------
function main(): void {
  const editor = new TextEditor();
  const history = new History();

  editor.type("第一段内容。");
  history.push(editor.save()); // 快照 1
  console.log(`输入后: "${editor.getContent()}"`);

  editor.type("第二段内容。");
  history.push(editor.save()); // 快照 2
  console.log(`输入后: "${editor.getContent()}"`);

  editor.type("第三段内容（写错了，待会撤销）。");
  console.log(`输入后: "${editor.getContent()}"`);

  console.log(`\n当前历史快照数: ${history.size}`);

  console.log("\n=== 执行 undo：恢复到快照 2 ===");
  const snapshot2 = history.pop();
  if (snapshot2 !== undefined) {
    editor.restore(snapshot2);
  }
  console.log(`恢复后: "${editor.getContent()}"`);

  console.log("\n=== 再次执行 undo：恢复到快照 1 ===");
  const snapshot1 = history.pop();
  if (snapshot1 !== undefined) {
    editor.restore(snapshot1);
  }
  console.log(`恢复后: "${editor.getContent()}"`);
}

main();
