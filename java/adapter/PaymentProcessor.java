/**
 * 目标接口（Target）：应用内统一的支付接口，金额以“元”为单位。
 */
public interface PaymentProcessor {
    /**
     * 支付
     *
     * @param yuan 金额（单位：元）
     */
    void pay(double yuan);
}
