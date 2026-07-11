# Adapter 适配器模式（Python）

## 意图

将一个类的接口转换成客户端期望的另一个接口，使原本因接口不兼容而无法一起工作的类
可以协同工作。适配器让"第三方/遗留代码的接口"与"应用内部期望的接口"解耦。

## 适用场景

- 想使用一个已存在的类，但它的接口不符合系统需要（尤其是第三方 SDK）
- 需要统一多个功能相同但接口形态各异的第三方服务（如多家支付渠道）
- 想复用一些现存的子类，但不可能对每一个都进行接口改造

## 实现方式

应用内部统一的目标接口是 `PaymentProcessor.pay(yuan)`；第三方 `StripePayment` 只提供
`charge(amount_in_cents)`，`PayPalPayment` 只提供 `send_payment(amount_usd, currency)`。
两个**对象适配器** `StripeAdapter`、`PayPalAdapter` 各自持有被适配对象，实现 `pay()` 时
做单位换算并转调原始方法：

```python
class StripeAdapter(PaymentProcessor):
    """对象适配器：持有 StripePayment 实例，把 pay(yuan) 转换为 charge(分)"""

    def __init__(self, stripe: StripePayment) -> None:
        self._stripe = stripe

    def pay(self, yuan: float) -> str:
        cents = round(yuan * 100)
        return self._stripe.charge(cents)
```

客户端 `checkout()` 只依赖 `PaymentProcessor`，可以把不同适配器放进同一个列表里统一遍历。

## 文件说明

| 文件 | 说明 |
|------|------|
| `main.py` | `PaymentProcessor` 目标接口、`StripePayment`/`PayPalPayment` 被适配者、两个适配器、`main()` 演示 |

## 编译与运行

```bash
python main.py
```

## 输出示例

```
--- 使用 Stripe 支付（适配前接口为 charge(分)） ---
订单金额: 99.90 元 -> Stripe 已扣款 9990 分（交易号: TXN-009990）
--- 使用 PayPal 支付（适配前接口为 send_payment(美元)） ---
订单金额: 360.00 元 -> PayPal 已支付 50.00 USD

--- 客户端统一遍历多个支付渠道 ---
订单金额: 50.00 元 -> Stripe 已扣款 5000 分（交易号: TXN-005000）
订单金额: 50.00 元 -> PayPal 已支付 6.94 USD
```

## 要点

1. **对象适配器 vs 类适配器** —— Python 支持多继承，理论上也能用多继承实现"类适配器"，但组合方式（本例）更灵活、耦合更低，是更推荐的写法。
2. **单位/协议转换** —— 适配器的核心工作往往就是"换算"（分↔元、美元↔人民币）与"改名字"（`charge`→`pay`）。
3. **对客户端透明** —— `checkout()` 全程只认 `PaymentProcessor`，新增第三方支付渠道时只需新写一个适配器，不改动任何既有客户端代码。
4. 与装饰器的区别：适配器改变接口使其兼容，装饰器保持接口不变、只增强职责。
