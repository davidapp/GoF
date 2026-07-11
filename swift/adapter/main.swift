import Foundation

// 适配器模式：统一支付接口
// 场景：把第三方 StripePayment(amountInCents) 适配到应用统一的 PaymentProcessor.pay(yuan) 接口

// MARK: - 目标接口：应用统一的支付接口（以"元"为单位）
protocol PaymentProcessor {
    func pay(yuan: Double)
}

// MARK: - 被适配者：第三方服务，只接受"分"为单位的整数金额，接口与我们不兼容
final class StripePayment {
    func makePayment(amountInCents: Int) {
        let yuanText = String(format: "%.2f", Double(amountInCents) / 100.0)
        print("[Stripe] 已扣款 \(amountInCents) 分（约 \(yuanText) 元）")
    }
}

// MARK: - 适配器：把 StripePayment 适配成 PaymentProcessor 接口
final class StripePaymentAdapter: PaymentProcessor {
    private let stripe: StripePayment

    init(stripe: StripePayment) {
        self.stripe = stripe
    }

    func pay(yuan: Double) {
        // 关键转换：元 -> 分，四舍五入取整
        let cents = Int((yuan * 100).rounded())
        stripe.makePayment(amountInCents: cents)
    }
}

// MARK: - 应用自身的支付方式，直接实现统一接口，无需适配
final class AliPayProcessor: PaymentProcessor {
    func pay(yuan: Double) {
        print("[支付宝] 已扣款 \(yuan) 元")
    }
}

// MARK: - 客户端代码：只依赖统一的 PaymentProcessor 接口
func checkout(with processor: PaymentProcessor, amount: Double) {
    print("订单金额：\(amount) 元")
    processor.pay(yuan: amount)
}

// MARK: - 顶层入口
print("=== 适配器模式：统一支付接口 ===\n")

checkout(with: AliPayProcessor(), amount: 99.5)

print("")

// Stripe 原生接口只认"分"，通过适配器接入统一接口，客户端代码无需改动
checkout(with: StripePaymentAdapter(stripe: StripePayment()), amount: 199.99)
