package main

import "fmt"

// PaymentStrategy 策略类型：支付策略本质是一个函数，接收金额并返回支付结果描述。
// Go 惯用法：用函数类型 + 闭包代替"策略接口 + 多个实现类"。
type PaymentStrategy func(amount float64) string

// CreditCardPay 具体策略：信用卡支付，返回一个绑定了卡号的闭包
func CreditCardPay(cardNumber string) PaymentStrategy {
	return func(amount float64) string {
		masked := "**** **** **** " + cardNumber[len(cardNumber)-4:]
		return fmt.Sprintf("信用卡(%s) 支付 %.2f 元", masked, amount)
	}
}

// PayPalPay 具体策略：PayPal 支付
func PayPalPay(account string) PaymentStrategy {
	return func(amount float64) string {
		return fmt.Sprintf("PayPal(%s) 支付 %.2f 元", account, amount)
	}
}

// CryptoPay 具体策略：加密货币支付
func CryptoPay(wallet string) PaymentStrategy {
	return func(amount float64) string {
		const rate = 0.000016 // 模拟法币兑加密货币汇率
		return fmt.Sprintf("加密钱包(%s) 支付 %.2f 元（约合 %.6f BTC）", wallet, amount, amount*rate)
	}
}

// ShoppingCart 上下文：购物车，持有一个可在运行时替换的支付策略
type ShoppingCart struct {
	amount   float64
	strategy PaymentStrategy
}

func NewShoppingCart(amount float64) *ShoppingCart {
	return &ShoppingCart{amount: amount}
}

// SetPaymentStrategy 运行时切换支付策略，无需修改 ShoppingCart 自身逻辑
func (c *ShoppingCart) SetPaymentStrategy(strategy PaymentStrategy) {
	c.strategy = strategy
}

func (c *ShoppingCart) Checkout() string {
	if c.strategy == nil {
		return "尚未选择支付方式"
	}
	return c.strategy(c.amount)
}

func main() {
	fmt.Println("=== 策略模式：可互换的支付方式 ===")

	cart := NewShoppingCart(299.5)

	cart.SetPaymentStrategy(CreditCardPay("4111111111111234"))
	fmt.Println(cart.Checkout())

	cart.SetPaymentStrategy(PayPalPay("alice@example.com"))
	fmt.Println(cart.Checkout())

	cart.SetPaymentStrategy(CryptoPay("bc1qxyz...abcd"))
	fmt.Println(cart.Checkout())
}
