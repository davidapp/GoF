# State 状态模式（JavaScript）

## 意图
允许一个对象在其内部状态改变时改变它的行为，使对象看起来似乎修改了它的类。把每个状态的
行为封装进独立的状态类，避免用大量 `if/switch` 分支根据当前状态判断该做什么。

## 适用场景
- 一个对象的行为取决于它的状态，且必须在运行时根据状态改变行为。
- 代码中包含大量与对象状态有关的条件语句，且这些分支依赖于该对象的状态。
- 状态之间的转换关系相对清晰（本例：停止 -> 播放 -> 暂停 -> 播放 -> 停止）。

## 实现方式
`PlayerState` 抽象类声明 `play()`/`pause()`/`stop()`。`StoppedState`、`PlayingState`、
`PausedState` 三个具体状态类各自实现这三个方法，并且在需要转换状态时直接把
`player.state` 指向一个新的状态实例。`AudioPlayer`（上下文）把动作全部委托给
`this.state`，自身不包含任何 `if (state === ...)` 判断：

```js
class PlayingState extends PlayerState {
  pause(player) { player.state = new PausedState(); } // 状态自己决定如何转换
  stop(player) { player.state = new StoppedState(); }
}

class AudioPlayer {
  state = new StoppedState();
  pause() { this.state.pause(this); } // 委托给当前状态对象处理
}
```

## 文件说明
| 文件 | 说明 |
|------|------|
| `main.mjs` | 状态模式完整示例：`StoppedState`/`PlayingState`/`PausedState` 三态切换，`AudioPlayer` 上下文 |

## 编译与运行
```bash
node main.mjs
```

## 输出示例
```
=== 状态模式：音频播放器 ===

初始状态: 已停止

-- 调用 play() --
  从头开始播放
  -> 当前状态: 播放中

-- 调用 pause() --
  暂停播放
  -> 当前状态: 已暂停

-- 在暂停状态下再调用 pause()（同一动作，因状态不同而结果不同）--
  已经是暂停状态
  -> 当前状态: 已暂停

-- 调用 play() 从暂停恢复 --
  从暂停处继续播放
  -> 当前状态: 播放中

-- 调用 stop() --
  停止播放，播放进度归零
  -> 当前状态: 已停止

-- 在停止状态下调用 pause()（非法操作被状态对象自行拦截）--
  已经是停止状态，无法暂停
  -> 当前状态: 已停止
```

## 要点
1. 同一个方法调用（如 `pause()`）在不同状态下表现完全不同：播放中调用会真正暂停，已暂停
   状态下调用则提示“已经是暂停状态”，停止状态下调用则提示“无法暂停”——这些差异分别封装
   在各自的状态类里，`AudioPlayer` 本身不含任何分支判断。
2. 状态类之间知道彼此（`PlayingState` 需要引用 `PausedState`/`StoppedState`），这是状态模
   式的正常代价：状态转换的知识分布在各个状态类中，而不是集中在上下文里。
3. 与策略模式的结构几乎相同（都是“上下文持有一个可替换的对象引用”），核心区别在于意图：
   策略是外部注入一种算法且互不知晓，状态是内部根据自身转换规则自动切换，且状态对象通常
   知道其他状态的存在。
4. 新增一种状态（如"快进中"）只需新增一个状态类并在相关状态里补充转换逻辑，无需修改
   `AudioPlayer` 的核心方法。
