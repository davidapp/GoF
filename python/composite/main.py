"""组合模式（Composite）
场景：文件系统 —— File 与 Directory 统一计算总大小 / 打印目录树。

核心思想：将对象组合成树形结构以表示"部分-整体"的层次关系；组合模式使得
客户端对单个对象（File）和组合对象（Directory）的使用具有一致性——
都通过同一个抽象接口（size、display）访问，无需在代码中区分"是文件还是目录"。
"""

from __future__ import annotations

import sys
from abc import ABC, abstractmethod

# Windows 控制台有时默认非 UTF-8 编码，强制切换避免中文输出乱码
if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8")


# ------------------------- 抽象构件（Component） -------------------------
class FileSystemNode(ABC):
    """抽象构件：文件与目录的统一接口"""

    def __init__(self, name: str) -> None:
        self.name = name

    @property
    @abstractmethod
    def size(self) -> int:
        """占用字节数：叶子节点是自身大小，组合节点是所有子节点之和"""

    @abstractmethod
    def display(self, indent: int = 0) -> None:
        """打印以该节点为根的树形结构"""


# ------------------------- 叶子节点（Leaf） -------------------------
class File(FileSystemNode):
    """叶子构件：文件，没有子节点"""

    def __init__(self, name: str, size_bytes: int) -> None:
        super().__init__(name)
        self._size_bytes = size_bytes

    @property
    def size(self) -> int:
        return self._size_bytes

    def display(self, indent: int = 0) -> None:
        print("  " * indent + f"- {self.name} ({self._size_bytes} B)")


# ------------------------- 组合节点（Composite） -------------------------
class Directory(FileSystemNode):
    """组合构件：目录，可包含文件或子目录（递归结构）"""

    def __init__(self, name: str) -> None:
        super().__init__(name)
        self._children: list[FileSystemNode] = []

    def add(self, node: FileSystemNode) -> Directory:
        self._children.append(node)
        return self

    def remove(self, node: FileSystemNode) -> None:
        self._children.remove(node)

    @property
    def size(self) -> int:
        # 递归汇总所有子节点的大小，调用者无需关心子节点是文件还是子目录
        return sum(child.size for child in self._children)

    def display(self, indent: int = 0) -> None:
        print("  " * indent + f"+ {self.name}/ ({self.size} B)")
        for child in self._children:
            child.display(indent + 1)


def main() -> None:
    # 构建一棵目录树：
    # project/
    #   ├─ README.md
    #   ├─ src/
    #   │   ├─ main.py
    #   │   └─ utils.py
    #   └─ tests/
    #       └─ test_main.py
    project = Directory("project")
    project.add(File("README.md", 2048))

    src = Directory("src")
    src.add(File("main.py", 4096))
    src.add(File("utils.py", 1536))

    tests = Directory("tests")
    tests.add(File("test_main.py", 1024))

    project.add(src)
    project.add(tests)

    print("--- 目录树结构 ---")
    project.display()

    print()
    print(f"project 总大小 : {project.size} B")
    print(f"src 子目录大小 : {src.size} B")

    print()
    print("--- 删除 tests 目录后 ---")
    project.remove(tests)
    project.display()
    print(f"project 总大小 : {project.size} B")


if __name__ == "__main__":
    main()
