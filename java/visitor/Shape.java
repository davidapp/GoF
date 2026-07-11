/**
 * 抽象元素（Element）：图形。
 * accept() 是实现“双分派”的关键：调用方持有的是 Shape 引用（第一次分派——多态调用到
 * 具体子类的 accept），子类的 accept 内部再调用 visitor.visit(this)（第二次分派——
 * 编译期已知 this 的具体类型，从而精确匹配到 ShapeVisitor 对应的 visit 重载）。
 *
 * 用 Java 17 的 sealed 接口 + permits 显式限定实现类只能是 Circle / Rectangle：
 * 这恰好呼应访问者模式的适用前提——元素的具体类型集合是封闭、稳定的，
 * 编译器也就能在新增/遗漏某个 visit 重载时给出更早、更明确的提示。
 */
public sealed interface Shape permits Circle, Rectangle {
    void accept(ShapeVisitor visitor);
}
