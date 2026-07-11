import Foundation

// 建造者模式：分步组装 Computer
// 场景：CPU / 内存 / 存储 / GPU 分步设置，Director 提供预设配置

// MARK: - 产品：电脑
struct Computer {
    var cpu: String = "未指定"
    var memory: String = "未指定"
    var storage: String = "未指定"
    var gpu: String = "无独立显卡"

    var description: String {
        """
        电脑配置：
          CPU:  \(cpu)
          内存: \(memory)
          存储: \(storage)
          显卡: \(gpu)
        """
    }
}

// MARK: - 建造者：提供分步设置接口，链式调用返回自身
final class ComputerBuilder {
    private var computer = Computer()

    @discardableResult
    func setCPU(_ cpu: String) -> ComputerBuilder {
        computer.cpu = cpu
        return self
    }

    @discardableResult
    func setMemory(_ memory: String) -> ComputerBuilder {
        computer.memory = memory
        return self
    }

    @discardableResult
    func setStorage(_ storage: String) -> ComputerBuilder {
        computer.storage = storage
        return self
    }

    @discardableResult
    func setGPU(_ gpu: String) -> ComputerBuilder {
        computer.gpu = gpu
        return self
    }

    // 完工，交出最终产品
    func build() -> Computer {
        computer
    }
}

// MARK: - 指挥者：封装预设配置的组装步骤，客户端无需了解组装细节
enum ComputerDirector {
    static func buildOfficeComputer() -> Computer {
        ComputerBuilder()
            .setCPU("Intel i5-13400")
            .setMemory("16GB")
            .setStorage("512GB SSD")
            .build()
    }

    static func buildGamingComputer() -> Computer {
        ComputerBuilder()
            .setCPU("Intel i9-14900K")
            .setMemory("32GB")
            .setStorage("2TB NVMe SSD")
            .setGPU("NVIDIA RTX 4090")
            .build()
    }
}

// MARK: - 顶层入口
print("=== 建造者模式：分步组装 Computer ===\n")

print("[办公用机 - 由 Director 预设]")
print(ComputerDirector.buildOfficeComputer().description)

print("\n[游戏主机 - 由 Director 预设]")
print(ComputerDirector.buildGamingComputer().description)

print("\n[自定义配置 - 客户端直接使用 Builder]")
let customComputer = ComputerBuilder()
    .setCPU("AMD Ryzen 9 7950X")
    .setMemory("64GB")
    .setStorage("1TB SSD + 4TB HDD")
    .setGPU("AMD Radeon RX 7900 XTX")
    .build()
print(customComputer.description)
