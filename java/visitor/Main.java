import java.util.List;

/**
 * 访问者模式示例入口。
 * 场景：对 Circle/Rectangle 施加 AreaVisitor（求面积）/ DrawVisitor（渲染）等操作，
 * 新增操作无需修改 Shape/Circle/Rectangle 类本身。
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("=== 访问者模式：图形操作 ===\n");

        List<Shape> shapes = List.of(
                new Circle(2.0),
                new Rectangle(3.0, 4.0),
                new Circle(1.5));

        System.out.println("-- 使用 DrawVisitor 渲染 --");
        ShapeVisitor drawVisitor = new DrawVisitor();
        for (Shape shape : shapes) {
            shape.accept(drawVisitor);
        }

        System.out.println("\n-- 使用 AreaVisitor 求面积 --");
        AreaVisitor areaVisitor = new AreaVisitor();
        for (Shape shape : shapes) {
            shape.accept(areaVisitor);
        }
        System.out.printf("总面积 = %.2f%n", areaVisitor.getTotalArea());
    }
}
