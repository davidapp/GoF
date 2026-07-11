/**
 * 具体原型（Concrete Prototype）：矩形。
 */
public class Rectangle extends Shape {
    private int width;
    private int height;

    public Rectangle(int x, int y, String color, int width, int height) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.height = height;
    }

    /** 拷贝构造函数：先复制公共字段，再复制自己特有的 width/height */
    private Rectangle(Rectangle source) {
        super(source);
        this.width = source.width;
        this.height = source.height;
    }

    @Override
    public Shape copy() {
        return new Rectangle(this);
    }

    @Override
    public String describe() {
        return "Rectangle[颜色=%s, 位置=(%d,%d), 宽高=%dx%d]".formatted(color, x, y, width, height);
    }
}
