// 策略模式（Strategy）—— 支付方式演示
//
// 把每种支付算法各自封装成实现 PaymentStrategy 的类型，
// ShoppingCart（上下文）只依赖抽象接口，可以在运行时自由更换策略，
// 而不需要用一堆 if/else 判断支付方式。

// 策略接口
trait PaymentStrategy {
    fn pay(&self, amount: f64);
    fn name(&self) -> &str;
}

// 具体策略：信用卡支付
struct CreditCardStrategy {
    card_number: String,
}
impl PaymentStrategy for CreditCardStrategy {
    fn pay(&self, amount: f64) {
        println!(
            "使用信用卡（尾号 {}）支付 {:.2} 元",
            mask_card(&self.card_number),
            amount
        );
    }
    fn name(&self) -> &str {
        "信用卡"
    }
}

// 辅助函数：只显示卡号后四位
fn mask_card(card_number: &str) -> String {
    let chars: Vec<char> = card_number.chars().collect();
    let start = chars.len().saturating_sub(4);
    chars[start..].iter().collect()
}

// 具体策略：PayPal 支付
struct PayPalStrategy {
    email: String,
}
impl PaymentStrategy for PayPalStrategy {
    fn pay(&self, amount: f64) {
        println!("使用 PayPal 账户 {} 支付 {:.2} 元", self.email, amount);
    }
    fn name(&self) -> &str {
        "PayPal"
    }
}

// 具体策略：加密货币支付
struct CryptoStrategy {
    wallet_address: String,
}
impl PaymentStrategy for CryptoStrategy {
    fn pay(&self, amount: f64) {
        println!(
            "使用加密钱包 {} 支付等值 {:.2} 元的加密货币",
            self.wallet_address, amount
        );
    }
    fn name(&self) -> &str {
        "加密货币"
    }
}

// 上下文：购物车，持有一个可随时更换的支付策略
struct ShoppingCart {
    total: f64,
    strategy: Option<Box<dyn PaymentStrategy>>,
}

impl ShoppingCart {
    fn new() -> Self {
        ShoppingCart { total: 0.0, strategy: None }
    }

    fn add_item(&mut self, price: f64) {
        self.total += price;
    }

    fn set_payment_strategy(&mut self, strategy: Box<dyn PaymentStrategy>) {
        self.strategy = Some(strategy);
    }

    fn checkout(&self) {
        match &self.strategy {
            Some(strategy) => {
                println!("--- 结账，选择的支付方式: {} ---", strategy.name());
                strategy.pay(self.total);
            }
            None => println!("请先选择支付方式"),
        }
    }
}

fn main() {
    println!("=== 策略模式：支付方式演示 ===\n");

    let mut cart = ShoppingCart::new();
    cart.add_item(199.0);
    cart.add_item(59.5);
    println!("购物车总计: {:.2} 元\n", cart.total);

    cart.set_payment_strategy(Box::new(CreditCardStrategy {
        card_number: "4111111111111234".to_string(),
    }));
    cart.checkout();

    println!();
    cart.set_payment_strategy(Box::new(PayPalStrategy {
        email: "alice@example.com".to_string(),
    }));
    cart.checkout();

    println!();
    cart.set_payment_strategy(Box::new(CryptoStrategy {
        wallet_address: "0xABCD...1234".to_string(),
    }));
    cart.checkout();
}
