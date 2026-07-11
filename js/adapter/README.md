# Adapter 适配器模式（JavaScript）

## 意图
将一个类的接口转换成客户端期望的另一个接口，使原本因接口不兼容而无法协同工作的类可以一
起工作。常用于接入外部/第三方库时，让其接口符合应用内部已有的统一契约。

## 适用场景
- 想使用一个已经存在的类，但它的接口不符合系统的需要。
- 需要接入多个第三方 SDK，它们彼此接口形态不同，但业务上应表现为统一的能力。
- 无法或不方便修改被适配对象的源码（如它来自 `node_modules` 里的第三方包）。

## 实现方式
应用内部统一约定 `PaymentProcessor.pay(yuan)`；第三方 `StripePayment` 只提供
`chargeInCents(amountInCents)`，另一个第三方 `AliPaySDK` 提供的是 `submitPay(fen, memo)`。
`StripeAdapter` / `AliPayAdapter` 继承 `PaymentProcessor`，内部持有被适配对象，把统一接口
的调用转换为各自 SDK 能理解的形式（含单位换算 元→分/美分）：

```js
class StripeAdapter extends PaymentProcessor {
  #stripe;
  constructor(stripePayment) { super(); this.#stripe = stripePayment; }
  pay(yuan) {
    const amountInCents = Math.round(yuan * 100);
    return this.#stripe.chargeInCents(amountInCents);
  }
}
```

## 文件说明
| 文件 | 说明 |
|------|------|
| `main.mjs` | 适配器模式完整示例：`PaymentProcessor` 统一接口，`StripePayment`/`AliPaySDK` 两个接口不同的第三方 SDK 及各自的适配器 |

## 编译与运行
```bash
node main.mjs
```

## 输出示例
```
=== 适配器模式：统一支付接口适配第三方 SDK ===

-- 使用 Stripe 支付 --
[Stripe SDK] 实际扣款 9990 美分
统一支付接口：支付 99.9 元 -> 适配为 Stripe 扣款 9990 美分，结果=成功

-- 使用支付宝支付 --
[支付宝 SDK] 实际扣款 19950 分，备注：订单支付
统一支付接口：支付 199.5 元 -> 适配为支付宝扣款 19950 分，结果=成功

-- 客户端统一遍历多个支付渠道 --
[Stripe SDK] 实际扣款 1000 美分
统一支付接口：支付 10 元 -> 适配为 Stripe 扣款 1000 美分，结果=成功
[支付宝 SDK] 实际扣款 1000 分，备注：订单支付
统一支付接口：支付 10 元 -> 适配为支付宝扣款 1000 分，结果=成功
```

## 要点
1. 适配器只做“接口转换”，不改变被适配对象的行为，也不需要修改被适配对象的源码。
2. 本例采用“对象适配器”（组合被适配对象）而非“类适配器”（多重继承），这也是 JS 单继承
   语言下唯一自然的实现方式。
3. 客户端 `checkout(processor, yuan)` 全程只依赖 `PaymentProcessor` 接口，可以无差别地遍
   历、替换底层支付渠道，新增第三个支付渠道只需再加一个适配器类。
4. 单位换算（元→分）这类"胶水逻辑"正是适配器的职责所在，不应该污染业务代码或第三方 SDK。
