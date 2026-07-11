# GoF 设计模式 · JavaScript 实现

用现代 JavaScript（ES 模块、`class`、私有字段 `#`、生成器、`Symbol.iterator` 等）实现 GoF
23 个经典设计模式。每个模式一个独立子目录，包含可直接运行的示例（`main.mjs`）和一份详细
的中文说明文档（`README.md`）。所有示例仅使用 Node.js 标准能力，不依赖任何第三方包。

## 模式一览

### 创建型（Creational）— 关注对象的创建机制

| 模式 | 中文名 | 一句话说明 |
|------|--------|-----------|
| [Abstract Factory](abstract-factory) | 抽象工厂 | 跨平台 GUI：为 Windows / macOS 生产成套匹配的 Button + Checkbox |
| [Builder](builder) | 建造者 | 分步组装 Computer（CPU/内存/存储/GPU），Director 提供游戏本/办公本预设配置 |
| [Factory Method](factory-method) | 工厂方法 | 物流系统中由 Logistics 子类决定使用 Truck 还是 Ship 运输 |
| [Prototype](prototype) | 原型 | 克隆 Shape（Circle/Rectangle），复制其颜色、位置等属性且互不影响 |
| [Singleton](singleton) | 单例 | 全局 Logger（带日志级别过滤），任意位置获取到的都是同一实例 |

### 结构型（Structural）— 关注类与对象的组合

| 模式 | 中文名 | 一句话说明 |
|------|--------|-----------|
| [Adapter](adapter) | 适配器 | 把第三方 `StripePayment`/`AliPaySDK` 适配到应用统一的 `PaymentProcessor.pay(yuan)` 接口 |
| [Bridge](bridge) | 桥接 | 抽象 RemoteControl（basic/advanced）与实现 Device（TV/Radio）两个维度独立变化 |
| [Composite](composite) | 组合 | 文件系统：File 与 Directory 统一计算总大小、打印树形结构 |
| [Decorator](decorator) | 装饰器 | 咖啡：在 Espresso 上动态叠加 Milk/Sugar/奶泡装饰，计算价格与描述 |
| [Facade](facade) | 外观 | HomeTheaterFacade 一键 `watchMovie()`，内部协调投影仪/功放/灯光/播放器 |
| [Flyweight](flyweight) | 享元 | 森林中大量 Tree 共享 TreeType（名称/颜色/纹理）的内在状态，节省内存 |
| [Proxy](proxy) | 代理 | 图片懒加载：ImageProxy 延迟到首次 `display()` 才真正加载 RealImage |

### 行为型（Behavioral）— 关注对象间的职责分配与通信

| 模式 | 中文名 | 一句话说明 |
|------|--------|-----------|
| [Chain of Responsibility](chain-of-responsibility) | 责任链 | 采购审批：Manager → Director → CEO 按金额上限逐级审批 |
| [Command](command) | 命令 | 遥控器：LightOn/LightOff 命令封装为对象，支持 undo |
| [Interpreter](interpreter) | 解释器 | 解析并求值算术表达式 `5 + 3 - 2`（数字、加减、上下文变量） |
| [Iterator](iterator) | 迭代器 | 自定义 BookCollection 实现 `Symbol.iterator`，配合 `for...of` 顺序遍历 |
| [Mediator](mediator) | 中介者 | 聊天室：User 通过 ChatRoom 中介收发私聊/群聊消息，彼此解耦 |
| [Memento](memento) | 备忘录 | 文本编辑器：保存内容快照，支持多级 undo 恢复 |
| [Observer](observer) | 观察者 | 气象站 WeatherStation 状态变化时自动通知多个 Display 更新 |
| [State](state) | 状态 | 音频播放器：Playing/Paused/Stopped 状态下 play/pause/stop 行为各不相同 |
| [Strategy](strategy) | 策略 | 支付：CreditCard/PayPal/Crypto 可在运行时互换的支付策略 |
| [Template Method](template-method) | 模板方法 | 冲泡饮料：Beverage 定义算法骨架，Tea/Coffee 实现各自步骤 |
| [Visitor](visitor) | 访问者 | 对 Circle/Rectangle/Triangle 施加 AreaVisitor（求面积）/DrawVisitor（渲染）等新操作 |

## 运行方式

每个模式目录下的示例都是独立可运行的 ES 模块入口 `main.mjs`，统一用 Node.js 直接执行
（本仓库验证环境为 Node 24，建议使用 Node 18+）：

```bash
cd <pattern-dir>   # 例如 cd observer
node main.mjs
```

也可以直接从仓库根目录带路径运行，无需 `cd`：

```bash
node js/observer/main.mjs
node js/strategy/main.mjs
```

## 目录结构

```
js/
├── README.md                        # 本文件：模式索引
└── <pattern>/                       # 每个模式一个子目录，目录名统一小写短横线
    ├── README.md                    # 该模式的中文说明（意图/场景/实现/运行/输出/要点）
    └── main.mjs                     # 可独立运行的 ES 模块示例
```

## 代码风格约定

- **ES 模块**：所有示例使用 `.mjs`，用 `import`/`export` 组织代码；若某个模式拆分了多个模
  块文件，模块间 `import` 一律带 `.mjs` 扩展名。
- **现代 JS 语法**：`class`、`#私有字段`、静态方法、`Symbol.iterator`、生成器
  (`function*`/`yield`)、闭包等惯用写法；JS 没有类型系统和接口关键字，抽象方法用“基类方
  法体内 `throw new Error(...)`”的约定来表达“子类必须实现”。
- **中文注释标注角色**：关键类/方法处用中文注释标出其在模式中的角色，例如
  `// 抽象工厂`、`// 具体策略`、`// 双重分派`，便于对照 GoF 术语理解代码。
- **贴近现实的领域对象**：全部示例使用 Logger、Coffee、Tree、ChatRoom 等具体业务场景，不
  使用 Foo/Bar 这类抽象占位名称，且与仓库内其他语言实现共享同一套场景，便于跨语言对比。
- **自包含**：仅使用 Node.js 标准能力，不引入任何第三方依赖（`package.json` 均未使用）。

## 阅读建议

1. 先看 `README.md` 里的“意图”和“适用场景”，理解这个模式要解决什么问题。
2. 对照“实现方式”里的关键代码片段，再打开 `main.mjs` 看完整实现和执行流程。
3. 运行 `node main.mjs` 观察真实输出（与 README 中“输出示例”一致），必要时修改代码、重新
   运行，观察行为变化，加深理解。
4. 有余力时可对照仓库内其他语言目录（如 `ts/`、`python/`、`go/`）的同名模式实现，体会同一
   模式在不同语言范式下的惯用表达差异（例如策略模式：JS 可以用普通函数当策略，Go 用函数
   值，Rust 用 trait 对象）。
