import Foundation

// 模板方法模式：冲泡饮料
// 场景：Beverage 定义骨架，Tea/Coffee 实现各步骤

// MARK: - 抽象类：定义算法骨架（模板方法），具体步骤交给子类实现
class Beverage {
    // 模板方法：冲泡饮料的固定流程，用 final 防止子类破坏骨架结构
    final func prepare() {
        boilWater()
        brew()
        pourInCup()
        if wantsCondiments() {
            addCondiments()
        }
        print("«\(name)» 冲泡完成！\n")
    }

    var name: String { "饮料" }

    private func boilWater() {
        print("1. 把水煮沸")
    }

    // 子类必须实现的步骤（用 fatalError 模拟抽象方法，提醒忘记覆盖）
    func brew() {
        fatalError("子类必须实现 brew()")
    }

    private func pourInCup() {
        print("3. 把饮料倒入杯中")
    }

    func addCondiments() {
        fatalError("子类必须实现 addCondiments()")
    }

    // 钩子方法：提供默认实现，子类可选择性覆盖以改变流程分支
    func wantsCondiments() -> Bool {
        true
    }
}

// MARK: - 具体类：茶
final class Tea: Beverage {
    override var name: String { "茶" }

    override func brew() {
        print("2. 用沸水浸泡茶叶")
    }

    override func addCondiments() {
        print("4. 加入柠檬")
    }
}

// MARK: - 具体类：咖啡
final class Coffee: Beverage {
    override var name: String { "咖啡" }

    override func brew() {
        print("2. 用沸水冲泡咖啡粉")
    }

    override func addCondiments() {
        print("4. 加入糖和牛奶")
    }

    // 覆盖钩子方法：这一次冲泡的咖啡不加调料
    override func wantsCondiments() -> Bool {
        false
    }
}

// MARK: - 顶层入口
print("=== 模板方法模式：冲泡饮料 ===\n")

print("冲泡茶：")
let tea = Tea()
tea.prepare()

print("冲泡咖啡（本次不加调料）：")
let coffee = Coffee()
coffee.prepare()
