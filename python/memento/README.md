# Memento 备忘录模式（Python）

## 意图

在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态，
以便之后可以将该对象恢复到先前保存的状态（撤销/历史回放的基础）。

## 适用场景

- 需要保存一个对象在某一时刻的（部分）状态，以便之后恢复到这个状态（undo）
- 直接获取对象状态的接口会暴露实现细节，破坏对象的封装性
- 需要提供撤销/重做、检查点（checkpoint）、历史回滚等功能

## 实现方式

`EditorMemento` 是不可变（`frozen=True`）的备忘录，只有 `TextEditor`（发起人）知道
如何生成和解读它；`History`（管理者）只负责把备忘录压栈/出栈，从不查看其内容：

```python
@dataclass(frozen=True)
class EditorMemento:
    """备忘录：不可变快照，只有 Originator 才应该解读其内容"""
    content: str
    cursor: int


class TextEditor:
    def save(self) -> EditorMemento:
        return EditorMemento(self._content, self._cursor)

    def restore(self, memento: EditorMemento) -> None:
        self._content = memento.content
        self._cursor = memento.cursor
```

## 文件说明

| 文件 | 说明 |
|------|------|
| `main.py` | `EditorMemento` 备忘录、`TextEditor` 发起人、`History` 管理者、`main()` 演示保存与撤销 |

## 编译与运行

```bash
python main.py
```

## 输出示例

```
输入后           : "设计模式" (光标位置: 4)
继续输入后       : "设计模式——GoF 二十三种" (光标位置: 14)
手滑多打了一段  : "设计模式——GoF 二十三种（已过时？）" (光标位置: 20)

--- 撤销一次（回到快照 2） ---
撤销后           : "设计模式——GoF 二十三种" (光标位置: 14)

--- 再撤销一次（回到快照 1） ---
再次撤销后       : "设计模式" (光标位置: 4)

历史记录中剩余快照数: 0
```

## 要点

1. **封装性不被破坏** —— `TextEditor` 的内部字段 `_content`/`_cursor` 从未直接暴露给 `History`，外界只能拿到一个不透明的 `EditorMemento`。
2. **职责三分离** —— Originator（编辑器，产生/消费快照）、Memento（不可变数据容器）、Caretaker（历史栈，只负责存取）各司其职。
3. **`frozen=True` 防止篡改** —— 备忘录一旦创建就不可变，杜绝 Caretaker 或其他代码意外修改已保存的历史状态。
4. 与命令模式的 undo 的区别：命令模式的 undo 是"执行反向操作"，备忘录的 undo 是"整体替换回一份完整快照"——数据量较小、状态转换逻辑复杂时更适合备忘录。
