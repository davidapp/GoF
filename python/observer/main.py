"""观察者模式（Observer）
场景：气象站 WeatherStation 通知多个 Display 更新温度等数据。

核心思想：定义对象间一对多的依赖关系，当一个对象（Subject/被观察者）的状态
发生改变时，所有依赖于它的对象（Observer/观察者）都会自动收到通知并更新。
WeatherStation 不需要知道具体有哪些 Display，也不知道它们收到通知后做什么。
"""

from __future__ import annotations

import sys
from abc import ABC, abstractmethod
from dataclasses import dataclass

# Windows 控制台有时默认非 UTF-8 编码，强制切换避免中文输出乱码
if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8")


@dataclass(frozen=True)
class WeatherData:
    """气象数据快照：作为通知内容传递给观察者"""

    temperature: float
    humidity: float
    pressure: float


# ------------------------- 抽象观察者（Observer） -------------------------
class Observer(ABC):
    """抽象观察者：定义收到通知时的响应接口"""

    @abstractmethod
    def update(self, data: WeatherData) -> None: ...


# ------------------------- 抽象主题（Subject） -------------------------
class Subject(ABC):
    """抽象主题：维护观察者列表，提供订阅/退订/通知的通用能力"""

    def __init__(self) -> None:
        self._observers: list[Observer] = []

    def attach(self, observer: Observer) -> None:
        self._observers.append(observer)

    def detach(self, observer: Observer) -> None:
        self._observers.remove(observer)

    def notify(self, data: WeatherData) -> None:
        for observer in self._observers:
            observer.update(data)


# ------------------------- 具体主题（Concrete Subject） -------------------------
class WeatherStation(Subject):
    """具体主题：气象站，测量数据变化时自动通知所有订阅的展示面板"""

    def set_measurements(self, temperature: float, humidity: float, pressure: float) -> None:
        print(f"[气象站] 采集到新数据: 温度={temperature}℃, 湿度={humidity}%, 气压={pressure}hPa")
        self.notify(WeatherData(temperature, humidity, pressure))


# ------------------------- 具体观察者（Concrete Observer） -------------------------
class CurrentConditionsDisplay(Observer):
    """具体观察者：实时状况显示面板"""

    def update(self, data: WeatherData) -> None:
        print(f"  [实时状况面板] 当前温度 {data.temperature}℃，湿度 {data.humidity}%")


class StatisticsDisplay(Observer):
    """具体观察者：统计面板，维护历史温度的最高/最低/平均值"""

    def __init__(self) -> None:
        self._readings: list[float] = []

    def update(self, data: WeatherData) -> None:
        self._readings.append(data.temperature)
        avg = sum(self._readings) / len(self._readings)
        print(
            f"  [统计面板] 最高 {max(self._readings)}℃ / "
            f"最低 {min(self._readings)}℃ / 平均 {avg:.1f}℃"
        )


class ForecastDisplay(Observer):
    """具体观察者：预报面板，基于气压变化给出简单预测"""

    def __init__(self) -> None:
        self._last_pressure: float | None = None

    def update(self, data: WeatherData) -> None:
        if self._last_pressure is None or data.pressure >= self._last_pressure:
            forecast = "天气转晴"
        else:
            forecast = "可能有雨"
        self._last_pressure = data.pressure
        print(f"  [预报面板] 气压 {data.pressure}hPa，预测: {forecast}")


def main() -> None:
    station = WeatherStation()

    current_display = CurrentConditionsDisplay()
    statistics_display = StatisticsDisplay()
    forecast_display = ForecastDisplay()

    station.attach(current_display)
    station.attach(statistics_display)
    station.attach(forecast_display)

    station.set_measurements(26.5, 60, 1013)
    print()
    station.set_measurements(29.0, 55, 1009)
    print()

    print("--- 统计面板临时下线（detach），其余面板继续接收通知 ---")
    station.detach(statistics_display)
    station.set_measurements(22.0, 70, 1015)


if __name__ == "__main__":
    main()
