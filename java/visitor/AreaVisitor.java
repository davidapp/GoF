/**
 * 具体访问者（Concrete Visitor）：计算面积，并顺带累加出总面积。
 */
public class AreaVisitor implements ShapeVisitor {
    private double totalArea = 0;

    @Override
    public void visit(Circle circle) {
        double area = Math.PI * circle.getRadius() * circle.getRadius();
        totalArea += area;
        System.out.printf("圆形(半径=%.1f) 面积 = %.2f%n", circle.getRadius(), area);
    }

    @Override
    public void visit(Rectangle rectangle) {
        double area = rectangle.getWidth() * rectangle.getHeight();
        totalArea += area;
        System.out.printf("矩形(%.1f x %.1f) 面积 = %.2f%n", rectangle.getWidth(), rectangle.getHeight(), area);
    }

    public double getTotalArea() {
        return totalArea;
    }
}
