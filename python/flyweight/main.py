"""享元模式（Flyweight）
场景：森林中有大量 Tree，共享 TreeType（名称/颜色/纹理）这部分内在状态。

核心思想：把对象状态拆分为"内在状态"（可共享、不随环境变化，如树的种类、
颜色、贴图）与"外在状态"（不可共享、随上下文变化，如坐标位置）。
通过工厂缓存内在状态对象，大量看似独立的对象实际上共享同一份数据，
从而大幅降低内存占用。
"""

from __future__ import annotations

import sys
from dataclasses import dataclass

# Windows 控制台有时默认非 UTF-8 编码，强制切换避免中文输出乱码
if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8")


# ------------------------- 享元（Flyweight）：内在状态 -------------------------
@dataclass(frozen=True)
class TreeType:
    """享元对象：树的种类，只包含可共享的内在状态（不随具体某棵树而变化）"""

    name: str
    color: str
    texture: str

    def draw(self, x: int, y: int) -> str:
        """渲染时才传入外在状态（坐标），内在状态由享元自身携带"""
        return f"在 ({x}, {y}) 绘制一棵【{self.name}】，颜色={self.color}，纹理={self.texture}"


# ------------------------- 享元工厂（Flyweight Factory） -------------------------
class TreeTypeFactory:
    """享元工厂：以 (名称, 颜色, 纹理) 为键缓存 TreeType，相同参数只创建一次"""

    _pool: dict[tuple[str, str, str], TreeType] = {}

    @classmethod
    def get_tree_type(cls, name: str, color: str, texture: str) -> TreeType:
        key = (name, color, texture)
        if key not in cls._pool:
            cls._pool[key] = TreeType(name, color, texture)
            print(f"  [工厂] 创建新的 TreeType 享元: {key}")
        return cls._pool[key]

    @classmethod
    def pool_size(cls) -> int:
        return len(cls._pool)


# ------------------------- 使用享元的对象：外在状态 -------------------------
@dataclass
class Tree:
    """具体的一棵树：只保存外在状态（坐标），内在状态通过共享引用获得"""

    x: int
    y: int
    tree_type: TreeType  # 指向共享的享元对象

    def draw(self) -> str:
        return self.tree_type.draw(self.x, self.y)


# ------------------------- 客户端：森林 -------------------------
class Forest:
    """客户端：管理大量 Tree，但底层 TreeType 会被自动复用"""

    def __init__(self) -> None:
        self._trees: list[Tree] = []

    def plant_tree(self, x: int, y: int, name: str, color: str, texture: str) -> None:
        tree_type = TreeTypeFactory.get_tree_type(name, color, texture)
        self._trees.append(Tree(x, y, tree_type))

    def draw(self) -> None:
        for tree in self._trees:
            print(tree.draw())

    @property
    def tree_count(self) -> int:
        return len(self._trees)


def main() -> None:
    forest = Forest()

    print("--- 种植 6 棵树（只有 3 种真实类型：松树/枫树/柳树） ---")
    forest.plant_tree(1, 1, "松树", "深绿色", "针叶纹理")
    forest.plant_tree(5, 2, "枫树", "橙红色", "掌形叶纹理")
    forest.plant_tree(3, 8, "松树", "深绿色", "针叶纹理")
    forest.plant_tree(9, 4, "柳树", "浅绿色", "垂枝纹理")
    forest.plant_tree(2, 6, "枫树", "橙红色", "掌形叶纹理")
    forest.plant_tree(7, 7, "松树", "深绿色", "针叶纹理")

    print()
    print("--- 绘制整片森林 ---")
    forest.draw()

    print()
    print(f"森林中树木总数   : {forest.tree_count}")
    print(f"实际 TreeType 数 : {TreeTypeFactory.pool_size()}（享元复用，内存占用与树木总数无关）")


if __name__ == "__main__":
    main()
