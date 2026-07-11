/**
 * 组合模式示例入口。
 * 场景：文件系统中 File 与 Directory 统一计算总大小 / 打印树形结构。
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("=== 组合模式：文件系统 ===\n");

        Directory root = new Directory("project");

        Directory src = new Directory("src");
        src.add(new File("Main.java", 1200))
           .add(new File("Utils.java", 800));

        Directory assets = new Directory("assets");
        Directory images = new Directory("images");
        images.add(new File("logo.png", 20_480))
              .add(new File("banner.jpg", 51_200));
        assets.add(images)
              .add(new File("style.css", 2_048));

        root.add(src)
            .add(assets)
            .add(new File("README.md", 512));

        root.print("");

        System.out.println("\n项目总大小: " + root.getSize() + " B");
        System.out.println("assets 目录大小: " + assets.getSize() + " B");
    }
}
