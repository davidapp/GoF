// ============================================================
// 策略模式（Strategy）
// 场景：支付 —— CreditCard/PayPal/Crypto 可互换的支付策略
// ============================================================

// ---- 抽象策略（Strategy）----
class PaymentStrategy {
  pay(amount) {
    throw new Error('子类必须实现 pay()');
  }
}

// ---- 具体策略：信用卡支付 ----
class CreditCardStrategy extends PaymentStrategy {
  constructor(cardNumber) {
    super();
    this.cardNumber = cardNumber;
  }
  pay(amount) {
    const masked = this.cardNumber.slice(-4).padStart(this.cardNumber.length, '*');
    return `使用信用卡(${masked}) 支付 ¥${amount}`;
  }
}

// ---- 具体策略：PayPal 支付 ----
class PayPalStrategy extends PaymentStrategy {
  constructor(email) {
    super();
    this.email = email;
  }
  pay(amount) {
    return `使用 PayPal 账户(${this.email}) 支付 ¥${amount}`;
  }
}

// ---- 具体策略：加密货币支付 ----
class CryptoStrategy extends PaymentStrategy {
  constructor(walletAddress) {
    super();
    this.walletAddress = walletAddress;
  }
  pay(amount) {
    const rate = 7.2; // 假设的人民币兑某稳定币汇率，仅作演示
    const amountInCrypto = (amount / rate).toFixed(4);
    return `使用加密钱包(${this.walletAddress}) 支付约 ${amountInCrypto} USDT（折合 ¥${amount}）`;
  }
}

// ---- 上下文（Context）：持有一个策略引用，运行时可自由切换 ----
class ShoppingCart {
  #strategy;
  #items = [];

  setPaymentStrategy(strategy) {
    this.#strategy = strategy;
    return this;
  }

  addItem(name, price) {
    this.#items.push({ name, price });
    return this;
  }

  get total() {
    return this.#items.reduce((sum, item) => sum + item.price, 0);
  }

  checkout() {
    if (!this.#strategy) throw new Error('请先选择支付方式');
    console.log(`结算清单: ${this.#items.map((i) => `${i.name}(¥${i.price})`).join(', ')}`);
    console.log(this.#strategy.pay(this.total));
  }
}

console.log('=== 策略模式：可互换的支付方式 ===\n');

const cart = new ShoppingCart().addItem('机械键盘', 399).addItem('鼠标垫', 59);

console.log('-- 使用信用卡支付 --');
cart.setPaymentStrategy(new CreditCardStrategy('4111111111111234'));
cart.checkout();

console.log('\n-- 切换为 PayPal 支付（同一个购物车，运行时切换策略）--');
cart.setPaymentStrategy(new PayPalStrategy('buyer@example.com'));
cart.checkout();

console.log('\n-- 切换为加密货币支付 --');
cart.setPaymentStrategy(new CryptoStrategy('0xA1B2C3D4E5F6'));
cart.checkout();

console.log('\n-- 现代 JS 的等价写法：策略也可以直接是一个函数（一等公民）--');
const strategies = {
  creditCard: (amount) => `[函数策略] 信用卡支付 ¥${amount}`,
  payPal: (amount) => `[函数策略] PayPal 支付 ¥${amount}`,
};
console.log(strategies.creditCard(100));
console.log(strategies.payPal(100));
