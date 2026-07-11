# Builder 建造者模式（Swift）

## 意图
将一个复杂对象的构建过程与其表示分离，使同样的构建过程可以创建不同的表示。客户端无需了解组装细节，即可分步、可控地构造出复杂对象。

## 适用场景
- 创建复杂对象的算法应独立于该对象的组成部分及其装配方式。
- 构造过程必须允许被构造的对象有不同的表示（如办公配置 / 游戏配置）。
- 需要链式、可读性强的对象构造方式，避免"望远镜构造器"（多参数构造函数）。

## 实现方式
`Computer` 是产品，`ComputerBuilder` 提供 `setCPU/setMemory/setStorage/setGPU` 等分步方法，每步返回 `self` 以支持链式调用；`ComputerDirector` 是指挥者，封装了"办公配置""游戏配置"两套预设组装步骤。客户端既可以调用 `ComputerDirector` 使用预设，也可以直接使用 `ComputerBuilder` 自由定制。

```swift
final class ComputerBuilder {
    private var computer = Computer()

    @discardableResult
    func setCPU(_ cpu: String) -> ComputerBuilder {
        computer.cpu = cpu
        return self
    }
    // ...
    func build() -> Computer { computer }
}
```

## 文件说明
| 文件 | 说明 |
|------|------|
| main.swift | 建造者模式的完整实现与可运行示例（顶层代码作为入口） |

## 编译与运行
```bash
swift main.swift
```

## 输出示例
预期输出（本机未安装 Swift，未实机运行）：
```
=== 建造者模式：分步组装 Computer ===

[办公用机 - 由 Director 预设]
电脑配置：
  CPU:  Intel i5-13400
  内存: 16GB
  存储: 512GB SSD
  显卡: 无独立显卡

[游戏主机 - 由 Director 预设]
电脑配置：
  CPU:  Intel i9-14900K
  内存: 32GB
  存储: 2TB NVMe SSD
  显卡: NVIDIA RTX 4090

[自定义配置 - 客户端直接使用 Builder]
电脑配置：
  CPU:  AMD Ryzen 9 7950X
  内存: 64GB
  存储: 1TB SSD + 4TB HDD
  显卡: AMD Radeon RX 7900 XTX
```

## 要点
1. `ComputerDirector` 把"如何组装"固化为预设流程，客户端只需选择配置名称，无需关心具体步骤顺序。
2. 链式调用（`@discardableResult` + 返回 `self`）让分步构造读起来像自然语言，也是 Swift 中常见的流畅接口（Fluent Interface）写法。
3. 不使用 Director 也可以直接操作 Builder，体现建造者模式"构建过程"与"预设配置"两者可以独立使用的灵活性。
4. `Computer` 使用 `struct` 值类型：每次 `build()` 返回的是独立副本，不会与 Builder 内部状态共享引用。
