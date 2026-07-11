/**
 * 代理（Proxy）：虚拟代理，实现懒加载。
 * 创建 ImageProxy 时并不会立即加载真实图片，只有第一次调用 display() 时才会
 * 真正创建 RealImage；此后再次调用则直接复用已经加载好的实例，避免重复的昂贵操作。
 */
public class ImageProxy implements Image {
    private final String filename;
    private RealImage realImage; // 延迟初始化，首次使用前为 null

    public ImageProxy(String filename) {
        this.filename = filename;
    }

    @Override
    public void display() {
        if (realImage == null) {
            System.out.println("[ImageProxy] " + filename + " 首次访问，创建真实对象");
            realImage = new RealImage(filename);
        } else {
            System.out.println("[ImageProxy] " + filename + " 已加载过，直接复用真实对象");
        }
        realImage.display();
    }
}
