/**
 * 模拟“支付模块”：同样独立获取 Logger 实例。
 */
public class PaymentModule {
    private final Logger logger = Logger.getInstance();

    public void pay(String orderId, double amount) {
        logger.debug("支付模块: 开始处理订单 " + orderId + " 的支付请求");
        logger.info("支付模块: 订单 " + orderId + " 支付成功，金额 ￥" + amount);
    }
}
