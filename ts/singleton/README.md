# Singleton 单例模式（TypeScript）

## 意图
保证一个类只有一个实例，并提供一个全局访问点。常用于日志器、配置中心、连接池等“全局唯一”的资源管理场景。

## 适用场景
- 系统中某个类只能有一个实例，且这个实例需要被多处代码方便地访问（如全局 Logger）。
- 该唯一实例需要延迟创建（用到时才初始化），避免不必要的启动开销。
- 需要对某个共享资源进行统一、集中的状态管理（如日志级别、缓存）。

## 实现方式
`Logger` 的构造函数是 `private`，外部无法通过 `new Logger()` 创建实例；静态方法 `getInstance()` 是唯一的全局访问点，首次调用时才创建实例并缓存到静态字段：

```ts
class Logger {
  private static instance: Logger | undefined;
  private constructor() {}

  static getInstance(): Logger {
    if (Logger.instance === undefined) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }
}
```

示例中的 `Logger` 还带有日志级别（`LogLevel` 枚举 + 严重程度映射表），`setLevel()` 设定阈值后，低于阈值的日志会被 `log()` 自动过滤，体现“全局唯一且带状态”的单例典型用法。

## 文件说明
| 文件 | 说明 |
|------|------|
| main.ts | 单例模式完整实现，含日志级别过滤与多处获取同一实例的验证 |

## 编译与运行
```bash
cd ts/singleton
npx tsx main.ts
```

## 输出示例
```
[INFO] 日志级别设置为 DEBUG
[INFO] 模块 A 启动
[WARN] 模块 B 检测到潜在问题
[ERROR] 模块 C 发生错误

=== 提高日志阈值为 WARN，低于该级别的日志将被过滤 ===
[ERROR] 但 ERROR 日志依然会打印

=== 验证单例 ===
logger1 === logger2: true
历史日志条数: 5
```

## 要点
1. 私有构造函数 + 静态缓存字段是 TypeScript/JavaScript 中实现单例最直接的方式。
2. `logger1 === logger2` 为 `true` 证明了两次 `getInstance()` 返回的是同一个对象引用。
3. 单例模式容易被滥用为“全局变量”，掩盖模块间的真实依赖关系；只有确实需要“全局唯一状态”时才应使用（如日志、配置），否则优先考虑依赖注入。
4. 模块级别的 `export const instance = new Logger()`（ES 模块天然单例）也是 TS/JS 中常见的替代实现方式。
