# Adapter 适配器模式（Objective-C）

## 意图

将一个类的接口转换成客户端期望的另一个接口，使原本因接口不兼容而无法协同工作的类可以一起工作，且不必修改第三方代码。

## 适用场景

- 需要复用一个已有类，但它的接口与当前系统不匹配
- 接入第三方 SDK / 遗留代码，又不想让这些外部细节污染业务代码
- 希望统一多个功能相同但接口不同的实现（如多家支付渠道）

## 实现方式

`StripePayment` 是无法修改的第三方类，以"分"为单位、方法名也不同。`StripeAdapter` 实现应用统一的 `PaymentProcessor` 协议，内部持有一个 `StripePayment` 实例，把"元"换算成"分"后再转发调用：

```objc
@protocol PaymentProcessor <NSObject>
- (void)payYuan:(double)yuan;
@end

@implementation StripeAdapter
- (void)payYuan:(double)yuan {
    NSInteger cents = (NSInteger)(yuan * 100 + 0.5);
    [_stripePayment payInCents:cents];   // 转发给被适配的第三方对象
}
@end
```

客户端自始至终只面向 `PaymentProcessor` 编程，完全不知道背后是 Stripe。

## 文件说明

| 文件 | 说明 |
|------|------|
| `Adapter.h` | 第三方类 `StripePayment`、目标协议 `PaymentProcessor`、适配器 `StripeAdapter` 声明 |
| `Adapter.m` | 上述类型的实现 |
| `main.m` | 客户端通过统一接口发起支付，实际由 Stripe 完成扣款 |
| `Makefile` | 编译与运行 |

## 编译与运行

```bash
make run    # 编译并运行
make        # 仅编译
make clean  # 清理
```

## 输出示例

```
=== 客户端只认识 PaymentProcessor.payYuan:，完全不知道 Stripe 的存在 ===
[Adapter] 将 99.99 元 转换为 9999 分，转发给第三方 SDK
[Stripe 第三方 SDK] 扣款 9999 分
[Adapter] 将 200.00 元 转换为 20000 分，转发给第三方 SDK
[Stripe 第三方 SDK] 扣款 20000 分
```

（预期输出 —— 本机未安装 ObjC 工具链，未实机运行）

## 要点

1. **对象适配器（组合）优于类适配器** —— ObjC 没有多重类继承，`StripeAdapter` 通过持有 `StripePayment` 实例（组合）来适配，而不是继承它。
2. **协议隔离变化** —— 客户端只依赖 `PaymentProcessor` 协议，未来接入支付宝、微信支付时只需新增适配器，客户端代码零改动。
3. **单位/语义转换集中在一处** —— "元转分"的换算逻辑封装在适配器内部，避免散落在业务代码各处。
