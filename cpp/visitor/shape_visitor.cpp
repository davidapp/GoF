#include "shape_visitor.h"
#include <iostream>

namespace {
constexpr double kPi = 3.14159265358979323846;
}  // namespace

// accept() 把 this 的静态类型（Circle/Rectangle）转成动态类型传给 visitor，
// 加上 visit() 的重载决议，两次分派共同确定最终执行哪个函数体（双重分派）。
void Circle::accept(ShapeVisitor& visitor) const { visitor.visit(*this); }
void Rectangle::accept(ShapeVisitor& visitor) const { visitor.visit(*this); }

void AreaVisitor::visit(const Circle& circle) {
    double area = kPi * circle.radius() * circle.radius();
    std::cout << "  圆形(半径=" << circle.radius() << ") 面积 = " << area << std::endl;
    total_area_ += area;
}

void AreaVisitor::visit(const Rectangle& rectangle) {
    double area = rectangle.width() * rectangle.height();
    std::cout << "  矩形(" << rectangle.width() << "x" << rectangle.height() << ") 面积 = " << area
              << std::endl;
    total_area_ += area;
}

void DrawVisitor::visit(const Circle& circle) {
    std::cout << "  画一个半径为 " << circle.radius() << " 的圆 ○" << std::endl;
}

void DrawVisitor::visit(const Rectangle& rectangle) {
    std::cout << "  画一个 " << rectangle.width() << "x" << rectangle.height() << " 的矩形 □"
              << std::endl;
}
