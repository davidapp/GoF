// ============================================================
// 桥接模式（Bridge）
// 场景：抽象 RemoteControl（basic/advanced） x 实现 Device（TV/Radio）
//       两个维度可以独立变化，通过“桥”组合在一起
// ============================================================

// ---- 实现部分（Implementor）：设备的通用能力接口 ----
class Device {
  isOn = false;
  volume = 30;

  turnOn() {
    throw new Error('子类必须实现 turnOn()');
  }
  turnOff() {
    throw new Error('子类必须实现 turnOff()');
  }
  setVolume(percent) {
    throw new Error('子类必须实现 setVolume()');
  }
  getStatus() {
    throw new Error('子类必须实现 getStatus()');
  }
}

// ---- 具体实现：电视 ----
class TV extends Device {
  turnOn() {
    this.isOn = true;
    return '电视已开机';
  }
  turnOff() {
    this.isOn = false;
    return '电视已关机';
  }
  setVolume(percent) {
    this.volume = Math.max(0, Math.min(100, percent));
    return `电视音量调整为 ${this.volume}`;
  }
  getStatus() {
    return `[电视] 电源=${this.isOn ? '开' : '关'}, 音量=${this.volume}`;
  }
}

// ---- 具体实现：收音机 ----
class Radio extends Device {
  turnOn() {
    this.isOn = true;
    return '收音机已开机';
  }
  turnOff() {
    this.isOn = false;
    return '收音机已关机';
  }
  setVolume(percent) {
    this.volume = Math.max(0, Math.min(100, percent));
    return `收音机音量调整为 ${this.volume}`;
  }
  getStatus() {
    return `[收音机] 电源=${this.isOn ? '开' : '关'}, 音量=${this.volume}`;
  }
}

// ---- 抽象部分（Abstraction）：遥控器，持有一个 Device 引用（这就是“桥”）----
class RemoteControl {
  // 通过组合而非继承关联到具体设备，抽象与实现可以独立扩展
  constructor(device) {
    this.device = device;
  }

  togglePower() {
    return this.device.isOn ? this.device.turnOff() : this.device.turnOn();
  }

  volumeUp() {
    return this.device.setVolume(this.device.volume + 10);
  }

  volumeDown() {
    return this.device.setVolume(this.device.volume - 10);
  }

  status() {
    return this.device.getStatus();
  }
}

// ---- 扩展抽象：高级遥控器新增静音、频道等能力，仍与具体设备解耦 ----
class AdvancedRemoteControl extends RemoteControl {
  #volumeBeforeMute = null;

  mute() {
    if (this.#volumeBeforeMute === null) {
      this.#volumeBeforeMute = this.device.volume;
      this.device.setVolume(0);
      return '已静音';
    } else {
      this.device.setVolume(this.#volumeBeforeMute);
      this.#volumeBeforeMute = null;
      return '已取消静音';
    }
  }
}

console.log('=== 桥接模式：遥控器（抽象）与设备（实现）独立变化 ===\n');

console.log('-- 基础遥控器 + 电视 --');
const basicRemoteForTV = new RemoteControl(new TV());
console.log(basicRemoteForTV.togglePower());
console.log(basicRemoteForTV.volumeUp());
console.log(basicRemoteForTV.status());

console.log('\n-- 基础遥控器 + 收音机（同一个遥控器抽象，换一个设备实现）--');
const basicRemoteForRadio = new RemoteControl(new Radio());
console.log(basicRemoteForRadio.togglePower());
console.log(basicRemoteForRadio.volumeDown());
console.log(basicRemoteForRadio.status());

console.log('\n-- 高级遥控器 + 电视（扩展抽象端，不影响设备实现端）--');
const advancedRemote = new AdvancedRemoteControl(new TV());
console.log(advancedRemote.togglePower());
console.log(advancedRemote.volumeUp());
console.log(advancedRemote.mute());
console.log(advancedRemote.status());
console.log(advancedRemote.mute());
console.log(advancedRemote.status());
