# State 状态模式（Objective-C）

## 意图

允许对象在其内部状态改变时改变它的行为，使对象看起来像是修改了它所属的类。把"状态相关"的行为拆分到各个状态类中，避免大量 `if/switch` 判断当前状态。

## 适用场景

- 对象的行为取决于它的状态，且状态会在运行时切换
- 同一操作在不同状态下有截然不同的表现（播放器的 play 在"播放中"和"已停止"下行为不同）
- 状态转换的规则较为固定，希望把它们显式地表达出来，而不是散落在一堆条件分支里

## 实现方式

`PlayerState` 协议声明 `play:`/`pause:`/`stop:`，`AudioPlayer`（上下文）把这些调用委托给当前的 `state`。每个具体状态自己决定"这个操作该怎么响应"以及"响应后切换到哪个新状态"：

```objc
@implementation AudioPlayer
- (void)play  { [self.state play:self]; }   // 委托给当前状态，自己不做判断
@end

@implementation StoppedState
- (void)play:(AudioPlayer *)player {
    NSLog(@"  开始播放");
    player.state = [[PlayingState alloc] init]; // 状态切换由状态对象自己决定
}
@end
```

## 文件说明

| 文件 | 说明 |
|------|------|
| `State.h` | 状态协议 `PlayerState`、上下文 `AudioPlayer`、具体状态 `PlayingState`/`PausedState`/`StoppedState` 声明 |
| `State.m` | 上述类型的实现 |
| `main.m` | 依次调用 play/pause/play/stop/pause，观察行为随状态变化 |
| `Makefile` | 编译与运行 |

## 编译与运行

```bash
make run    # 编译并运行
make        # 仅编译
make clean  # 清理
```

## 输出示例

```
初始状态: 已停止
 
=== 调用 play ===
  开始播放
当前状态: 播放中
 
=== 再次调用 play（应提示已在播放） ===
  已经在播放了，无需重复播放
 
=== 调用 pause ===
  暂停播放
当前状态: 已暂停
 
=== 调用 play（从暂停恢复） ===
  从暂停处继续播放
当前状态: 播放中
 
=== 调用 stop ===
  停止播放
当前状态: 已停止
 
=== 停止状态下调用 pause（应提示无法暂停） ===
  已停止，无法暂停
```

（预期输出 —— 本机未安装 ObjC 工具链，未实机运行）

## 要点

1. **消灭条件分支** —— `AudioPlayer` 里没有一行 `if (state == Playing)`，所有状态相关的判断都下沉到具体状态类中。
2. **状态对象决定下一个状态** —— 状态切换的规则写在状态类自己的方法里（如 `StoppedState.play:` 切换到 `PlayingState`），而不是集中在上下文里维护一张转移表。
3. **与策略模式的区别** —— 结构上与 Strategy 几乎一样（上下文持有一个协议对象），但 State 强调"状态会自己触发切换"，而 Strategy 通常由外部一次性指定、不会自行切换。
