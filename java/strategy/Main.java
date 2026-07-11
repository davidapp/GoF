/**
 * 策略模式示例入口。
 * 场景：购物车支付时，CreditCard/PayPal/Crypto 是可以互相替换的支付策略。
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("=== 策略模式：可互换的支付方式 ===\n");

        ShoppingCart cart = new ShoppingCart();
        cart.addItem(199.0);
        cart.addItem(59.5);
        cart.addItem(12.5);

        System.out.println("-- 使用信用卡支付 --");
        cart.setPaymentStrategy(new CreditCardPayment("1234567890123456"));
        cart.checkout();

        System.out.println("\n-- 改用 PayPal 支付 --");
        cart.setPaymentStrategy(new PayPalPayment("alice@example.com"));
        cart.checkout();

        System.out.println("\n-- 改用加密货币支付 --");
        cart.setPaymentStrategy(new CryptoPayment("0xA1b2C3d4E5f6"));
        cart.checkout();
    }
}
