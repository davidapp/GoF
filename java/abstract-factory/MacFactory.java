/**
 * 具体工厂（Concrete Factory）：只生产 macOS 风格的产品族。
 */
public class MacFactory implements GUIFactory {
    @Override
    public Button createButton() {
        return new MacButton();
    }

    @Override
    public Checkbox createCheckbox() {
        return new MacCheckbox();
    }
}
