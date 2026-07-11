# Decorator 装饰器模式（Go）

## 意图

在不改变对象自身的前提下，动态地为其添加额外职责。相比生成子类，装饰器提供了更灵活的、可任意叠加的扩展方式。

## 适用场景

- 需要给对象动态、可叠加地添加职责，且职责组合数量会随需求增长（加奶/加糖/加冰……）
- 不希望通过继承为每种组合都建一个子类（组合爆炸）
- 希望装饰的顺序、次数可以在运行时自由决定

## 实现方式

`Beverage` 是组件接口；`Espresso` 是具体组件；`MilkDecorator`/`SugarDecorator`
内嵌 `beverageDecorator`（持有被装饰对象），层层包裹并在原有结果上叠加自己的部分：

```go
// 装饰器基础结构：持有被装饰的 Beverage（组合而非继承）
type beverageDecorator struct {
	wrapped Beverage
}

func (m *MilkDecorator) Cost() float64 {
	return m.wrapped.Cost() + 3.0
}
```

每包裹一层，`Description()`/`Cost()` 都会在被包裹对象结果之上继续叠加，实现"洋葱式"调用链。

## 文件说明

| 文件 | 说明 |
|------|------|
| `main.go` | `Beverage` 接口、`Espresso` 组件、`MilkDecorator`/`SugarDecorator` 装饰器、`main` 演示入口 |

## 编译与运行

```bash
cd go/decorator
go run .
```

## 输出示例

预期输出（本机未安装 Go 工具链，未实机运行）：

```
=== 装饰器模式：咖啡加料 ===
Espresso 意式浓缩 => 15.00 元
Espresso 意式浓缩 + 牛奶 => 18.00 元
Espresso 意式浓缩 + 牛奶 + 糖 => 19.50 元
Espresso 意式浓缩 + 牛奶 + 糖 + 糖 => 21.00 元
```

## 要点

1. **可任意叠加与重复** — 同一种装饰器可以叠加多次（如两份糖），顺序不同结果的描述文本也不同。
2. **装饰器与被装饰者同接口** — `MilkDecorator` 本身也是 `Beverage`，因此可以被再次装饰，形成链式包装。
3. **与桥接的区别** — 装饰器是运行时动态叠加职责，桥接是设计期分离两个独立变化的维度。
