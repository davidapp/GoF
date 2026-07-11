#include "payment.h"
#include <iostream>

// 客户端统一面向 PaymentProcessor::pay(yuan) 编程，
// 不关心背后是原生实现还是通过适配器接入的第三方 SDK。
void checkout(PaymentProcessor& processor, double amount) {
    std::cout << "发起结算，金额 " << amount << " 元:" << std::endl;
    processor.pay(amount);
}

int main() {
    std::cout << "=== 适配器模式：统一支付接口 ===\n" << std::endl;

    NativeAlipay alipay;
    checkout(alipay, 99.9);

    std::cout << std::endl;

    StripePayment stripe;           // 第三方 SDK，接口不兼容（以分为单位）
    StripeAdapter adapter(stripe);  // 用适配器包装成 PaymentProcessor
    checkout(adapter, 199.5);

    return 0;
}
