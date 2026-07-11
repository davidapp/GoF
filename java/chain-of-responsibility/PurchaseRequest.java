/**
 * 请求（Request）：一次采购申请。
 * 用 record 表达不可变的数据载体，自动带有 purpose()/amount() 访问器。
 */
public record PurchaseRequest(String purpose, double amount) {
}
