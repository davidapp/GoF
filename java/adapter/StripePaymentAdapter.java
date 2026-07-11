/**
 * 适配器（Adapter）：让不兼容的 StripePayment 适配成 PaymentProcessor 接口。
 * 采用“对象适配器”写法（组合优于继承）：内部持有一个 StripePayment 实例，
 * 负责把“元”与“美分”之间的单位差异抹平，客户端只感知统一的 pay(yuan)。
 */
public class StripePaymentAdapter implements PaymentProcessor {
    private final StripePayment stripePayment;

    public StripePaymentAdapter(StripePayment stripePayment) {
        this.stripePayment = stripePayment;
    }

    @Override
    public void pay(double yuan) {
        long cents = Math.round(yuan * 100);
        System.out.printf("[适配器] 将 %.2f 元 转换为 %d 分，交给第三方 SDK 处理%n", yuan, cents);
        stripePayment.chargeInCents(cents);
    }
}
