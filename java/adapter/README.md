# Adapter 适配器模式（Java）

## 意图

将一个类的接口转换成客户端期望的另一个接口，使得原本由于接口不兼容而无法一起工作的类可以协同工作。

## 适用场景

- 想使用一个已经存在的类，但它的接口不符合系统的需要（尤其是无法修改的第三方库）
- 需要一个统一的接口来操作多个接口各不相同的类
- 金额单位、数据格式、方法命名等历史遗留差异需要被“翻译”成当前系统的规范

## 实现方式

应用内统一使用 `PaymentProcessor.pay(yuan)` 接口；第三方 SDK `StripePayment` 只提供
`chargeInCents(long amountInCents)`，单位是美分且方法名不同。`StripePaymentAdapter`
采用**对象适配器**（组合而非继承）包装 `StripePayment`，抹平这一差异：

```java
public class StripePaymentAdapter implements PaymentProcessor {
    private final StripePayment stripePayment;   // 组合被适配者

    @Override
    public void pay(double yuan) {
        long cents = Math.round(yuan * 100);      // 元 -> 分 的单位转换
        stripePayment.chargeInCents(cents);
    }
}
```

`Main` 中把“本地钱包”（原生实现 `PaymentProcessor`）与“Stripe 适配器”放进同一个
`List<PaymentProcessor>` 统一调用，体现适配器让不兼容接口也能被一视同仁地使用。

## 文件说明

| 文件 | 说明 |
|------|------|
| `PaymentProcessor.java` | 目标接口（Target），应用内统一的支付接口 |
| `StripePayment.java` | 被适配者（Adaptee），第三方支付 SDK，接口不兼容 |
| `StripePaymentAdapter.java` | 适配器（Adapter），把 StripePayment 包装成 PaymentProcessor |
| `Main.java` | 程序入口，统一调用本地支付与适配后的第三方支付 |

## 编译与运行

```bash
cd java/adapter
javac *.java
java Main
```

## 输出示例

```
=== 适配器模式：统一支付接口 ===

[本地钱包] 直接扣款 19.90 元
[适配器] 将 19.90 元 转换为 1990 分，交给第三方 SDK 处理
[Stripe SDK] 已扣款 1990 美分
```

（预期输出：本机未安装 JDK，未实机运行）

## 要点

1. **对象适配器优于类适配器** —— Java 单继承，用组合持有被适配者实例，比继承更灵活，
   也不会暴露被适配者的其他公共方法。
2. **隔离变化** —— 第三方 SDK 的接口变化只需要修改 `StripePaymentAdapter` 一处，
   不会波及依赖 `PaymentProcessor` 的业务代码。
3. **PaymentProcessor 是函数式接口** —— 只有一个抽象方法，因此原生实现可以直接用
   Lambda 表达式书写，无需单独建类。
