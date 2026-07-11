# GoF 设计模式 · Java 实现

用 Java 17+ 实现全部 23 个 GoF 设计模式，每个模式一个独立子目录，
包含可直接编译运行的示例与中文说明文档。

## 统一约定

- **默认包**：所有源文件都不写 `package` 语句，方便在每个模式目录内直接编译运行。
- **文件命名**：每个 `public` 类/接口/记录单独一个文件，文件名与类名一致；
  入口统一是 `Main.java`（`public static void main(String[] args)`）。
- **语言特性**：按需使用 Java 17 的 `record`、`switch` 表达式、`var`、文本块、
  模式匹配 `instanceof` 等特性。
- **零外部依赖**：只使用标准库（`java.util`、`java.time` 等）。
- 关键处均有中文注释标注模式角色（如“// 抽象工厂”“// 具体策略”）。

## 统一运行方式

每个模式目录都可以独立编译运行：

```bash
cd java/<pattern>
javac *.java
java Main
```

> 说明：本仓库编写时本机未安装 JDK，未做实机编译验证；各模式 README 中的“输出示例”
> 均为根据代码逻辑推导的预期输出。如发现问题欢迎提 Issue / PR 修正。
>
> 编码提示：源文件均为 UTF-8 编码且含中文注释/字符串。Java 18+（JEP 400）默认按 UTF-8
> 读取源文件，可直接使用上面的命令；若使用 Java 17 且系统默认编码不是 UTF-8
> （常见于中文以外语言区域的 Windows），`javac` 可能报 “未映射字符” 之类的编码错误，
> 此时改用 `javac -encoding UTF-8 *.java` 即可。

## 模式索引

### 创建型（Creational）—— 关注对象的创建机制

| 模式 | 目录 | 一句话意图 | 示例场景 |
|------|------|-----------|----------|
| Abstract Factory 抽象工厂 | [`abstract-factory`](abstract-factory) | 创建一系列相关对象，无需指定具体类 | 跨平台 GUI：Windows/macOS 成套的 Button + Checkbox |
| Builder 建造者 | [`builder`](builder) | 分步构造复杂对象，同一过程可产生不同表示 | 分步组装 Computer（CPU/内存/存储/GPU） |
| Factory Method 工厂方法 | [`factory-method`](factory-method) | 由子类决定实例化哪个类 | 物流：Logistics 子类决定用 Truck 还是 Ship |
| Prototype 原型 | [`prototype`](prototype) | 通过克隆现有对象来创建新对象 | 克隆 Shape（Circle/Rectangle）及其属性 |
| Singleton 单例 | [`singleton`](singleton) | 保证一个类只有一个实例并提供全局访问点 | 全局 Logger，多处获取为同一实例 |

### 结构型（Structural）—— 关注类与对象的组合

| 模式 | 目录 | 一句话意图 | 示例场景 |
|------|------|-----------|----------|
| Adapter 适配器 | [`adapter`](adapter) | 把一个接口转换成客户端期望的另一个接口 | 把第三方 StripePayment 适配到统一的 PaymentProcessor |
| Bridge 桥接 | [`bridge`](bridge) | 将抽象与实现分离，使二者独立变化 | RemoteControl（basic/advanced）× Device（TV/Radio） |
| Composite 组合 | [`composite`](composite) | 将对象组合成树形结构，统一对待整体与部分 | 文件系统：File 与 Directory 统一计算大小 / 打印树 |
| Decorator 装饰器 | [`decorator`](decorator) | 动态地为对象添加职责 | 在 Espresso 上叠加 Milk/Sugar，计算价格与描述 |
| Facade 外观 | [`facade`](facade) | 为子系统提供统一的高层接口 | HomeTheaterFacade 一键 watchMovie() |
| Flyweight 享元 | [`flyweight`](flyweight) | 共享细粒度对象以节省内存 | 森林中大量 Tree 共享 TreeType |
| Proxy 代理 | [`proxy`](proxy) | 为对象提供一个替身以控制访问 | ImageProxy 懒加载，首次 display() 才加载 RealImage |

### 行为型（Behavioral）—— 关注对象间的职责分配与通信

| 模式 | 目录 | 一句话意图 | 示例场景 |
|------|------|-----------|----------|
| Chain of Responsibility 责任链 | [`chain-of-responsibility`](chain-of-responsibility) | 让多个对象都有机会处理请求 | 采购审批：Manager→Director→CEO 按金额上限逐级审批 |
| Command 命令 | [`command`](command) | 将请求封装为对象，支持撤销与排队 | 遥控器：LightOn/LightOff 命令，支持 undo |
| Interpreter 解释器 | [`interpreter`](interpreter) | 为语言定义文法并解释句子 | 解析并求值算术表达式 `5 + 3 - 2` |
| Iterator 迭代器 | [`iterator`](iterator) | 顺序访问聚合元素而不暴露内部结构 | 自定义 BookCollection 提供迭代器遍历 |
| Mediator 中介者 | [`mediator`](mediator) | 用中介对象封装对象间的交互 | 聊天室：User 通过 ChatRoom 中介收发消息 |
| Memento 备忘录 | [`memento`](memento) | 捕获并恢复对象的内部状态 | 文本编辑器保存快照并 undo 恢复内容 |
| Observer 观察者 | [`observer`](observer) | 一对多依赖，状态变化时自动通知 | WeatherStation 通知多个 Display 更新温度 |
| State 状态 | [`state`](state) | 状态改变时切换对象的行为 | 音频播放器 Playing/Paused/Stopped 行为各异 |
| Strategy 策略 | [`strategy`](strategy) | 封装可互换的算法族 | 支付：CreditCard/PayPal/Crypto 可互换策略 |
| Template Method 模板方法 | [`template-method`](template-method) | 在父类定义算法骨架，子类实现步骤 | 冲泡饮料：Beverage 定义骨架，Tea/Coffee 实现步骤 |
| Visitor 访问者 | [`visitor`](visitor) | 在不改变元素类的前提下定义新操作 | 对 Circle/Rectangle 施加 AreaVisitor / DrawVisitor |

## 目录结构

```
java/
├── README.md                        # 本文件：Java 模式索引
├── abstract-factory/
│   ├── README.md                    # 该模式的中文说明
│   └── *.java                       # 可独立编译运行的示例
├── builder/
├── factory-method/
├── prototype/
├── singleton/
├── adapter/
├── bridge/
├── composite/
├── decorator/
├── facade/
├── flyweight/
├── proxy/
├── chain-of-responsibility/
├── command/
├── interpreter/
├── iterator/
├── mediator/
├── memento/
├── observer/
├── state/
├── strategy/
├── template-method/
└── visitor/
```
