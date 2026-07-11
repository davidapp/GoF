/**
 * 适配器模式（Adapter）
 * 场景：把第三方 StripePayment(amountInCents) 适配到应用统一的
 *       PaymentProcessor.pay(yuan) 接口。
 *
 * 核心思想：在不修改已有类的前提下，通过一个适配器转换接口，
 * 让原本不兼容的类可以协同工作。
 */

// ---------- 第三方类（Adaptee）：接口与我们期望的不一致 ----------
// 假设这是无法修改的第三方 SDK，只接受“分”为单位的整数金额
class StripePayment {
  chargeInCents(amountInCents: number): string {
    return `Stripe 扣款成功：${amountInCents} 分`;
  }
}

// ---------- 目标接口（Target）：应用中统一的支付接口，单位为“元” ----------
interface PaymentProcessor {
  pay(yuan: number): string;
}

// ---------- 已经符合目标接口的类，作为对照 ----------
class AlipayPayment implements PaymentProcessor {
  pay(yuan: number): string {
    return `支付宝扣款成功：¥${yuan.toFixed(2)}`;
  }
}

// ---------- 适配器（Adapter）：包装 StripePayment，转换单位与接口 ----------
class StripeAdapter implements PaymentProcessor {
  constructor(private readonly stripe: StripePayment) {}

  pay(yuan: number): string {
    // 元 -> 分，四舍五入避免浮点误差
    const cents = Math.round(yuan * 100);
    return this.stripe.chargeInCents(cents);
  }
}

// ---------- 客户端代码：只依赖统一的 PaymentProcessor 接口 ----------
function checkout(processor: PaymentProcessor, amount: number): void {
  console.log(`应付金额：¥${amount.toFixed(2)}`);
  console.log(processor.pay(amount));
}

// ---------- 演示 ----------
function main(): void {
  console.log("=== 使用原生支持的支付宝 ===");
  checkout(new AlipayPayment(), 99.9);

  console.log("\n=== 通过适配器接入第三方 Stripe ===");
  const stripeAdapter = new StripeAdapter(new StripePayment());
  checkout(stripeAdapter, 128.5);
}

main();
