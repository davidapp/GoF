"""适配器模式（Adapter）
场景：把第三方 StripePayment(amountInCents) 适配到应用统一的
PaymentProcessor.pay(yuan) 接口。

核心思想：第三方 SDK 的接口（以分为单位、方法名为 charge）与应用内部
期望的统一接口（以元为单位、方法名为 pay）不兼容；适配器在两者之间做
一层转换，使客户端代码无需关心具体支付渠道的差异。
"""

from __future__ import annotations

import sys
from abc import ABC, abstractmethod

# Windows 控制台有时默认非 UTF-8 编码，强制切换避免中文输出乱码
if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8")


# ------------------------- 目标接口（Target） -------------------------
class PaymentProcessor(ABC):
    """应用内部统一的支付接口：以人民币"元"为单位"""

    @abstractmethod
    def pay(self, yuan: float) -> str:
        """发起支付，金额单位为元，返回支付结果描述"""


# ------------------------- 被适配者（Adaptee，第三方 SDK） -------------------------
class StripePayment:
    """第三方支付 SDK：接口与应用不兼容——以"分"为单位，方法名也不同"""

    def charge(self, amount_in_cents: int) -> str:
        """Stripe 官方 SDK 的真实方法签名：只接受整数分"""
        return f"Stripe 已扣款 {amount_in_cents} 分（交易号: TXN-{amount_in_cents:06d}）"


# ------------------------- 另一个被适配者，体现适配器的通用性 -------------------------
class PayPalPayment:
    """另一个第三方 SDK：接口形态又不一样——用美元 + 关键字参数"""

    def send_payment(self, amount_usd: float, currency: str = "USD") -> str:
        return f"PayPal 已支付 {amount_usd:.2f} {currency}"


# ------------------------- 适配器（Adapter） -------------------------
class StripeAdapter(PaymentProcessor):
    """对象适配器：持有 StripePayment 实例，把 pay(yuan) 转换为 charge(分)"""

    EXCHANGE_RATE_USD_TO_CNY = 7.2  # 模拟汇率，仅用于 PayPal 适配器换算

    def __init__(self, stripe: StripePayment) -> None:
        self._stripe = stripe

    def pay(self, yuan: float) -> str:
        cents = round(yuan * 100)
        return self._stripe.charge(cents)


class PayPalAdapter(PaymentProcessor):
    """对象适配器：把 pay(yuan) 转换为 send_payment(美元)"""

    EXCHANGE_RATE_CNY_TO_USD = 1 / 7.2

    def __init__(self, paypal: PayPalPayment) -> None:
        self._paypal = paypal

    def pay(self, yuan: float) -> str:
        usd = yuan * self.EXCHANGE_RATE_CNY_TO_USD
        return self._paypal.send_payment(usd)


# ------------------------- 客户端代码 -------------------------
def checkout(processor: PaymentProcessor, yuan: float) -> None:
    """客户端只依赖统一的 PaymentProcessor 接口，不关心底层是哪家支付渠道"""
    print(f"订单金额: {yuan:.2f} 元 -> {processor.pay(yuan)}")


def main() -> None:
    stripe_adapter = StripeAdapter(StripePayment())
    paypal_adapter = PayPalAdapter(PayPalPayment())

    print("--- 使用 Stripe 支付（适配前接口为 charge(分)） ---")
    checkout(stripe_adapter, 99.90)

    print("--- 使用 PayPal 支付（适配前接口为 send_payment(美元)） ---")
    checkout(paypal_adapter, 360.00)

    print()
    print("--- 客户端统一遍历多个支付渠道 ---")
    processors: list[PaymentProcessor] = [stripe_adapter, paypal_adapter]
    for processor in processors:
        checkout(processor, 50.00)


if __name__ == "__main__":
    main()
