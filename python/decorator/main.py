"""装饰器模式（Decorator）
场景：咖啡 —— 在 Espresso 上动态叠加 Milk/Sugar 装饰，计算价格与描述。

核心思想：动态地给一个对象添加额外职责，比生成子类更灵活。
装饰器与被装饰对象实现同一个接口，因此可以层层嵌套包裹，
每一层只关心"在被包装对象的基础上追加什么"，运行时自由组合。

注意：本模式名为"装饰器模式"，与 Python 语言内建的 @decorator 函数语法
是同一思想的不同实现手段，本例用类组合实现，忠实还原 GoF 的对象结构。
"""

from __future__ import annotations

import sys
from abc import ABC, abstractmethod

# Windows 控制台有时默认非 UTF-8 编码，强制切换避免中文输出乱码
if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8")


# ------------------------- 抽象构件（Component） -------------------------
class Coffee(ABC):
    """抽象构件：咖啡，定义价格与描述两个核心行为"""

    @abstractmethod
    def cost(self) -> float:
        """返回当前价格（元）"""

    @abstractmethod
    def description(self) -> str:
        """返回当前描述文本"""


# ------------------------- 具体构件（Concrete Component） -------------------------
class Espresso(Coffee):
    """具体构件：最基础的浓缩咖啡，装饰链的起点"""

    def cost(self) -> float:
        return 18.0

    def description(self) -> str:
        return "Espresso"


class Americano(Coffee):
    """另一种具体构件：美式咖啡"""

    def cost(self) -> float:
        return 15.0

    def description(self) -> str:
        return "Americano"


# ------------------------- 装饰器基类（Decorator） -------------------------
class CoffeeDecorator(Coffee):
    """装饰器基类：持有一个 Coffee 引用，与被装饰对象实现同一接口"""

    def __init__(self, coffee: Coffee) -> None:
        self._coffee = coffee

    def cost(self) -> float:
        return self._coffee.cost()

    def description(self) -> str:
        return self._coffee.description()


# ------------------------- 具体装饰器（Concrete Decorator） -------------------------
class MilkDecorator(CoffeeDecorator):
    """具体装饰器：加牛奶，+4 元"""

    def cost(self) -> float:
        return super().cost() + 4.0

    def description(self) -> str:
        return super().description() + " + Milk"


class SugarDecorator(CoffeeDecorator):
    """具体装饰器：加糖，+2 元"""

    def cost(self) -> float:
        return super().cost() + 2.0

    def description(self) -> str:
        return super().description() + " + Sugar"


class WhippedCreamDecorator(CoffeeDecorator):
    """具体装饰器：加奶油，+6 元"""

    def cost(self) -> float:
        return super().cost() + 6.0

    def description(self) -> str:
        return super().description() + " + WhippedCream"


def print_order(coffee: Coffee) -> None:
    print(f"{coffee.description():<45} 单价: {coffee.cost():.1f} 元")


def main() -> None:
    print("--- 基础款 ---")
    espresso = Espresso()
    print_order(espresso)

    print()
    print("--- 逐层叠加装饰 ---")
    coffee: Coffee = Espresso()
    print_order(coffee)

    coffee = MilkDecorator(coffee)
    print_order(coffee)

    coffee = SugarDecorator(coffee)
    print_order(coffee)

    coffee = WhippedCreamDecorator(coffee)
    print_order(coffee)

    print()
    print("--- 换一种基础咖啡，同样可以自由叠加 ---")
    fancy_americano = SugarDecorator(SugarDecorator(MilkDecorator(Americano())))
    print_order(fancy_americano)


if __name__ == "__main__":
    main()
