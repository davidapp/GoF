import Foundation

// 桥接模式：遥控器与设备
// 场景：抽象 RemoteControl(basic/advanced) × 实现 Device(TV/Radio)，两个维度独立变化

// MARK: - 实现化角色：设备接口
protocol Device: AnyObject {
    var isOn: Bool { get set }
    var volume: Int { get set }
    var name: String { get }
    func turnOn()
    func turnOff()
    func setVolume(_ percent: Int)
}

extension Device {
    // 默认实现：具体设备只需提供存储属性，行为逻辑在协议扩展中统一实现
    func turnOn() {
        isOn = true
        print("\(name) 已开机")
    }

    func turnOff() {
        isOn = false
        print("\(name) 已关机")
    }

    func setVolume(_ percent: Int) {
        volume = max(0, min(100, percent))
        print("\(name) 音量调整为 \(volume)")
    }
}

// MARK: - 具体实现：电视
final class TV: Device {
    var isOn: Bool = false
    var volume: Int = 30
    let name = "电视"
}

// MARK: - 具体实现：收音机
final class Radio: Device {
    var isOn: Bool = false
    var volume: Int = 50
    let name = "收音机"
}

// MARK: - 抽象化角色：遥控器持有一个 Device（桥），自身可独立扩展出不同档次
class RemoteControl {
    let device: Device

    init(device: Device) {
        self.device = device
    }

    func togglePower() {
        if device.isOn {
            device.turnOff()
        } else {
            device.turnOn()
        }
    }

    func volumeUp() {
        device.setVolume(device.volume + 10)
    }

    func volumeDown() {
        device.setVolume(device.volume - 10)
    }
}

// MARK: - 扩展抽象：高级遥控器，增加静音功能；与 Device 的实现维度完全独立变化
final class AdvancedRemoteControl: RemoteControl {
    private var volumeBeforeMute: Int?

    func mute() {
        guard volumeBeforeMute == nil else { return }
        volumeBeforeMute = device.volume
        device.setVolume(0)
        print("\(device.name) 已静音")
    }

    func unmute() {
        guard let previous = volumeBeforeMute else { return }
        device.setVolume(previous)
        volumeBeforeMute = nil
        print("\(device.name) 已取消静音")
    }
}

// MARK: - 顶层入口
print("=== 桥接模式：遥控器与设备 ===\n")

print("[基础遥控器 + 电视]")
let basicRemote = RemoteControl(device: TV())
basicRemote.togglePower()
basicRemote.volumeUp()

print("\n[高级遥控器 + 收音机]")
let advancedRemote = AdvancedRemoteControl(device: Radio())
advancedRemote.togglePower()
advancedRemote.volumeUp()
advancedRemote.mute()
advancedRemote.unmute()
