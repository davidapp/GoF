# Strategy 策略模式（Swift）

## 意图
定义一系列算法，把它们各自封装起来，并使它们可以相互替换。策略模式使算法可以独立于使用它的客户端而变化。

## 适用场景
- 完成同一件事有多种可互换的算法/策略（如多种支付方式、多种排序算法）。
- 需要避免使用大量 `if/else` 或 `switch` 来选择不同算法分支。
- 希望在运行时动态切换算法，而不是在编译期写死。

## 实现方式
把支付策略定义为函数类型 `typealias PaymentStrategy = (Double) -> String`；`PaymentStrategies` 命名空间下的静态方法（`creditCard`、`payPal`、`crypto`）都是"策略工厂"，返回捕获了各自参数（卡号/邮箱/钱包地址）的闭包；`ShoppingCart` 持有一个可为空、可随时替换的 `paymentStrategy` 闭包属性，结算时直接调用它。

```swift
typealias PaymentStrategy = (Double) -> String

enum PaymentStrategies {
    static func creditCard(number: String) -> PaymentStrategy {
        { amount in "使用信用卡(尾号\(number.suffix(4)))支付 ¥\(amount)" }
    }
}

cart.paymentStrategy = PaymentStrategies.creditCard(number: "...")
```

## 文件说明
| 文件 | 说明 |
|------|------|
| main.swift | 策略模式的完整实现与可运行示例（顶层代码作为入口） |

## 编译与运行
```bash
swift main.swift
```

## 输出示例
预期输出（本机未安装 Swift，未实机运行）：
```
=== 策略模式：可互换的支付方式 ===

[方式一：信用卡支付]
订单总额: ¥204.5
使用信用卡(尾号7890)支付 ¥204.5

[方式二：切换为 PayPal 支付]
订单总额: ¥204.5
使用 PayPal 账户(user@example.com)支付 ¥204.5

[方式三：切换为加密货币支付]
订单总额: ¥204.5
使用加密钱包(1A1zP1...vfNa)支付 ≈0.000476 BTC（等值 ¥204.5）
```

## 要点
1. `ShoppingCart` 只依赖 `PaymentStrategy` 这一个函数类型，完全不知道也不关心背后是信用卡、PayPal 还是加密货币，替换策略只需重新赋值 `paymentStrategy`。
2. 用闭包而非协议 + 一堆实现类来表达策略，是 Swift 中更轻量的惯用写法：每种支付方式的参数（卡号、邮箱、钱包地址）通过闭包捕获，无需专门定义存储属性的类型。
3. `PaymentStrategies` 里的每个静态方法都是"返回闭包的工厂函数"，本质上是策略的创建过程与策略的执行过程分离，如同其他语言里的"策略对象工厂"。
4. 如果策略需要更复杂的状态或多个方法，改用 `protocol PaymentStrategy { func pay(amount: Double) -> String }` 配合具体的 `struct`/`class` 实现同样可行，两种写法在 Swift 中都很常见，闭包更适合"单一职责、轻量"的场景。
