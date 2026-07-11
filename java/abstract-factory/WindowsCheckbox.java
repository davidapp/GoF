/**
 * 具体产品（Concrete Product）：Windows 风格复选框。
 */
public class WindowsCheckbox implements Checkbox {
    private boolean checked = false;

    @Override
    public void render() {
        System.out.println("[Windows] 渲染一个方形复选框，当前状态：" + (checked ? "已勾选" : "未勾选"));
    }

    @Override
    public void toggle() {
        checked = !checked;
        System.out.println("[Windows] 复选框状态切换为：" + (checked ? "已勾选" : "未勾选"));
    }
}
