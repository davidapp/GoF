"""代理模式（Proxy）
场景：图片懒加载 —— ImageProxy 延迟到首次 display() 才真正加载 RealImage。

核心思想：为其他对象提供一个替身或占位符以控制对该对象的访问。
本例是"虚拟代理"（Virtual Proxy）：真正加载图片的开销很大，
代理对象先轻量地占位，只有在真正需要显示时才创建并委托给 RealImage，
后续调用则直接复用已加载的实例（缓存代理的效果）。
"""

from __future__ import annotations

import sys
import time
from abc import ABC, abstractmethod

# Windows 控制台有时默认非 UTF-8 编码，强制切换避免中文输出乱码
if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8")


# ------------------------- 抽象主题（Subject） -------------------------
class Image(ABC):
    """抽象主题：真实图片与代理共同实现的接口"""

    @abstractmethod
    def display(self) -> None:
        """显示图片"""


# ------------------------- 真实主题（Real Subject） -------------------------
class RealImage(Image):
    """真实主题：加载开销很大的高清图片"""

    def __init__(self, filename: str) -> None:
        self._filename = filename
        self._load_from_disk()

    def _load_from_disk(self) -> None:
        print(f"  [磁盘 I/O] 正在从磁盘加载高清图片: {self._filename} ...")
        time.sleep(0.2)  # 模拟耗时的加载过程
        print(f"  [磁盘 I/O] 加载完成: {self._filename}")

    def display(self) -> None:
        print(f"正在显示图片: {self._filename}")


# ------------------------- 代理（Proxy） -------------------------
class ImageProxy(Image):
    """虚拟代理：延迟创建 RealImage，直到第一次真正需要显示时才加载"""

    def __init__(self, filename: str) -> None:
        self._filename = filename
        self._real_image: RealImage | None = None  # 尚未加载

    def display(self) -> None:
        if self._real_image is None:
            print(f"[代理] 首次访问「{self._filename}」，触发真实加载")
            self._real_image = RealImage(self._filename)
        else:
            print(f"[代理] 「{self._filename}」已缓存，直接复用，无需重新加载")
        self._real_image.display()


def main() -> None:
    print("--- 创建图片列表（此时只创建了代理，尚未真正加载任何图片） ---")
    gallery: list[Image] = [
        ImageProxy("风景照_01.jpg"),
        ImageProxy("人像照_02.jpg"),
        ImageProxy("建筑照_03.jpg"),
    ]
    print("代理创建完毕，注意上面没有任何磁盘加载日志。")

    print()
    print("--- 第一次浏览：只查看第 1 张和第 2 张 ---")
    gallery[0].display()
    print()
    gallery[1].display()

    print()
    print("--- 再次查看第 1 张：应直接复用缓存，不再触发磁盘加载 ---")
    gallery[0].display()

    print()
    print("--- 第 3 张图片从未被访问，也就从未被真正加载（懒加载的核心价值） ---")


if __name__ == "__main__":
    main()
