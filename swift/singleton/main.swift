import Foundation

// 单例模式：全局 Logger
// 场景：多处获取 Logger 实例，验证获取到的是同一个对象

// MARK: - 日志级别
enum LogLevel: String {
    case debug = "DEBUG"
    case info = "INFO"
    case warning = "WARNING"
    case error = "ERROR"
}

// MARK: - 单例：全局唯一的 Logger
final class Logger {
    // 唯一实例：static let 在首次访问时才懒加载，且由 Swift 运行时保证线程安全、只初始化一次
    static let shared = Logger()

    private(set) var level: LogLevel = .info
    private var logs: [String] = []

    // 私有化构造器：禁止外部通过 Logger() 创建新实例，只能经由 shared 获取
    private init() {
        logs.append("Logger 实例已创建")
    }

    func setLevel(_ level: LogLevel) {
        self.level = level
        log("日志级别设置为 \(level.rawValue)")
    }

    func log(_ message: String, level: LogLevel = .info) {
        let entry = "[\(level.rawValue)] \(message)"
        logs.append(entry)
        print(entry)
    }

    func history() -> [String] {
        logs
    }
}

// MARK: - 顶层入口
print("=== 单例模式：全局 Logger ===\n")

// 在程序不同位置获取 Logger，验证获取到的是同一个实例
let loggerA = Logger.shared
loggerA.log("应用启动")

func doWork() {
    let loggerB = Logger.shared   // 在另一个函数中再次获取，仍是同一实例
    loggerB.setLevel(.debug)
    loggerB.log("正在执行业务逻辑", level: .debug)
}
doWork()

let loggerC = Logger.shared
loggerC.log("应用结束")

print("\nloggerA 与 loggerC 是否为同一实例: \(loggerA === loggerC)")
print("当前日志级别: \(Logger.shared.level.rawValue)")
print("历史日志条数: \(Logger.shared.history().count)")
