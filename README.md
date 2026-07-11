# GoF 设计模式 · 多语言实现

用 **9 种编程语言** 分别实现经典的 Gang of Four（GoF）23 个设计模式。
每个模式都配有可独立运行的示例和中文说明文档，方便对照学习不同语言的惯用表达。

## 模式一览

按 GoF 的三大分类组织。每个链接指向对应模式的目录（以 C++ 为例，其余语言目录结构一致）。

### 创建型（Creational）— 关注对象的创建机制

| 模式 | 中文名 | 一句话意图 | 示例场景 |
|------|--------|-----------|----------|
| [Abstract Factory](cpp/abstract-factory) | 抽象工厂 | 创建一系列相关对象，无需指定具体类 | 跨平台 GUI 控件族 |
| [Builder](cpp/builder) | 建造者 | 分步构造复杂对象，同一过程可产生不同表示 | 组装计算机配置 |
| [Factory Method](cpp/factory-method) | 工厂方法 | 由子类决定实例化哪个类 | 物流运输方式 |
| [Prototype](cpp/prototype) | 原型 | 通过克隆现有对象来创建新对象 | 复制图形对象 |
| [Singleton](cpp/singleton) | 单例 | 保证一个类只有一个实例并提供全局访问点 | 全局日志器 |

### 结构型（Structural）— 关注类与对象的组合

| 模式 | 中文名 | 一句话意图 | 示例场景 |
|------|--------|-----------|----------|
| [Adapter](cpp/adapter) | 适配器 | 把一个接口转换成客户端期望的另一个接口 | 适配第三方支付 SDK |
| [Bridge](cpp/bridge) | 桥接 | 将抽象与实现分离，使二者独立变化 | 遥控器与设备 |
| [Composite](cpp/composite) | 组合 | 将对象组合成树形结构，统一对待整体与部分 | 文件系统树 |
| [Decorator](cpp/decorator) | 装饰器 | 动态地为对象添加职责 | 咖啡加料计价 |
| [Facade](cpp/facade) | 外观 | 为子系统提供统一的高层接口 | 一键启动家庭影院 |
| [Flyweight](cpp/flyweight) | 享元 | 共享细粒度对象以节省内存 | 森林中的大量树木 |
| [Proxy](cpp/proxy) | 代理 | 为对象提供一个替身以控制访问 | 图片懒加载 |

### 行为型（Behavioral）— 关注对象间的职责分配与通信

| 模式 | 中文名 | 一句话意图 | 示例场景 |
|------|--------|-----------|----------|
| [Chain of Responsibility](cpp/chain-of-responsibility) | 责任链 | 让多个对象都有机会处理请求 | 采购审批链 |
| [Command](cpp/command) | 命令 | 将请求封装为对象，支持撤销与排队 | 遥控器与撤销 |
| [Interpreter](cpp/interpreter) | 解释器 | 为语言定义文法并解释句子 | 算术表达式求值 |
| [Iterator](cpp/iterator) | 迭代器 | 顺序访问聚合元素而不暴露内部结构 | 遍历自定义集合 |
| [Mediator](cpp/mediator) | 中介者 | 用中介对象封装对象间的交互 | 聊天室 |
| [Memento](cpp/memento) | 备忘录 | 捕获并恢复对象的内部状态 | 文本编辑器撤销 |
| [Observer](cpp/observer) | 观察者 | 一对多依赖，状态变化时自动通知 | 气象站与显示板 |
| [State](cpp/state) | 状态 | 状态改变时切换对象的行为 | 播放器状态机 |
| [Strategy](cpp/strategy) | 策略 | 封装可互换的算法族 | 多种支付方式 |
| [Template Method](cpp/template-method) | 模板方法 | 在父类定义算法骨架，子类实现步骤 | 冲泡饮料流程 |
| [Visitor](cpp/visitor) | 访问者 | 在不改变元素类的前提下定义新操作 | 对图形执行不同操作 |

## 语言与运行方式

| 语言 | 目录 | 运行方式 | 备注 |
|------|------|----------|------|
| C++ | [`cpp/`](cpp) | `make run`（或 `g++ -std=c++17 *.cpp && ./a.out`） | C++17，头文件 + 实现分离 |
| Go | [`go/`](go) | `go run .` | 每个模式独立 `package main` |
| Java | [`java/`](java) | `javac *.java && java Main` | Java 17+，默认包 |
| JavaScript | [`js/`](js) | `node main.mjs` | ES 模块 |
| Objective-C | [`objc/`](objc) | `make run`（`clang -framework Foundation`） | 依赖 Foundation |
| Python | [`python/`](python) | `python3 main.py` | Python 3.10+，带类型注解 |
| Rust | [`rust/`](rust) | `rustc main.rs && ./main` | 惯用 trait/枚举风格 |
| Swift | [`swift/`](swift) | `swift main.swift` | Swift 5.9+ |
| TypeScript | [`ts/`](ts) | `npx tsx main.ts` | 严格模式 |

## 目录结构

```
GoF/
├── README.md              # 本文件
├── cpp/  go/  java/  js/  objc/  python/  rust/  swift/  ts/
│   ├── README.md          # 该语言的模式索引
│   └── <pattern>/         # 每个模式一个子目录
│       ├── README.md      # 该模式的中文说明（意图/场景/实现/运行/要点）
│       └── <源码文件>      # 可独立运行的示例
```

模式目录统一采用小写短横线命名：`abstract-factory`、`factory-method`、
`chain-of-responsibility`、`template-method`，其余为单词，如 `observer`、`proxy`。

## 阅读建议

1. 先看某个模式在你熟悉语言下的实现与 README，理解意图。
2. 再横向对比其他语言，体会同一模式在不同类型系统与范式下的表达差异
   （例如策略模式：Java 用接口、Go 用函数值、Rust 用 trait 对象、Python 用鸭子类型）。
3. 所有示例均自包含、可直接运行，鼓励动手修改并观察输出。
