/**
 * 具体处理者（Concrete Handler）：CEO，责任链的最后一环，审批额度最高。
 */
public class CEO extends Approver {
    @Override
    protected double getApprovalLimit() {
        return 500_000;
    }

    @Override
    protected String getTitle() {
        return "CEO";
    }
}
