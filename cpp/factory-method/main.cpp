#include "logistics.h"
#include <iostream>
#include <memory>
#include <vector>

// 工厂方法模式：Logistics 的子类各自决定实例化哪种 Transport，
// 客户端只面向 Logistics 基类编程。
int main() {
    std::cout << "=== 工厂方法模式：物流运输 ===\n" << std::endl;

    std::vector<std::unique_ptr<Logistics>> routes;
    routes.push_back(std::make_unique<RoadLogistics>());
    routes.push_back(std::make_unique<SeaLogistics>());

    for (const auto& route : routes) {
        std::cout << route->plan_delivery() << std::endl;
    }

    return 0;
}
