# Strategy 策略模式（C++）

## 意图

定义一系列算法，把它们一个个封装起来，并且使它们可以相互替换。策略模式使得算法可以独立于使用它的客户而变化。

## 适用场景

- 完成同一个任务有多种可互换的算法/策略（多种支付方式、多种排序算法）
- 需要在运行时动态选择算法，避免大量 `if/else` 或 `switch` 判断类型
- 想将算法的实现细节与使用算法的客户代码隔离

## 实现方式

`PaymentStrategy` 是抽象策略，声明 `pay(amount)`；`CreditCardStrategy`、`PayPalStrategy`、`CryptoStrategy` 是具体策略，各自实现不同的支付逻辑；`ShoppingCart`（上下文）持有一个可替换的策略：

```cpp
class ShoppingCart {
public:
    void set_payment_strategy(std::unique_ptr<PaymentStrategy> strategy) {
        strategy_ = std::move(strategy);
    }
    void checkout(double amount) const { strategy_->pay(amount); }
private:
    std::unique_ptr<PaymentStrategy> strategy_;
};
```

客户端只需在运行时调用 `set_payment_strategy()` 切换具体策略，`checkout()` 的调用方式始终不变。

## 文件说明

| 文件 | 说明 |
|------|------|
| `payment_strategy.h` | 抽象策略 `PaymentStrategy`、三个具体策略、上下文 `ShoppingCart` 的声明 |
| `payment_strategy.cpp` | 各支付方式与结算逻辑的具体实现 |
| `main.cpp` | 依次切换信用卡/PayPal/加密货币三种策略结算 |
| `Makefile` | 编译与运行 |

## 编译与运行

```bash
make        # 编译
make run    # 编译并运行
make clean  # 清理
```

## 输出示例

```
=== 策略模式：可互换的支付方式 ===

结算 299 元，选择的支付方式: 信用卡
  使用信用卡（尾号 7890）支付 299 元

结算 59.9 元，选择的支付方式: PayPal
  使用 PayPal 账户（buyer@example.com）支付 59.9 元

结算 1200 元，选择的支付方式: 加密货币
  使用加密钱包（0xA1B2C3D4E5F6）支付 1200 元等值加密货币
```

## 要点

1. **算法与使用者解耦** — `ShoppingCart` 不知道也不关心具体是哪种支付方式
2. **消除条件分支** — 不需要在 `checkout()` 内部写 `if (type == "信用卡") ... else if (...)`
3. **运行时可切换** — 同一个 `ShoppingCart` 实例可以在不同订单中使用不同策略
4. **与状态模式的区别** — 策略模式的各策略互不知情、由外部选择；状态模式的各状态知道彼此并主动触发切换
