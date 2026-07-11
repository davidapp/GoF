# GoF 设计模式 —— C++ 实现

用 **C++17** 实现 Gang of Four 全部 23 个经典设计模式。每个模式一个独立子目录，包含
`.h` 声明 + `.cpp` 实现 + `main.cpp` 可运行示例 + 独立 `Makefile` + 中文 `README.md`。

## 统一运行方式

每个模式目录下都有同样风格的 `Makefile`：

```bash
cd cpp/<pattern>
make        # 编译
make run    # 编译并运行
make clean  # 清理生成的可执行文件
```

若本机没有 `make`，也可以直接用 `g++` 编译运行（与 CI/自测方式一致）：

```bash
cd cpp/<pattern>
g++ -std=c++17 -Wall -Wextra *.cpp -o demo && ./demo
```

统一要求：C++17、`-Wall -Wextra` 下零警告、除标准库外不引入任何外部依赖。

## 模式索引

### 创建型（Creational）—— 关注对象的创建机制

| 模式 | 目录 | 一句话意图 | 示例场景 |
|------|------|-----------|----------|
| Abstract Factory 抽象工厂 | [`abstract-factory/`](abstract-factory) | 创建一系列相关对象，无需指定具体类 | 跨平台 GUI：为 Windows / macOS 生产成套的 Button + Checkbox |
| Builder 建造者 | [`builder/`](builder) | 分步构造复杂对象，同一过程可产生不同表示 | 分步组装 Computer（CPU/内存/存储/GPU），Director 提供预设配置 |
| Factory Method 工厂方法 | [`factory-method/`](factory-method) | 由子类决定实例化哪个类 | 物流：Logistics 子类决定用 Truck 还是 Ship 运输 |
| Prototype 原型 | [`prototype/`](prototype) | 通过克隆现有对象来创建新对象 | 克隆 Shape（Circle/Rectangle），复制其颜色、位置等属性 |
| Singleton 单例 | [`singleton/`](singleton) | 保证一个类只有一个实例并提供全局访问点 | 全局 Logger（可带日志级别），多处获取为同一实例 |

### 结构型（Structural）—— 关注类与对象的组合

| 模式 | 目录 | 一句话意图 | 示例场景 |
|------|------|-----------|----------|
| Adapter 适配器 | [`adapter/`](adapter) | 把一个接口转换成客户端期望的另一个接口 | 把第三方 `StripePayment`（分）适配到统一的 `PaymentProcessor.pay`（元）接口 |
| Bridge 桥接 | [`bridge/`](bridge) | 将抽象与实现分离，使二者独立变化 | 抽象 RemoteControl（basic/advanced）× 实现 Device（TV/Radio） |
| Composite 组合 | [`composite/`](composite) | 将对象组合成树形结构，统一对待整体与部分 | 文件系统：File 与 Directory 统一计算总大小 / 打印树 |
| Decorator 装饰器 | [`decorator/`](decorator) | 动态地为对象添加职责 | 咖啡：在 Espresso 上动态叠加 Milk/Sugar，计算价格与描述 |
| Facade 外观 | [`facade/`](facade) | 为子系统提供统一的高层接口 | HomeTheaterFacade 一键 watch_movie()，内部协调投影仪/功放/灯光/播放器 |
| Flyweight 享元 | [`flyweight/`](flyweight) | 共享细粒度对象以节省内存 | 森林：大量 Tree 共享 TreeType（名称/颜色/纹理）内在状态 |
| Proxy 代理 | [`proxy/`](proxy) | 为对象提供一个替身以控制访问 | 图片懒加载：ImageProxy 延迟到首次 display() 才加载 RealImage |

### 行为型（Behavioral）—— 关注对象间的职责分配与通信

| 模式 | 目录 | 一句话意图 | 示例场景 |
|------|------|-----------|----------|
| Chain of Responsibility 责任链 | [`chain-of-responsibility/`](chain-of-responsibility) | 让多个对象都有机会处理请求 | 采购审批：Manager→Director→CEO 按金额上限逐级审批 |
| Command 命令 | [`command/`](command) | 将请求封装为对象，支持撤销与排队 | 遥控器：LightOn/LightOff 命令，支持 undo |
| Interpreter 解释器 | [`interpreter/`](interpreter) | 为语言定义文法并解释句子 | 算术表达式：解析并求值 `5 + 3 - 2`（数字、加、减，带上下文变量） |
| Iterator 迭代器 | [`iterator/`](iterator) | 顺序访问聚合元素而不暴露内部结构 | 自定义 BookCollection，提供迭代器顺序遍历 |
| Mediator 中介者 | [`mediator/`](mediator) | 用中介对象封装对象间的交互 | 聊天室：User 通过 ChatRoom 中介收发消息，彼此解耦 |
| Memento 备忘录 | [`memento/`](memento) | 捕获并恢复对象的内部状态 | 文本编辑器：保存快照并 undo 恢复内容 |
| Observer 观察者 | [`observer/`](observer) | 一对多依赖，状态变化时自动通知 | 气象站 WeatherStation 通知多个 Display 更新温度 |
| State 状态 | [`state/`](state) | 状态改变时切换对象的行为 | 音频播放器：Playing/Paused/Stopped 状态下 play/pause/stop 行为不同 |
| Strategy 策略 | [`strategy/`](strategy) | 封装可互换的算法族 | 支付：CreditCard/PayPal/Crypto 可互换的支付策略 |
| Template Method 模板方法 | [`template-method/`](template-method) | 在父类定义算法骨架，子类实现步骤 | 冲泡饮料：Beverage 定义骨架，Tea/Coffee 实现各步骤 |
| Visitor 访问者 | [`visitor/`](visitor) | 在不改变元素类的前提下定义新操作 | 图形：对 Circle/Rectangle 施加 AreaVisitor（求面积）/ DrawVisitor（渲染） |

## 目录结构

```
cpp/
├── README.md                     # 本文件：C++ 模式索引
└── <pattern>/                    # 每个模式一个子目录，目录名统一小写短横线
    ├── README.md                 # 该模式的中文说明（意图/场景/实现/运行/输出/要点）
    ├── <name>.h                  # 类型声明，中文注释标注模式角色
    ├── <name>.cpp                # 具体实现
    ├── main.cpp                  # 可运行示例入口
    └── Makefile                  # make / make run / make clean
```

## 代码风格约定

- C++17，`-Wall -Wextra` 零警告，仅使用标准库，不引入外部依赖。
- 头文件负责声明类型与角色划分，`.cpp` 负责实现，`main.cpp` 只负责演示与输出。
- 关键处用中文注释标注 GoF 角色，例如 `// 抽象工厂`、`// 具体策略`、`// 桥接点`。
- 内存管理统一使用 `std::unique_ptr` 表达所有权，引用/裸指针表达非拥有关系。
- 各模式使用贴近现实的领域对象（Logger、Computer、Coffee、Tree……），不使用抽象的 Foo/Bar。

## 阅读建议

1. 先读某个模式的 `README.md` 理解意图与适用场景，再对照源码看关键代码片段。
2. `make run`（或 `g++ *.cpp -o demo && ./demo`）实际跑一遍，观察输出是否符合预期。
3. 横向对比 `singleton/`（已有参考样板）与其余模式，体会同一套 `.h`/`.cpp`/`main.cpp`/`Makefile`
   结构在不同模式下的差异与共性。
