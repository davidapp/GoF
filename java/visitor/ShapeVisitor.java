/**
 * 抽象访问者（Visitor）：为每一种具体元素（Circle/Rectangle）声明一个 visit 重载方法。
 * 新增一种操作（如求周长）只需要新增一个 ShapeVisitor 实现类，不必修改 Shape 层次结构。
 */
public interface ShapeVisitor {
    void visit(Circle circle);

    void visit(Rectangle rectangle);
}
