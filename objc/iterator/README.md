# Iterator 迭代器模式（Objective-C）

## 意图

提供一种方法顺序访问聚合对象中的各个元素，而不暴露该对象的内部表示（数组、链表还是别的结构）。

## 适用场景

- 需要遍历聚合对象，但不希望暴露其内部数据结构
- 需要为同一个聚合提供多种遍历方式，或支持多个遍历同时独立进行
- 希望用统一的接口遍历不同种类的聚合结构

## 实现方式

`BookCollection` 内部用 `NSMutableArray` 存储 `Book`，但对外只暴露 `createIterator`；具体的 `BookIterator` 持有元素快照与游标，实现 `Iterator` 协议的 `hasNext`/`next`：

```objc
@protocol Iterator <NSObject>
- (BOOL)hasNext;
- (nullable Book *)next;
@end

id<Iterator> iterator = [shelf createIterator];
while ([iterator hasNext]) {
    Book *book = [iterator next];
    // ...
}
```

客户端完全不知道 `BookCollection` 内部是数组还是别的结构，也可以同时创建多个互不干扰的迭代器。

## 文件说明

| 文件 | 说明 |
|------|------|
| `Iterator.h` | 元素 `Book`、迭代器协议 `Iterator`、聚合 `BookCollection` 声明 |
| `Iterator.m` | 上述类型的实现，具体迭代器 `BookIterator` 只在 .m 中声明 |
| `main.m` | 顺序遍历书架，并演示两个迭代器互不干扰地独立前进 |
| `Makefile` | 编译与运行 |

## 编译与运行

```bash
make run    # 编译并运行
make        # 仅编译
make clean  # 清理
```

## 输出示例

```
=== 用自定义迭代器顺序遍历 BookCollection ===
1. 《设计模式》 —— GoF
2. 《重构》 —— Martin Fowler
3. 《代码整洁之道》 —— Robert C. Martin
 
书架共有 3 本书
 
=== 同一个聚合可以同时产生多个互不干扰的迭代器 ===
迭代器 A 第一本: 设计模式
迭代器 A 第二本: 重构
迭代器 B 第一本: 设计模式（不受 A 的进度影响）
```

（预期输出 —— 本机未安装 ObjC 工具链，未实机运行）

## 要点

1. **封装内部结构** —— 客户端只认识 `Iterator` 协议，`BookCollection` 未来把内部存储从数组换成链表也不影响客户端代码。
2. **多个迭代器互不干扰** —— 每个 `BookIterator` 有自己独立的游标和数据快照，可以同时对同一聚合发起多轮遍历。
3. **与 Cocoa 内建机制的关系** —— 如果只需要 `for...in` 遍历，Foundation 容器自带 `NSFastEnumeration`（`for (Book *b in array)`）已经足够；本例手写 `Iterator` 协议是为了展示模式本身的结构，实际工程中容器类可以额外实现 `NSFastEnumeration` 来获得原生 `for...in` 语法糖。
