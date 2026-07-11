#pragma once
#include <string>

// 目标接口：应用内统一的支付处理接口（以“元”为单位）
class PaymentProcessor {
public:
    virtual ~PaymentProcessor() = default;
    virtual void pay(double yuan) = 0;
};

// 被适配者：第三方支付 SDK，接口以“分”为单位，方法名也不同，无法直接满足 PaymentProcessor
class StripePayment {
public:
    void charge_in_cents(long long cents);
};

// 适配器：包装 StripePayment，把“元”转换成“分”，实现 PaymentProcessor 接口
class StripeAdapter : public PaymentProcessor {
public:
    explicit StripeAdapter(StripePayment& stripe) : stripe_(stripe) {}
    void pay(double yuan) override;

private:
    StripePayment& stripe_;
};

// 应用内原生实现，本就满足 PaymentProcessor 接口，作为对照组
class NativeAlipay : public PaymentProcessor {
public:
    void pay(double yuan) override;
};
