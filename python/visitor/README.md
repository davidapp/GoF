# Visitor 访问者模式（Python）

## 意图

表示一个作用于某对象结构中各元素的操作，使得可以在不改变各元素类的前提下
定义作用于这些元素的新操作。适合"元素类型稳定，但操作种类经常增长"的场景——
新增一种操作（访问者）不需要改动任何一个元素类。

## 适用场景

- 对象结构（如一批图形）的类相对稳定，但需要经常对它们定义新的、不相关的操作
- 需要对结构中的对象进行很多不同且不相关的操作，又不希望这些操作污染元素类本身
- 需要通过"双重分派"精确匹配"某种元素 × 某种操作"的组合逻辑

## 实现方式

`Shape.accept(visitor)` 先按元素的真实类型分派一次（调用到 `Circle.accept` 还是
`Rectangle.accept`），内部再调用 `visitor.visit_circle(self)` 按访问者的真实类型
分派第二次——这就是"双重分派"：

```python
class Circle(Shape):
    def accept(self, visitor: ShapeVisitor) -> None:
        visitor.visit_circle(self)  # 第二次分派：交给访问者处理"圆形"的具体逻辑


class AreaVisitor(ShapeVisitor):
    """具体访问者：计算面积"""
    def visit_circle(self, circle: Circle) -> None:
        area = math.pi * circle.radius ** 2
        ...
```

`main()` 演示了 `AreaVisitor`（求面积）、`DrawVisitor`（渲染）、`PerimeterVisitor`
（求周长，作为"新增操作"示例）三种访问者作用于同一组图形对象。

## 文件说明

| 文件 | 说明 |
|------|------|
| `main.py` | `ShapeVisitor` 抽象访问者、`Shape`/`Circle`/`Rectangle` 元素、三种具体访问者、`main()` 演示 |

## 编译与运行

```bash
python main.py
```

## 输出示例

```
--- 使用 AreaVisitor 计算每个图形的面积 ---
  圆形(半径=5) 面积 = 78.54
  矩形(4x6) 面积 = 24.00
  圆形(半径=2) 面积 = 12.57
  矩形(3x3) 面积 = 9.00
  总面积 = 124.11

--- 使用 DrawVisitor 渲染所有图形 ---
  绘制: ○ 一个半径为 5 的圆
  绘制: ▭ 一个 4x6 的矩形
  绘制: ○ 一个半径为 2 的圆
  绘制: ▭ 一个 3x3 的矩形

--- 新增 PerimeterVisitor 计算周长（无需修改 Shape 任何代码） ---
  圆形(半径=5) 周长 = 31.42
  矩形(4x6) 周长 = 20.00
  圆形(半径=2) 周长 = 12.57
  矩形(3x3) 周长 = 12.00
```

## 要点

1. **双重分派** —— `accept()` 与 `visit_xxx()` 配合，确保最终执行的是"这种图形 × 这种操作"精确对应的那段代码，弥补了 Python（和多数语言一样）方法重载按静态类型分派的局限。
2. **新增操作不改元素类** —— `PerimeterVisitor` 是后加的第三种操作，`Circle`/`Rectangle` 代码完全未变，只新增了一个访问者类。
3. **代价：新增元素类型较麻烦** —— 如果新增 `Triangle`，则每个已有的 `ShapeVisitor` 子类都要跟着新增 `visit_triangle` 方法；访问者模式适合"元素稳定、操作多变"，反过来则不合适。
4. 与本仓库的模板方法、策略等模式相比，访问者是少数需要"元素"与"操作"两个类层次协同设计的模式，结构相对复杂，请优先在确有"稳定结构 + 频繁新增操作"需求时使用。
