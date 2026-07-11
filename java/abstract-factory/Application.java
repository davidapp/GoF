/**
 * 客户端（Client）：只依赖抽象工厂 GUIFactory 与抽象产品 Button/Checkbox，
 * 完全不知道具体创建的是哪一个平台的实现类，从而保证同一族产品搭配使用。
 */
public class Application {
    private final Button button;
    private final Checkbox checkbox;

    public Application(GUIFactory factory) {
        this.button = factory.createButton();
        this.checkbox = factory.createCheckbox();
    }

    /** 渲染整个界面并模拟一次用户交互 */
    public void renderUI() {
        button.render();
        checkbox.render();
        button.onClick();
        checkbox.toggle();
    }
}
