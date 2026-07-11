#pragma once
#include <string>

// 请求：采购申请
struct PurchaseRequest {
    std::string item;
    double amount;
};

// 抽象处理者：审批人，封装链式处理的公共骨架
class Approver {
public:
    Approver(std::string title, double limit) : title_(std::move(title)), limit_(limit) {}
    virtual ~Approver() = default;

    void set_next(Approver* next) { next_ = next; }
    void handle(const PurchaseRequest& request) const;

protected:
    virtual bool can_approve(double amount) const { return amount <= limit_; }

    std::string title_;
    double limit_;
    Approver* next_ = nullptr;  // 指向责任链中的下一个处理者
};

// 具体处理者：经理，审批额度较小的采购
class Manager : public Approver {
public:
    Manager() : Approver("经理", 5000) {}
};

// 具体处理者：总监，审批额度中等的采购
class Director : public Approver {
public:
    Director() : Approver("总监", 20000) {}
};

// 具体处理者：CEO，责任链的末端，兜底审批任意金额
class CEO : public Approver {
public:
    CEO() : Approver("CEO", 0) {}

protected:
    bool can_approve(double amount) const override;
};
