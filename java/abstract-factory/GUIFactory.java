/**
 * 抽象工厂（Abstract Factory）：声明创建一整套（同一族）产品的接口。
 * 客户端只依赖这个接口，不关心具体是哪个平台的产品族。
 */
public interface GUIFactory {
    Button createButton();

    Checkbox createCheckbox();
}
