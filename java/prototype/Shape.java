/**
 * 抽象原型（Prototype）：声明“复制自身”的方法。
 * 这里没有使用 java.lang.Cloneable（其 clone() 是浅拷贝、还需处理受检异常，
 * Effective Java 也建议谨慎使用），而是让每个具体原型提供私有的“拷贝构造函数”，
 * 通过 copy() 对外暴露，语义更清晰、也更安全（可自行决定深拷贝哪些字段）。
 */
public abstract class Shape {
    protected int x;
    protected int y;
    protected String color;

    protected Shape() {
    }

    /** 拷贝构造函数：子类通过 super(source) 复制公共字段 */
    protected Shape(Shape source) {
        this.x = source.x;
        this.y = source.y;
        this.color = source.color;
    }

    public void moveTo(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public void setColor(String color) {
        this.color = color;
    }

    /** 具体原型必须实现：返回一份携带相同属性的新实例 */
    public abstract Shape copy();

    public abstract String describe();
}
