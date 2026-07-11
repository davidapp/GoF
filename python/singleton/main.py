"""单例模式（Singleton）
场景：全局 Logger（可带日志级别），多处获取均为同一实例。

核心思想：保证一个类在整个进程中只有一个实例，并提供全局访问点。
本例使用元类（metaclass）拦截类的实例化过程（__call__），并用
threading.Lock 做双重检查锁定（double-checked locking），保证多线程下
也只会创建一份实例——这是比 Java 式手写静态变量更"Pythonic"的实现方式。
"""

from __future__ import annotations

import sys
import threading
from datetime import datetime
from enum import IntEnum

# Windows 控制台有时默认非 UTF-8 编码，强制切换避免中文输出乱码
if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8")


class LogLevel(IntEnum):
    """日志级别，数值越大越严重，可直接比较大小"""

    DEBUG = 10
    INFO = 20
    WARNING = 30
    ERROR = 40


class SingletonMeta(type):
    """单例元类：拦截 Logger(...) 调用，保证全局仅创建一个实例"""

    _instances: dict[type, object] = {}
    _lock = threading.Lock()

    def __call__(cls, *args: object, **kwargs: object) -> object:
        # 第一次检查：大多数情况下实例已存在，直接返回，避免每次都加锁
        if cls not in cls._instances:
            with cls._lock:
                # 第二次检查：防止多个线程同时通过了第一次检查
                if cls not in cls._instances:
                    cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]


class Logger(metaclass=SingletonMeta):
    """全局日志器：整个应用中通过 Logger() 获取到的都是同一个实例"""

    def __init__(self, level: LogLevel = LogLevel.INFO) -> None:
        self.level = level
        self._history: list[str] = []

    def set_level(self, level: LogLevel) -> None:
        self.level = level

    def log(self, message: str, level: LogLevel = LogLevel.INFO) -> None:
        if level < self.level:
            return  # 低于当前阈值的日志被过滤
        timestamp = datetime.now().strftime("%H:%M:%S")
        line = f"[{timestamp}] [{level.name}] {message}"
        self._history.append(line)
        print(line)

    @property
    def history(self) -> list[str]:
        return list(self._history)


# ------------------------- 模拟应用中的不同模块 -------------------------
class ModuleA:
    """模块 A：通过 Logger() 获取全局单例"""

    def run(self) -> None:
        Logger().log("模块 A 初始化完成", LogLevel.DEBUG)
        Logger().log("模块 A 开始处理任务", LogLevel.INFO)


class ModuleB:
    """模块 B：同样通过 Logger() 获取，验证是同一个实例"""

    def run(self) -> None:
        Logger().log("模块 B 检测到潜在问题", LogLevel.WARNING)
        Logger().log("模块 B 处理失败", LogLevel.ERROR)


def main() -> None:
    logger = Logger()
    logger.set_level(LogLevel.DEBUG)  # 调低阈值，让 DEBUG 日志也能输出
    logger.log("主程序启动", LogLevel.INFO)

    ModuleA().run()
    ModuleB().run()

    # 验证：无论在哪里调用 Logger()，拿到的都是同一个对象
    logger_ref1 = Logger()
    logger_ref2 = Logger()
    print()
    print(f"logger_ref1 is logger_ref2 : {logger_ref1 is logger_ref2}")
    print(f"logger_ref1 id : {id(logger_ref1)}")
    print(f"logger_ref2 id : {id(logger_ref2)}")
    print(f"历史日志共 {len(logger.history)} 条")


if __name__ == "__main__":
    main()
