// ============================================================
// 备忘录模式（Memento）
// 场景：文本编辑器 —— 保存快照并 undo 恢复内容
// ============================================================

// ---- 备忘录（Memento）：不可变地保存某一时刻的状态 ----
// 用私有字段 + 仅暴露给 Originator 的取值方法，防止外部随意篡改快照内容。
class EditorMemento {
  #content;
  #cursorPosition;

  constructor(content, cursorPosition) {
    this.#content = content;
    this.#cursorPosition = cursorPosition;
  }

  // 故意不提供 public getter，只允许创建它的 Editor 通过约定的方法访问，
  // 这里用一个内部符号方法模拟“仅 Originator 可读”的约束。
  _restore() {
    return { content: this.#content, cursorPosition: this.#cursorPosition };
  }
}

// ---- 发起人（Originator）：拥有需要被保存/恢复的状态 ----
class TextEditor {
  #content = '';
  #cursorPosition = 0;

  type(text) {
    this.#content += text;
    this.#cursorPosition = this.#content.length;
    console.log(`  输入 "${text}" -> 当前内容: "${this.#content}"`);
  }

  get content() {
    return this.#content;
  }

  // 创建备忘录，保存当前状态的快照
  save() {
    console.log(`  [快照] 保存当前状态: "${this.#content}"`);
    return new EditorMemento(this.#content, this.#cursorPosition);
  }

  // 从备忘录恢复状态
  restore(memento) {
    const { content, cursorPosition } = memento._restore();
    this.#content = content;
    this.#cursorPosition = cursorPosition;
    console.log(`  [恢复] 内容还原为: "${this.#content}"`);
  }
}

// ---- 管理者（Caretaker）：负责保存备忘录历史，但从不检查/修改其内容 ----
class History {
  #stack = [];

  push(memento) {
    this.#stack.push(memento);
  }

  pop() {
    return this.#stack.pop();
  }

  get canUndo() {
    return this.#stack.length > 0;
  }
}

console.log('=== 备忘录模式：文本编辑器撤销 ===\n');

const editor = new TextEditor();
const history = new History();

console.log('-- 逐步输入内容，每步之前先保存快照 --');
history.push(editor.save()); // 快照0: ""
editor.type('Hello');

history.push(editor.save()); // 快照1: "Hello"
editor.type(', World');

history.push(editor.save()); // 快照2: "Hello, World"
editor.type('!!!');

console.log(`\n当前最终内容: "${editor.content}"`);

console.log('\n-- 执行两次撤销 --');
if (history.canUndo) editor.restore(history.pop()); // 回到 "Hello, World"
if (history.canUndo) editor.restore(history.pop()); // 回到 "Hello"

console.log(`\n撤销后内容: "${editor.content}"`);

console.log('\n-- 继续撤销直到历史耗尽 --');
if (history.canUndo) editor.restore(history.pop()); // 回到 ""
console.log(`最终内容: "${editor.content}"`);
console.log('是否还能撤销:', history.canUndo);
