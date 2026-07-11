/**
 * 具体元素（Concrete Element）：矩形。
 * 同 Circle，作为 sealed 接口 Shape 唯一许可的另一个实现类，声明为 final。
 */
public final class Rectangle implements Shape {
    private final double width;
    private final double height;

    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    public double getWidth() {
        return width;
    }

    public double getHeight() {
        return height;
    }

    @Override
    public void accept(ShapeVisitor visitor) {
        visitor.visit(this);
    }
}
