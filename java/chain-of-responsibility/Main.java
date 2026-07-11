/**
 * 责任链模式示例入口。
 * 场景：采购审批 —— Manager → Director → CEO 按金额上限逐级审批，
 * 每一级只处理自己权限范围内的申请，超出权限则自动转交给上一级。
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("=== 责任链模式：采购审批 ===\n");

        Approver manager = new Manager();
        Approver director = new Director();
        Approver ceo = new CEO();

        // 组装责任链：经理 -> 总监 -> CEO
        manager.setNext(director).setNext(ceo);

        PurchaseRequest[] requests = {
                new PurchaseRequest("采购办公用品", 800),
                new PurchaseRequest("采购一批笔记本电脑", 30_000),
                new PurchaseRequest("新建生产线", 300_000),
                new PurchaseRequest("并购子公司", 800_000),
        };

        for (PurchaseRequest request : requests) {
            System.out.println("提交申请: " + request.purpose() + "，金额 " + request.amount() + " 元");
            manager.approve(request); // 请求总是从链的第一个节点开始处理
            System.out.println();
        }
    }
}
