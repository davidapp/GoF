"""备忘录模式（Memento）
场景：文本编辑器 —— 保存快照并 undo 恢复内容。

核心思想：在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外
保存这个状态，以便之后可以将该对象恢复到原先保存的状态。
Originator（编辑器）负责生成/恢复快照，Caretaker（历史记录）只负责保管
快照列表，并不知道、也不关心快照内部的具体内容。
"""

from __future__ import annotations

import sys
from dataclasses import dataclass

# Windows 控制台有时默认非 UTF-8 编码，强制切换避免中文输出乱码
if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8")


# ------------------------- 备忘录（Memento） -------------------------
@dataclass(frozen=True)
class EditorMemento:
    """备忘录：不可变快照，只有 Originator 才应该解读其内容。
    Caretaker 只是持有它，不会也不应该修改它（frozen 保证不可变）。
    """

    content: str
    cursor: int


# ------------------------- 发起人（Originator） -------------------------
class TextEditor:
    """发起人：真正拥有状态（文本内容、光标位置）的对象"""

    def __init__(self) -> None:
        self._content: str = ""
        self._cursor: int = 0

    @property
    def content(self) -> str:
        return self._content

    def type(self, text: str) -> None:
        self._content = self._content[: self._cursor] + text + self._content[self._cursor :]
        self._cursor += len(text)

    def save(self) -> EditorMemento:
        """生成当前状态的快照"""
        return EditorMemento(self._content, self._cursor)

    def restore(self, memento: EditorMemento) -> None:
        """根据快照恢复状态"""
        self._content = memento.content
        self._cursor = memento.cursor

    def show(self) -> str:
        return f'"{self._content}" (光标位置: {self._cursor})'


# ------------------------- 管理者（Caretaker） -------------------------
class History:
    """管理者：只负责保存/取出快照，不关心快照里的具体内容"""

    def __init__(self) -> None:
        self._snapshots: list[EditorMemento] = []

    def push(self, memento: EditorMemento) -> None:
        self._snapshots.append(memento)

    def pop(self) -> EditorMemento | None:
        if not self._snapshots:
            return None
        return self._snapshots.pop()

    @property
    def size(self) -> int:
        return len(self._snapshots)


def main() -> None:
    editor = TextEditor()
    history = History()

    editor.type("设计模式")
    history.push(editor.save())  # 快照 1: "设计模式"
    print(f"输入后           : {editor.show()}")

    editor.type("——GoF 二十三种")
    history.push(editor.save())  # 快照 2: "设计模式——GoF 二十三种"
    print(f"继续输入后       : {editor.show()}")

    editor.type("（已过时？）")
    print(f"手滑多打了一段  : {editor.show()}")

    print()
    print("--- 撤销一次（回到快照 2） ---")
    memento = history.pop()
    if memento:
        editor.restore(memento)
    print(f"撤销后           : {editor.show()}")

    print()
    print("--- 再撤销一次（回到快照 1） ---")
    memento = history.pop()
    if memento:
        editor.restore(memento)
    print(f"再次撤销后       : {editor.show()}")

    print()
    print(f"历史记录中剩余快照数: {history.size}")


if __name__ == "__main__":
    main()
