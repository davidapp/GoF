# Adapter 适配器模式（Rust）

## 意图
将一个类的接口转换成客户端期望的另一个接口，使原本因接口不兼容而无法一起工作的类可以协同工作。

## 适用场景
- 想使用一个已有类，但它的接口与当前系统需要的接口不一致
- 接入第三方库/SDK，又不想让第三方接口的设计细节污染自己的业务代码
- 需要复用一些现存子类，但不方便对其接口逐一进行修改

## 实现方式
应用统一通过 `PaymentProcessor::pay(yuan: f64)` 下单，但第三方 `StripePayment` 只提供
`charge_in_cents(amount_in_cents: u64)`（以分为单位）。`StripeAdapter` 内部持有一个
`StripePayment` 实例，实现 `PaymentProcessor`，在 `pay` 里完成“元 -> 分”的换算后再委托给
被适配者：

```rust
impl PaymentProcessor for StripeAdapter {
    fn pay(&self, yuan: f64) {
        let cents = (yuan * 100.0).round() as u64;
        self.stripe.charge_in_cents(cents);
    }
}
```

客户端函数 `checkout` 只依赖 `&dyn PaymentProcessor`，无论传入原生实现还是适配器都无感知。

## 文件说明
| 文件 | 说明 |
|------|------|
| `main.rs` | `PaymentProcessor` 目标接口、`StripePayment` 被适配者、`StripeAdapter` 适配器、`NativeAliPay` 对比实现、`main()` 演示 |

## 编译与运行
```bash
rustc main.rs && ./main
```

## 输出示例
```
=== 适配器模式：接入第三方支付演示 ===

--- 结账，应付 99.50 元 ---
[支付宝原生实现] 直接支付 99.50 元

--- 结账，应付 199.99 元 ---
[适配器] 将 199.99 元换算为 19999 分，再调用 Stripe SDK
[Stripe SDK] 已扣款 19999 分
```
（预期输出（本机未安装 Rust，未实机运行）。）

## 要点
1. **对象适配器（组合）而非类适配器** —— `StripeAdapter` 通过“持有一个
   `StripePayment` 字段”来复用其功能，而不是依赖多重继承（Rust 也没有实现继承），
   这正是 GoF 更推荐的组合方式。
2. **单位换算等“胶水逻辑”集中在适配器里** —— 业务代码 `checkout` 完全不需要知道
   金额单位换算的存在，改动只影响 `StripeAdapter::pay` 一处。
3. **`&dyn PaymentProcessor` 让适配器和原生实现可互换** —— 两者实现同一个 trait，
   对客户端而言完全透明，符合里氏替换原则。
