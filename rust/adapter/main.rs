// 适配器模式（Adapter）—— 接入第三方支付演示
//
// 应用统一使用 PaymentProcessor::pay(yuan) 接口下单，
// 但第三方 StripePayment 的原生接口是“以分为单位”的 charge_in_cents。
// StripeAdapter 负责做单位换算，把不兼容的接口适配成目标接口。

// 目标接口：应用统一的支付接口（人民币元）
trait PaymentProcessor {
    fn pay(&self, yuan: f64);
}

// 被适配者：第三方 Stripe 支付 SDK（接口设计与我们的不一致）
struct StripePayment;

impl StripePayment {
    // 第三方原始接口：只接受“分”为单位的整数金额
    fn charge_in_cents(&self, amount_in_cents: u64) {
        println!("[Stripe SDK] 已扣款 {} 分", amount_in_cents);
    }
}

// 适配器：包装 StripePayment，对外暴露 PaymentProcessor 接口
struct StripeAdapter {
    stripe: StripePayment,
}

impl StripeAdapter {
    fn new(stripe: StripePayment) -> Self {
        StripeAdapter { stripe }
    }
}

impl PaymentProcessor for StripeAdapter {
    fn pay(&self, yuan: f64) {
        let cents = (yuan * 100.0).round() as u64;
        println!("[适配器] 将 {:.2} 元换算为 {} 分，再调用 Stripe SDK", yuan, cents);
        self.stripe.charge_in_cents(cents);
    }
}

// 原生实现：本身就符合目标接口，用于跟适配器版本对比
struct NativeAliPay;
impl PaymentProcessor for NativeAliPay {
    fn pay(&self, yuan: f64) {
        println!("[支付宝原生实现] 直接支付 {:.2} 元", yuan);
    }
}

// 客户端代码：只依赖统一的 PaymentProcessor 接口
fn checkout(processor: &dyn PaymentProcessor, amount: f64) {
    println!("--- 结账，应付 {:.2} 元 ---", amount);
    processor.pay(amount);
}

fn main() {
    println!("=== 适配器模式：接入第三方支付演示 ===\n");

    let alipay = NativeAliPay;
    checkout(&alipay, 99.50);

    println!();

    let stripe_adapter = StripeAdapter::new(StripePayment);
    checkout(&stripe_adapter, 199.99);
}
