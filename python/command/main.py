"""命令模式（Command）
场景：遥控器 —— LightOn/LightOff 命令，支持撤销（undo）。

核心思想：将请求封装成一个独立的命令对象，从而可以用不同的请求对客户进行
参数化，支持将请求排队、记录日志，以及支持可撤销的操作。
调用者（遥控器）只依赖抽象命令接口，不知道具体是"开灯"还是"关灯"，
也不知道真正执行操作的是哪个接收者（Light、Fan...）。
"""

from __future__ import annotations

import sys
from abc import ABC, abstractmethod

# Windows 控制台有时默认非 UTF-8 编码，强制切换避免中文输出乱码
if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8")


# ------------------------- 接收者（Receiver） -------------------------
class Light:
    """接收者：真正知道如何执行操作的对象"""

    def __init__(self, location: str) -> None:
        self.location = location
        self.is_on = False

    def turn_on(self) -> str:
        self.is_on = True
        return f"{self.location}的灯 打开了"

    def turn_off(self) -> str:
        self.is_on = False
        return f"{self.location}的灯 关闭了"


# ------------------------- 抽象命令（Command） -------------------------
class Command(ABC):
    """抽象命令：统一 execute/undo 接口"""

    @abstractmethod
    def execute(self) -> str: ...

    @abstractmethod
    def undo(self) -> str: ...


# ------------------------- 具体命令（Concrete Command） -------------------------
class LightOnCommand(Command):
    """具体命令：开灯，undo 时关灯"""

    def __init__(self, light: Light) -> None:
        self._light = light

    def execute(self) -> str:
        return self._light.turn_on()

    def undo(self) -> str:
        return self._light.turn_off()


class LightOffCommand(Command):
    """具体命令：关灯，undo 时开灯"""

    def __init__(self, light: Light) -> None:
        self._light = light

    def execute(self) -> str:
        return self._light.turn_off()

    def undo(self) -> str:
        return self._light.turn_on()


class NoCommand(Command):
    """空对象命令：避免遥控器某个按钮未绑定命令时出现 None 判断"""

    def execute(self) -> str:
        return "（此按钮尚未绑定任何命令）"

    def undo(self) -> str:
        return "（没有可撤销的操作）"


# ------------------------- 调用者（Invoker） -------------------------
class RemoteControl:
    """调用者：遥控器，只依赖抽象 Command，不知道具体命令的实现细节"""

    def __init__(self) -> None:
        self._slot: Command = NoCommand()
        self._history: list[Command] = []

    def set_command(self, command: Command) -> None:
        self._slot = command

    def press_button(self) -> None:
        result = self._slot.execute()
        self._history.append(self._slot)
        print(f"[按下按钮] {result}")

    def press_undo(self) -> None:
        if not self._history:
            print("[撤销] 没有可撤销的历史操作")
            return
        last_command = self._history.pop()
        result = last_command.undo()
        print(f"[撤销] {result}")


def main() -> None:
    living_room_light = Light("客厅")
    bedroom_light = Light("卧室")

    remote = RemoteControl()

    print("--- 控制客厅灯 ---")
    remote.set_command(LightOnCommand(living_room_light))
    remote.press_button()
    remote.set_command(LightOffCommand(living_room_light))
    remote.press_button()

    print()
    print("--- 撤销上一步操作（关灯 -> 撤销后应重新开灯） ---")
    remote.press_undo()

    print()
    print("--- 控制卧室灯，并连续撤销两步 ---")
    remote.set_command(LightOnCommand(bedroom_light))
    remote.press_button()
    remote.set_command(LightOffCommand(bedroom_light))
    remote.press_button()
    remote.press_undo()
    remote.press_undo()

    print()
    print("--- 继续撤销，直到历史记录清空 ---")
    remote.press_undo()  # 撤销最初的客厅开灯命令
    remote.press_undo()  # 历史已空，提示无可撤销操作


if __name__ == "__main__":
    main()
