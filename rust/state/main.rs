// 状态模式（State）—— 音频播放器演示
//
// 每个状态实现同一个 PlayerState trait，行为随当前状态不同而不同。
// 这里采用 Rust 里常见的“消费并返回新状态”写法：状态转换方法拿走
// `Box<Self>` 的所有权，返回新的 `Box<dyn PlayerState>`，配合
// `Option::take()` 在 AudioPlayer 内部完成状态替换，完全避免了
// “原地修改一个 trait 对象具体类型”这种借用检查器无法接受的操作。

// 状态接口：每个方法都消费当前状态、返回转换后的新状态
trait PlayerState {
    fn play(self: Box<Self>, player: &AudioPlayer) -> Box<dyn PlayerState>;
    fn pause(self: Box<Self>, player: &AudioPlayer) -> Box<dyn PlayerState>;
    fn stop(self: Box<Self>, player: &AudioPlayer) -> Box<dyn PlayerState>;
    fn name(&self) -> &str;
}

// 具体状态：停止
struct StoppedState;
impl PlayerState for StoppedState {
    fn play(self: Box<Self>, player: &AudioPlayer) -> Box<dyn PlayerState> {
        println!("《{}》: 停止 -> 播放", player.track);
        Box::new(PlayingState)
    }
    fn pause(self: Box<Self>, _player: &AudioPlayer) -> Box<dyn PlayerState> {
        println!("已停止，无法暂停");
        self
    }
    fn stop(self: Box<Self>, _player: &AudioPlayer) -> Box<dyn PlayerState> {
        println!("已经处于停止状态");
        self
    }
    fn name(&self) -> &str {
        "停止"
    }
}

// 具体状态：播放中
struct PlayingState;
impl PlayerState for PlayingState {
    fn play(self: Box<Self>, _player: &AudioPlayer) -> Box<dyn PlayerState> {
        println!("已经在播放中");
        self
    }
    fn pause(self: Box<Self>, player: &AudioPlayer) -> Box<dyn PlayerState> {
        println!("《{}》: 播放 -> 暂停", player.track);
        Box::new(PausedState)
    }
    fn stop(self: Box<Self>, player: &AudioPlayer) -> Box<dyn PlayerState> {
        println!("《{}》: 播放 -> 停止", player.track);
        Box::new(StoppedState)
    }
    fn name(&self) -> &str {
        "播放中"
    }
}

// 具体状态：暂停
struct PausedState;
impl PlayerState for PausedState {
    fn play(self: Box<Self>, player: &AudioPlayer) -> Box<dyn PlayerState> {
        println!("《{}》: 暂停 -> 继续播放", player.track);
        Box::new(PlayingState)
    }
    fn pause(self: Box<Self>, _player: &AudioPlayer) -> Box<dyn PlayerState> {
        println!("已经处于暂停状态");
        self
    }
    fn stop(self: Box<Self>, player: &AudioPlayer) -> Box<dyn PlayerState> {
        println!("《{}》: 暂停 -> 停止", player.track);
        Box::new(StoppedState)
    }
    fn name(&self) -> &str {
        "暂停"
    }
}

// 上下文：音频播放器，把具体行为委托给当前状态
struct AudioPlayer {
    track: String,
    state: Option<Box<dyn PlayerState>>,
}

impl AudioPlayer {
    fn new(track: &str) -> Self {
        AudioPlayer {
            track: track.to_string(),
            state: Some(Box::new(StoppedState)),
        }
    }

    // take() 取出当前状态的所有权，转换后再放回去，
    // 避免了对 self.state 的可变借用与状态转换方法调用同时存在
    fn play(&mut self) {
        if let Some(state) = self.state.take() {
            self.state = Some(state.play(self));
        }
    }

    fn pause(&mut self) {
        if let Some(state) = self.state.take() {
            self.state = Some(state.pause(self));
        }
    }

    fn stop(&mut self) {
        if let Some(state) = self.state.take() {
            self.state = Some(state.stop(self));
        }
    }

    fn current_state(&self) -> &str {
        self.state.as_ref().map(|s| s.name()).unwrap_or("未知")
    }
}

fn main() {
    println!("=== 状态模式：音频播放器演示 ===\n");

    let mut player = AudioPlayer::new("夜曲");
    println!("初始状态: {}\n", player.current_state());

    player.play();
    println!("当前状态: {}\n", player.current_state());

    player.pause();
    println!("当前状态: {}\n", player.current_state());

    player.pause(); // 重复暂停，验证幂等提示
    println!("当前状态: {}\n", player.current_state());

    player.play();
    println!("当前状态: {}\n", player.current_state());

    player.stop();
    println!("当前状态: {}", player.current_state());
}
