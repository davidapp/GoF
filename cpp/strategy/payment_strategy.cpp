#include "payment_strategy.h"
#include <iostream>
#include <stdexcept>

void CreditCardStrategy::pay(double amount) const {
    std::string tail = card_number_.size() >= 4 ? card_number_.substr(card_number_.size() - 4)
                                                 : card_number_;
    std::cout << "  使用信用卡（尾号 " << tail << "）支付 " << amount << " 元" << std::endl;
}

void PayPalStrategy::pay(double amount) const {
    std::cout << "  使用 PayPal 账户（" << email_ << "）支付 " << amount << " 元" << std::endl;
}

void CryptoStrategy::pay(double amount) const {
    std::cout << "  使用加密钱包（" << wallet_address_ << "）支付 " << amount << " 元等值加密货币"
              << std::endl;
}

void ShoppingCart::set_payment_strategy(std::unique_ptr<PaymentStrategy> strategy) {
    strategy_ = std::move(strategy);
}

void ShoppingCart::checkout(double amount) const {
    if (!strategy_) {
        throw std::runtime_error("尚未选择支付方式");
    }
    std::cout << "结算 " << amount << " 元，选择的支付方式: " << strategy_->name() << std::endl;
    strategy_->pay(amount);
}
