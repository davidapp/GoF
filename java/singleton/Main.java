/**
 * 单例模式示例入口。
 * 场景：全局 Logger（可带日志级别），多处获取到的都是同一实例。
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("=== 单例模式：全局 Logger ===\n");

        Logger logger = Logger.getInstance();
        logger.info("程序启动");

        var orderModule = new OrderModule();
        var paymentModule = new PaymentModule();

        orderModule.createOrder("ORD-1001");
        paymentModule.pay("ORD-1001", 199.00);

        System.out.println();
        logger.setMinLevel(Logger.Level.DEBUG);
        paymentModule.pay("ORD-1002", 88.50); // 调整级别后 DEBUG 日志也会显示

        System.out.println("\n=== 验证多处获取的是同一实例 ===");
        Logger anotherRef = Logger.getInstance();
        System.out.println("main 中的 Logger      : " + logger);
        System.out.println("再次获取的 Logger      : " + anotherRef);
        System.out.println("两者是否为同一实例      : " + (logger == anotherRef));
    }
}
