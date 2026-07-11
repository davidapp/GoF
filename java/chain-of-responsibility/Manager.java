/**
 * 具体处理者（Concrete Handler）：经理，审批额度最低。
 */
public class Manager extends Approver {
    @Override
    protected double getApprovalLimit() {
        return 5_000;
    }

    @Override
    protected String getTitle() {
        return "经理";
    }
}
