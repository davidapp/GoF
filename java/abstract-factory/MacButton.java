/**
 * 具体产品（Concrete Product）：macOS 风格按钮。
 */
public class MacButton implements Button {
    @Override
    public void render() {
        System.out.println("[macOS] 渲染一个圆角、带阴影的按钮");
    }

    @Override
    public void onClick() {
        System.out.println("[macOS] 按钮被点击，触发轻微的按压动画");
    }
}
