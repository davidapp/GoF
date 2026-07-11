import Foundation

// 装饰器模式：咖啡加料
// 场景：在 Espresso 上动态叠加 Milk/Sugar 装饰，计算价格与描述

// MARK: - 组件协议：饮品
protocol Beverage {
    var description: String { get }
    func cost() -> Double
}

// MARK: - 具体组件：意式浓缩咖啡
struct Espresso: Beverage {
    let description = "浓缩咖啡"
    func cost() -> Double { 15.0 }
}

// MARK: - 装饰器协议：本身也是 Beverage，同时持有被装饰的 Beverage
protocol BeverageDecorator: Beverage {
    var wrapped: Beverage { get }
}

// MARK: - 具体装饰器：加牛奶
struct MilkDecorator: BeverageDecorator {
    let wrapped: Beverage

    var description: String { "\(wrapped.description) + 牛奶" }
    func cost() -> Double { wrapped.cost() + 3.5 }
}

// MARK: - 具体装饰器：加糖
struct SugarDecorator: BeverageDecorator {
    let wrapped: Beverage

    var description: String { "\(wrapped.description) + 糖" }
    func cost() -> Double { wrapped.cost() + 1.0 }
}

// MARK: - 具体装饰器：加奶泡
struct WhippedCreamDecorator: BeverageDecorator {
    let wrapped: Beverage

    var description: String { "\(wrapped.description) + 奶泡" }
    func cost() -> Double { wrapped.cost() + 4.0 }
}

// MARK: - 顶层入口
print("=== 装饰器模式：咖啡加料 ===\n")

let plainEspresso: Beverage = Espresso()
print("\(plainEspresso.description): ¥\(plainEspresso.cost())")

// 动态叠加装饰：浓缩 + 牛奶 + 糖
let milkCoffee = MilkDecorator(wrapped: Espresso())
let sweetMilkCoffee = SugarDecorator(wrapped: milkCoffee)
print("\(sweetMilkCoffee.description): ¥\(sweetMilkCoffee.cost())")

// 继续叠加奶泡，装饰器可以任意组合、嵌套，顺序不同结果也不同
let fullDecorated = WhippedCreamDecorator(wrapped: sweetMilkCoffee)
print("\(fullDecorated.description): ¥\(fullDecorated.cost())")
