/**
 * 策略模式（Strategy）
 * 场景：支付 —— CreditCard / PayPal / Crypto 可以互换的支付策略。
 *
 * 核心思想：定义一系列算法，把它们各自封装起来，并使它们可以相互替换，
 * 使算法的变化独立于使用算法的客户端。
 */

// ---------- 策略接口（Strategy） ----------
interface PaymentStrategy {
  readonly name: string;
  pay(amount: number): string;
}

// ---------- 具体策略（Concrete Strategy） ----------
class CreditCardStrategy implements PaymentStrategy {
  readonly name = "信用卡";

  constructor(
    private readonly cardNumber: string,
    private readonly cvv: string,
  ) {}

  pay(amount: number): string {
    const masked = this.cardNumber.slice(-4).padStart(this.cardNumber.length, "*");
    return `使用信用卡(${masked}, CVV=${this.cvv}) 支付 ¥${amount.toFixed(2)}`;
  }
}

class PayPalStrategy implements PaymentStrategy {
  readonly name = "PayPal";

  constructor(private readonly email: string) {}

  pay(amount: number): string {
    return `使用 PayPal 账户(${this.email}) 支付 ¥${amount.toFixed(2)}`;
  }
}

class CryptoStrategy implements PaymentStrategy {
  readonly name = "加密货币";

  constructor(private readonly walletAddress: string) {}

  pay(amount: number): string {
    const rate = 7.2; // 假设的 USDT->CNY 汇率
    const usdt = (amount / rate).toFixed(4);
    return `使用加密货币钱包(${this.walletAddress}) 支付约 ${usdt} USDT（折合 ¥${amount.toFixed(2)}）`;
  }
}

// ---------- 上下文（Context） ----------
class ShoppingCart {
  private items: { name: string; price: number }[] = [];

  constructor(private strategy: PaymentStrategy) {}

  setStrategy(strategy: PaymentStrategy): void {
    console.log(`(切换支付方式为: ${strategy.name})`);
    this.strategy = strategy;
  }

  addItem(name: string, price: number): void {
    this.items.push({ name, price });
  }

  checkout(): void {
    const total = this.items.reduce((sum, item) => sum + item.price, 0);
    console.log(`购物车商品: ${this.items.map((i) => i.name).join("、")}`);
    console.log(this.strategy.pay(total));
  }
}

// ---------- 演示 ----------
function main(): void {
  const cart = new ShoppingCart(new CreditCardStrategy("4111111111111234", "123"));
  cart.addItem("机械键盘", 399);
  cart.addItem("鼠标", 199);

  console.log("=== 使用信用卡结账 ===");
  cart.checkout();

  console.log("\n=== 切换为 PayPal 结账 ===");
  cart.setStrategy(new PayPalStrategy("buyer@example.com"));
  cart.checkout();

  console.log("\n=== 切换为加密货币结账 ===");
  cart.setStrategy(new CryptoStrategy("0xAbC123...def"));
  cart.checkout();
}

main();
