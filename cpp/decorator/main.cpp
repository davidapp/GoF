#include "coffee.h"
#include <iostream>
#include <memory>

// 装饰器模式：在运行时动态地为 Espresso 叠加 Milk/Sugar，
// 每叠加一层都得到一个新的 Coffee，接口不变，行为（价格/描述）被增强。
void print_order(const Coffee& coffee) {
    std::cout << coffee.description() << " => 价格: " << coffee.cost() << " 元" << std::endl;
}

int main() {
    std::cout << "=== 装饰器模式：咖啡加料 ===\n" << std::endl;

    std::unique_ptr<Coffee> coffee = std::make_unique<Espresso>();
    print_order(*coffee);

    coffee = std::make_unique<MilkDecorator>(std::move(coffee));
    print_order(*coffee);

    coffee = std::make_unique<SugarDecorator>(std::move(coffee));
    print_order(*coffee);

    coffee = std::make_unique<SugarDecorator>(std::move(coffee));  // 再加一份糖
    print_order(*coffee);

    return 0;
}
