# State 状态模式（C++）

## 意图

允许一个对象在其内部状态改变时改变它的行为，对象看起来似乎修改了它的类。

## 适用场景

- 一个对象的行为取决于它的状态，且必须根据状态在运行时改变行为
- 代码中出现大量与状态相关的条件分支（`if (state == PLAYING) ... else if (state == PAUSED) ...`），难以维护
- 状态之间的转换关系相对明确

## 实现方式

`PlayerState` 是抽象状态，声明 `play()`/`pause()`/`stop()`；`AudioPlayer`（上下文）把这三个操作原样委托给当前状态对象；每个具体状态各自实现在“该状态下”这些操作该做什么、以及切换到哪个下一状态：

```cpp
class AudioPlayer {
public:
    void play() { state_->play(*this); }   // 委托给当前状态
private:
    std::unique_ptr<PlayerState> state_;
};

void StoppedState::play(AudioPlayer& player) {
    // 停止 -> 播放：状态类自己决定下一状态
    player.set_state(std::make_unique<PlayingState>());
}
```

同样是调用 `player.play()`，在 `StoppedState` 下会开始播放，在 `PlayingState` 下会被忽略，在 `PausedState` 下会继续播放——`AudioPlayer` 本身没有任何 `if/else` 分支。

## 文件说明

| 文件 | 说明 |
|------|------|
| `player.h` | 抽象状态 `PlayerState`、上下文 `AudioPlayer`、三个具体状态的声明 |
| `player.cpp` | 各状态下 play/pause/stop 的具体行为与状态切换逻辑 |
| `main.cpp` | 依次调用 pause/play/play/pause/play/stop，观察同一操作在不同状态下的不同表现 |
| `Makefile` | 编译与运行 |

## 编译与运行

```bash
make        # 编译
make run    # 编译并运行
make clean  # 清理
```

## 输出示例

```
=== 状态模式：音频播放器 ===

已经是停止状态，无法暂停
开始播放 《夜曲》
  (状态切换: 停止 -> 播放中)
正在播放中，忽略重复的播放请求
暂停播放
  (状态切换: 播放中 -> 暂停)
从暂停处继续播放 《夜曲》
  (状态切换: 暂停 -> 播放中)
停止播放
  (状态切换: 播放中 -> 停止)
```

## 要点

1. **消除条件分支** — 状态相关的行为分散到各个状态类中，`AudioPlayer` 内部不再有大段 `switch/if-else`
2. **状态自知切换** — 每个具体状态自己决定收到某操作后应该切换到哪个新状态，转换逻辑局部化
3. **易于扩展** — 新增一种状态（如“快进中”）只需新增一个 `PlayerState` 子类，不用改动既有状态类
4. **与策略模式的区别** — 状态模式中各状态知道彼此、会主动触发切换；策略模式中各策略互不知情，切换由外部客户端决定
