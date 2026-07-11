/**
 * 主题接口（Subject）：图片。
 * RealImage（真实主题）与 ImageProxy（代理）都实现这个接口，客户端只依赖它，
 * 感知不到自己用的是真实对象还是代理对象。
 */
public interface Image {
    void display();
}
