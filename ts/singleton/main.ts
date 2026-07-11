/**
 * 单例模式（Singleton）
 * 场景：全局 Logger（可带日志级别），多处获取时始终为同一实例。
 *
 * 核心思想：保证一个类只有一个实例，并提供一个全局访问点。
 */

// 日志级别：使用字符串枚举，打印时更直观
enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

// 各级别的严重程度，用于按阈值过滤日志
const LOG_LEVEL_RANK: Record<LogLevel, number> = {
  [LogLevel.DEBUG]: 0,
  [LogLevel.INFO]: 1,
  [LogLevel.WARN]: 2,
  [LogLevel.ERROR]: 3,
};

class Logger {
  // 唯一实例，静态私有字段
  private static instance: Logger | undefined;

  private readonly logs: string[] = [];
  private level: LogLevel = LogLevel.INFO;

  // 私有构造函数：禁止外部通过 new Logger() 创建实例
  private constructor() {}

  // 全局访问点：懒加载，首次调用时才创建实例
  static getInstance(): Logger {
    if (Logger.instance === undefined) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  setLevel(level: LogLevel): void {
    this.level = level;
    this.log(LogLevel.INFO, `日志级别设置为 ${level}`);
  }

  log(level: LogLevel, message: string): void {
    // 低于当前阈值的日志直接忽略，体现“日志级别”的实际作用
    if (LOG_LEVEL_RANK[level] < LOG_LEVEL_RANK[this.level]) {
      return;
    }
    const entry = `[${level}] ${message}`;
    this.logs.push(entry);
    console.log(entry);
  }

  getHistory(): readonly string[] {
    return this.logs;
  }
}

// ---------- 演示：在“不同模块”中分别获取 Logger ----------
function moduleA(): void {
  const logger = Logger.getInstance();
  logger.log(LogLevel.INFO, "模块 A 启动");
}

function moduleB(): void {
  const logger = Logger.getInstance();
  logger.log(LogLevel.WARN, "模块 B 检测到潜在问题");
}

function main(): void {
  const logger1 = Logger.getInstance();
  logger1.setLevel(LogLevel.DEBUG);

  moduleA();
  moduleB();

  const logger2 = Logger.getInstance();
  logger2.log(LogLevel.ERROR, "模块 C 发生错误");

  console.log("\n=== 提高日志阈值为 WARN，低于该级别的日志将被过滤 ===");
  logger2.setLevel(LogLevel.WARN);
  logger2.log(LogLevel.DEBUG, "这条 DEBUG 日志不会被打印");
  logger2.log(LogLevel.INFO, "这条 INFO 日志也不会被打印");
  logger2.log(LogLevel.ERROR, "但 ERROR 日志依然会打印");

  console.log("\n=== 验证单例 ===");
  console.log("logger1 === logger2:", logger1 === logger2);
  console.log("历史日志条数:", logger2.getHistory().length);
}

main();
