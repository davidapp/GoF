/**
 * 具体策略（Concrete Strategy）：PayPal 支付。
 */
public class PayPalPayment implements PaymentStrategy {
    private final String email;

    public PayPalPayment(String email) {
        this.email = email;
    }

    @Override
    public void pay(double amount) {
        System.out.printf("[PayPal 支付] 使用账号 %s 支付 %.2f 元%n", email, amount);
    }
}
