# Visitor 访问者模式（C++）

## 意图

表示一个作用于某对象结构中各元素的操作。访问者模式使得可以在不改变各元素的类的前提下，定义作用于这些元素的新操作。

## 适用场景

- 对象结构（如图形列表）相对稳定，但需要频繁新增作用于它们的新操作
- 不同类型的元素需要执行不同的、与元素类型强相关的操作，且希望把这些操作集中管理
- 想避免污染元素类本身，把“操作”与“数据结构”分离

## 实现方式

`Shape` 只声明一个 `accept(ShapeVisitor&)`；具体元素 `Circle`/`Rectangle` 的 `accept()` 都只是把 `*this` 转发给 `visitor.visit(*this)`。配合 C++ 的重载决议，`accept()` 的动态分派（虚函数）与 `visit()` 的静态重载共同构成“双重分派”：

```cpp
void Circle::accept(ShapeVisitor& visitor) const { visitor.visit(*this); }  // *this 已是 Circle&

class AreaVisitor : public ShapeVisitor {
    void visit(const Circle& circle) override { /* 计算圆面积 */ }
    void visit(const Rectangle& rectangle) override { /* 计算矩形面积 */ }
};
```

新增 `DrawVisitor` 这样的新操作时，`Circle`/`Rectangle` 无需任何改动；反之，若频繁新增图形类型而不是新增操作，访问者模式则不划算（需要修改所有已有 Visitor）。

## 文件说明

| 文件 | 说明 |
|------|------|
| `shape_visitor.h` | 抽象访问者 `ShapeVisitor`、抽象元素 `Shape`、具体元素、`AreaVisitor`/`DrawVisitor` 的声明 |
| `shape_visitor.cpp` | 双重分派入口与两个具体访问者的实现 |
| `main.cpp` | 对同一组图形分别施加 `AreaVisitor`（求面积）与 `DrawVisitor`（渲染） |
| `Makefile` | 编译与运行 |

## 编译与运行

```bash
make        # 编译
make run    # 编译并运行
make clean  # 清理
```

## 输出示例

```
=== 访问者模式：图形操作 ===

--- 使用 AreaVisitor 计算面积 ---
  圆形(半径=3) 面积 = 28.2743
  矩形(4x5) 面积 = 20
总面积 = 48.2743

--- 使用 DrawVisitor 渲染图形 ---
  画一个半径为 3 的圆 ○
  画一个 4x5 的矩形 □
```

## 要点

1. **双重分派** — `accept()` 的虚函数调用确定元素的真实类型，`visit()` 的重载决议确定要执行的具体操作，二者结合才能正确匹配“类型 x 操作”
2. **新增操作零成本** — 新增 `DrawVisitor` 完全不用修改 `Circle`/`Rectangle`，符合开闭原则
3. **新增元素成本较高** — 新增一种图形（如 `Triangle`）需要在 `ShapeVisitor` 接口中新增一个 `visit()` 重载，并修改所有已有的具体访问者
4. **适用前提** — 对象结构稳定、操作频繁变化时优先考虑访问者；反之则更适合把操作写成虚函数放在元素类本身
