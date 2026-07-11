#include "beverage.h"
#include <iostream>

void Beverage::prepare() const {
    boil_water();
    brew();
    pour_in_cup();
    if (wants_condiments()) {
        add_condiments();
    }
}

void Beverage::boil_water() const { std::cout << "  1. 把水烧开" << std::endl; }
void Beverage::pour_in_cup() const { std::cout << "  3. 倒入杯中" << std::endl; }

void Tea::brew() const { std::cout << "  2. 用沸水浸泡茶叶" << std::endl; }
void Tea::add_condiments() const { std::cout << "  4. 加入柠檬片" << std::endl; }

void Coffee::brew() const { std::cout << "  2. 用沸水冲泡咖啡粉" << std::endl; }
void Coffee::add_condiments() const { std::cout << "  4. 加入牛奶和糖" << std::endl; }
