"""建造者模式（Builder）
场景：分步组装 Computer（CPU/内存/存储/GPU），Director 提供预设配置。

核心思想：把复杂对象的构造过程与其表示分离，同一个建造过程（Director 调用的
步骤顺序）可以搭配不同的 Builder 具体实现，产出不同的产品表示；
本例中用同一个 ComputerBuilder，通过 Director 的不同预设方法产出不同配置。
"""

from __future__ import annotations

import sys
from dataclasses import dataclass, field

# Windows 控制台有时默认非 UTF-8 编码，强制切换避免中文输出乱码
if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8")


# ------------------------- 产品（Product） -------------------------
@dataclass
class Computer:
    """产品：电脑整机，由若干部件组成"""

    cpu: str = "未指定"
    memory_gb: int = 0
    storage_gb: int = 0
    gpu: str | None = None
    accessories: list[str] = field(default_factory=list)

    def describe(self) -> str:
        lines = [
            "电脑配置清单:",
            f"  CPU   : {self.cpu}",
            f"  内存  : {self.memory_gb} GB",
            f"  存储  : {self.storage_gb} GB",
            f"  显卡  : {self.gpu or '集成显卡'}",
        ]
        if self.accessories:
            lines.append(f"  配件  : {', '.join(self.accessories)}")
        return "\n".join(lines)


# ------------------------- 建造者（Builder） -------------------------
class ComputerBuilder:
    """建造者：提供分步设置部件的方法，支持链式调用（fluent interface）"""

    def __init__(self) -> None:
        self._computer = Computer()

    def set_cpu(self, cpu: str) -> ComputerBuilder:
        self._computer.cpu = cpu
        return self

    def set_memory(self, memory_gb: int) -> ComputerBuilder:
        self._computer.memory_gb = memory_gb
        return self

    def set_storage(self, storage_gb: int) -> ComputerBuilder:
        self._computer.storage_gb = storage_gb
        return self

    def set_gpu(self, gpu: str) -> ComputerBuilder:
        self._computer.gpu = gpu
        return self

    def add_accessory(self, accessory: str) -> ComputerBuilder:
        self._computer.accessories.append(accessory)
        return self

    def build(self) -> Computer:
        """交付最终产品，并重置内部状态以便复用该建造者"""
        result = self._computer
        self._computer = Computer()
        return result


# ------------------------- 指挥者（Director） -------------------------
class ComputerDirector:
    """指挥者：封装常见的组装步骤顺序，提供预设配置"""

    def __init__(self, builder: ComputerBuilder) -> None:
        self._builder = builder

    def build_office_pc(self) -> Computer:
        """预设：办公用机，注重性价比"""
        return (
            self._builder.set_cpu("Intel Core i3-13100")
            .set_memory(8)
            .set_storage(256)
            .build()
        )

    def build_gaming_pc(self) -> Computer:
        """预设：游戏主机，高性能配置"""
        return (
            self._builder.set_cpu("Intel Core i9-14900K")
            .set_memory(32)
            .set_storage(2000)
            .set_gpu("NVIDIA GeForce RTX 4090")
            .add_accessory("RGB 机箱风扇")
            .add_accessory("水冷散热器")
            .build()
        )

    def build_workstation(self) -> Computer:
        """预设：图形工作站，兼顾多任务与渲染"""
        return (
            self._builder.set_cpu("AMD Threadripper 7970X")
            .set_memory(128)
            .set_storage(4000)
            .set_gpu("NVIDIA RTX A6000")
            .add_accessory("专业色彩校准显示器")
            .build()
        )


def main() -> None:
    builder = ComputerBuilder()
    director = ComputerDirector(builder)

    print("--- 预设 1: 办公用机 ---")
    print(director.build_office_pc().describe())
    print()

    print("--- 预设 2: 游戏主机 ---")
    print(director.build_gaming_pc().describe())
    print()

    print("--- 预设 3: 图形工作站 ---")
    print(director.build_workstation().describe())
    print()

    print("--- 自定义配置（不经过 Director，直接使用 Builder） ---")
    custom = (
        builder.set_cpu("Apple M3 Max")
        .set_memory(64)
        .set_storage(1000)
        .add_accessory("雷电 4 扩展坞")
        .build()
    )
    print(custom.describe())


if __name__ == "__main__":
    main()
