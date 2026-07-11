# Iterator 迭代器模式（Go）

## 意图

提供一种方法顺序访问聚合对象中的各个元素，而不暴露该对象的内部表示（切片、链表、树……）。

## 适用场景

- 希望遍历集合的方式与集合的内部存储结构解耦，日后可自由更换底层结构
- 需要对同一个聚合对象提供多种遍历方式（正序、逆序、过滤遍历等）
- 需要同时对同一集合进行多个独立的遍历（每个迭代器维护各自的游标）

## 实现方式

`Iterator` 接口只有 `HasNext()`/`Next()` 两个方法；`BookCollection` 内部用切片存储
`*Book`，但只通过 `CreateIterator()` 暴露一个 `Iterator`，调用方无法直接接触切片：

```go
// Iterator 迭代器接口：顺序访问聚合对象中的元素，而不暴露其内部表示
type Iterator interface {
	HasNext() bool
	Next() *Book
}

iterator := collection.CreateIterator()
for iterator.HasNext() {
	book := iterator.Next()
	fmt.Printf("《%s》 —— %s\n", book.Title, book.Author)
}
```

## 文件说明

| 文件 | 说明 |
|------|------|
| `main.go` | `Book`、`Iterator` 接口、`BookCollection`/`bookIterator`、`main` 演示入口 |

## 编译与运行

```bash
cd go/iterator
go run .
```

## 输出示例

预期输出（本机未安装 Go 工具链，未实机运行）：

```
=== 迭代器模式：书籍集合 ===
《三体》 —— 刘慈欣
《活着》 —— 余华
《百年孤独》 —— 加西亚·马尔克斯
```

## 要点

1. **游标状态在迭代器里，不在集合里** — `index` 保存在 `bookIterator` 中，集合本身可以被多个迭代器同时遍历而互不干扰。
2. **封装内部表示** — 即使未来把 `BookCollection` 的存储从切片换成链表，`Iterator` 接口和调用方代码都不受影响。
3. **对比 Go 内置 range** — 本例手写迭代器是为了演示模式本身；简单场景下 Go 的 `for range` 切片已经足够。
