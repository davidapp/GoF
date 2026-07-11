import Foundation

// 状态模式：音频播放器
// 场景：Playing/Paused/Stopped 状态下 play/pause/stop 行为不同

// MARK: - 状态协议：不同状态下 play/pause/stop 行为不同
protocol PlayerState {
    var name: String { get }
    func play(context: AudioPlayer)
    func pause(context: AudioPlayer)
    func stop(context: AudioPlayer)
}

// MARK: - 具体状态：停止
final class StoppedState: PlayerState {
    let name = "停止"

    func play(context: AudioPlayer) {
        print("  从停止开始播放")
        context.setState(PlayingState())
    }

    func pause(context: AudioPlayer) {
        print("  已经停止，无法暂停")
    }

    func stop(context: AudioPlayer) {
        print("  已经处于停止状态")
    }
}

// MARK: - 具体状态：播放中
final class PlayingState: PlayerState {
    let name = "播放中"

    func play(context: AudioPlayer) {
        print("  已经在播放中")
    }

    func pause(context: AudioPlayer) {
        print("  暂停播放")
        context.setState(PausedState())
    }

    func stop(context: AudioPlayer) {
        print("  停止播放")
        context.setState(StoppedState())
    }
}

// MARK: - 具体状态：暂停
final class PausedState: PlayerState {
    let name = "已暂停"

    func play(context: AudioPlayer) {
        print("  从暂停恢复播放")
        context.setState(PlayingState())
    }

    func pause(context: AudioPlayer) {
        print("  已经处于暂停状态")
    }

    func stop(context: AudioPlayer) {
        print("  从暂停停止播放")
        context.setState(StoppedState())
    }
}

// MARK: - 上下文：音频播放器，将行为委托给当前状态对象
final class AudioPlayer {
    private var state: PlayerState = StoppedState()

    func setState(_ state: PlayerState) {
        self.state = state
        print("  -> 状态切换为: \(state.name)")
    }

    func pressPlay() {
        print("[按下 播放] 当前状态: \(state.name)")
        state.play(context: self)
    }

    func pressPause() {
        print("[按下 暂停] 当前状态: \(state.name)")
        state.pause(context: self)
    }

    func pressStop() {
        print("[按下 停止] 当前状态: \(state.name)")
        state.stop(context: self)
    }
}

// MARK: - 顶层入口
print("=== 状态模式：音频播放器 ===\n")

let player = AudioPlayer()

player.pressPlay()
player.pressPause()
player.pressPlay()
player.pressStop()
player.pressPause()
