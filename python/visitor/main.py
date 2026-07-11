"""访问者模式（Visitor）
场景：图形 —— 对 Circle/Rectangle 施加 AreaVisitor（求面积）/ DrawVisitor（渲染）等操作。

核心思想：表示一个作用于某对象结构中各元素的操作，使得可以在不改变各元素类的
前提下定义新的操作。通过"双重分派"（元素.accept(visitor) 内部再调用
visitor.visit_xxx(self)）实现——先按元素的实际类型分派一次，再按访问者的
实际类型分派一次，从而精确调用到"这种图形 × 这种操作"对应的那一段逻辑。
"""

from __future__ import annotations

import math
import sys
from abc import ABC, abstractmethod

# Windows 控制台有时默认非 UTF-8 编码，强制切换避免中文输出乱码
if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8")


# ------------------------- 抽象访问者（Visitor） -------------------------
class ShapeVisitor(ABC):
    """抽象访问者：为每一种具体图形都声明一个 visit 方法"""

    @abstractmethod
    def visit_circle(self, circle: Circle) -> None: ...

    @abstractmethod
    def visit_rectangle(self, rectangle: Rectangle) -> None: ...


# ------------------------- 抽象元素（Element） -------------------------
class Shape(ABC):
    """抽象元素：定义 accept 方法接纳访问者，实现"双重分派"的第一次分派"""

    @abstractmethod
    def accept(self, visitor: ShapeVisitor) -> None: ...


# ------------------------- 具体元素（Concrete Element） -------------------------
class Circle(Shape):
    """具体元素：圆形"""

    def __init__(self, radius: float) -> None:
        self.radius = radius

    def accept(self, visitor: ShapeVisitor) -> None:
        visitor.visit_circle(self)  # 第二次分派：交给访问者处理"圆形"的具体逻辑


class Rectangle(Shape):
    """具体元素：矩形"""

    def __init__(self, width: float, height: float) -> None:
        self.width = width
        self.height = height

    def accept(self, visitor: ShapeVisitor) -> None:
        visitor.visit_rectangle(self)


# ------------------------- 具体访问者（Concrete Visitor） -------------------------
class AreaVisitor(ShapeVisitor):
    """具体访问者：计算面积"""

    def __init__(self) -> None:
        self.total_area: float = 0.0

    def visit_circle(self, circle: Circle) -> None:
        area = math.pi * circle.radius**2
        self.total_area += area
        print(f"  圆形(半径={circle.radius}) 面积 = {area:.2f}")

    def visit_rectangle(self, rectangle: Rectangle) -> None:
        area = rectangle.width * rectangle.height
        self.total_area += area
        print(f"  矩形({rectangle.width}x{rectangle.height}) 面积 = {area:.2f}")


class DrawVisitor(ShapeVisitor):
    """具体访问者：渲染成简单的 ASCII 描述"""

    def visit_circle(self, circle: Circle) -> None:
        print(f"  绘制: ○ 一个半径为 {circle.radius} 的圆")

    def visit_rectangle(self, rectangle: Rectangle) -> None:
        print(f"  绘制: ▭ 一个 {rectangle.width}x{rectangle.height} 的矩形")


class PerimeterVisitor(ShapeVisitor):
    """具体访问者：计算周长——新增操作时无需修改 Circle/Rectangle 任何代码"""

    def visit_circle(self, circle: Circle) -> None:
        perimeter = 2 * math.pi * circle.radius
        print(f"  圆形(半径={circle.radius}) 周长 = {perimeter:.2f}")

    def visit_rectangle(self, rectangle: Rectangle) -> None:
        perimeter = 2 * (rectangle.width + rectangle.height)
        print(f"  矩形({rectangle.width}x{rectangle.height}) 周长 = {perimeter:.2f}")


def main() -> None:
    shapes: list[Shape] = [Circle(5), Rectangle(4, 6), Circle(2), Rectangle(3, 3)]

    print("--- 使用 AreaVisitor 计算每个图形的面积 ---")
    area_visitor = AreaVisitor()
    for shape in shapes:
        shape.accept(area_visitor)
    print(f"  总面积 = {area_visitor.total_area:.2f}")

    print()
    print("--- 使用 DrawVisitor 渲染所有图形 ---")
    draw_visitor = DrawVisitor()
    for shape in shapes:
        shape.accept(draw_visitor)

    print()
    print("--- 新增 PerimeterVisitor 计算周长（无需修改 Shape 任何代码） ---")
    perimeter_visitor = PerimeterVisitor()
    for shape in shapes:
        shape.accept(perimeter_visitor)


if __name__ == "__main__":
    main()
