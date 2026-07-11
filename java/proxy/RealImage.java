/**
 * 真实主题（Real Subject）：真正持有图片数据的类。
 * 构造函数模拟“从磁盘加载”这一昂贵操作，一旦创建就会立即付出这个代价。
 */
public class RealImage implements Image {
    private final String filename;

    public RealImage(String filename) {
        this.filename = filename;
        loadFromDisk();
    }

    private void loadFromDisk() {
        System.out.println("  [RealImage] 正在从磁盘加载图片: " + filename + " ...（耗时操作）");
    }

    @Override
    public void display() {
        System.out.println("  [RealImage] 显示图片: " + filename);
    }
}
