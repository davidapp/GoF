// ============================================================
// 建造者模式（Builder）
// 场景：分步组装 Computer（CPU/内存/存储/GPU），Director 提供预设配置
// ============================================================

// ---- 产品：最终要构建的复杂对象 ----
class Computer {
  cpu = '未指定';
  ram = '未指定';
  storage = '未指定';
  gpu = '无独立显卡';

  describe() {
    return (
      `电脑配置清单:\n` +
      `  CPU   : ${this.cpu}\n` +
      `  内存  : ${this.ram}\n` +
      `  存储  : ${this.storage}\n` +
      `  显卡  : ${this.gpu}`
    );
  }
}

// ---- 建造者：提供链式方法逐步设置产品的各个部件 ----
class ComputerBuilder {
  #computer = new Computer();

  setCPU(cpu) {
    this.#computer.cpu = cpu;
    return this; // 支持链式调用
  }

  setRAM(ram) {
    this.#computer.ram = ram;
    return this;
  }

  setStorage(storage) {
    this.#computer.storage = storage;
    return this;
  }

  setGPU(gpu) {
    this.#computer.gpu = gpu;
    return this;
  }

  build() {
    // 每次 build 返回新实例，避免外部持有引用后再被修改
    const result = this.#computer;
    this.#computer = new Computer();
    return result;
  }
}

// ---- 指挥者：封装几种常见预设配置的构建步骤 ----
class ComputerDirector {
  static gamingPC(builder) {
    return builder
      .setCPU('Intel Core i9-14900K')
      .setRAM('32GB DDR5 6000MHz')
      .setStorage('2TB NVMe SSD')
      .setGPU('NVIDIA RTX 4090')
      .build();
  }

  static officePC(builder) {
    return builder
      .setCPU('Intel Core i5-13400')
      .setRAM('16GB DDR4 3200MHz')
      .setStorage('512GB NVMe SSD')
      .setGPU('集成显卡')
      .build();
  }

  static customPC(builder) {
    // 客户端也可以完全自定义，不使用预设
    return builder
      .setCPU('AMD Ryzen 7 7800X3D')
      .setRAM('64GB DDR5 5600MHz')
      .setStorage('4TB NVMe SSD + 4TB HDD')
      .setGPU('AMD Radeon RX 7900 XTX')
      .build();
  }
}

console.log('=== 建造者模式：分步组装电脑 ===\n');

const builder = new ComputerBuilder();

console.log('-- 游戏主机预设 --');
const gamingPC = ComputerDirector.gamingPC(builder);
console.log(gamingPC.describe());

console.log('\n-- 办公主机预设 --');
const officePC = ComputerDirector.officePC(builder);
console.log(officePC.describe());

console.log('\n-- 自定义配置（不经过 Director）--');
const customPC = builder
  .setCPU('Apple M3 Max')
  .setRAM('128GB 统一内存')
  .setStorage('8TB SSD')
  .build();
console.log(customPC.describe());
