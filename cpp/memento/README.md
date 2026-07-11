# Memento 备忘录模式（C++）

## 意图

在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态，以便之后可以将该对象恢复到原先保存的状态。

## 适用场景

- 需要保存/恢复对象某一时刻的状态（撤销操作、检查点、事务回滚）
- 直接暴露对象内部状态会破坏封装性，但又需要在外部保存这些状态

## 实现方式

`EditorMemento` 只把 `content_` 对 `TextEditor` 声明为 `friend`，对其他任何人都不可见；`TextEditor`（发起人）负责创建和恢复备忘录；`History`（管理者）只负责存取备忘录对象，从不查看其内容：

```cpp
class EditorMemento {
    friend class TextEditor;   // 只有 TextEditor 能读取 content_
    std::string content_;
};

std::unique_ptr<EditorMemento> TextEditor::save() const {
    return std::make_unique<EditorMemento>(content_);
}
void TextEditor::restore(const EditorMemento& memento) { content_ = memento.content_; }
```

`History` 用 `vector<unique_ptr<EditorMemento>>` 实现一个后进先出的快照栈，`pop()` 弹出最近一次保存点，交回 `TextEditor::restore()` 完成恢复。

## 文件说明

| 文件 | 说明 |
|------|------|
| `editor.h` | 备忘录 `EditorMemento`、发起人 `TextEditor`、管理者 `History` 的声明 |
| `editor.cpp` | 创建/恢复快照、历史栈存取的具体实现 |
| `main.cpp` | 输入三段文字（中途保存两次快照），连续 undo 两次观察内容回退 |
| `Makefile` | 编译与运行 |

## 编译与运行

```bash
make        # 编译
make run    # 编译并运行
make clean  # 清理
```

## 输出示例

```
=== 备忘录模式：文本编辑器 undo ===

输入后: 第一段内容。
输入后: 第一段内容。第二段内容。
输入后: 第一段内容。第二段内容。第三段内容（手滑写错了）。

执行 undo...
撤销后: 第一段内容。第二段内容。

再次执行 undo...
撤销后: 第一段内容。
```

## 要点

1. **封装边界受保护** — 备忘录的内部状态只对发起人可见，`History` 只是“黑盒保管员”
2. **发起人负责创建与恢复** — 只有 `TextEditor` 知道如何把自身状态打包成备忘录、又如何从备忘录恢复
3. **管理者与内容解耦** — `History` 不关心备忘录里到底存了什么，只负责按后进先出的顺序存取
4. **典型应用** — 文本编辑器 undo/redo、游戏存档、事务性操作的回滚点
