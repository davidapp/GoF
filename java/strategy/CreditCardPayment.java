/**
 * 具体策略（Concrete Strategy）：信用卡支付。
 */
public class CreditCardPayment implements PaymentStrategy {
    private final String cardNumber;

    public CreditCardPayment(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    @Override
    public void pay(double amount) {
        String masked = "**** **** **** " + cardNumber.substring(cardNumber.length() - 4);
        System.out.printf("[信用卡支付] 使用卡号 %s 支付 %.2f 元%n", masked, amount);
    }
}
