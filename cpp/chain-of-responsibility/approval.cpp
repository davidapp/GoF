#include "approval.h"
#include <iostream>

void Approver::handle(const PurchaseRequest& request) const {
    if (can_approve(request.amount)) {
        std::cout << "  [" << title_ << "] 批准采购《" << request.item << "》，金额 "
                   << request.amount << " 元" << std::endl;
    } else if (next_) {
        std::cout << "  [" << title_ << "] 金额 " << request.amount << " 元超出权限（上限 " << limit_
                   << " 元），转交上一级" << std::endl;
        next_->handle(request);
    } else {
        std::cout << "  [" << title_ << "] 无法审批，且责任链上没有更高层级了" << std::endl;
    }
}

bool CEO::can_approve(double /*amount*/) const {
    return true;  // CEO 是链的末端，兜底批准所有请求
}
