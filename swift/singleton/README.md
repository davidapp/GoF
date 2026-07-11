# Singleton 单例模式（Swift）

## 意图
保证一个类只有一个实例，并提供一个全局访问点。适合表示全局唯一资源，如日志器、配置中心、连接池等。

## 适用场景
- 系统中某个类只能有一个实例，且该实例需要被多处代码共享访问。
- 需要比全局变量更严格的封装，避免外部随意创建新实例。
- 该唯一实例需要延迟初始化（用到时才创建）。

## 实现方式
`Logger` 使用私有构造器 `private init()` 禁止外部直接创建实例，唯一实例通过 `static let shared` 暴露；`static let` 在 Swift 中默认就是懒加载且线程安全的（运行时保证初始化只发生一次），无需手写双重检查锁。

```swift
final class Logger {
    static let shared = Logger()
    private init() { }
}
```

## 文件说明
| 文件 | 说明 |
|------|------|
| main.swift | 单例模式的完整实现与可运行示例（顶层代码作为入口） |

## 编译与运行
```bash
swift main.swift
```

## 输出示例
预期输出（本机未安装 Swift，未实机运行）：
```
=== 单例模式：全局 Logger ===

[INFO] 应用启动
[INFO] 日志级别设置为 DEBUG
[DEBUG] 正在执行业务逻辑
[INFO] 应用结束

loggerA 与 loggerC 是否为同一实例: true
当前日志级别: DEBUG
历史日志条数: 5
```

## 要点
1. `private init()` 从语言层面杜绝了 `Logger()` 的外部调用，唯一的获取入口是 `Logger.shared`。
2. `static let shared` 由 Swift 运行时保证"仅初始化一次、线程安全"，比手写锁更简洁可靠。
3. 在 `doWork()` 等不同作用域中获取的 `Logger.shared` 与最外层获取的实例是同一对象（`===` 为 `true`），状态（日志级别、历史记录）在整个程序中保持一致。
4. `final class` 防止被继承而破坏单例语义（子类可能绕过私有构造器创建"新的一族"实例）。
