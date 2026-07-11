// 单例模式（Singleton）—— 全局 Logger 演示
//
// Rust 没有类静态字段那种“天然”写法，惯用做法是用
// `std::sync::OnceLock` 保存一个进程内只会初始化一次的全局实例，
// 配合 `Mutex` 提供内部可变性与线程安全。

use std::sync::{Mutex, OnceLock};

/// 日志级别：声明顺序即大小顺序，可直接比较
#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
enum LogLevel {
    Debug,
    Info,
    Warn,
    Error,
}

impl LogLevel {
    fn as_str(&self) -> &'static str {
        match self {
            LogLevel::Debug => "DEBUG",
            LogLevel::Info => "INFO",
            LogLevel::Warn => "WARN",
            LogLevel::Error => "ERROR",
        }
    }
}

/// 单例：全局 Logger，带日志级别过滤与历史记录
struct Logger {
    level: LogLevel,
    history: Vec<String>,
}

impl Logger {
    fn new() -> Self {
        println!("(Logger 实例被创建 —— 整个进程只会发生一次)");
        Logger {
            level: LogLevel::Info,
            history: Vec::new(),
        }
    }

    /// 全局访问点：任何地方调用都拿到同一个 Mutex<Logger>
    fn instance() -> &'static Mutex<Logger> {
        static INSTANCE: OnceLock<Mutex<Logger>> = OnceLock::new();
        INSTANCE.get_or_init(|| Mutex::new(Logger::new()))
    }

    fn set_level(level: LogLevel) {
        let mut logger = Logger::instance().lock().unwrap();
        logger.level = level;
    }

    fn log(level: LogLevel, msg: &str) {
        let mut logger = Logger::instance().lock().unwrap();
        if level >= logger.level {
            let line = format!("[{}] {}", level.as_str(), msg);
            println!("{}", line);
            logger.history.push(line);
        }
    }

    fn history_len() -> usize {
        Logger::instance().lock().unwrap().history.len()
    }
}

fn main() {
    println!("=== 单例模式：全局 Logger 演示 ===\n");

    // 从“两处不同的地方”获取实例，证明是同一个对象
    let ref1 = Logger::instance();
    let ref2 = Logger::instance();
    println!(
        "两次 Logger::instance() 是否指向同一实例: {}\n",
        std::ptr::eq(ref1, ref2)
    );

    Logger::log(LogLevel::Info, "应用启动");
    Logger::log(LogLevel::Debug, "加载配置文件（默认级别下可见）");

    Logger::set_level(LogLevel::Warn);
    println!("(已将级别调整为 WARN)");
    Logger::log(LogLevel::Debug, "这条 Debug 不会显示");
    Logger::log(LogLevel::Info, "这条 Info 也不会显示");
    Logger::log(LogLevel::Error, "发生严重错误！");

    println!("\n历史日志共 {} 条", Logger::history_len());
}
