#pragma once
#include <string>

// 抽象类：定义冲泡饮料的算法骨架（模板方法）
class Beverage {
public:
    virtual ~Beverage() = default;

    // 模板方法：固定步骤顺序，禁止子类重写整体流程
    void prepare() const;

protected:
    virtual void brew() const = 0;            // 变化步骤：由子类实现
    virtual void add_condiments() const = 0;   // 变化步骤：由子类实现

    void boil_water() const;  // 固定步骤：所有饮料一致
    void pour_in_cup() const; // 固定步骤：所有饮料一致

    // 钩子函数：子类可选择性重写，决定是否执行“加调料”这一步
    virtual bool wants_condiments() const { return true; }
};

// 具体类：茶
class Tea : public Beverage {
protected:
    void brew() const override;
    void add_condiments() const override;
};

// 具体类：咖啡
class Coffee : public Beverage {
protected:
    void brew() const override;
    void add_condiments() const override;
};

// 具体类：不加调料的黑咖啡，复用 Coffee 的冲泡步骤，只通过钩子跳过加调料
class BlackCoffee : public Coffee {
protected:
    bool wants_condiments() const override { return false; }
};
