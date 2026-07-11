# Strategy 策略模式（Objective-C）

## 意图

定义一系列可互换的算法，把每种算法封装起来，使它们可以在运行时相互替换，而不影响使用算法的客户端。

## 适用场景

- 同一个行为存在多种实现方式，且需要在运行时动态切换（信用卡/PayPal/加密货币支付）
- 希望消除大量 `if/else` 或 `switch` 来选择具体算法
- 算法的变化不应影响使用它的客户端代码

## 实现方式

`PaymentStrategy` 协议声明 `pay:`，`CreditCardStrategy`/`PayPalStrategy`/`CryptoStrategy` 是可互换的具体策略。`ShoppingCart` 持有一个 `id<PaymentStrategy>`，结账时只管调用协议方法：

```objc
@property (nonatomic, strong, nullable) id<PaymentStrategy> paymentStrategy;

- (void)checkout {
    [self.paymentStrategy pay:_total]; // 不关心具体是哪种支付方式
}
```

客户端可以在运行时随时把 `cart.paymentStrategy` 换成另一种策略，`ShoppingCart` 本身不用做任何改动。

## 文件说明

| 文件 | 说明 |
|------|------|
| `Strategy.h` | 策略协议 `PaymentStrategy`、具体策略 `CreditCardStrategy`/`PayPalStrategy`/`CryptoStrategy`、上下文 `ShoppingCart` 声明 |
| `Strategy.m` | 上述类型的实现 |
| `main.m` | 同一个购物车依次切换三种支付策略结账 |
| `Makefile` | 编译与运行 |

## 编译与运行

```bash
make run    # 编译并运行
make        # 仅编译
make clean  # 清理
```

## 输出示例

```
加入商品，单价 129.00 元，当前合计 129.00 元
加入商品，单价 59.50 元，当前合计 188.50 元
 
=== 使用信用卡支付 ===
使用信用卡（尾号 7890）支付 188.50 元
 
=== 切换为 PayPal 支付（同一个购物车，运行时更换策略） ===
使用 PayPal 账户（buyer@example.com）支付 188.50 元
 
=== 切换为加密货币支付 ===
使用加密钱包（0xAbCd...1234）支付 188.50 元
```

（预期输出 —— 本机未安装 ObjC 工具链，未实机运行）

## 要点

1. **算法可互换** —— 三种支付策略实现同一个协议，`ShoppingCart` 面向协议编程，替换策略只需一行赋值。
2. **消除条件分支** —— 没有 `if (type == creditCard) ... else if (type == paypal) ...`，新增一种支付方式只需新增一个类，符合开闭原则。
3. **运行时可变** —— 与工厂类模式不同，策略是"用哪个"的问题，且可以在对象生命周期内随时切换，而不是创建时一次性决定。
