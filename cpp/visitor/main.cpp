#include "shape_visitor.h"
#include <iostream>
#include <memory>
#include <vector>

// 访问者模式：新增操作（AreaVisitor、DrawVisitor）不需要修改 Circle/Rectangle，
// 只需新增一个 ShapeVisitor 的实现；双重分派通过 accept()+visit() 共同完成。
int main() {
    std::cout << "=== 访问者模式：图形操作 ===\n" << std::endl;

    std::vector<std::unique_ptr<Shape>> shapes;
    shapes.push_back(std::make_unique<Circle>(3.0));
    shapes.push_back(std::make_unique<Rectangle>(4.0, 5.0));

    std::cout << "--- 使用 AreaVisitor 计算面积 ---" << std::endl;
    AreaVisitor area_visitor;
    for (const auto& shape : shapes) {
        shape->accept(area_visitor);
    }
    std::cout << "总面积 = " << area_visitor.total_area() << std::endl;

    std::cout << "\n--- 使用 DrawVisitor 渲染图形 ---" << std::endl;
    DrawVisitor draw_visitor;
    for (const auto& shape : shapes) {
        shape->accept(draw_visitor);
    }

    return 0;
}
