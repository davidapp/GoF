/**
 * 抽象处理者（Handler）：审批人。
 * 每个审批人持有“下一位”处理者的引用，自己的权限不足以处理时就转交给下一位，
 * 从而形成一条责任链；调用方只需把请求交给链的第一个节点。
 */
public abstract class Approver {
    protected Approver next;

    /** 设置下一个处理者，返回 next 便于链式拼接整条链 */
    public Approver setNext(Approver next) {
        this.next = next;
        return next;
    }

    public void approve(PurchaseRequest request) {
        if (request.amount() <= getApprovalLimit()) {
            System.out.printf("[%s] 批准了采购申请「%s」，金额 %.2f 元%n",
                    getTitle(), request.purpose(), request.amount());
        } else if (next != null) {
            System.out.printf("[%s] 权限不足（限额 %.2f 元），转交上级处理...%n",
                    getTitle(), getApprovalLimit());
            next.approve(request);
        } else {
            System.out.printf("[%s] 已是最高审批人，金额 %.2f 元仍超出权限，申请被拒绝%n",
                    getTitle(), request.amount());
        }
    }

    /** 当前职位能审批的最高金额 */
    protected abstract double getApprovalLimit();

    /** 当前职位头衔，用于打印日志 */
    protected abstract String getTitle();
}
