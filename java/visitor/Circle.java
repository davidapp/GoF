/**
 * 具体元素（Concrete Element）：圆形。
 * sealed 接口 Shape 的 permits 子句要求实现类必须是 final/sealed/non-sealed 之一，
 * 这里选择 final——圆形不需要再被继承。
 */
public final class Circle implements Shape {
    private final double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    public double getRadius() {
        return radius;
    }

    @Override
    public void accept(ShapeVisitor visitor) {
        visitor.visit(this); // this 的静态类型此处就是 Circle，分派到 visit(Circle)
    }
}
