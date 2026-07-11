"""外观模式（Facade）
场景：HomeTheaterFacade 一键 watch_movie()，内部协调投影仪/功放/灯光/播放器。

核心思想：为子系统中一组复杂的接口提供一个统一的高层接口，让子系统更容易使用。
客户端不需要了解投影仪、功放、灯光、播放器各自的开关顺序与参数细节，
只需调用外观对象的一个方法即可完成"看电影"这个完整流程。
"""

from __future__ import annotations

import sys

# Windows 控制台有时默认非 UTF-8 编码，强制切换避免中文输出乱码
if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8")


# ------------------------- 子系统（Subsystem Classes） -------------------------
class Projector:
    """子系统：投影仪"""

    def on(self) -> str:
        return "投影仪打开"

    def set_input(self, source: str) -> str:
        return f"投影仪切换信号源为 {source}"

    def off(self) -> str:
        return "投影仪关闭"


class Amplifier:
    """子系统：功放"""

    def on(self) -> str:
        return "功放打开"

    def set_volume(self, level: int) -> str:
        return f"功放音量设置为 {level}"

    def off(self) -> str:
        return "功放关闭"


class Lights:
    """子系统：灯光"""

    def dim(self, level: int) -> str:
        return f"灯光调暗至 {level}%"

    def bright(self) -> str:
        return "灯光恢复全亮"


class StreamingPlayer:
    """子系统：流媒体播放器"""

    def on(self) -> str:
        return "播放器打开"

    def play(self, movie: str) -> str:
        return f"开始播放《{movie}》"

    def stop(self) -> str:
        return "停止播放"

    def off(self) -> str:
        return "播放器关闭"


# ------------------------- 外观（Facade） -------------------------
class HomeTheaterFacade:
    """外观：封装家庭影院各子系统的协调逻辑，对外只暴露简单方法"""

    def __init__(
        self,
        projector: Projector,
        amplifier: Amplifier,
        lights: Lights,
        player: StreamingPlayer,
    ) -> None:
        self._projector = projector
        self._amplifier = amplifier
        self._lights = lights
        self._player = player

    def watch_movie(self, movie: str) -> None:
        """一键观影：按正确顺序依次启动各子系统"""
        print(f"准备观看《{movie}》...")
        print(self._lights.dim(20))
        print(self._projector.on())
        print(self._projector.set_input("HDMI"))
        print(self._amplifier.on())
        print(self._amplifier.set_volume(15))
        print(self._player.on())
        print(self._player.play(movie))
        print("一切就绪，请欣赏！")

    def end_movie(self) -> None:
        """一键关闭：按正确顺序依次关闭各子系统"""
        print("正在结束观影...")
        print(self._player.stop())
        print(self._player.off())
        print(self._amplifier.off())
        print(self._projector.off())
        print(self._lights.bright())
        print("已恢复到观影前状态。")


def main() -> None:
    home_theater = HomeTheaterFacade(
        projector=Projector(),
        amplifier=Amplifier(),
        lights=Lights(),
        player=StreamingPlayer(),
    )

    home_theater.watch_movie("星际穿越")
    print()
    home_theater.end_movie()


if __name__ == "__main__":
    main()
