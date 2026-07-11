import Foundation

// 外观模式：家庭影院
// 场景：HomeTheaterFacade 一键 watchMovie()，内部协调投影仪/功放/灯光/播放器

// MARK: - 子系统：投影仪
final class Projector {
    func on() { print("投影仪：开启") }
    func setInput(_ source: String) { print("投影仪：切换输入源为 \(source)") }
    func off() { print("投影仪：关闭") }
}

// MARK: - 子系统：功放
final class Amplifier {
    func on() { print("功放：开启") }
    func setVolume(_ level: Int) { print("功放：音量设置为 \(level)") }
    func off() { print("功放：关闭") }
}

// MARK: - 子系统：灯光
final class Lights {
    func dim(_ level: Int) { print("灯光：调暗至 \(level)%") }
    func on() { print("灯光：恢复正常亮度") }
}

// MARK: - 子系统：影碟播放器
final class DiscPlayer {
    func play(_ movie: String) { print("播放器：播放《\(movie)》") }
    func stop() { print("播放器：停止播放") }
}

// MARK: - 外观：为复杂子系统提供简单统一的接口
final class HomeTheaterFacade {
    private let projector = Projector()
    private let amplifier = Amplifier()
    private let lights = Lights()
    private let player = DiscPlayer()

    // 一键观影：内部协调各子系统的调用顺序，客户端无需了解细节
    func watchMovie(_ movie: String) {
        print("准备观影《\(movie)》...")
        lights.dim(20)
        projector.on()
        projector.setInput("DiscPlayer")
        amplifier.on()
        amplifier.setVolume(60)
        player.play(movie)
        print("一切就绪，请欣赏！")
    }

    // 一键结束观影
    func endMovie() {
        print("结束观影...")
        player.stop()
        amplifier.off()
        projector.off()
        lights.on()
        print("已恢复房间原状")
    }
}

// MARK: - 顶层入口
print("=== 外观模式：家庭影院 ===\n")

let homeTheater = HomeTheaterFacade()
homeTheater.watchMovie("肖申克的救赎")
print("")
homeTheater.endMovie()
