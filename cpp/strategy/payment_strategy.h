#pragma once
#include <memory>
#include <string>

// 抽象策略：支付方式
class PaymentStrategy {
public:
    virtual ~PaymentStrategy() = default;
    virtual void pay(double amount) const = 0;
    virtual std::string name() const = 0;
};

// 具体策略：信用卡支付
class CreditCardStrategy : public PaymentStrategy {
public:
    explicit CreditCardStrategy(std::string card_number) : card_number_(std::move(card_number)) {}
    void pay(double amount) const override;
    std::string name() const override { return "信用卡"; }

private:
    std::string card_number_;
};

// 具体策略：PayPal 支付
class PayPalStrategy : public PaymentStrategy {
public:
    explicit PayPalStrategy(std::string email) : email_(std::move(email)) {}
    void pay(double amount) const override;
    std::string name() const override { return "PayPal"; }

private:
    std::string email_;
};

// 具体策略：加密货币支付
class CryptoStrategy : public PaymentStrategy {
public:
    explicit CryptoStrategy(std::string wallet_address) : wallet_address_(std::move(wallet_address)) {}
    void pay(double amount) const override;
    std::string name() const override { return "加密货币"; }

private:
    std::string wallet_address_;
};

// 上下文：购物车，持有一个可在运行时替换的支付策略
class ShoppingCart {
public:
    void set_payment_strategy(std::unique_ptr<PaymentStrategy> strategy);
    void checkout(double amount) const;

private:
    std::unique_ptr<PaymentStrategy> strategy_;
};
