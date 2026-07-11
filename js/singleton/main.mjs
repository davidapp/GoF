// ============================================================
// 单例模式（Singleton）
// 场景：全局 Logger（可带日志级别），多处获取始终是同一实例
// ============================================================

const LEVELS = Object.freeze({ DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3 });

class Logger {
  // 私有静态字段保存唯一实例
  static #instance = null;

  #level = LEVELS.INFO;
  #history = [];

  constructor() {
    if (Logger.#instance) {
      // 防止通过 new 绕过 getInstance() 重复创建
      throw new Error('Logger 是单例，请使用 Logger.getInstance() 获取实例');
    }
  }

  // 全局唯一的访问点；首次调用才真正创建实例（惰性初始化）
  static getInstance() {
    if (!Logger.#instance) {
      Logger.#instance = new Logger();
      console.log('[Logger] 创建了唯一实例');
    }
    return Logger.#instance;
  }

  setLevel(level) {
    this.#level = level;
    return this;
  }

  #log(level, levelName, message) {
    if (level < this.#level) return; // 低于当前级别的日志被过滤
    const entry = `[${levelName}] ${message}`;
    this.#history.push(entry);
    console.log(entry);
  }

  debug(message) {
    this.#log(LEVELS.DEBUG, 'DEBUG', message);
  }
  info(message) {
    this.#log(LEVELS.INFO, 'INFO', message);
  }
  warn(message) {
    this.#log(LEVELS.WARN, 'WARN', message);
  }
  error(message) {
    this.#log(LEVELS.ERROR, 'ERROR', message);
  }

  get historyCount() {
    return this.#history.length;
  }
}

console.log('=== 单例模式：全局 Logger ===\n');

console.log('-- 模块 A 中获取 Logger --');
const loggerInModuleA = Logger.getInstance();
loggerInModuleA.info('模块 A 初始化完成');

console.log('\n-- 模块 B 中获取 Logger（应复用同一实例，不再打印“创建了唯一实例”）--');
const loggerInModuleB = Logger.getInstance();
loggerInModuleB.setLevel(LEVELS.DEBUG);
loggerInModuleB.debug('模块 B 的调试信息（因为已调整级别为 DEBUG，所以能显示）');

console.log('\n-- 验证两处获取的是同一个对象 --');
console.log('loggerInModuleA === loggerInModuleB :', loggerInModuleA === loggerInModuleB);
console.log('累计日志条数（含被过滤前后）:', loggerInModuleA.historyCount);

console.log('\n-- 尝试绕过 getInstance() 直接 new，应抛出异常 --');
try {
  new Logger();
} catch (err) {
  console.log('捕获到异常:', err.message);
}
