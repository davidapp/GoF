// ============================================================
// 适配器模式（Adapter）
// 场景：把第三方 StripePayment(amountInCents) 适配到应用统一的
//       PaymentProcessor.pay(yuan) 接口
// ============================================================

// ---- 目标接口（Target）：应用内部统一期望的支付接口 ----
class PaymentProcessor {
  pay(yuan) {
    throw new Error('子类必须实现 pay(yuan)');
  }
}

// ---- 被适配者（Adaptee）：第三方 SDK，接口不兼容 ----
// 假设这是不可修改的第三方库代码：单位是“美分”，方法名也不同。
class StripePayment {
  chargeInCents(amountInCents) {
    console.log(`[Stripe SDK] 实际扣款 ${amountInCents} 美分`);
    return { success: true, provider: 'stripe', amountInCents };
  }
}

// 再来一个第三方支付 SDK，接口形态又不一样，体现适配器的普适性
class AliPaySDK {
  submitPay(fen, memo) {
    console.log(`[支付宝 SDK] 实际扣款 ${fen} 分，备注：${memo}`);
    return { ok: true, channel: 'alipay', fen };
  }
}

// ---- 适配器：实现目标接口，内部把调用转换成被适配者能理解的形式 ----
class StripeAdapter extends PaymentProcessor {
  #stripe;

  constructor(stripePayment) {
    super();
    this.#stripe = stripePayment;
  }

  pay(yuan) {
    // 单位换算：元 -> 美分（此处按 1 元 = 100 美分简化演示，不做汇率换算）
    const amountInCents = Math.round(yuan * 100);
    const result = this.#stripe.chargeInCents(amountInCents);
    return `统一支付接口：支付 ${yuan} 元 -> 适配为 Stripe 扣款 ${result.amountInCents} 美分，结果=${result.success ? '成功' : '失败'}`;
  }
}

class AliPayAdapter extends PaymentProcessor {
  #alipay;

  constructor(alipaySDK) {
    super();
    this.#alipay = alipaySDK;
  }

  pay(yuan) {
    const fen = Math.round(yuan * 100);
    const result = this.#alipay.submitPay(fen, '订单支付');
    return `统一支付接口：支付 ${yuan} 元 -> 适配为支付宝扣款 ${result.fen} 分，结果=${result.ok ? '成功' : '失败'}`;
  }
}

// ---- 客户端代码：只依赖 PaymentProcessor.pay(yuan)，不关心底层是谁 ----
function checkout(processor, yuan) {
  console.log(processor.pay(yuan));
}

console.log('=== 适配器模式：统一支付接口适配第三方 SDK ===\n');

console.log('-- 使用 Stripe 支付 --');
const stripeProcessor = new StripeAdapter(new StripePayment());
checkout(stripeProcessor, 99.9);

console.log('\n-- 使用支付宝支付 --');
const aliProcessor = new AliPayAdapter(new AliPaySDK());
checkout(aliProcessor, 199.5);

console.log('\n-- 客户端统一遍历多个支付渠道 --');
const processors = [stripeProcessor, aliProcessor];
for (const p of processors) {
  checkout(p, 10);
}
