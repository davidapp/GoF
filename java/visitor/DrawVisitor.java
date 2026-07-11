/**
 * 具体访问者（Concrete Visitor）：渲染图形。
 */
public class DrawVisitor implements ShapeVisitor {
    @Override
    public void visit(Circle circle) {
        System.out.printf("画一个半径为 %.1f 的圆 ○%n", circle.getRadius());
    }

    @Override
    public void visit(Rectangle rectangle) {
        System.out.printf("画一个 %.1f x %.1f 的矩形 □%n", rectangle.getWidth(), rectangle.getHeight());
    }
}
