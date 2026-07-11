#include "payment.h"
#include <cmath>
#include <iostream>

void StripePayment::charge_in_cents(long long cents) {
    std::cout << "  [Stripe 原始接口] charge_in_cents(" << cents << ") -> 扣款 " << cents
              << " 分" << std::endl;
}

void StripeAdapter::pay(double yuan) {
    // 元 -> 分，四舍五入避免浮点误差
    long long cents = static_cast<long long>(std::llround(yuan * 100));
    std::cout << "  [适配器] 收到 pay(" << yuan << ") 元，转换为分后转调 Stripe 接口" << std::endl;
    stripe_.charge_in_cents(cents);
}

void NativeAlipay::pay(double yuan) {
    std::cout << "  [支付宝原生接口] 直接扣款 " << yuan << " 元" << std::endl;
}
