# Iterator 迭代器模式（Python）

## 意图

提供一种方法顺序访问一个聚合对象中的各个元素，而又不暴露该对象的内部表示。
Python 将这一模式直接内建为语言协议（`__iter__` / `__next__`），本例既演示
显式的迭代器类写法，也说明它如何与 `for`、`next()` 等语言设施无缝配合。

## 适用场景

- 需要遍历一个聚合对象，但不希望暴露其内部数据结构（列表、树、哈希表等）
- 需要为同一个聚合提供多种遍历方式（本例：正序 / 逆序）
- 希望遍历逻辑与聚合本身的逻辑解耦，可以独立变化

## 实现方式

`BookCollection` 是聚合，内部用列表保存 `Book`，但只暴露 `add_book()` 与
`__iter__()`；`BookIterator`/`ReverseBookIterator` 是具体迭代器，各自维护自己的
游标，互不干扰：

```python
class BookIterator(Iterator[Book]):
    """具体迭代器：正序遍历，维护自己的游标，不暴露聚合的内部列表"""

    def __next__(self) -> Book:
        if self._index >= len(self._books):
            raise StopIteration
        book = self._books[self._index]
        self._index += 1
        return book


class BookCollection:
    def __iter__(self) -> BookIterator:
        """默认迭代方式：正序。使 BookCollection 可直接用于 for 循环"""
        return BookIterator(self._books)
```

## 文件说明

| 文件 | 说明 |
|------|------|
| `main.py` | `Book`、`BookIterator`/`ReverseBookIterator` 具体迭代器、`BookCollection` 聚合、`main()` 演示 |

## 编译与运行

```bash
python main.py
```

## 输出示例

```
书架中共有 4 本书

--- 正序遍历（直接对聚合使用 for，隐式调用 __iter__） ---
  《设计模式》- GoF
  《代码大全》- Steve McConnell
  《重构》- Martin Fowler
  《架构整洁之道》- Robert C. Martin

--- 逆序遍历（显式获取 ReverseBookIterator） ---
  《架构整洁之道》- Robert C. Martin
  《重构》- Martin Fowler
  《代码大全》- Steve McConnell
  《设计模式》- GoF

--- 手动驱动迭代器（不依赖 for，直接调用 next()） ---
  第一本: 《设计模式》- GoF
  第二本: 《代码大全》- Steve McConnell
  （迭代器会记住当前位置，下次 next() 从第三本继续）
```

## 要点

1. **内部表示被隐藏** —— 外部代码只通过迭代器访问书籍，从未直接接触 `BookCollection._books` 这个列表。
2. **多种遍历方式并存** —— 正序 `BookIterator` 与逆序 `ReverseBookIterator` 各自维护独立游标，可以同时存在、互不干扰。
3. **与 Python 协议融合** —— 实现 `__iter__`/`__next__` 后，`BookCollection` 自动获得对 `for`、`list()`、`next()`、解包等所有语言设施的支持，这是 Python "鸭子类型 + 协议" 哲学的直接体现。
4. `collections.abc.Iterator` 作为基类不仅提供类型标注，还免费提供了 `__iter__` 返回 `self` 之外的一些辅助行为（可与 `Iterable` 对照区分：聚合是 `Iterable`，迭代器本身是 `Iterator`）。
