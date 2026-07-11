/**
 * 桥接模式（Bridge）
 * 场景：抽象 RemoteControl（basic/advanced） × 实现 Device（TV/Radio），
 *       两个维度可以独立变化，避免类爆炸。
 *
 * 核心思想：将抽象部分与实现部分分离，使它们可以独立地扩展，
 * 抽象对象持有一个实现对象的引用，通过组合而非继承来关联两者。
 */

// ---------- 实现接口（Implementor） ----------
interface Device {
  isOn(): boolean;
  turnOn(): void;
  turnOff(): void;
  setVolume(percent: number): void;
  getVolume(): number;
  getName(): string;
}

// ---------- 具体实现（Concrete Implementor） ----------
class TV implements Device {
  private on = false;
  private volume = 30;

  getName(): string {
    return "电视";
  }
  isOn(): boolean {
    return this.on;
  }
  turnOn(): void {
    this.on = true;
    console.log(`${this.getName()} 已开机`);
  }
  turnOff(): void {
    this.on = false;
    console.log(`${this.getName()} 已关机`);
  }
  setVolume(percent: number): void {
    this.volume = Math.max(0, Math.min(100, percent));
    console.log(`${this.getName()} 音量设置为 ${this.volume}`);
  }
  getVolume(): number {
    return this.volume;
  }
}

class Radio implements Device {
  private on = false;
  private volume = 50;

  getName(): string {
    return "收音机";
  }
  isOn(): boolean {
    return this.on;
  }
  turnOn(): void {
    this.on = true;
    console.log(`${this.getName()} 已开机`);
  }
  turnOff(): void {
    this.on = false;
    console.log(`${this.getName()} 已关机`);
  }
  setVolume(percent: number): void {
    this.volume = Math.max(0, Math.min(100, percent));
    console.log(`${this.getName()} 音量设置为 ${this.volume}`);
  }
  getVolume(): number {
    return this.volume;
  }
}

// ---------- 抽象部分（Abstraction）：持有 Device 引用，即“桥” ----------
class RemoteControl {
  constructor(protected device: Device) {}

  togglePower(): void {
    if (this.device.isOn()) {
      this.device.turnOff();
    } else {
      this.device.turnOn();
    }
  }

  volumeUp(): void {
    this.device.setVolume(this.device.getVolume() + 10);
  }

  volumeDown(): void {
    this.device.setVolume(this.device.getVolume() - 10);
  }
}

// ---------- 扩展抽象（Refined Abstraction）：在基础遥控器上增加新功能 ----------
class AdvancedRemoteControl extends RemoteControl {
  mute(): void {
    this.device.setVolume(0);
    console.log(`${this.device.getName()} 已静音`);
  }
}

// ---------- 演示 ----------
function main(): void {
  console.log("=== 普通遥控器 + 电视 ===");
  const basicRemote = new RemoteControl(new TV());
  basicRemote.togglePower();
  basicRemote.volumeUp();

  console.log("\n=== 高级遥控器 + 收音机 ===");
  const advancedRemote = new AdvancedRemoteControl(new Radio());
  advancedRemote.togglePower();
  advancedRemote.volumeUp();
  advancedRemote.mute();

  console.log("\n=== 高级遥控器同样可以控制电视（两个维度自由组合） ===");
  const advancedForTV = new AdvancedRemoteControl(new TV());
  advancedForTV.togglePower();
  advancedForTV.mute();
}

main();
