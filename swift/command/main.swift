import Foundation

// 命令模式：遥控器与撤销
// 场景：LightOn/LightOff 命令，支持 undo

// MARK: - 接收者：电灯，真正执行操作的对象
final class Light {
    let location: String
    private(set) var isOn = false

    init(location: String) {
        self.location = location
    }

    func on() {
        isOn = true
        print("\(location)的灯：已打开")
    }

    func off() {
        isOn = false
        print("\(location)的灯：已关闭")
    }
}

// MARK: - 命令协议：把请求封装为对象，统一支持执行与撤销
protocol Command {
    func execute()
    func undo()
}

// MARK: - 具体命令：开灯
final class LightOnCommand: Command {
    private let light: Light

    init(light: Light) {
        self.light = light
    }

    func execute() { light.on() }
    func undo() { light.off() }
}

// MARK: - 具体命令：关灯
final class LightOffCommand: Command {
    private let light: Light

    init(light: Light) {
        self.light = light
    }

    func execute() { light.off() }
    func undo() { light.on() }
}

// MARK: - 调用者：遥控器，记录命令历史以支持 undo
final class RemoteControl {
    private var history: [Command] = []

    func press(_ command: Command) {
        command.execute()
        history.append(command)
    }

    func pressUndo() {
        guard let lastCommand = history.popLast() else {
            print("没有可撤销的操作")
            return
        }
        print("撤销上一步操作 ->", terminator: " ")
        lastCommand.undo()
    }
}

// MARK: - 顶层入口
print("=== 命令模式：遥控器与撤销 ===\n")

let livingRoomLight = Light(location: "客厅")
let remote = RemoteControl()

remote.press(LightOnCommand(light: livingRoomLight))
remote.press(LightOffCommand(light: livingRoomLight))
remote.press(LightOnCommand(light: livingRoomLight))

print("")
remote.pressUndo()
remote.pressUndo()
remote.pressUndo()
remote.pressUndo()
