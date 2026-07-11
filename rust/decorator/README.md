# Decorator 装饰器模式（Rust）

## 意图
动态地给一个对象添加额外的职责，相比生成子类更为灵活——可以在运行时按需、按任意顺序叠加多种行为。

## 适用场景
- 需要给对象添加的功能是可选的、可叠加的（加奶、加糖、加奶油可以任意组合）
- 用继承会导致组合爆炸（N 种基础饮料 × 2^M 种配料组合）
- 希望在不修改原有类型的前提下扩展其行为

## 实现方式
`Beverage` 是组件接口，`Espresso` 是最基础的具体组件。每个装饰器（`MilkDecorator` /
`SugarDecorator` / `WhippedCreamDecorator`）都持有一个 `Box<dyn Beverage>` 字段，
同时自己也实现 `Beverage`，在调用被包裹对象的方法基础上叠加自己的那部分：

```rust
struct MilkDecorator {
    inner: Box<dyn Beverage>,
}
impl Beverage for MilkDecorator {
    fn cost(&self) -> f64 {
        self.inner.cost() + 3.0
    }
    fn description(&self) -> String {
        format!("{} + 牛奶", self.inner.description())
    }
}
```

因为装饰器本身也是 `Beverage`，可以无限层层嵌套：`WhippedCreamDecorator { inner:
SugarDecorator { inner: MilkDecorator { inner: Espresso } } }` 就代表“浓缩 + 牛奶 + 糖 + 奶油”。

## 文件说明
| 文件 | 说明 |
|------|------|
| `main.rs` | `Beverage` 组件接口、`Espresso` 具体组件、三个装饰器、`main()` 演示 |

## 编译与运行
```bash
rustc main.rs && ./main
```

## 输出示例
```
=== 装饰器模式：咖啡加料演示 ===

Espresso                         15.0 元
Espresso + 牛奶                   18.0 元
Espresso + 牛奶 + 糖 + 奶油        23.5 元
```
（预期输出（本机未安装 Rust，未实机运行），实际对齐宽度以终端字体为准。）

## 要点
1. **装饰器与被装饰对象实现同一接口** —— 这是该模式的关键：调用方拿到的始终是
   `Box<dyn Beverage>`，不关心外面套了几层装饰。
2. **组合顺序即装饰顺序** —— 嵌套结构直接决定了 `description()`/`cost()` 的叠加顺序，
   调整嵌套顺序就能得到不同的组合，无需新增任何类型。
3. **与继承方案对比** —— 若用继承给每种配料组合建一个子类，N 种基础饮料配 M 种配料
   会产生指数级的子类数量；装饰器把每种配料变成一个独立、可任意叠加的小单元。
