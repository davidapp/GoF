/**
 * 具体产品（Concrete Product）：Windows 风格按钮。
 */
public class WindowsButton implements Button {
    @Override
    public void render() {
        System.out.println("[Windows] 渲染一个矩形边框、扁平化风格的按钮");
    }

    @Override
    public void onClick() {
        System.out.println("[Windows] 按钮被点击，播放系统默认点击音效");
    }
}
