"""抽象工厂模式（Abstract Factory）
场景：跨平台 GUI —— 为 Windows / macOS 生产成套的 Button + Checkbox。

核心思想：客户端只依赖抽象工厂与抽象产品接口，不关心具体平台的实现类，
从而保证同一套 UI 控件风格统一（不会出现 Windows 按钮配 macOS 复选框）。
"""

from __future__ import annotations

import sys
from abc import ABC, abstractmethod

# Windows 控制台有时默认非 UTF-8 编码，强制切换避免中文输出乱码
if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8")


# ------------------------- 抽象产品（Abstract Product） -------------------------
class Button(ABC):
    """抽象产品：按钮"""

    @abstractmethod
    def render(self) -> str:
        """渲染按钮，返回描述文本"""

    @abstractmethod
    def on_click(self) -> str:
        """点击按钮的响应"""


class Checkbox(ABC):
    """抽象产品：复选框"""

    @abstractmethod
    def render(self) -> str:
        """渲染复选框，返回描述文本"""

    @abstractmethod
    def toggle(self) -> str:
        """切换选中状态"""


# ------------------------- 具体产品：Windows 系列 -------------------------
class WindowsButton(Button):
    """具体产品：Windows 风格按钮"""

    def render(self) -> str:
        return "[Windows 按钮：矩形边框，扁平风格]"

    def on_click(self) -> str:
        return "Windows 按钮播放系统点击音效"


class WindowsCheckbox(Checkbox):
    """具体产品：Windows 风格复选框"""

    def render(self) -> str:
        return "[Windows 复选框：方形勾选]"

    def toggle(self) -> str:
        return "Windows 复选框状态切换（方形勾选动画）"


# ------------------------- 具体产品：macOS 系列 -------------------------
class MacButton(Button):
    """具体产品：macOS 风格按钮"""

    def render(self) -> str:
        return "[macOS 按钮：圆角边框，毛玻璃风格]"

    def on_click(self) -> str:
        return "macOS 按钮播放轻柔点击反馈"


class MacCheckbox(Checkbox):
    """具体产品：macOS 风格复选框"""

    def render(self) -> str:
        return "[macOS 复选框：圆角勾选]"

    def toggle(self) -> str:
        return "macOS 复选框状态切换（圆角勾选动画）"


# ------------------------- 抽象工厂（Abstract Factory） -------------------------
class GUIFactory(ABC):
    """抽象工厂：生产一整套（Button + Checkbox）UI 控件"""

    @abstractmethod
    def create_button(self) -> Button: ...

    @abstractmethod
    def create_checkbox(self) -> Checkbox: ...


# ------------------------- 具体工厂 -------------------------
class WindowsFactory(GUIFactory):
    """具体工厂：生产 Windows 系列控件"""

    def create_button(self) -> Button:
        return WindowsButton()

    def create_checkbox(self) -> Checkbox:
        return WindowsCheckbox()


class MacFactory(GUIFactory):
    """具体工厂：生产 macOS 系列控件"""

    def create_button(self) -> Button:
        return MacButton()

    def create_checkbox(self) -> Checkbox:
        return MacCheckbox()


# ------------------------- 客户端代码 -------------------------
class Application:
    """客户端：只依赖抽象工厂，不知道具体平台类型"""

    def __init__(self, factory: GUIFactory) -> None:
        self._button = factory.create_button()
        self._checkbox = factory.create_checkbox()

    def render_ui(self) -> None:
        print(self._button.render())
        print(self._checkbox.render())
        print(self._button.on_click())
        print(self._checkbox.toggle())


def get_factory(platform: str) -> GUIFactory:
    """根据平台名称返回对应的具体工厂（模拟运行时检测操作系统）"""
    factories: dict[str, type[GUIFactory]] = {
        "windows": WindowsFactory,
        "mac": MacFactory,
    }
    factory_cls = factories.get(platform.lower())
    if factory_cls is None:
        raise ValueError(f"不支持的平台: {platform}")
    return factory_cls()


def main() -> None:
    for platform in ("windows", "mac"):
        print(f"=== 当前平台: {platform} ===")
        app = Application(get_factory(platform))
        app.render_ui()
        print()


if __name__ == "__main__":
    main()
