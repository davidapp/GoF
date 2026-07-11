// 备忘录模式（Memento）—— 文本编辑器撤销演示
//
// TextEditor（发起人）可以把自己的状态导出成一个 Memento 快照，
// 之后再用某个快照恢复。History（管理者）只负责保存/取出快照，
// 不关心快照内部的具体内容，从而不破坏 TextEditor 的封装性。

// 备忘录：保存编辑器某一时刻的内容快照
struct Memento {
    content: String,
}

// 发起人：文本编辑器
struct TextEditor {
    content: String,
}

impl TextEditor {
    fn new() -> Self {
        TextEditor { content: String::new() }
    }

    fn type_text(&mut self, text: &str) {
        self.content.push_str(text);
    }

    fn content(&self) -> &str {
        &self.content
    }

    // 创建备忘录，保存当前状态
    fn save(&self) -> Memento {
        Memento { content: self.content.clone() }
    }

    // 从备忘录恢复状态
    fn restore(&mut self, memento: Memento) {
        self.content = memento.content;
    }
}

// 管理者：只保存/取出快照，不查看、不修改快照内容
struct History {
    snapshots: Vec<Memento>,
}

impl History {
    fn new() -> Self {
        History { snapshots: Vec::new() }
    }

    fn push(&mut self, memento: Memento) {
        self.snapshots.push(memento);
    }

    fn pop(&mut self) -> Option<Memento> {
        self.snapshots.pop()
    }
}

fn main() {
    println!("=== 备忘录模式：文本编辑器撤销演示 ===\n");

    let mut editor = TextEditor::new();
    let mut history = History::new();

    editor.type_text("你好，");
    history.push(editor.save());
    println!("输入后内容: {}", editor.content());

    editor.type_text("世界！");
    history.push(editor.save());
    println!("输入后内容: {}", editor.content());

    editor.type_text("这是一段写错的文字。");
    println!("输入后内容: {}", editor.content());

    println!("\n-- 执行撤销 --");
    if let Some(memento) = history.pop() {
        editor.restore(memento);
    }
    println!("撤销后内容: {}", editor.content());

    println!("\n-- 再次撤销 --");
    if let Some(memento) = history.pop() {
        editor.restore(memento);
    }
    println!("撤销后内容: {}", editor.content());
}
