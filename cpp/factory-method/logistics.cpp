#include "logistics.h"

std::string Truck::deliver() const {
    return "使用卡车沿公路运输：适合陆地短途派送";
}

std::string Ship::deliver() const {
    return "使用轮船沿海路运输：适合跨海大宗货物";
}

std::string Logistics::plan_delivery() const {
    // 不关心具体是 Truck 还是 Ship，只依赖 Transport 抽象接口
    auto transport = create_transport();
    return "物流单已生成 -> " + transport->deliver();
}

std::unique_ptr<Transport> RoadLogistics::create_transport() const {
    return std::make_unique<Truck>();
}

std::unique_ptr<Transport> SeaLogistics::create_transport() const {
    return std::make_unique<Ship>();
}
