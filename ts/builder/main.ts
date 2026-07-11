/**
 * 建造者模式（Builder）
 * 场景：分步组装 Computer（CPU/内存/存储/GPU），Director 提供预设配置。
 *
 * 核心思想：把复杂对象的构建过程与其表示分离，
 * 同样的构建步骤经由不同 Builder 或不同调用顺序可以产生不同的产品。
 */

// ---------- 产品（Product） ----------
class Computer {
  cpu = "未指定";
  ram = "未指定";
  storage = "未指定";
  gpu?: string;

  describe(): string {
    const parts = [
      `CPU: ${this.cpu}`,
      `内存: ${this.ram}`,
      `存储: ${this.storage}`,
      `显卡: ${this.gpu ?? "无独立显卡"}`,
    ];
    return parts.join(" | ");
  }
}

// ---------- 建造者接口（Builder） ----------
interface IComputerBuilder {
  setCpu(cpu: string): this;
  setRam(ram: string): this;
  setStorage(storage: string): this;
  setGpu(gpu: string): this;
  build(): Computer;
}

// ---------- 具体建造者（Concrete Builder） ----------
// 使用链式调用（fluent interface），每一步返回 this 方便连续设置
class ComputerBuilder implements IComputerBuilder {
  private computer = new Computer();

  setCpu(cpu: string): this {
    this.computer.cpu = cpu;
    return this;
  }
  setRam(ram: string): this {
    this.computer.ram = ram;
    return this;
  }
  setStorage(storage: string): this {
    this.computer.storage = storage;
    return this;
  }
  setGpu(gpu: string): this {
    this.computer.gpu = gpu;
    return this;
  }
  build(): Computer {
    // 每次 build 后重置内部状态，避免影响下一次构建
    const result = this.computer;
    this.computer = new Computer();
    return result;
  }
}

// ---------- 指挥者（Director）：封装常见的预设配置 ----------
class ComputerDirector {
  constructor(private readonly builder: IComputerBuilder) {}

  buildOfficePC(): Computer {
    return this.builder
      .setCpu("Intel i5")
      .setRam("16GB")
      .setStorage("512GB SSD")
      .build();
  }

  buildGamingPC(): Computer {
    return this.builder
      .setCpu("Intel i9")
      .setRam("32GB")
      .setStorage("2TB NVMe SSD")
      .setGpu("NVIDIA RTX 4090")
      .build();
  }
}

// ---------- 演示 ----------
function main(): void {
  const builder = new ComputerBuilder();
  const director = new ComputerDirector(builder);

  console.log("=== 办公配置（Director 预设） ===");
  console.log(director.buildOfficePC().describe());

  console.log("\n=== 游戏配置（Director 预设） ===");
  console.log(director.buildGamingPC().describe());

  console.log("\n=== 自定义配置（客户端直接使用 Builder） ===");
  const custom = builder
    .setCpu("AMD Ryzen 7")
    .setRam("64GB")
    .setStorage("4TB SSD")
    .setGpu("AMD Radeon RX 7900")
    .build();
  console.log(custom.describe());
}

main();
