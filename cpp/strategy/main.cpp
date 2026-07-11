#include "payment_strategy.h"
#include <iostream>
#include <memory>

// 策略模式：ShoppingCart 只依赖 PaymentStrategy 接口，
// 运行时切换具体策略即可改变支付行为，各策略之间可以自由互换、互不知情。
int main() {
    std::cout << "=== 策略模式：可互换的支付方式 ===\n" << std::endl;

    ShoppingCart cart;

    cart.set_payment_strategy(std::make_unique<CreditCardStrategy>("6222021234567890"));
    cart.checkout(299.0);

    std::cout << std::endl;
    cart.set_payment_strategy(std::make_unique<PayPalStrategy>("buyer@example.com"));
    cart.checkout(59.9);

    std::cout << std::endl;
    cart.set_payment_strategy(std::make_unique<CryptoStrategy>("0xA1B2C3D4E5F6"));
    cart.checkout(1200.0);

    return 0;
}
