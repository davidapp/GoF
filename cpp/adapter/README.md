# Adapter 适配器模式（C++）

## 意图

将一个类的接口转换成客户端期望的另一个接口。适配器使得原本因接口不兼容而无法一起工作的类可以协同工作。

## 适用场景

- 想使用一个已存在的类，但它的接口不符合系统需要（如接入第三方 SDK）
- 需要复用一些现存的子类，但不可能对每一个都进行接口改造
- 多个类接口不一致，需要统一到同一套抽象下

## 实现方式

`PaymentProcessor::pay(yuan)` 是应用统一的目标接口；第三方 `StripePayment::charge_in_cents(cents)` 是不兼容的被适配者。`StripeAdapter` 同时持有 `StripePayment` 引用并实现 `PaymentProcessor`，在内部完成单位换算：

```cpp
class StripeAdapter : public PaymentProcessor {
public:
    explicit StripeAdapter(StripePayment& stripe) : stripe_(stripe) {}
    void pay(double yuan) override {   // 元 -> 分，再转调第三方接口
        stripe_.charge_in_cents(std::llround(yuan * 100));
    }
private:
    StripePayment& stripe_;
};
```

客户端 `checkout(PaymentProcessor&, amount)` 只认识 `pay(yuan)`，既能对接原生实现，也能透明地对接经过适配的第三方 SDK。

## 文件说明

| 文件 | 说明 |
|------|------|
| `payment.h` | 目标接口 `PaymentProcessor`、被适配者 `StripePayment`、适配器 `StripeAdapter`、对照组 `NativeAlipay` |
| `payment.cpp` | 各类的具体实现 |
| `main.cpp` | 用同一个 `checkout()` 函数分别结算原生实现与适配后的第三方实现 |
| `Makefile` | 编译与运行 |

## 编译与运行

```bash
make        # 编译
make run    # 编译并运行
make clean  # 清理
```

## 输出示例

```
=== 适配器模式：统一支付接口 ===

发起结算，金额 99.9 元:
  [支付宝原生接口] 直接扣款 99.9 元

发起结算，金额 199.5 元:
  [适配器] 收到 pay(199.5) 元，转换为分后转调 Stripe 接口
  [Stripe 原始接口] charge_in_cents(19950) -> 扣款 19950 分
```

## 要点

1. **对象适配器（组合）优于类适配器（多继承）** — 本示例用组合持有 `StripePayment&`，避免 C++ 多继承的复杂性
2. **单一职责** — 适配逻辑（单位换算）集中在 `StripeAdapter` 一处，不污染业务代码
3. **客户端无感知** — `checkout()` 只依赖 `PaymentProcessor` 抽象接口，不知道也不需要知道是否经过适配
4. **对已有代码零侵入** — 不需要修改 `StripePayment` 这一“第三方代码”即可接入系统
