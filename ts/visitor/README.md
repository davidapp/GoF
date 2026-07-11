# Visitor 访问者模式（TypeScript）

## 意图
表示一个作用于某对象结构中各元素的操作，使得可以在不改变各元素类的前提下定义新的操作。当一组稳定的元素类需要频繁新增“操作”而不是新增“类型”时，访问者能把这些操作集中管理。

## 适用场景
- 一个对象结构（如一组图形）包含多个类型不同的元素，需要对它们施加多种不相关的操作（求面积、渲染、导出等）。
- 元素的类层次结构很稳定，不常新增新的元素类型，但经常需要新增作用于这些元素上的操作。
- 想把相关的操作集中定义在一个访问者类中，而不是分散地写进每一个元素类里。

## 实现方式
`ShapeVisitor` 声明针对每种具体元素的 `visitXxx` 方法；`Shape` 元素接口声明 `accept(visitor)`。`Circle`、`Rectangle` 在 `accept()` 中调用 `visitor.visitCircle(this)` / `visitor.visitRectangle(this)`，这一步是"双分派"的关键——先通过 `accept` 确定元素的具体类型，再由该类型对应的 `visit` 方法确定具体行为：

```ts
class Circle implements Shape {
  accept(visitor: ShapeVisitor): void {
    visitor.visitCircle(this); // 双分派：把自身具体类型交给 visitor
  }
}

class AreaVisitor implements ShapeVisitor {
  visitCircle(circle: Circle): void {
    const area = Math.PI * circle.radius ** 2;
    /* ... */
  }
}
```

`AreaVisitor`、`DrawVisitor` 是两个具体访问者，在完全不修改 `Circle`/`Rectangle` 代码的前提下，分别对同一组图形施加了不同的操作。

## 文件说明
| 文件 | 说明 |
|------|------|
| main.ts | 访问者模式完整实现，对 Circle/Rectangle 施加求面积/渲染两种操作 |

## 编译与运行
```bash
cd ts/visitor
npx tsx main.ts
```

## 输出示例
```
=== 使用 DrawVisitor 渲染所有图形 ===
  绘制 ○ 圆形，半径=5
  绘制 □ 矩形，4x6
  绘制 ○ 圆形，半径=2
  绘制 □ 矩形，10x3

=== 使用 AreaVisitor 计算所有图形面积（无需修改 Shape 类） ===
  圆形(半径=5) 面积 = 78.54
  矩形(4x6) 面积 = 24.00
  圆形(半径=2) 面积 = 12.57
  矩形(10x3) 面积 = 30.00
总面积 = 145.11
```

## 要点
1. 新增一种操作（如 `PerimeterVisitor` 求周长）只需新增一个 `ShapeVisitor` 实现类，完全不用改动 `Circle`/`Rectangle`。
2. 反过来，新增一种元素类型（如 `Triangle`）则需要修改 `ShapeVisitor` 接口及其所有已有实现——这是访问者模式典型的"稳定元素、频繁扩展操作"适用前提，与"频繁新增元素类型"的场景相冲突。
3. `accept(visitor)` + `visitor.visitXxx(this)` 这一对双分派调用，是访问者模式能够在不使用 `instanceof`/类型判断的情况下，仍然精确匹配到"元素类型 x 操作类型"正确组合的核心机制。
