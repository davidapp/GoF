# Visitor 访问者模式（Go）

## 意图

在不改变元素类的前提下，为一组类型定义新的操作。把"数据结构"与"作用在其上的操作"
分离，新增操作只需新增一个访问者，而不必修改每个元素类型。

## 适用场景

- 需要对一组稳定的类型（图形、AST 节点）不断新增不同种类的操作（求面积、渲染、序列化……）
- 元素类型本身很少变化，但作用在它们之上的操作经常增加
- 希望把同一种操作在各类型上的逻辑集中写在一个访问者里，而不是分散到各元素类型内部

## 实现方式

`Shape` 元素接口只有一个 `Accept(visitor ShapeVisitor)`；`ShapeVisitor` 接口为每种
具体图形声明一个 `Visit*` 方法。`AreaVisitor`/`DrawVisitor` 是两个独立的具体访问者，
分别实现"求面积"和"渲染"，都不需要修改 `Circle`/`Rectangle`：

```go
// ShapeVisitor 访问者接口：为每种具体图形声明一个 Visit 方法
type ShapeVisitor interface {
	VisitCircle(c *Circle)
	VisitRectangle(r *Rectangle)
}

func (c *Circle) Accept(visitor ShapeVisitor) {
	visitor.VisitCircle(c) // 双重分派：先按元素类型调用 Accept，再回调对应的 Visit 方法
}
```

## 文件说明

| 文件 | 说明 |
|------|------|
| `main.go` | `Shape`/`ShapeVisitor` 接口、`Circle`/`Rectangle`、`AreaVisitor`/`DrawVisitor`、`main` 演示入口 |

## 编译与运行

```bash
cd go/visitor
go run .
```

## 输出示例

预期输出（本机未安装 Go 工具链，未实机运行）：

```
=== 访问者模式：图形操作 ===
-- 使用 AreaVisitor 计算面积 --
圆形(半径=3.0) 面积 = 28.27
矩形(4.0x5.0) 面积 = 20.00
圆形(半径=1.5) 面积 = 7.07
总面积 = 55.34

-- 使用 DrawVisitor 渲染图形 --
绘制一个半径为 3.0 的圆 ○
绘制一个 4.0x5.0 的矩形 □
绘制一个半径为 1.5 的圆 ○
```

## 要点

1. **双重分派** — `shape.Accept(visitor)` 先按元素的动态类型分派一次，`visitor.VisitXxx` 内部再按操作分派一次，从而实现"类型 × 操作"的精确匹配。
2. **新增操作零侵入** — 新增 `PerimeterVisitor` 只需实现 `ShapeVisitor` 接口，不必修改 `Circle`/`Rectangle`。
3. **代价是新增类型较麻烦** — 若新增 `Triangle` 元素类型，则所有已有的 `ShapeVisitor` 实现都要跟着补充对应方法，这是访问者模式的典型取舍。
