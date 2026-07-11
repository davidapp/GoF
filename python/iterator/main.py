"""迭代器模式（Iterator）
场景：自定义 BookCollection，提供迭代器顺序遍历（以及按需的逆序遍历）。

核心思想：提供一种方法顺序访问一个聚合对象中的各个元素，而又不暴露该对象的
内部表示（书籍实际存放在一个内部列表里，外部只通过迭代器访问，看不到这个细节）。
Python 将该模式内建为语言协议：实现 __iter__/__next__ 即可无缝配合 for 循环、
list()、sum() 等所有语言内置设施。
"""

from __future__ import annotations

import sys
from collections.abc import Iterator
from dataclasses import dataclass

# Windows 控制台有时默认非 UTF-8 编码，强制切换避免中文输出乱码
if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8")


# ------------------------- 元素 -------------------------
@dataclass
class Book:
    """聚合中的元素：书籍"""

    title: str
    author: str

    def __str__(self) -> str:
        return f"《{self.title}》- {self.author}"


# ------------------------- 具体迭代器（Concrete Iterator） -------------------------
class BookIterator(Iterator[Book]):
    """具体迭代器：正序遍历，维护自己的游标，不暴露聚合的内部列表"""

    def __init__(self, books: list[Book]) -> None:
        self._books = books
        self._index = 0

    def __iter__(self) -> BookIterator:
        return self

    def __next__(self) -> Book:
        if self._index >= len(self._books):
            raise StopIteration
        book = self._books[self._index]
        self._index += 1
        return book


class ReverseBookIterator(Iterator[Book]):
    """具体迭代器：逆序遍历，与正序迭代器共享同一个聚合，互不干扰"""

    def __init__(self, books: list[Book]) -> None:
        self._books = books
        self._index = len(books) - 1

    def __iter__(self) -> ReverseBookIterator:
        return self

    def __next__(self) -> Book:
        if self._index < 0:
            raise StopIteration
        book = self._books[self._index]
        self._index -= 1
        return book


# ------------------------- 聚合（Aggregate） -------------------------
class BookCollection:
    """抽象聚合的 Python 实现：只暴露增加书籍与创建迭代器的方法，不暴露内部列表"""

    def __init__(self) -> None:
        self._books: list[Book] = []

    def add_book(self, book: Book) -> None:
        self._books.append(book)

    def __len__(self) -> int:
        return len(self._books)

    def __iter__(self) -> BookIterator:
        """默认迭代方式：正序。使 BookCollection 可直接用于 for 循环"""
        return BookIterator(self._books)

    def reverse_iterator(self) -> ReverseBookIterator:
        """提供另一种遍历方式：逆序，体现"同一聚合可支持多种迭代器" """
        return ReverseBookIterator(self._books)


def main() -> None:
    collection = BookCollection()
    for title, author in [
        ("设计模式", "GoF"),
        ("代码大全", "Steve McConnell"),
        ("重构", "Martin Fowler"),
        ("架构整洁之道", "Robert C. Martin"),
    ]:
        collection.add_book(Book(title, author))

    print(f"书架中共有 {len(collection)} 本书")

    print()
    print("--- 正序遍历（直接对聚合使用 for，隐式调用 __iter__） ---")
    for book in collection:
        print(f"  {book}")

    print()
    print("--- 逆序遍历（显式获取 ReverseBookIterator） ---")
    reverse_it = collection.reverse_iterator()
    for book in reverse_it:
        print(f"  {book}")

    print()
    print("--- 手动驱动迭代器（不依赖 for，直接调用 next()） ---")
    manual_it = iter(collection)
    print(f"  第一本: {next(manual_it)}")
    print(f"  第二本: {next(manual_it)}")
    print("  （迭代器会记住当前位置，下次 next() 从第三本继续）")


if __name__ == "__main__":
    main()
