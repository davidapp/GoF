# GoF 设计模式 — 多语言学习仓库

本仓库用于学习和练习经典的 Gang of Four (GoF) 设计模式，通过多种编程语言分别实现。

## 仓库结构

```
GoF/
├── docs/      # 23 张生活类比架构图（语言无关）
├── cpp/       # C++ 实现
├── go/        # Go 实现
├── java/      # Java 实现
├── js/        # JavaScript 实现
├── objc/      # Objective-C 实现
├── python/    # Python 实现
├── rust/      # Rust 实现
├── swift/     # Swift 实现
└── ts/        # TypeScript 实现
```

每个语言目录下按模式分类存放实现，GoF 共 23 个设计模式，分为三大类：

- **创建型**：Abstract Factory（抽象工厂）、Builder（建造者）、Factory Method（工厂方法）、Prototype（原型）、Singleton（单例）
- **结构型**：Adapter（适配器）、Bridge（桥接）、Composite（组合）、Decorator（装饰器）、Facade（外观）、Flyweight（享元）、Proxy（代理）
- **行为型**：Chain of Responsibility（责任链）、Command（命令）、Interpreter（解释器）、Iterator（迭代器）、Mediator（中介者）、Memento（备忘录）、Observer（观察者）、State（状态）、Strategy（策略）、Template Method（模板方法）、Visitor（访问者）

## 约定

- 每个模式在语言目录下有独立子目录（如 `cpp/singleton/`、`python/observer/`）。
- 每个实现都应包含可运行的示例，演示模式的用法。
- 每个模式的 README 在「意图」之后嵌入一张生活类比架构图；语言无关的图鉴在 `docs/README.md`。
- 若需改图，编辑 `scripts/embed_architecture_diagrams.py` 后重新运行该脚本。
- 使用各语言的惯用风格 — 不要把 Java 式 OOP 强加到 Go 或 Rust 上。
- 实现保持自包含，尽量不引入外部依赖。

## 各语言说明

- **C++**：使用 C++17 或更高版本，用 `g++` 或 `clang++` 编译。
- **Go**：使用 `go run` / `go test` 运行，每个模式作为独立 package。
- **Java**：Java 17+，用 `javac` 编译，`java` 运行。
- **JavaScript**：使用 ES 模块（`import/export`），用 `node` 运行。
- **Objective-C**：用 `clang` 编译，搭配 Foundation 框架，`-framework Foundation`。
- **Python**：Python 3.10+，使用类型注解，用 `python3` 运行。
- **Rust**：每个模式作为独立的二进制文件放在 `src/bin/` 下，或作为独立文件用 `cargo run` 运行。
- **Swift**：Swift 5.9+，用 `swift` 或 `swiftc` 编译运行。
- **TypeScript**：使用 `tsx` 或 `ts-node` 运行，开启严格模式。
