/**
 * 具体原型（Concrete Prototype）：圆形。
 */
public class Circle extends Shape {
    private int radius;

    public Circle(int x, int y, String color, int radius) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = radius;
    }

    /** 拷贝构造函数：先复制公共字段，再复制自己特有的 radius */
    private Circle(Circle source) {
        super(source);
        this.radius = source.radius;
    }

    @Override
    public Shape copy() {
        return new Circle(this);
    }

    @Override
    public String describe() {
        return "Circle[颜色=%s, 位置=(%d,%d), 半径=%d]".formatted(color, x, y, radius);
    }
}
