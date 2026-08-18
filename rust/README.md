# GoF 设计模式 — Rust 实现

本目录用 Rust 实现全部 23 个 GoF 设计模式。每个模式一个独立子目录，包含一个自包含的
`main.rs`（含 `fn main()`）和一份中文 `README.md`，除标准库外不引入任何外部依赖。

每个模式 README 在「意图」之后都有一张形象架构图；23 张图的图鉴见 [`../docs/README.md`](../docs/README.md)。

## 统一运行方式

每个模式目录下直接用 `rustc` 编译单文件即可运行：

```bash
cd <pattern-dir>
rustc main.rs && ./main       # Linux / macOS
rustc main.rs && .\main.exe   # Windows
```

## 创建型（Creational）

| 模式 | 目录 | 一句话说明 |
|------|------|-----------|
| Abstract Factory 抽象工厂 | [`abstract-factory/`](./abstract-factory) | 一次性生产一整套配套的跨平台 GUI 控件（Windows / macOS 的 Button + Checkbox） |
| Builder 建造者 | [`builder/`](./builder) | 用消费型建造者分步组装 Computer，Director 提供游戏本/办公本等预设配置 |
| Factory Method 工厂方法 | [`factory-method/`](./factory-method) | 陆路/海路物流公司各自决定用卡车还是轮船运输 |
| Prototype 原型 | [`prototype/`](./prototype) | 通过 `clone_box` 技巧克隆 `Box<dyn Shape>`，复制 Circle/Rectangle 的颜色、位置等状态 |
| Singleton 单例 | [`singleton/`](./singleton) | 用 `OnceLock<Mutex<Logger>>` 实现全局唯一、带日志级别过滤的 Logger |

## 结构型（Structural）

| 模式 | 目录 | 一句话说明 |
|------|------|-----------|
| Adapter 适配器 | [`adapter/`](./adapter) | 把第三方 `StripePayment`（以分为单位）适配成统一的 `PaymentProcessor::pay(yuan)` 接口 |
| Bridge 桥接 | [`bridge/`](./bridge) | 遥控器（基础/高级）与设备（电视/收音机）两个维度通过组合独立变化 |
| Composite 组合 | [`composite/`](./composite) | File 与 Directory 实现同一接口，统一计算文件系统总大小、打印目录树 |
| Decorator 装饰器 | [`decorator/`](./decorator) | 在 Espresso 上按任意顺序叠加牛奶/糖/奶油装饰，动态计算价格与描述 |
| Facade 外观 | [`facade/`](./facade) | `HomeTheaterFacade` 一键 `watch_movie()`，内部协调投影仪/功放/灯光/播放器 |
| Flyweight 享元 | [`flyweight/`](./flyweight) | 森林里大量 Tree 通过 `Rc<TreeType>` 共享名称/颜色/纹理等内在状态 |
| Proxy 代理 | [`proxy/`](./proxy) | `ImageProxy` 懒加载，直到第一次 `display()` 才真正创建开销较大的 `RealImage` |

## 行为型（Behavioral）

| 模式 | 目录 | 一句话说明 |
|------|------|-----------|
| Chain of Responsibility 责任链 | [`chain-of-responsibility/`](./chain-of-responsibility) | 采购申请沿经理 -> 总监 -> CEO 链条按金额上限逐级审批 |
| Command 命令 | [`command/`](./command) | 遥控器把开灯/关灯封装成命令对象，通过历史栈支持撤销（undo） |
| Interpreter 解释器 | [`interpreter/`](./interpreter) | 把 `"5 + 3 - 2"` 解析成 AST 并求值，支持数字、变量与加减法 |
| Iterator 迭代器 | [`iterator/`](./iterator) | 为 `BookCollection` 实现标准 `Iterator` trait，顺序遍历并复用 `filter`/`count` 等适配器 |
| Mediator 中介者 | [`mediator/`](./mediator) | 聊天室作为中介转发消息，User 之间用 `Rc`/`Weak` 避免引用循环 |
| Memento 备忘录 | [`memento/`](./memento) | 文本编辑器保存内容快照，History 管理历史记录以支持 undo |
| Observer 观察者 | [`observer/`](./observer) | 气象站状态变化时，通过 `Rc<RefCell<dyn Observer>>` 通知多个显示屏更新 |
| State 状态 | [`state/`](./state) | 音频播放器在播放中/暂停/停止状态下，`play`/`pause`/`stop` 表现出不同行为 |
| Strategy 策略 | [`strategy/`](./strategy) | 购物车结账时可在信用卡/PayPal/加密货币等可互换的支付策略间自由切换 |
| Template Method 模板方法 | [`template-method/`](./template-method) | `Beverage` trait 用默认方法定义冲泡骨架，Tea/Coffee/BlackCoffee 实现各步骤与钩子 |
| Visitor 访问者 | [`visitor/`](./visitor) | 对 Circle/Rectangle 施加 `AreaVisitor`（求面积）/`DrawVisitor`（渲染）等可扩展操作 |

## Rust 实现的整体约定

- 每个模式目录都是一个独立的、可直接 `rustc` 编译的单文件程序，不依赖 Cargo 或任何 crate。
- 优先使用惯用 Rust 写法：trait + `Box<dyn Trait>` 或泛型约束表达多态、`enum` + `match`
  表达封闭的状态集合、`Option`/`Result` 表达可能缺失的值、消费型建造者/构建器实现链式调用。
- 只有在确实需要“多个所有者共享同一份可变状态”时（观察者的显示屏、中介者的聊天室、
  命令模式共享同一个接收者），才引入 `Rc<RefCell<T>>`；出现双向引用时（如中介者）
  用 `Weak` 打破引用循环，避免内存泄漏。
- 全程不使用 `unsafe`；trait 对象需要克隆时使用标准的 `clone_box` 技巧
  （见 `prototype/`），而不是绕开借用检查器。
- 关键代码处用中文注释标注模式角色（如“// 抽象产品”“// 具体策略”），便于跨语言对比阅读。

## 关于“未实机运行”的说明

本机未安装 Rust 工具链，以上 23 个实现均未通过 `rustc`/`cargo` 实际编译验证；
每个模式的 README 中「输出示例」为根据代码逻辑手工推演的预期输出，并在文中明确标注。
review 时请重点关注：所有权与借用（尤其是共享可变状态相关的 singleton / command /
mediator / observer / state 几个模式）、trait 对象的对象安全性、`match` 的穷尽性。
