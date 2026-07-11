import java.util.List;

/**
 * 代理模式示例入口。
 * 场景：图片懒加载 —— ImageProxy 延迟到首次 display() 才加载 RealImage。
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("=== 代理模式：图片懒加载 ===\n");

        System.out.println("创建图片列表（此时不会真正加载任何图片）:");
        List<Image> gallery = List.of(
                new ImageProxy("photo1.jpg"),
                new ImageProxy("photo2.jpg"),
                new ImageProxy("photo3.jpg"));
        System.out.println("列表创建完成，尚未发生任何磁盘加载\n");

        System.out.println("第一次浏览，只查看 photo1 和 photo2:");
        gallery.get(0).display();
        gallery.get(1).display();

        System.out.println("\n再次查看 photo1（应直接复用，不再重新加载）:");
        gallery.get(0).display();
    }
}
