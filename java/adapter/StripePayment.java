/**
 * 被适配者（Adaptee）：第三方支付 SDK。
 * 假设这是无法修改的第三方库代码：接口名叫 chargeInCents，且金额单位是“美分”，
 * 与应用内统一的 PaymentProcessor.pay(yuan) 接口不兼容。
 */
public class StripePayment {
    /**
     * 第三方 SDK 提供的收款方法
     *
     * @param amountInCents 金额（单位：美分）
     */
    public void chargeInCents(long amountInCents) {
        System.out.printf("[Stripe SDK] 已扣款 %d 美分%n", amountInCents);
    }
}
