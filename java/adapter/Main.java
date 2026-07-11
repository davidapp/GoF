import java.util.List;

/**
 * 适配器模式示例入口。
 * 场景：把第三方 StripePayment(amountInCents) 适配到应用统一的
 * PaymentProcessor.pay(yuan) 接口，使客户端可以用同一套接口处理不同来源的支付渠道。
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("=== 适配器模式：统一支付接口 ===\n");

        // 原生就实现了统一接口的“本地支付”方式
        PaymentProcessor nativePay = yuan ->
                System.out.printf("[本地钱包] 直接扣款 %.2f 元%n", yuan);

        // 第三方 SDK 接口不兼容，需要通过适配器包装后才能当作 PaymentProcessor 使用
        PaymentProcessor stripePay = new StripePaymentAdapter(new StripePayment());

        List<PaymentProcessor> processors = List.of(nativePay, stripePay);
        for (PaymentProcessor processor : processors) {
            processor.pay(19.90);
        }
    }
}
