import Foundation

// 工厂方法模式：物流运输
// 场景：Logistics 子类决定使用 Truck 还是 Ship 运输

// MARK: - 抽象产品：运输工具
protocol Transport {
    func deliver() -> String
}

// MARK: - 具体产品：卡车
struct Truck: Transport {
    func deliver() -> String {
        "卡车在公路上运输货物"
    }
}

// MARK: - 具体产品：轮船
struct Ship: Transport {
    func deliver() -> String {
        "轮船在海上运输货物"
    }
}

// MARK: - 抽象创建者：声明工厂方法，业务逻辑只依赖抽象产品
protocol Logistics {
    func createTransport() -> Transport   // 工厂方法，交给子类实现
    func planDelivery() -> String
}

extension Logistics {
    // 默认实现：业务逻辑不关心具体运输工具是什么，只调用工厂方法获取
    func planDelivery() -> String {
        let transport = createTransport()
        return "物流公司安排配送 -> \(transport.deliver())"
    }
}

// MARK: - 具体创建者：公路物流，工厂方法返回 Truck
struct RoadLogistics: Logistics {
    func createTransport() -> Transport {
        Truck()
    }
}

// MARK: - 具体创建者：海运物流，工厂方法返回 Ship
struct SeaLogistics: Logistics {
    func createTransport() -> Transport {
        Ship()
    }
}

// MARK: - 顶层入口
print("=== 工厂方法模式：物流运输 ===\n")

let logisticsOptions: [(String, Logistics)] = [
    ("公路物流", RoadLogistics()),
    ("海运物流", SeaLogistics())
]

for (name, logistics) in logisticsOptions {
    print("[\(name)]")
    print(logistics.planDelivery())
    print("")
}
