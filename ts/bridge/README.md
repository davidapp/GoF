# Bridge 桥接模式（TypeScript）

## 意图
将抽象部分与实现部分分离，使它们可以独立地变化。当一个类存在两个（或更多）独立变化的维度时，用继承会导致类数量爆炸（维度组合），桥接模式改用组合来关联两个维度，各自都可以单独扩展。

## 适用场景
- 不希望在抽象和实现之间有固定的绑定关系（如运行时切换设备）。
- 抽象和实现都应该可以通过子类化独立扩展（遥控器可以有 basic/advanced，设备可以有 TV/Radio，二者独立增长）。
- 想避免“每新增一个维度的取值，类数量就成倍增长”的组合爆炸问题。

## 实现方式
`Device` 是实现接口（Implementor），声明开关机、音量等基础操作，`TV`、`Radio` 是具体实现。`RemoteControl` 是抽象部分（Abstraction），持有一个 `Device` 引用（这就是“桥”），`AdvancedRemoteControl` 在此基础上扩展出 `mute()` 等新功能：

```ts
class RemoteControl {
  constructor(protected device: Device) {} // 抽象持有实现的引用——桥

  togglePower(): void {
    this.device.isOn() ? this.device.turnOff() : this.device.turnOn();
  }
}

class AdvancedRemoteControl extends RemoteControl {
  mute(): void { this.device.setVolume(0); }
}
```

两个维度（遥控器种类 × 设备种类）可以自由组合，例如 `new AdvancedRemoteControl(new TV())`，而不需要一个专门的 `AdvancedTVRemote` 类。

## 文件说明
| 文件 | 说明 |
|------|------|
| main.ts | 桥接模式完整实现，演示 basic/advanced 遥控器分别控制 TV/Radio |

## 编译与运行
```bash
cd ts/bridge
npx tsx main.ts
```

## 输出示例
```
=== 普通遥控器 + 电视 ===
电视 已开机
电视 音量设置为 40

=== 高级遥控器 + 收音机 ===
收音机 已开机
收音机 音量设置为 60
收音机 音量设置为 0
收音机 已静音

=== 高级遥控器同样可以控制电视（两个维度自由组合） ===
电视 已开机
电视 音量设置为 0
电视 已静音
```

## 要点
1. “桥”的本质是 Abstraction 通过组合（而非继承）持有 Implementor，使两个维度的变化互不影响。
2. 新增一种设备（如 `SoundBar`）不需要改动任何 `RemoteControl` 子类；新增一种遥控器也不需要改动任何 `Device` 实现。
3. 与策略模式结构相似（都是组合优于继承），但意图不同：桥接强调“两个独立维度长期共存并分别扩展”，策略强调“同一算法族在运行时互换”。
