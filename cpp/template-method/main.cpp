#include "beverage.h"
#include <iostream>

// 模板方法模式：Beverage::prepare() 固定了冲泡的步骤顺序，
// Tea/Coffee 只需实现变化的步骤（brew/add_condiments），
// BlackCoffee 通过重写钩子函数 wants_condiments() 跳过加调料这一步。
int main() {
    std::cout << "=== 模板方法模式：冲泡饮料 ===\n" << std::endl;

    std::cout << "冲泡茶:" << std::endl;
    Tea tea;
    tea.prepare();

    std::cout << "\n冲泡咖啡:" << std::endl;
    Coffee coffee;
    coffee.prepare();

    std::cout << "\n冲泡黑咖啡（不加调料）:" << std::endl;
    BlackCoffee black_coffee;
    black_coffee.prepare();

    return 0;
}
