"""工厂方法模式（Factory Method）
场景：物流系统 —— Logistics 子类决定具体使用 Truck 还是 Ship 运输。

核心思想：父类定义创建对象的接口（工厂方法），但把"实例化哪一个具体类"的
决定权延迟到子类；父类中依赖运输工具的业务流程（plan_delivery）无需关心
具体运输方式，只面向抽象的 Transport 接口编程。
"""

from __future__ import annotations

import sys
from abc import ABC, abstractmethod

# Windows 控制台有时默认非 UTF-8 编码，强制切换避免中文输出乱码
if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8")


# ------------------------- 抽象产品（Product） -------------------------
class Transport(ABC):
    """抽象产品：运输工具"""

    @abstractmethod
    def deliver(self, cargo: str) -> str:
        """运送货物，返回运输描述"""


# ------------------------- 具体产品 -------------------------
class Truck(Transport):
    """具体产品：卡车 —— 陆运"""

    def deliver(self, cargo: str) -> str:
        return f"卡车沿高速公路运输「{cargo}」，预计 2 天送达"


class Ship(Transport):
    """具体产品：货轮 —— 海运"""

    def deliver(self, cargo: str) -> str:
        return f"货轮沿海运航线运输「{cargo}」，预计 15 天送达"


# ------------------------- 创建者（Creator） -------------------------
class Logistics(ABC):
    """抽象创建者：定义工厂方法 create_transport，并提供依赖该方法的业务流程"""

    @abstractmethod
    def create_transport(self) -> Transport:
        """工厂方法：由子类决定实例化哪个具体的 Transport"""

    def plan_delivery(self, cargo: str) -> str:
        """业务流程：不关心具体运输方式，只调用工厂方法拿到的抽象产品"""
        transport = self.create_transport()
        return f"[{self.__class__.__name__}] {transport.deliver(cargo)}"


# ------------------------- 具体创建者 -------------------------
class RoadLogistics(Logistics):
    """具体创建者：陆运物流，工厂方法返回 Truck"""

    def create_transport(self) -> Transport:
        return Truck()


class SeaLogistics(Logistics):
    """具体创建者：海运物流，工厂方法返回 Ship"""

    def create_transport(self) -> Transport:
        return Ship()


def main() -> None:
    orders: list[tuple[Logistics, str]] = [
        (RoadLogistics(), "一批电子元件"),
        (SeaLogistics(), "200 个集装箱家具"),
    ]

    for logistics, cargo in orders:
        print(logistics.plan_delivery(cargo))


if __name__ == "__main__":
    main()
