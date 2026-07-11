import Foundation

// 策略模式：可互换的支付方式
// 场景：CreditCard/PayPal/Crypto 可互换的支付策略

// MARK: - 策略类型：把支付行为定义为函数类型（闭包），而非必须声明协议
typealias PaymentStrategy = (Double) -> String

// MARK: - 具体策略：以工厂函数形式返回闭包，闭包捕获各自需要的上下文数据
enum PaymentStrategies {
    // 具体策略：信用卡支付
    static func creditCard(number: String) -> PaymentStrategy {
        { amount in
            let masked = String(number.suffix(4))
            return "使用信用卡(尾号\(masked))支付 ¥\(amount)"
        }
    }

    // 具体策略：PayPal 支付
    static func payPal(email: String) -> PaymentStrategy {
        { amount in
            "使用 PayPal 账户(\(email))支付 ¥\(amount)"
        }
    }

    // 具体策略：加密货币支付
    static func crypto(walletAddress: String) -> PaymentStrategy {
        { amount in
            let shortAddress = String(walletAddress.prefix(6)) + "..." + String(walletAddress.suffix(4))
            let btcRate = 430_000.0   // 假设的比特币兑人民币汇率
            let btcAmount = amount / btcRate
            return "使用加密钱包(\(shortAddress))支付 ≈\(String(format: "%.6f", btcAmount)) BTC（等值 ¥\(amount)）"
        }
    }
}

// MARK: - 上下文：购物车持有一个可切换的支付策略
final class ShoppingCart {
    private var total: Double = 0
    // 策略以闭包形式保存，运行时可自由替换，体现"策略可互换"
    var paymentStrategy: PaymentStrategy?

    func addItem(price: Double) {
        total += price
    }

    func checkout() {
        guard let strategy = paymentStrategy else {
            print("请先选择支付方式")
            return
        }
        print("订单总额: ¥\(total)")
        print(strategy(total))
    }
}

// MARK: - 顶层入口
print("=== 策略模式：可互换的支付方式 ===\n")

let cart = ShoppingCart()
cart.addItem(price: 128.0)
cart.addItem(price: 76.5)

print("[方式一：信用卡支付]")
cart.paymentStrategy = PaymentStrategies.creditCard(number: "6222021234567890")
cart.checkout()

print("\n[方式二：切换为 PayPal 支付]")
cart.paymentStrategy = PaymentStrategies.payPal(email: "user@example.com")
cart.checkout()

print("\n[方式三：切换为加密货币支付]")
cart.paymentStrategy = PaymentStrategies.crypto(walletAddress: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa")
cart.checkout()
