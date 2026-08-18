# GoF 设计模式 · Go 实现

用 Go 惯用风格（接口、组合、函数值/闭包、error 返回值）实现 GoF 23 种设计模式。
每个模式一个独立子目录，内含可运行示例（`package main` + `main.go`）与中文 README。

每个模式 README 在「意图」之后都有一张形象架构图；23 张图的图鉴见 [`../docs/README.md`](../docs/README.md)。

## 模式一览

### 创建型（Creational）

| 模式 | 目录 | 一句话说明 |
|------|------|-----------|
| Abstract Factory 抽象工厂 | [`abstract-factory/`](abstract-factory) | 为 Windows / macOS 生产成套的 Button + Checkbox |
| Builder 建造者 | [`builder/`](builder) | 分步组装 Computer，Director 提供办公/游戏预设配置 |
| Factory Method 工厂方法 | [`factory-method/`](factory-method) | 由 Logistics 具体实现决定使用 Truck 还是 Ship 运输 |
| Prototype 原型 | [`prototype/`](prototype) | 克隆 Circle/Rectangle，复制颜色、位置等属性 |
| Singleton 单例 | [`singleton/`](singleton) | 全局 Logger，`sync.Once` 保证懒加载且并发安全 |

### 结构型（Structural）

| 模式 | 目录 | 一句话说明 |
|------|------|-----------|
| Adapter 适配器 | [`adapter/`](adapter) | 把第三方 StripePayment(分) 适配为统一的 PaymentProcessor.Pay(元) |
| Bridge 桥接 | [`bridge/`](bridge) | 抽象 RemoteControl × 实现 Device（TV/Radio），两维度独立变化 |
| Composite 组合 | [`composite/`](composite) | 文件系统：File 与 Directory 统一计算总大小、打印树 |
| Decorator 装饰器 | [`decorator/`](decorator) | 在 Espresso 上动态叠加 Milk/Sugar，计算价格与描述 |
| Facade 外观 | [`facade/`](facade) | HomeTheaterFacade 一键 WatchMovie，协调投影仪/功放/灯光/播放器 |
| Flyweight 享元 | [`flyweight/`](flyweight) | 森林中大量 Tree 共享 TreeType（名称/颜色/纹理）内在状态 |
| Proxy 代理 | [`proxy/`](proxy) | ImageProxy 懒加载，首次 Display() 才创建 RealImage |

### 行为型（Behavioral）

| 模式 | 目录 | 一句话说明 |
|------|------|-----------|
| Chain of Responsibility 责任链 | [`chain-of-responsibility/`](chain-of-responsibility) | 采购审批：Manager→Director→CEO 按金额上限逐级审批 |
| Command 命令 | [`command/`](command) | 遥控器：LightOn/LightOff 命令，支持 Undo |
| Interpreter 解释器 | [`interpreter/`](interpreter) | 解析并求值 `5 + 3 - 2`，支持数字、加减与上下文变量 |
| Iterator 迭代器 | [`iterator/`](iterator) | 自定义 BookCollection，提供迭代器顺序遍历 |
| Mediator 中介者 | [`mediator/`](mediator) | 聊天室：User 通过 ChatRoom 中介收发消息，彼此解耦 |
| Memento 备忘录 | [`memento/`](memento) | 文本编辑器：保存快照并 Undo 恢复内容 |
| Observer 观察者 | [`observer/`](observer) | WeatherStation 通知多个 Display 更新温度 |
| State 状态 | [`state/`](state) | 音频播放器：Playing/Paused/Stopped 状态下行为各异 |
| Strategy 策略 | [`strategy/`](strategy) | 支付：信用卡/PayPal/加密货币可互换的支付策略（函数值实现） |
| Template Method 模板方法 | [`template-method/`](template-method) | 冲泡饮料：固定流程骨架，Tea/Coffee 实现各步骤 |
| Visitor 访问者 | [`visitor/`](visitor) | 对 Circle/Rectangle 施加 AreaVisitor（求面积）/ DrawVisitor（渲染） |

## 统一运行方式

本目录是一个独立的 Go module（`go.mod`：`module gof`，`go 1.21`），覆盖全部 23 个子目录。
每个模式子目录都是一个独立的 `package main`，进入对应目录后直接运行：

```bash
cd go/<pattern>          # 例如 cd go/observer
go run .
```

也可以在 `go/` 根目录一次性检查所有子包是否能编译：

```bash
cd go
go build ./...
```

## 目录结构

```
go/
├── go.mod                        # module gof, go 1.21，覆盖全部子目录
├── README.md                     # 本文件（Go 语言索引）
└── <pattern>/                    # 每个模式一个子目录，目录名统一用小写短横线
    ├── main.go                   # package main，可直接 go run . 运行
    └── README.md                 # 该模式的中文说明（意图/场景/实现/运行/要点）
```

## Go 实现约定

- **小接口 + 组合优于继承**：模式中的"抽象角色"一律用接口表达；需要复用基础实现时，
  用 struct 嵌入（如 `chain-of-responsibility` 的 `baseApprover`、`bridge` 的
  `AdvancedRemoteControl` 嵌入 `RemoteControl`），而非模拟 Java 式继承。
- **函数值/闭包作策略**：`strategy` 直接用 `type PaymentStrategy func(float64) string`
  代替"策略接口 + 多个实现类"。
- **error 返回值**：`builder`、`adapter`、`interpreter`、`memento` 中对"可预期的失败"
  （校验失败、非法输入、历史为空）返回 `error`，而不是 panic。
- **iota 枚举**：`singleton` 中的 `LogLevel` 用 `iota` 定义。
- **仅标准库**：全部 23 个实现均不引入第三方依赖，只使用 `fmt`/`errors`/`sync`/
  `strings`/`strconv`/`math` 等标准库包。

## 阅读建议

1. 每个模式目录下的 README 按「意图 / 适用场景 / 实现方式 / 文件说明 / 编译与运行 /
   输出示例 / 要点」统一结构撰写，可独立阅读。
2. 建议对照 `python/`、`rust/`、`ts/` 等其它语言目录（如已实现）横向比较同一模式在
   不同类型系统下的表达差异，例如策略模式：Go 用函数值、Java 用接口、Rust 用 trait 对象。
