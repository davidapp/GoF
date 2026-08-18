# GoF 设计模式 — Swift 实现

用 Swift 实现全部 23 个 GoF 设计模式。每个模式一个独立子目录，包含单个 `main.swift`（顶层代码作为程序入口）与一份中文 README。

## 运行方式

本目录下所有示例均为单文件脚本，无需构建工程或外部依赖，进入对应模式目录后直接执行：

```bash
cd <pattern>
swift main.swift
```

要求 Swift 5.9+（`swift --version` 确认）。示例仅使用标准库，`Foundation` 按需 `import` 用于 `String(format:)` 等少量能力。

每个模式 README 在「意图」之后都有一张形象架构图；23 张图的图鉴见 [`../docs/README.md`](../docs/README.md)。

## 模式索引

### 创建型（Creational）

| 模式 | 目录 | 一句话说明 |
|------|------|-----------|
| Abstract Factory 抽象工厂 | [`abstract-factory/`](abstract-factory) | 为 Windows / macOS 生产成套风格一致的 Button + Checkbox |
| Builder 建造者 | [`builder/`](builder) | 分步组装 Computer（CPU/内存/存储/GPU），Director 提供预设配置 |
| Factory Method 工厂方法 | [`factory-method/`](factory-method) | Logistics 子类决定用 Truck 还是 Ship 运输 |
| Prototype 原型 | [`prototype/`](prototype) | 克隆 Shape（Circle/Rectangle），复制颜色、位置等属性 |
| Singleton 单例 | [`singleton/`](singleton) | 全局 Logger，多处获取始终是同一实例 |

### 结构型（Structural）

| 模式 | 目录 | 一句话说明 |
|------|------|-----------|
| Adapter 适配器 | [`adapter/`](adapter) | 把第三方 StripePayment(分) 适配成统一的 PaymentProcessor.pay(元) |
| Bridge 桥接 | [`bridge/`](bridge) | 抽象 RemoteControl(基础/高级) × 实现 Device(电视/收音机)，两维度独立变化 |
| Composite 组合 | [`composite/`](composite) | 文件系统：File 与 Directory 统一计算总大小 / 打印树 |
| Decorator 装饰器 | [`decorator/`](decorator) | 在 Espresso 上动态叠加 Milk/Sugar 装饰，计算价格与描述 |
| Facade 外观 | [`facade/`](facade) | HomeTheaterFacade 一键 watchMovie()，内部协调投影仪/功放/灯光/播放器 |
| Flyweight 享元 | [`flyweight/`](flyweight) | 森林中大量 Tree 共享 TreeType（名称/颜色/纹理）内在状态 |
| Proxy 代理 | [`proxy/`](proxy) | ImageProxy 延迟到首次 display() 才加载 RealImage |

### 行为型（Behavioral）

| 模式 | 目录 | 一句话说明 |
|------|------|-----------|
| Chain of Responsibility 责任链 | [`chain-of-responsibility/`](chain-of-responsibility) | 采购审批：Manager -> Director -> CEO 按金额上限逐级审批 |
| Command 命令 | [`command/`](command) | 遥控器：LightOn/LightOff 命令，支持 undo |
| Interpreter 解释器 | [`interpreter/`](interpreter) | 解析并求值算术表达式 `5 + 3 - 2`（数字、加、减，带上下文变量） |
| Iterator 迭代器 | [`iterator/`](iterator) | 自定义 BookCollection，提供迭代器顺序遍历 |
| Mediator 中介者 | [`mediator/`](mediator) | 聊天室：User 通过 ChatRoom 中介收发消息，彼此解耦 |
| Memento 备忘录 | [`memento/`](memento) | 文本编辑器：保存快照并 undo 恢复内容 |
| Observer 观察者 | [`observer/`](observer) | 气象站 WeatherStation 通知多个 Display 更新温度 |
| State 状态 | [`state/`](state) | 音频播放器：Playing/Paused/Stopped 状态下 play/pause/stop 行为不同 |
| Strategy 策略 | [`strategy/`](strategy) | 支付：CreditCard/PayPal/Crypto 可互换的支付策略 |
| Template Method 模板方法 | [`template-method/`](template-method) | 冲泡饮料：Beverage 定义骨架，Tea/Coffee 实现各步骤 |
| Visitor 访问者 | [`visitor/`](visitor) | 对 Circle/Rectangle 施加 AreaVisitor（求面积）/ DrawVisitor（渲染） |

## Swift 惯用写法一览

各示例根据场景使用了不同的 Swift 惯用手法，横向对比时可留意：

| 手法 | 出现的模式 |
|------|-----------|
| `protocol` + `extension` 默认实现 | factory-method、bridge、chain-of-responsibility |
| `enum` 带关联值（含 `indirect` 递归） | interpreter（表达式语法树） |
| `struct` 值类型 vs `class` 引用类型的对照 | prototype（Color 值类型 / Shape 引用类型）、flyweight（Tree 值类型包引用 / TreeType 引用类型）、composite（File 值类型 / Directory 引用类型） |
| 可选值 `?` 与 `guard` | bridge（静音状态）、chain-of-responsibility（next 节点）、command（撤销栈）、proxy（懒加载缓存）、memento（快照恢复） |
| 闭包作为策略 | strategy（PaymentStrategy 函数类型） |
| `weak` 避免循环引用 | observer（主题对观察者的弱引用）、mediator（用户对中介者的弱引用） |
| 标准库协议扩展点 | iterator（`IteratorProtocol` / `Sequence`） |

## 目录结构

```
swift/
├── README.md                        # 本文件
└── <pattern>/
    ├── main.swift                   # 可运行示例（顶层代码作为入口）
    └── README.md                    # 中文说明：意图 / 适用场景 / 实现方式 / 文件说明 / 编译与运行 / 输出示例 / 要点
```
