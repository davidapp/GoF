package main

import "fmt"

// 目标接口：应用统一的支付接口（以"元"为单位）
type PaymentProcessor interface {
	Pay(yuan float64) (string, error)
}

// 被适配者：第三方 Stripe 支付 SDK，接口不兼容（以"分"为单位，方法名也不同）
type StripePayment struct{}

func (s *StripePayment) ChargeInCents(amountInCents int) string {
	return fmt.Sprintf("Stripe 已扣款 %d 分", amountInCents)
}

// 适配器：把 StripePayment 适配成应用期望的 PaymentProcessor 接口
type StripeAdapter struct {
	stripe *StripePayment
}

func NewStripeAdapter(stripe *StripePayment) *StripeAdapter {
	return &StripeAdapter{stripe: stripe}
}

// Pay 实现 PaymentProcessor：把"元"换算成"分"后再调用被适配者的方法
func (a *StripeAdapter) Pay(yuan float64) (string, error) {
	if yuan <= 0 {
		return "", fmt.Errorf("支付金额必须为正数，收到: %.2f", yuan)
	}
	cents := int(yuan * 100)
	return a.stripe.ChargeInCents(cents), nil
}

// 应用内部原生支持"元"的支付方式，用于对比（未经适配也能满足统一接口）
type NativeAlipay struct{}

func (n *NativeAlipay) Pay(yuan float64) (string, error) {
	if yuan <= 0 {
		return "", fmt.Errorf("支付金额必须为正数，收到: %.2f", yuan)
	}
	return fmt.Sprintf("支付宝已扣款 %.2f 元", yuan), nil
}

// checkout 是客户端代码：只依赖统一的 PaymentProcessor 接口，
// 不关心背后调用的是原生实现还是经过适配的第三方 SDK。
func checkout(p PaymentProcessor, yuan float64) {
	result, err := p.Pay(yuan)
	if err != nil {
		fmt.Println("支付失败:", err)
		return
	}
	fmt.Printf("应用请求支付 %.2f 元 -> %s\n", yuan, result)
}

func main() {
	fmt.Println("=== 适配器模式：统一支付接口 ===")

	alipay := &NativeAlipay{}
	checkout(alipay, 99.9)

	stripeAdapter := NewStripeAdapter(&StripePayment{})
	checkout(stripeAdapter, 199.5)

	fmt.Println("\n(演示非法金额的错误处理)")
	checkout(stripeAdapter, -10)
}
