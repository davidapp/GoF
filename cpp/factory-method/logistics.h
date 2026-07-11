#pragma once
#include <memory>
#include <string>

// 抽象产品：运输工具
class Transport {
public:
    virtual ~Transport() = default;
    virtual std::string deliver() const = 0;
};

// 具体产品：卡车（陆运）
class Truck : public Transport {
public:
    std::string deliver() const override;
};

// 具体产品：轮船（海运）
class Ship : public Transport {
public:
    std::string deliver() const override;
};

// 抽象创建者：声明工厂方法 create_transport()，
// 并在 plan_delivery() 中调用它——业务逻辑与具体运输方式解耦
class Logistics {
public:
    virtual ~Logistics() = default;
    virtual std::unique_ptr<Transport> create_transport() const = 0;  // 工厂方法
    std::string plan_delivery() const;                                 // 依赖工厂方法的业务流程
};

// 具体创建者：陆运物流，决定使用 Truck
class RoadLogistics : public Logistics {
public:
    std::unique_ptr<Transport> create_transport() const override;
};

// 具体创建者：海运物流，决定使用 Ship
class SeaLogistics : public Logistics {
public:
    std::unique_ptr<Transport> create_transport() const override;
};
