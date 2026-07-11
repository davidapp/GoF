#include "approval.h"
#include <iostream>
#include <vector>

// 责任链模式：请求沿着 经理 -> 总监 -> CEO 传递，
// 每一环只决定“自己能不能处理”，处理不了就转交下一环，客户端永远只面对链的入口。
int main() {
    std::cout << "=== 责任链模式：采购审批 ===\n" << std::endl;

    Manager manager;
    Director director;
    CEO ceo;

    // 组装责任链：经理 -> 总监 -> CEO
    manager.set_next(&director);
    director.set_next(&ceo);

    std::vector<PurchaseRequest> requests = {
        {"办公用品", 800},
        {"部门团建", 8000},
        {"服务器采购", 50000},
    };

    for (const auto& request : requests) {
        std::cout << "提交申请: " << request.item << "，金额 " << request.amount << " 元" << std::endl;
        manager.handle(request);  // 永远从链的第一环开始提交
        std::cout << std::endl;
    }

    return 0;
}
