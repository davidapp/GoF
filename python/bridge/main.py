"""桥接模式（Bridge）
场景：抽象 RemoteControl（basic/advanced）× 实现 Device（TV/Radio），
两个维度可以独立变化、自由组合。

核心思想：将抽象部分（遥控器的功能层级）与实现部分（具体设备的操作方式）
分离到两个独立的类层次中，用组合（桥）代替继承，避免"遥控器种类 × 设备种类"
的组合爆炸（若用继承，2 种遥控器 × 2 种设备 = 4 个类，再加一种设备就要再翻倍）。
"""

from __future__ import annotations

import sys
from abc import ABC, abstractmethod

# Windows 控制台有时默认非 UTF-8 编码，强制切换避免中文输出乱码
if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8")


# ------------------------- 实现部分（Implementor） -------------------------
class Device(ABC):
    """实现接口：具体设备提供的底层操作"""

    def __init__(self) -> None:
        self._on = False
        self._volume = 30  # 0~100

    @property
    @abstractmethod
    def name(self) -> str: ...

    @property
    def is_on(self) -> bool:
        return self._on

    @property
    def volume(self) -> int:
        return self._volume

    def turn_on(self) -> str:
        self._on = True
        return f"{self.name} 已开机"

    def turn_off(self) -> str:
        self._on = False
        return f"{self.name} 已关机"

    def set_volume(self, volume: int) -> str:
        self._volume = max(0, min(100, volume))
        return f"{self.name} 音量调整为 {self._volume}"

    def status(self) -> str:
        state = "开机" if self._on else "关机"
        return f"[{self.name}] 状态={state}, 音量={self._volume}"


# ------------------------- 具体实现 -------------------------
class TV(Device):
    """具体实现：电视机"""

    @property
    def name(self) -> str:
        return "电视机"


class Radio(Device):
    """具体实现：收音机"""

    @property
    def name(self) -> str:
        return "收音机"


# ------------------------- 抽象部分（Abstraction） -------------------------
class RemoteControl:
    """抽象：基础遥控器，只持有一个 Device 引用（桥），委托其完成实际操作"""

    def __init__(self, device: Device) -> None:
        self._device = device  # 桥：指向实现部分

    def toggle_power(self) -> str:
        return self._device.turn_off() if self._device.is_on else self._device.turn_on()

    def volume_up(self) -> str:
        return self._device.set_volume(self._device.volume + 10)

    def volume_down(self) -> str:
        return self._device.set_volume(self._device.volume - 10)

    def status(self) -> str:
        return self._device.status()


# ------------------------- 扩展抽象（Refined Abstraction） -------------------------
class AdvancedRemoteControl(RemoteControl):
    """扩展抽象：高级遥控器，在基础功能之上新增静音、直接跳到指定音量等能力"""

    def __init__(self, device: Device) -> None:
        super().__init__(device)
        self._muted_volume: int | None = None

    def mute(self) -> str:
        if self._muted_volume is None:
            self._muted_volume = self._device.volume
            return self._device.set_volume(0) + "（已静音）"
        restored = self._muted_volume
        self._muted_volume = None
        return self._device.set_volume(restored) + "（已取消静音）"

    def set_volume_to(self, volume: int) -> str:
        return self._device.set_volume(volume)


def main() -> None:
    tv = TV()
    radio = Radio()

    print("--- 基础遥控器 + 电视机 ---")
    basic_remote = RemoteControl(tv)
    print(basic_remote.toggle_power())
    print(basic_remote.volume_up())
    print(basic_remote.volume_up())
    print(basic_remote.status())

    print()
    print("--- 高级遥控器 + 收音机（同一个抽象层级，不同设备实现） ---")
    advanced_remote = AdvancedRemoteControl(radio)
    print(advanced_remote.toggle_power())
    print(advanced_remote.set_volume_to(80))
    print(advanced_remote.mute())
    print(advanced_remote.status())
    print(advanced_remote.mute())
    print(advanced_remote.status())

    print()
    print("--- 高级遥控器 + 电视机（同一个抽象也能搭配另一种设备） ---")
    advanced_tv_remote = AdvancedRemoteControl(tv)
    print(advanced_tv_remote.mute())
    print(advanced_tv_remote.status())


if __name__ == "__main__":
    main()
