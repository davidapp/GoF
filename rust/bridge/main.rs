// 桥接模式（Bridge）—— 遥控器 x 设备演示
//
// 抽象部分（RemoteControl / AdvancedRemoteControl）与实现部分（Device 的
// 具体实现 Tv / Radio）各自独立变化，通过“持有一个 Box<dyn Device>”把两者
// 桥接起来，而不是用继承把二者的组合关系写死。

// 实现部分接口：设备
trait Device {
    fn is_enabled(&self) -> bool;
    fn enable(&mut self);
    fn disable(&mut self);
    fn get_volume(&self) -> u32;
    fn set_volume(&mut self, percent: u32);
    fn name(&self) -> &str;
}

// 具体实现：电视
struct Tv {
    on: bool,
    volume: u32,
}
impl Device for Tv {
    fn is_enabled(&self) -> bool {
        self.on
    }
    fn enable(&mut self) {
        self.on = true;
    }
    fn disable(&mut self) {
        self.on = false;
    }
    fn get_volume(&self) -> u32 {
        self.volume
    }
    fn set_volume(&mut self, percent: u32) {
        self.volume = percent.min(100);
    }
    fn name(&self) -> &str {
        "电视"
    }
}

// 具体实现：收音机
struct Radio {
    on: bool,
    volume: u32,
}
impl Device for Radio {
    fn is_enabled(&self) -> bool {
        self.on
    }
    fn enable(&mut self) {
        self.on = true;
    }
    fn disable(&mut self) {
        self.on = false;
    }
    fn get_volume(&self) -> u32 {
        self.volume
    }
    fn set_volume(&mut self, percent: u32) {
        self.volume = percent.min(100);
    }
    fn name(&self) -> &str {
        "收音机"
    }
}

// 抽象部分：基础遥控器，桥接到某个具体 Device
struct RemoteControl {
    device: Box<dyn Device>,
}

impl RemoteControl {
    fn new(device: Box<dyn Device>) -> Self {
        RemoteControl { device }
    }

    fn toggle_power(&mut self) {
        if self.device.is_enabled() {
            self.device.disable();
            println!("{}: 关闭电源", self.device.name());
        } else {
            self.device.enable();
            println!("{}: 打开电源", self.device.name());
        }
    }

    fn volume_up(&mut self) {
        let v = self.device.get_volume();
        self.device.set_volume(v + 10);
        println!("{}: 音量提升到 {}", self.device.name(), self.device.get_volume());
    }

    fn volume_down(&mut self) {
        let v = self.device.get_volume();
        self.device.set_volume(v.saturating_sub(10));
        println!("{}: 音量降低到 {}", self.device.name(), self.device.get_volume());
    }
}

// 扩展抽象：高级遥控器，在基础功能上新增“静音”，且不影响 Device 的实现
struct AdvancedRemoteControl {
    base: RemoteControl,
    previous_volume: u32,
}

impl AdvancedRemoteControl {
    fn new(device: Box<dyn Device>) -> Self {
        AdvancedRemoteControl {
            base: RemoteControl::new(device),
            previous_volume: 0,
        }
    }

    fn toggle_power(&mut self) {
        self.base.toggle_power();
    }

    fn mute(&mut self) {
        self.previous_volume = self.base.device.get_volume();
        self.base.device.set_volume(0);
        println!("{}: 已静音", self.base.device.name());
    }

    fn unmute(&mut self) {
        self.base.device.set_volume(self.previous_volume);
        println!(
            "{}: 取消静音，恢复到 {}",
            self.base.device.name(),
            self.previous_volume
        );
    }
}

fn main() {
    println!("=== 桥接模式：遥控器与设备演示 ===\n");

    println!("-- 基础遥控器 + 电视 --");
    let tv = Tv { on: false, volume: 30 };
    let mut basic_remote = RemoteControl::new(Box::new(tv));
    basic_remote.toggle_power();
    basic_remote.volume_up();
    basic_remote.volume_up();
    basic_remote.volume_down();

    println!("\n-- 高级遥控器 + 收音机 --");
    let radio = Radio { on: false, volume: 50 };
    let mut advanced_remote = AdvancedRemoteControl::new(Box::new(radio));
    advanced_remote.toggle_power();
    advanced_remote.mute();
    advanced_remote.unmute();
}
