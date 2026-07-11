"""状态模式（State）
场景：音频播放器 —— Playing/Paused/Stopped 状态下 play/pause/stop 行为不同。

核心思想：允许一个对象在其内部状态改变时改变它的行为，看起来就像是修改了
它的类。播放器把每种状态下的行为差异封装到独立的状态类中，AudioPlayer 本身
只负责把请求委托给"当前状态对象"，不再写一堆 if/elif 判断当前是什么状态。
"""

from __future__ import annotations

import sys
from abc import ABC, abstractmethod

# Windows 控制台有时默认非 UTF-8 编码，强制切换避免中文输出乱码
if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8")


# ------------------------- 抽象状态（State） -------------------------
class PlayerState(ABC):
    """抽象状态：定义在该状态下响应 play/pause/stop 请求的行为"""

    @abstractmethod
    def play(self, player: AudioPlayer) -> None: ...

    @abstractmethod
    def pause(self, player: AudioPlayer) -> None: ...

    @abstractmethod
    def stop(self, player: AudioPlayer) -> None: ...

    @property
    @abstractmethod
    def name(self) -> str: ...


# ------------------------- 具体状态（Concrete State） -------------------------
class StoppedState(PlayerState):
    """停止态：只能从这里开始播放"""

    name = "停止"

    def play(self, player: AudioPlayer) -> None:
        print(f"  开始播放《{player.track}》")
        player.state = PlayingState()

    def pause(self, player: AudioPlayer) -> None:
        print("  已经是停止状态，无法暂停")

    def stop(self, player: AudioPlayer) -> None:
        print("  已经是停止状态")


class PlayingState(PlayerState):
    """播放态：可以暂停或停止"""

    name = "播放中"

    def play(self, player: AudioPlayer) -> None:
        print(f"  《{player.track}》正在播放中，无需重复播放")

    def pause(self, player: AudioPlayer) -> None:
        print(f"  暂停《{player.track}》")
        player.state = PausedState()

    def stop(self, player: AudioPlayer) -> None:
        print(f"  停止播放《{player.track}》")
        player.state = StoppedState()


class PausedState(PlayerState):
    """暂停态：可以恢复播放或彻底停止"""

    name = "暂停"

    def play(self, player: AudioPlayer) -> None:
        print(f"  恢复播放《{player.track}》")
        player.state = PlayingState()

    def pause(self, player: AudioPlayer) -> None:
        print("  已经是暂停状态，无需重复暂停")

    def stop(self, player: AudioPlayer) -> None:
        print(f"  从暂停状态直接停止《{player.track}》")
        player.state = StoppedState()


# ------------------------- 上下文（Context） -------------------------
class AudioPlayer:
    """上下文：音频播放器，把请求委托给当前状态对象处理"""

    def __init__(self, track: str) -> None:
        self.track = track
        self.state: PlayerState = StoppedState()

    def press_play(self) -> None:
        print(f"[按下 播放] (当前状态: {self.state.name})")
        self.state.play(self)

    def press_pause(self) -> None:
        print(f"[按下 暂停] (当前状态: {self.state.name})")
        self.state.pause(self)

    def press_stop(self) -> None:
        print(f"[按下 停止] (当前状态: {self.state.name})")
        self.state.stop(self)


def main() -> None:
    player = AudioPlayer("夜曲")

    player.press_pause()  # 停止态下暂停 -> 无效操作
    player.press_play()  # 停止 -> 播放
    player.press_play()  # 播放态下再次播放 -> 无效操作
    player.press_pause()  # 播放 -> 暂停
    player.press_pause()  # 暂停态下再次暂停 -> 无效操作
    player.press_play()  # 暂停 -> 恢复播放
    player.press_stop()  # 播放 -> 停止
    player.press_stop()  # 停止态下再次停止 -> 无效操作


if __name__ == "__main__":
    main()
