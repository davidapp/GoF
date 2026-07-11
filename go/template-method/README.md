# Template Method 模板方法模式（Go）

## 意图

在一个方法中定义一个算法的骨架，将某些步骤延迟到子类（或子类型）中实现，
使子类可以在不改变算法整体结构的前提下重新定义算法的某些步骤。

## 适用场景

- 多个流程步骤基本一致，只有个别步骤因具体场景而异（冲泡茶 vs 冲泡咖啡）
- 希望把公共流程集中维护一份，避免每个变体都重复实现整个流程
- 想限制"变化点"的范围，只允许扩展指定步骤，不允许打乱整体顺序

## 实现方式

Go 没有抽象类/继承，这里用"**接口 + 组合**"表达模板方法：固定的算法骨架
写在 `Beverage.Prepare()` 中，因具体饮品而异的步骤通过 `BeverageSteps`
接口委托给 `Tea`/`Coffee`：

```go
// Prepare 是模板方法：固定了冲泡流程的顺序，具体步骤由 steps 提供
func (b *Beverage) Prepare() {
	fmt.Println("1. 烧开水")
	fmt.Println("2.", b.steps.Brew())
	fmt.Println("3. 倒入杯中")
	fmt.Println("4.", b.steps.AddCondiments())
}
```

## 文件说明

| 文件 | 说明 |
|------|------|
| `main.go` | `BeverageSteps` 接口、`Beverage` 模板、`Tea`/`Coffee` 具体步骤、`main` 演示入口 |

## 编译与运行

```bash
cd go/template-method
go run .
```

## 输出示例

预期输出（本机未安装 Go 工具链，未实机运行）：

```
=== 模板方法模式：冲泡饮料 ===
开始冲泡 茶
1. 烧开水
2. 用沸水浸泡茶叶
3. 倒入杯中
4. 加入柠檬片
茶 冲泡完成！

开始冲泡 咖啡
1. 烧开水
2. 用沸水冲泡咖啡粉
3. 倒入杯中
4. 加入牛奶和糖
咖啡 冲泡完成！
```

## 要点

1. **骨架固定，步骤可变** — `Prepare()` 的四步顺序对所有饮品都一样，变化的只是第 2、4 步的具体做法。
2. **组合代替继承** — `Beverage` 不是 `Tea`/`Coffee` 的基类，而是持有一个 `BeverageSteps` 接口字段。
3. **新增饮品零成本** — 新增 `Cocoa` 只需实现 `BeverageSteps` 接口，完全不用碰 `Beverage.Prepare`。
