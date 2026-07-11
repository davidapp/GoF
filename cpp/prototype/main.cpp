#include "shape.h"
#include <iostream>
#include <memory>

// 原型模式：通过 clone() 复制已有对象，而不是重新 new 一个再逐字段赋值；
// 修改克隆体不会影响原型，二者是完全独立的两个对象。
int main() {
    std::cout << "=== 原型模式：克隆 Shape ===\n" << std::endl;

    Circle original_circle("红色", 0, 0, 10);
    std::cout << "原始圆形: " << original_circle.describe() << std::endl;

    auto cloned_shape = original_circle.clone();
    std::cout << "克隆圆形: " << cloned_shape->describe() << std::endl;

    // 修改克隆体，验证与原型互不影响
    cloned_shape->move_to(50, 50);
    cloned_shape->set_color("蓝色");
    std::cout << "\n--- 修改克隆体的位置与颜色后 ---" << std::endl;
    std::cout << "原始圆形: " << original_circle.describe() << std::endl;
    std::cout << "克隆圆形: " << cloned_shape->describe() << std::endl;

    Rectangle original_rect("绿色", 5, 5, 100, 50);
    auto cloned_rect = original_rect.clone();
    std::cout << "\n原始矩形: " << original_rect.describe() << std::endl;
    std::cout << "克隆矩形: " << cloned_rect->describe() << std::endl;

    return 0;
}
