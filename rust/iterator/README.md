# Iterator 迭代器模式（Rust）

## 意图
提供一种方法顺序访问一个聚合对象中的各个元素，而又不暴露该对象的内部表示（数组？链表？哈希表？调用方都无需关心）。

## 适用场景
- 需要遍历一个聚合对象，但不希望暴露其内部数据结构
- 希望以统一的方式遍历不同种类的聚合结构
- 需要同时维护多个独立的遍历位置（每个迭代器互不影响）

## 实现方式
Rust 标准库本身就是围绕 `Iterator` trait 设计的，因此最地道的做法不是自己发明一套
`has_next`/`next` 接口，而是直接为自定义迭代器实现标准的 `Iterator`：

```rust
struct BookIterator<'a> {
    books: &'a [Book],
    index: usize,
}

impl<'a> Iterator for BookIterator<'a> {
    type Item = &'a Book;
    fn next(&mut self) -> Option<Self::Item> {
        if self.index < self.books.len() {
            let book = &self.books[self.index];
            self.index += 1;
            Some(book)
        } else {
            None
        }
    }
}
```

`BookCollection::iter()` 返回这个具体迭代器，内部的 `Vec<Book>` 对调用者完全隐藏。
因为实现的是标准 `Iterator`，`for` 循环和 `filter`/`count` 等适配器都可以直接使用。

## 文件说明
| 文件 | 说明 |
|------|------|
| `main.rs` | `Book` 元素、`BookCollection` 聚合、`BookIterator` 具体迭代器（实现标准 `Iterator`）、`main()` 演示 |

## 编译与运行
```bash
rustc main.rs && ./main
```

## 输出示例
```
=== 迭代器模式：BookCollection 演示 ===

按加入顺序遍历：
  《三体》 —— 刘慈欣
  《百年孤独》 —— 加西亚·马尔克斯
  《小王子》 —— 圣埃克苏佩里
  《球状闪电》 —— 刘慈欣

只看作者包含"刘"的书：
  《三体》 —— 刘慈欣
  《球状闪电》 —— 刘慈欣

书籍总数: 4
```
（预期输出（本机未安装 Rust，未实机运行）。）

## 要点
1. **实现标准 `Iterator` 而非自造接口** —— 这是 Rust 里该模式的惯用写法，
   一旦实现了 `next()`，`for` 循环、`filter`、`map`、`count` 等全部自动可用。
2. **生命周期参数保证借用安全** —— `BookIterator<'a>` 的 `'a` 与 `&'a [Book]` 绑定，
   编译期保证迭代器不会比它所遍历的集合活得更久，不存在悬挂引用的风险。
3. **内部表示对外完全隐藏** —— 客户端只知道“可以遍历”，不知道、也不需要知道
   `BookCollection` 内部用的是 `Vec`；换成其他容器不会影响 `iter()` 的调用方式。
4. **每次 `iter()` 都产生独立的遍历状态** —— `index` 保存在迭代器自身而非集合上，
   可以同时存在多个互不干扰的遍历过程。
