// 外观模式（Facade）—— 家庭影院演示
//
// HomeTheaterFacade 把投影仪、功放、灯光、播放器这几个子系统的
// 复杂交互顺序封装成两个简单方法：watch_movie() / end_movie()，
// 客户端不需要了解、也不需要记住各子系统的调用顺序。

// 子系统：投影仪
struct Projector;
impl Projector {
    fn on(&self) {
        println!("投影仪：开启");
    }
    fn set_input(&self, source: &str) {
        println!("投影仪：切换输入到 {}", source);
    }
    fn off(&self) {
        println!("投影仪：关闭");
    }
}

// 子系统：功放
struct Amplifier;
impl Amplifier {
    fn on(&self) {
        println!("功放：开启");
    }
    fn set_volume(&self, v: u32) {
        println!("功放：音量设置为 {}", v);
    }
    fn off(&self) {
        println!("功放：关闭");
    }
}

// 子系统：灯光
struct Lights;
impl Lights {
    fn dim(&self, level: u32) {
        println!("灯光：调暗到 {}%", level);
    }
    fn on(&self) {
        println!("灯光：恢复到 100%");
    }
}

// 子系统：流媒体播放器
struct StreamingPlayer;
impl StreamingPlayer {
    fn on(&self) {
        println!("播放器：开启");
    }
    fn play(&self, movie: &str) {
        println!("播放器：播放《{}》", movie);
    }
    fn stop(&self) {
        println!("播放器：停止播放");
    }
    fn off(&self) {
        println!("播放器：关闭");
    }
}

// 外观：统一封装各子系统的协调逻辑
struct HomeTheaterFacade {
    projector: Projector,
    amplifier: Amplifier,
    lights: Lights,
    player: StreamingPlayer,
}

impl HomeTheaterFacade {
    fn new() -> Self {
        HomeTheaterFacade {
            projector: Projector,
            amplifier: Amplifier,
            lights: Lights,
            player: StreamingPlayer,
        }
    }

    fn watch_movie(&self, movie: &str) {
        println!("--- 准备观影：{} ---", movie);
        self.lights.dim(10);
        self.projector.on();
        self.projector.set_input("HDMI Streaming");
        self.amplifier.on();
        self.amplifier.set_volume(60);
        self.player.on();
        self.player.play(movie);
        println!("--- 一切就绪，请欣赏 ---");
    }

    fn end_movie(&self) {
        println!("--- 结束观影 ---");
        self.player.stop();
        self.player.off();
        self.amplifier.off();
        self.projector.off();
        self.lights.on();
    }
}

fn main() {
    println!("=== 外观模式：家庭影院演示 ===\n");

    let home_theater = HomeTheaterFacade::new();
    home_theater.watch_movie("盗梦空间");
    println!();
    home_theater.end_movie();
}
