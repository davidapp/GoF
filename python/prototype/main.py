"""原型模式（Prototype）
场景：克隆 Shape（Circle/Rectangle），复制其颜色、位置等属性。

核心思想：通过"克隆已有实例"而非"重新调用构造函数"来创建新对象，
尤其适合创建成本较高或结构复杂的对象。Python 用标准库 copy.deepcopy
即可优雅地实现深拷贝式原型，避免共享可变的内部状态（如列表、嵌套对象）。
"""

from __future__ import annotations

import copy
import sys
from abc import ABC, abstractmethod
from dataclasses import dataclass, field

# Windows 控制台有时默认非 UTF-8 编码，强制切换避免中文输出乱码
if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8")


# ------------------------- 抽象原型（Prototype） -------------------------
class Shape(ABC):
    """抽象原型：所有图形都能克隆自身"""

    def clone(self) -> Shape:
        """默认实现：深拷贝，子类一般无需重写"""
        return copy.deepcopy(self)

    @abstractmethod
    def describe(self) -> str:
        """描述图形当前状态"""


# ------------------------- 具体原型 -------------------------
@dataclass
class Point:
    x: int
    y: int


@dataclass
class Circle(Shape):
    """具体原型：圆形"""

    radius: float
    color: str
    position: Point = field(default_factory=lambda: Point(0, 0))
    tags: list[str] = field(default_factory=list)

    def describe(self) -> str:
        return (
            f"Circle(半径={self.radius}, 颜色={self.color}, "
            f"位置=({self.position.x}, {self.position.y}), 标签={self.tags})"
        )


@dataclass
class Rectangle(Shape):
    """具体原型：矩形"""

    width: float
    height: float
    color: str
    position: Point = field(default_factory=lambda: Point(0, 0))
    tags: list[str] = field(default_factory=list)

    def describe(self) -> str:
        return (
            f"Rectangle(宽={self.width}, 高={self.height}, 颜色={self.color}, "
            f"位置=({self.position.x}, {self.position.y}), 标签={self.tags})"
        )


def main() -> None:
    original_circle = Circle(radius=5, color="红色", position=Point(10, 20), tags=["主图层"])
    cloned_circle = original_circle.clone()
    # 修改克隆体的属性，验证与原对象互不影响（深拷贝）
    cloned_circle.color = "蓝色"
    cloned_circle.position.x = 100
    cloned_circle.tags.append("副本")

    print("原始圆形:", original_circle.describe())
    print("克隆圆形:", cloned_circle.describe())
    print("两者是否为同一对象:", original_circle is cloned_circle)
    print("position 是否共享同一对象:", original_circle.position is cloned_circle.position)
    print()

    original_rect = Rectangle(width=30, height=15, color="绿色", tags=["按钮背景"])
    cloned_rect = original_rect.clone()
    cloned_rect.width = 60
    cloned_rect.tags.append("放大版")

    print("原始矩形:", original_rect.describe())
    print("克隆矩形:", cloned_rect.describe())

    print()
    print("--- 原型注册表（按需克隆预设模板） ---")
    registry: dict[str, Shape] = {
        "小红圆": Circle(radius=2, color="红色"),
        "大绿方": Rectangle(width=50, height=50, color="绿色"),
    }
    stamp1 = registry["小红圆"].clone()
    stamp2 = registry["小红圆"].clone()
    stamp2.color = "粉色"
    print("模板本身:", registry["小红圆"].describe())
    print("印章 1  :", stamp1.describe())
    print("印章 2  :", stamp2.describe())


if __name__ == "__main__":
    main()
