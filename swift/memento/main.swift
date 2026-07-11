import Foundation

// 备忘录模式：文本编辑器撤销
// 场景：保存快照并 undo 恢复内容

// MARK: - 备忘录：不可变快照，用 struct 值类型天然保证不可变、可安全传递
struct EditorMemento {
    // fileprivate：只有本文件内的类型能读取内容，模拟"只有原发器才能解读备忘录内部状态"
    fileprivate let content: String
}

// MARK: - 发起人：文本编辑器，可以创建及恢复快照
final class TextEditor {
    private(set) var content: String = ""

    func type(_ text: String) {
        content += text
    }

    // 创建备忘录，捕获当前状态
    func save() -> EditorMemento {
        EditorMemento(content: content)
    }

    // 从备忘录恢复状态
    func restore(from memento: EditorMemento) {
        content = memento.content
    }
}

// MARK: - 管理者：只负责保存/取出备忘录，不关心也无法访问其内部内容
final class History {
    private var mementos: [EditorMemento] = []

    func push(_ memento: EditorMemento) {
        mementos.append(memento)
    }

    func popLast() -> EditorMemento? {
        mementos.popLast()
    }
}

// MARK: - 顶层入口
print("=== 备忘录模式：文本编辑器撤销 ===\n")

let editor = TextEditor()
let history = History()

editor.type("Hello")
history.push(editor.save())
print("输入后: \"\(editor.content)\"")

editor.type(", World")
history.push(editor.save())
print("输入后: \"\(editor.content)\"")

editor.type("! 这是多余的内容，输入错误了")
print("输入后: \"\(editor.content)\"")

print("\n执行撤销（恢复到上一个快照）...")
if let lastSnapshot = history.popLast() {
    editor.restore(from: lastSnapshot)
}
print("撤销后: \"\(editor.content)\"")

print("\n再次撤销...")
if let previousSnapshot = history.popLast() {
    editor.restore(from: previousSnapshot)
}
print("撤销后: \"\(editor.content)\"")
