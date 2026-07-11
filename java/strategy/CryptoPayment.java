/**
 * 具体策略（Concrete Strategy）：加密货币支付。
 */
public class CryptoPayment implements PaymentStrategy {
    private final String walletAddress;

    public CryptoPayment(String walletAddress) {
        this.walletAddress = walletAddress;
    }

    @Override
    public void pay(double amount) {
        System.out.printf("[加密货币支付] 向钱包地址 %s 转账等值 %.2f 元的数字货币%n", walletAddress, amount);
    }
}
