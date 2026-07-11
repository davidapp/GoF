#pragma once
#include <memory>
#include <string>

// 抽象组件：饮品
class Coffee {
public:
    virtual ~Coffee() = default;
    virtual std::string description() const = 0;
    virtual double cost() const = 0;
};

// 具体组件：意式浓缩，装饰链的起点
class Espresso : public Coffee {
public:
    std::string description() const override;
    double cost() const override;
};

// 装饰器基类：持有一个 Coffee，接口与 Coffee 保持一致（is-a 且 has-a）
class CoffeeDecorator : public Coffee {
public:
    explicit CoffeeDecorator(std::unique_ptr<Coffee> inner) : inner_(std::move(inner)) {}

protected:
    std::unique_ptr<Coffee> inner_;
};

// 具体装饰：加牛奶
class MilkDecorator : public CoffeeDecorator {
public:
    using CoffeeDecorator::CoffeeDecorator;
    std::string description() const override;
    double cost() const override;
};

// 具体装饰：加糖
class SugarDecorator : public CoffeeDecorator {
public:
    using CoffeeDecorator::CoffeeDecorator;
    std::string description() const override;
    double cost() const override;
};
