# State 状态模式（Swift）

## 意图
允许一个对象在其内部状态改变时改变它的行为，使对象看起来似乎修改了它的类。将"随状态变化的行为"拆分到各个状态类中，避免大量 if/switch 判断当前状态。

## 适用场景
- 一个对象的行为取决于它的状态，且必须在运行时根据状态改变行为。
- 代码中出现了大量与对象状态相关的条件分支，且这些分支会随状态数量增长而迅速膨胀。
- 状态之间的转换关系相对明确（如 停止 -> 播放 -> 暂停）。

## 实现方式
`PlayerState` 是状态协议，声明 `play/pause/stop`；`StoppedState`、`PlayingState`、`PausedState` 是具体状态，各自实现在该状态下按下按钮的行为，并通过 `context.setState(...)` 切换到下一个状态；`AudioPlayer` 是上下文，持有当前状态并将 `pressPlay/pressPause/pressStop` 委托给它。

```swift
final class AudioPlayer {
    private var state: PlayerState = StoppedState()

    func pressPlay() {
        state.play(context: self)
    }
}

final class PlayingState: PlayerState {
    func pause(context: AudioPlayer) {
        context.setState(PausedState())
    }
}
```

## 文件说明
| 文件 | 说明 |
|------|------|
| main.swift | 状态模式的完整实现与可运行示例（顶层代码作为入口） |

## 编译与运行
```bash
swift main.swift
```

## 输出示例
预期输出（本机未安装 Swift，未实机运行）：
```
=== 状态模式：音频播放器 ===

[按下 播放] 当前状态: 停止
  从停止开始播放
  -> 状态切换为: 播放中
[按下 暂停] 当前状态: 播放中
  暂停播放
  -> 状态切换为: 已暂停
[按下 播放] 当前状态: 已暂停
  从暂停恢复播放
  -> 状态切换为: 播放中
[按下 停止] 当前状态: 播放中
  停止播放
  -> 状态切换为: 停止
[按下 暂停] 当前状态: 停止
  已经停止，无法暂停
```

## 要点
1. `AudioPlayer` 本身没有一行 `if state == .playing { ... } else if state == .paused { ... }`，所有分支行为都下放到了各个具体状态类中，新增一个"快进"状态只需新增一个 `PlayerState` 实现。
2. 同样是"按下播放"，`StoppedState`、`PlayingState`、`PausedState` 三者的 `play(context:)` 行为完全不同——这正是状态模式"同一操作、不同状态下行为不同"的核心体现。
3. 状态的切换（`context.setState(...)`）由状态对象自己决定下一个状态是什么，`AudioPlayer` 只负责持有和转发，不参与状态转换逻辑的判断。
4. 与策略模式结构相似（都是"持有一个协议类型、委托调用"），核心区别在于：状态模式里各状态知道彼此、会主动触发切换；策略模式里各策略互不知情，切换由外部客户端决定。
