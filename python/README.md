# GoF 设计模式 · Python 实现

用 Python 3.10+ 实现全部 23 个经典 GoF 设计模式，每个模式一个独立子目录，
包含可直接运行的示例（`main.py`）与中文说明文档（`README.md`）。

代码尽量使用 Python 惯用风格：`dataclass`、`abc.ABC`/`abstractmethod`、
`enum.IntEnum`、`typing.Protocol`（结构化子类型/鸭子类型）等，具体选择哪种
手法视模式的语义而定，不生搬硬套 Java 式 OOP。全部示例仅依赖标准库。

每个模式 README 在「意图」之后都有一张形象架构图；23 张图的图鉴见 [`../docs/README.md`](../docs/README.md)。

## 模式一览

### 创建型（Creational）— 关注对象的创建机制

| 模式 | 中文名 | 一句话说明 |
|------|--------|-----------|
| [abstract-factory](abstract-factory) | 抽象工厂 | 为 Windows/macOS 成套生产风格一致的 Button + Checkbox |
| [builder](builder) | 建造者 | 分步组装 Computer，Director 提供办公机/游戏主机/工作站预设 |
| [factory-method](factory-method) | 工厂方法 | Logistics 子类决定用 Truck 还是 Ship 运输货物 |
| [prototype](prototype) | 原型 | 通过 `copy.deepcopy` 克隆 Circle/Rectangle，互不干扰 |
| [singleton](singleton) | 单例 | 元类 + 双重检查锁定实现全局唯一的 Logger |

### 结构型（Structural）— 关注类与对象的组合

| 模式 | 中文名 | 一句话说明 |
|------|--------|-----------|
| [adapter](adapter) | 适配器 | 把 StripePayment/PayPalPayment 适配成统一的 `pay(yuan)` 接口 |
| [bridge](bridge) | 桥接 | RemoteControl（基础/高级）与 Device（电视/收音机）两个维度独立变化 |
| [composite](composite) | 组合 | File 与 Directory 统一计算大小、打印目录树 |
| [decorator](decorator) | 装饰器 | 在 Espresso 上逐层叠加 Milk/Sugar/WhippedCream，动态计价 |
| [facade](facade) | 外观 | HomeTheaterFacade 一键协调投影仪/功放/灯光/播放器 |
| [flyweight](flyweight) | 享元 | 森林中大量 Tree 共享 TreeType 内在状态，节省内存 |
| [proxy](proxy) | 代理 | ImageProxy 延迟到 `display()` 才真正加载 RealImage |

### 行为型（Behavioral）— 关注对象间的职责分配与通信

| 模式 | 中文名 | 一句话说明 |
|------|--------|-----------|
| [chain-of-responsibility](chain-of-responsibility) | 责任链 | 采购申请按金额沿 经理→总监→CEO 逐级审批 |
| [command](command) | 命令 | LightOn/LightOffCommand 封装请求，支持撤销 |
| [interpreter](interpreter) | 解释器 | 解析并求值 `5 + 3 - 2` 这样的中缀表达式，支持变量上下文 |
| [iterator](iterator) | 迭代器 | BookCollection 提供正序/逆序两种迭代器 |
| [mediator](mediator) | 中介者 | User 通过 ChatRoom 中介收发群消息与私信，彼此解耦 |
| [memento](memento) | 备忘录 | TextEditor 保存快照，History 管理并支持 undo |
| [observer](observer) | 观察者 | WeatherStation 数据变化时通知多个 Display 面板 |
| [state](state) | 状态 | AudioPlayer 在 播放中/暂停/停止 状态下行为各异 |
| [strategy](strategy) | 策略 | `typing.Protocol` 定义支付策略，CreditCard/PayPal/Crypto 可运行时互换 |
| [template-method](template-method) | 模板方法 | Beverage 固定冲泡骨架，Tea/Coffee/BlackCoffee 实现步骤与钩子 |
| [visitor](visitor) | 访问者 | AreaVisitor/DrawVisitor/PerimeterVisitor 对 Circle/Rectangle 做双重分派 |

## 统一运行方式

每个模式目录都是自包含的单文件示例，无需安装任何第三方依赖：

```bash
cd python/<pattern-dir>
python main.py
```

例如：

```bash
cd python/observer
python main.py
```

要求 Python 3.10 及以上版本（本仓库开发/验证环境为 Python 3.14）。

> Windows 提示：若命令行输出中文出现乱码，通常是控制台编码不是 UTF-8 导致；
> 各示例已在代码开头加入 `sys.stdout.reconfigure(encoding="utf-8")` 自动修正，
> 一般无需手动设置。如仍有异常，可尝试 `python -X utf8 main.py`。

## 目录结构

```
python/
├── README.md                    # 本文件：模式索引
└── <pattern-dir>/                # 每个模式一个子目录，目录名见上表
    ├── main.py                   # 可运行示例（含 if __name__ == "__main__":）
    └── README.md                 # 该模式的中文说明（意图/场景/实现/运行/输出/要点）
```

## 阅读建议

1. 每个模式目录下的 `README.md` 都附带真实运行输出，可以先读文档理解意图，再读 `main.py` 印证。
2. 关键类和方法上都有中文注释标注模式角色（如"抽象产品""具体策略""钩子方法"），方便快速定位结构。
3. 建议对照本仓库其他语言（`../go`、`../rust`、`../ts` 等）的同一模式实现，体会同一设计思想在不同类型系统下的表达差异。
