"""策略模式（Strategy）
场景：支付 —— CreditCard/PayPal/Crypto 等可互换的支付策略。

核心思想：定义一系列算法，把它们各自封装起来，并使它们可以互相替换。
本例用 typing.Protocol 定义"策略"这一结构化接口——任何具备 pay(amount) 方法
的对象都能当作策略使用，不需要显式继承，体现 Python "鸭子类型" 的惯用写法。
"""

from __future__ import annotations

import sys
from dataclasses import dataclass, field
from typing import Protocol

# Windows 控制台有时默认非 UTF-8 编码，强制切换避免中文输出乱码
if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8")


# ------------------------- 策略接口（Strategy，结构化子类型） -------------------------
class PaymentStrategy(Protocol):
    """策略接口：只要实现 pay(amount) -> str，就是一个合法的支付策略（无需继承）"""

    def pay(self, amount: float) -> str: ...


# ------------------------- 具体策略（Concrete Strategy） -------------------------
@dataclass
class CreditCardStrategy:
    """具体策略：信用卡支付"""

    card_number: str

    def pay(self, amount: float) -> str:
        masked = f"**** **** **** {self.card_number[-4:]}"
        return f"信用卡({masked}) 支付 {amount:.2f} 元"


@dataclass
class PayPalStrategy:
    """具体策略：PayPal 支付"""

    email: str

    def pay(self, amount: float) -> str:
        return f"PayPal({self.email}) 支付 {amount:.2f} 元"


@dataclass
class CryptoStrategy:
    """具体策略：加密货币支付"""

    wallet_address: str
    btc_rate: float = 0.000015  # 模拟汇率：1 元 ≈ 0.000015 BTC

    def pay(self, amount: float) -> str:
        btc_amount = amount * self.btc_rate
        short_address = f"{self.wallet_address[:6]}..."
        return f"加密钱包({short_address}) 支付约 {btc_amount:.6f} BTC（等值 {amount:.2f} 元）"


# ------------------------- 上下文（Context） -------------------------
@dataclass
class ShoppingCart:
    """上下文：购物车持有一个可替换的支付策略，自身不关心具体支付方式的细节"""

    strategy: PaymentStrategy
    items: list[tuple[str, float]] = field(default_factory=list)

    def add_item(self, name: str, price: float) -> None:
        self.items.append((name, price))

    @property
    def total(self) -> float:
        return sum(price for _, price in self.items)

    def set_strategy(self, strategy: PaymentStrategy) -> None:
        """运行时切换策略——例如用户在结算页改选了另一种支付方式"""
        self.strategy = strategy

    def checkout(self) -> str:
        return self.strategy.pay(self.total)


def main() -> None:
    cart = ShoppingCart(strategy=CreditCardStrategy(card_number="4111111111111234"))
    cart.add_item("《设计模式》图书", 79.0)
    cart.add_item("机械键盘", 399.0)

    print(f"购物车合计: {cart.total:.2f} 元")
    print()

    print("--- 使用信用卡结算 ---")
    print(cart.checkout())

    print()
    print("--- 切换为 PayPal 结算 ---")
    cart.set_strategy(PayPalStrategy(email="buyer@example.com"))
    print(cart.checkout())

    print()
    print("--- 切换为加密货币结算 ---")
    cart.set_strategy(CryptoStrategy(wallet_address="1A2b3C4d5E6f7G8h9I"))
    print(cart.checkout())

    print()
    print("--- 同一个策略列表，遍历比较不同支付方式的结果 ---")
    strategies: list[PaymentStrategy] = [
        CreditCardStrategy("6222021234560000"),
        PayPalStrategy("vip@example.com"),
        CryptoStrategy("bc1qxyz000000000"),
    ]
    for strategy in strategies:
        cart.set_strategy(strategy)
        print(cart.checkout())


if __name__ == "__main__":
    main()
