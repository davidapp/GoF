# TypeScript GoF 设计模式实现

用 TypeScript 实现 GoF 23 个经典设计模式。每个模式一个独立子目录，
入口统一为 `main.ts`，可独立运行；每个目录下都有一份中文 README 说明
该模式的意图、适用场景、实现方式与运行输出。

每个模式 README 在「意图」之后都有一张形象架构图；23 张图的图鉴见 [`../docs/README.md`](../docs/README.md)。

## 模式索引

### 创建型（Creational）— 关注对象的创建机制

| 模式 | 一句话说明 |
|------|-----------|
| [Abstract Factory 抽象工厂](abstract-factory) | 跨平台 GUI：为 Windows / macOS 生产成套的 Button + Checkbox |
| [Builder 建造者](builder) | 分步组装 Computer（CPU/内存/存储/GPU），Director 提供预设配置 |
| [Factory Method 工厂方法](factory-method) | 物流：Logistics 子类决定用 Truck 还是 Ship 运输 |
| [Prototype 原型](prototype) | 克隆 Shape（Circle/Rectangle），复制其颜色、位置等属性 |
| [Singleton 单例](singleton) | 全局 Logger（带日志级别过滤），多处获取始终为同一实例 |

### 结构型（Structural）— 关注类与对象的组合

| 模式 | 一句话说明 |
|------|-----------|
| [Adapter 适配器](adapter) | 把第三方 `StripePayment`(分) 适配到统一的 `PaymentProcessor.pay`(元) |
| [Bridge 桥接](bridge) | 抽象 RemoteControl（basic/advanced）× 实现 Device（TV/Radio），两维度独立变化 |
| [Composite 组合](composite) | 文件系统：File 与 Directory 统一计算总大小 / 打印树 |
| [Decorator 装饰器](decorator) | 咖啡：在 Espresso 上动态叠加 Milk/Sugar，计算价格与描述 |
| [Facade 外观](facade) | HomeTheaterFacade 一键 watchMovie()，内部协调投影仪/功放/灯光/播放器 |
| [Flyweight 享元](flyweight) | 森林：大量 Tree 共享 TreeType（名称/颜色/纹理）内在状态 |
| [Proxy 代理](proxy) | 图片懒加载：ImageProxy 延迟到首次 display() 才加载 RealImage |

### 行为型（Behavioral）— 关注对象间的职责分配与通信

| 模式 | 一句话说明 |
|------|-----------|
| [Chain of Responsibility 责任链](chain-of-responsibility) | 采购审批：Manager → Director → CEO 按金额上限逐级审批 |
| [Command 命令](command) | 遥控器：LightOn/LightOff 命令，支持 undo |
| [Interpreter 解释器](interpreter) | 算术表达式：解析并求值 `5 + 3 - 2`（数字、加、减，带上下文变量） |
| [Iterator 迭代器](iterator) | 自定义 BookCollection，提供迭代器顺序遍历 |
| [Mediator 中介者](mediator) | 聊天室：User 通过 ChatRoom 中介收发消息，彼此解耦 |
| [Memento 备忘录](memento) | 文本编辑器：保存快照并 undo 恢复内容 |
| [Observer 观察者](observer) | 气象站 WeatherStation 通知多个 Display 更新温度 |
| [State 状态](state) | 音频播放器：Playing/Paused/Stopped 状态下 play/pause/stop 行为不同 |
| [Strategy 策略](strategy) | 支付：CreditCard/PayPal/Crypto 可互换的支付策略 |
| [Template Method 模板方法](template-method) | 冲泡饮料：Beverage 定义骨架，Tea/Coffee 实现各步骤 |
| [Visitor 访问者](visitor) | 图形：对 Circle/Rectangle 施加 AreaVisitor（求面积）/ DrawVisitor（渲染） |

## 统一运行方式

每个模式目录下的 `main.ts` 都是独立可运行的入口，无需额外构建步骤：

```bash
cd ts/<pattern-name>   # 例如 cd ts/observer
npx tsx main.ts
```

首次运行 `npx tsx` 会自动下载 [tsx](https://github.com/privatenumber/tsx)（基于 esbuild 的 TS 运行器），
需要联网；之后会走本地 npx 缓存，无需重复下载。

所有示例均已在本机通过 `npx tsx main.ts` 逐一验证运行，并额外用
`tsc --noEmit --strict`（含 `noUnusedLocals`/`noUnusedParameters`）做过严格类型检查。

## 代码风格约定

- **严格类型**：显式标注参数/返回值类型，避免 `any`；善用 `interface`、泛型、抽象类、
  联合类型与枚举来表达角色关系。
- **中文注释**：在类/接口声明处用注释标注其在模式中的角色，例如
  `// 抽象工厂`、`// 具体策略`、`// 备忘录`。
- **自包含**：仅使用 Node.js 标准能力（`console`、`Map`、`Symbol.iterator` 等），
  不引入任何第三方依赖。
- **贴近现实的领域对象**：用 Logger、Coffee、Tree、WeatherStation 等具体业务场景，
  不用抽象的 Foo/Bar，方便直观理解每个模式解决的实际问题。
- **同一场景，横向对比**：所有语言实现使用同一套统一场景（见仓库根目录 README），
  便于对照 Go/Rust/Python/Java 等语言中同一模式的惯用写法差异。

## 目录结构

```
ts/
├── README.md                       # 本文件：TypeScript 模式索引
└── <pattern>/                      # 每个模式一个子目录
    ├── README.md                   # 该模式的中文说明（意图/场景/实现/运行/要点）
    └── main.ts                     # 可独立运行的示例入口
```
