import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

/**
 * 单例（Singleton）：全局唯一的日志器 Logger。
 * 采用 Bill Pugh 静态内部类方案：
 *   - Holder 类只有在第一次调用 getInstance() 时才会被 JVM 加载并初始化，实现懒加载；
 *   - 类加载过程由 JVM 保证互斥，天然线程安全，无需 synchronized 或双重检查锁。
 */
public final class Logger {
    /** 日志级别，按严重程度递增 */
    public enum Level {
        DEBUG, INFO, WARN, ERROR
    }

    private static final DateTimeFormatter TIME_FORMAT = DateTimeFormatter.ofPattern("HH:mm:ss");

    /** 低于该级别的日志会被过滤掉，默认只看 INFO 及以上 */
    private Level minLevel = Level.INFO;

    private Logger() {
        // 私有构造函数：禁止外部通过 new Logger() 创建实例
    }

    /** 静态内部类：只有被真正引用时才加载，从而实现懒加载 */
    private static class Holder {
        private static final Logger INSTANCE = new Logger();
    }

    /** 全局访问点 */
    public static Logger getInstance() {
        return Holder.INSTANCE;
    }

    public void setMinLevel(Level level) {
        this.minLevel = level;
        log(Level.INFO, "日志级别已调整为 " + level);
    }

    public void debug(String msg) {
        log(Level.DEBUG, msg);
    }

    public void info(String msg) {
        log(Level.INFO, msg);
    }

    public void warn(String msg) {
        log(Level.WARN, msg);
    }

    public void error(String msg) {
        log(Level.ERROR, msg);
    }

    private void log(Level level, String msg) {
        if (level.ordinal() < minLevel.ordinal()) {
            return; // 低于设定级别，不输出
        }
        String time = LocalTime.now().format(TIME_FORMAT);
        System.out.printf("[%s] [%s] %s%n", time, level, msg);
    }
}
