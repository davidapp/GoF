/**
 * 具体产品（Concrete Product）：macOS 风格复选框。
 */
public class MacCheckbox implements Checkbox {
    private boolean checked = false;

    @Override
    public void render() {
        System.out.println("[macOS] 渲染一个圆角复选框，当前状态：" + (checked ? "已勾选" : "未勾选"));
    }

    @Override
    public void toggle() {
        checked = !checked;
        System.out.println("[macOS] 复选框状态切换为：" + (checked ? "已勾选" : "未勾选"));
    }
}
