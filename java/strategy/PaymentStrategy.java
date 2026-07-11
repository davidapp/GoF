/**
 * 策略接口（Strategy）：支付方式。
 * 各具体策略实现相同的接口，可以在运行时互相替换，客户端不需要修改调用代码。
 */
public interface PaymentStrategy {
    void pay(double amount);
}
