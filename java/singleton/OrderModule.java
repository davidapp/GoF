/**
 * 模拟“下单模块”：内部独立获取 Logger 实例，不依赖外部传入。
 * 用来证明不同模块拿到的是同一个 Logger。
 */
public class OrderModule {
    private final Logger logger = Logger.getInstance();

    public void createOrder(String orderId) {
        logger.info("订单模块: 创建订单 " + orderId);
    }
}
