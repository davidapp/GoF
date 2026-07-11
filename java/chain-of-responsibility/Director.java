/**
 * 具体处理者（Concrete Handler）：总监，审批额度居中。
 */
public class Director extends Approver {
    @Override
    protected double getApprovalLimit() {
        return 50_000;
    }

    @Override
    protected String getTitle() {
        return "总监";
    }
}
