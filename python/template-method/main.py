"""模板方法模式（Template Method）
场景：冲泡饮料 —— Beverage 定义骨架，Tea/Coffee 实现各自的步骤。

核心思想：在一个方法中定义一个算法的骨架，将某些步骤延迟到子类中实现。
模板方法使得子类可以在不改变算法整体结构的前提下，重新定义算法的某些步骤，
还可以通过"钩子方法"（hook）让子类选择性地介入某个环节。
"""

from __future__ import annotations

import sys
from abc import ABC, abstractmethod

# Windows 控制台有时默认非 UTF-8 编码，强制切换避免中文输出乱码
if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8")


# ------------------------- 抽象类（含模板方法） -------------------------
class Beverage(ABC):
    """抽象类：定义冲泡饮料的算法骨架（模板方法），子类只需实现变化的步骤"""

    def prepare(self) -> None:
        """模板方法：固定了算法骨架，标记为不应被子类重写（本例用约定而非语言强制）"""
        print(f"=== 开始冲泡 {self.name} ===")
        self._boil_water()
        self._brew()
        self._pour_in_cup()
        if self._wants_condiments():
            self._add_condiments()
        else:
            print("  （跳过加料，客人要求原味）")
        print(f"=== {self.name} 冲泡完成 ===")

    def _boil_water(self) -> None:
        print("  烧开水")

    def _pour_in_cup(self) -> None:
        print("  倒入杯中")

    @property
    @abstractmethod
    def name(self) -> str: ...

    @abstractmethod
    def _brew(self) -> None:
        """冲泡步骤：不同饮料的核心工序不同，必须由子类实现"""

    @abstractmethod
    def _add_condiments(self) -> None:
        """加调料步骤：不同饮料加的调料不同，必须由子类实现"""

    def _wants_condiments(self) -> bool:
        """钩子方法（Hook）：默认加调料，子类可重写以跳过该步骤"""
        return True


# ------------------------- 具体类 -------------------------
class Tea(Beverage):
    """具体类：茶，冲泡步骤为浸泡茶叶，默认加柠檬"""

    name = "茶"

    def _brew(self) -> None:
        print("  用沸水浸泡茶叶")

    def _add_condiments(self) -> None:
        print("  加柠檬")


class Coffee(Beverage):
    """具体类：咖啡，冲泡步骤为过滤冲煮，默认加糖和牛奶"""

    name = "咖啡"

    def _brew(self) -> None:
        print("  用沸水冲煮咖啡粉")

    def _add_condiments(self) -> None:
        print("  加糖和牛奶")


class BlackCoffee(Coffee):
    """具体类：黑咖啡，复用 Coffee 的冲泡步骤，但通过钩子方法跳过加调料"""

    name = "黑咖啡"

    def _wants_condiments(self) -> bool:
        return False  # 重写钩子方法：黑咖啡不加任何调料


def main() -> None:
    beverages: list[Beverage] = [Tea(), Coffee(), BlackCoffee()]
    for beverage in beverages:
        beverage.prepare()
        print()


if __name__ == "__main__":
    main()
