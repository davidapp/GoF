import java.util.ArrayList;
import java.util.List;

/**
 * 上下文（Context）：购物车。
 * 持有一个 PaymentStrategy 引用，具体使用哪种支付方式在运行时由客户端注入；
 * 购物车本身不关心支付细节，只负责调用 strategy.pay(totalAmount)。
 */
public class ShoppingCart {
    private final List<Double> items = new ArrayList<>();
    private PaymentStrategy paymentStrategy;

    public void addItem(double price) {
        items.add(price);
    }

    public void setPaymentStrategy(PaymentStrategy paymentStrategy) {
        this.paymentStrategy = paymentStrategy;
    }

    public void checkout() {
        double total = items.stream().mapToDouble(Double::doubleValue).sum();
        System.out.printf("购物车总金额: %.2f 元%n", total);
        if (paymentStrategy == null) {
            throw new IllegalStateException("请先选择支付方式");
        }
        paymentStrategy.pay(total);
    }
}
