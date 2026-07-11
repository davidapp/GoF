# GoF 设计模式 — Objective-C 实现

用 Objective-C（Foundation + ARC）实现全部 23 个 GoF 设计模式。每个模式一个独立子目录，
包含头文件（`@interface`/`@protocol`）、实现文件（`@implementation`）、可运行的 `main.m` 示例，
以及一份中文 README。所有模式使用统一的场景，方便与仓库中其他语言的实现横向对比。

## 统一运行方式

每个模式目录下都有一个 Makefile：

```bash
cd <pattern>/
make run    # 编译并运行
make        # 仅编译
make clean  # 清理产物
```

Makefile 内容基本一致：`clang -fobjc-arc -framework Foundation`，自动编译目录内全部 `.m` 文件。

> 说明：本机未安装 clang / Foundation 工具链，未实机编译运行；各模式 README 中的"输出示例"
> 均为根据代码逻辑推导的预期输出。

## 创建型（Creational）— 关注对象的创建机制

| 模式 | 中文名 | 一句话意图 | 示例场景 |
|------|--------|-----------|----------|
| [Abstract Factory](abstract-factory) | 抽象工厂 | 创建一系列相关对象，无需指定具体类 | 跨平台 GUI：Windows/macOS 成套的 Button + Checkbox |
| [Builder](builder) | 建造者 | 分步构造复杂对象，同一过程可产生不同表示 | 分步组装 Computer（CPU/内存/存储/GPU） |
| [Factory Method](factory-method) | 工厂方法 | 由子类决定实例化哪个类 | 物流：Logistics 子类决定用 Truck 还是 Ship |
| [Prototype](prototype) | 原型 | 通过克隆现有对象来创建新对象 | 用 `NSCopying` 克隆 Shape（Circle/Rectangle） |
| [Singleton](singleton) | 单例 | 保证一个类只有一个实例并提供全局访问点 | 全局 Logger（可带日志级别） |

## 结构型（Structural）— 关注类与对象的组合

| 模式 | 中文名 | 一句话意图 | 示例场景 |
|------|--------|-----------|----------|
| [Adapter](adapter) | 适配器 | 把一个接口转换成客户端期望的另一个接口 | 适配第三方 `StripePayment`(分) 到 `PaymentProcessor`(元) |
| [Bridge](bridge) | 桥接 | 将抽象与实现分离，使二者独立变化 | RemoteControl（basic/advanced）× Device（TV/Radio） |
| [Composite](composite) | 组合 | 将对象组合成树形结构，统一对待整体与部分 | 文件系统：File 与 Directory 统一计算大小/打印树 |
| [Decorator](decorator) | 装饰器 | 动态地为对象添加职责 | 咖啡：在 Espresso 上叠加 Milk/Sugar，计算价格与描述 |
| [Facade](facade) | 外观 | 为子系统提供统一的高层接口 | HomeTheaterFacade 一键 `watchMovie:` |
| [Flyweight](flyweight) | 享元 | 共享细粒度对象以节省内存 | 森林：大量 Tree 共享 TreeType（名称/颜色/纹理） |
| [Proxy](proxy) | 代理 | 为对象提供一个替身以控制访问 | 图片懒加载：ImageProxy 延迟到 `display` 才加载 RealImage |

## 行为型（Behavioral）— 关注对象间的职责分配与通信

| 模式 | 中文名 | 一句话意图 | 示例场景 |
|------|--------|-----------|----------|
| [Chain of Responsibility](chain-of-responsibility) | 责任链 | 让多个对象都有机会处理请求 | 采购审批：Manager→Director→CEO 按金额上限逐级审批 |
| [Command](command) | 命令 | 将请求封装为对象，支持撤销与排队 | 遥控器：LightOn/LightOff 命令，支持 undo |
| [Interpreter](interpreter) | 解释器 | 为语言定义文法并解释句子 | 解析并求值算术表达式 `5 + 3 - 2`（含变量上下文） |
| [Iterator](iterator) | 迭代器 | 顺序访问聚合元素而不暴露内部结构 | 自定义 BookCollection 提供迭代器顺序遍历 |
| [Mediator](mediator) | 中介者 | 用中介对象封装对象间的交互 | 聊天室：User 通过 ChatRoom 中介收发消息 |
| [Memento](memento) | 备忘录 | 捕获并恢复对象的内部状态 | 文本编辑器：保存快照并 undo 恢复内容 |
| [Observer](observer) | 观察者 | 一对多依赖，状态变化时自动通知 | 气象站 WeatherStation 通知多个 Display 更新温度 |
| [State](state) | 状态 | 状态改变时切换对象的行为 | 音频播放器：Playing/Paused/Stopped 行为不同 |
| [Strategy](strategy) | 策略 | 封装可互换的算法族 | 支付：CreditCard/PayPal/Crypto 可互换的支付策略 |
| [Template Method](template-method) | 模板方法 | 在父类定义算法骨架，子类实现步骤 | 冲泡饮料：Beverage 定义骨架，Tea/Coffee 实现步骤 |
| [Visitor](visitor) | 访问者 | 在不改变元素类的前提下定义新操作 | 对 Circle/Rectangle 施加 AreaVisitor / DrawVisitor |

## 目录结构

```
objc/
├── README.md                  # 本文件：语言级索引
└── <pattern>/                 # 每个模式一个子目录
    ├── README.md               # 该模式的中文说明（意图/场景/实现/文件/运行/输出/要点）
    ├── <PatternName>.h          # 接口声明：@protocol / @interface
    ├── <PatternName>.m          # 实现：@implementation
    ├── main.m                   # 可运行示例入口（@autoreleasepool）
    └── Makefile                 # make / make run / make clean
```

## Objective-C 实现约定

1. **ARC** —— 全部开启 Automatic Reference Counting（`-fobjc-arc`），不手写 `retain`/`release`。
2. **协议优先** —— ObjC 没有强制的抽象类/接口机制，"抽象产品"“抽象策略"“抽象访问者"等角色统一用 `@protocol` 表达（如 `Observer`、`PaymentStrategy`、`Command`）。
3. **属性与惯用初始化** —— 用 `@property` 暴露状态，`- (instancetype)initWith...` 作为惯用初始化器；懒加载、只读属性、`copy`/`strong`/`weak` 等内存语义在各模式中按需选用（如 Mediator 中 `User` 用 `__weak` 持有中介者避免循环引用）。
4. **只依赖 Foundation** —— 不引入任何第三方库；用到的 GCD（`dispatch_once`，见 Singleton/Flyweight）、Blocks 等都属于 Foundation/Objective-C 运行时的标准能力。
5. **中文注释标注模式角色** —— 关键类型/方法上方用注释标出"抽象产品"“具体策略"“模板方法"等角色名，便于对照 GoF 原始定义阅读。

## 语法自检说明

由于本机未安装 clang / Foundation 工具链，全部代码未经实机编译，但已逐文件人工核对：

- `@interface` / `@implementation` / `@protocol` 是否成对、`@end` 是否齐全；
- 方法声明 `- (returnType)name:(paramType)param;` 与调用处方括号消息语法是否匹配；
- `@property` 的内存语义（`copy`/`strong`/`weak`/`assign`/`readonly`）与手写 getter/setter（如自定义 `getter=isOn`）是否一致；
- 协议一致性：类声明 `<ProtocolName>` 后是否实现了协议要求的全部方法；
- `NSLog` 格式化占位符（`%@`/`%.1f`/`%ld` 及其参数强转）是否匹配实参类型；
- 每个 `.m` 是否 `#import` 了对应 `.h`，`main.m` 是否 `#import <Foundation/Foundation.h>`。

如在真实 macOS/Xcode 命令行工具环境中发现编译问题，欢迎对照以上清单排查。
