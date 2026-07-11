// ============================================================
// 外观模式（Facade）
// 场景：HomeTheaterFacade 一键 watchMovie()，内部协调投影仪/功放/灯光/播放器
// ============================================================

// ---- 子系统类：投影仪 ----
class Projector {
  on() {
    console.log('  投影仪: 开启电源');
  }
  setInput(source) {
    console.log(`  投影仪: 切换输入源为 ${source}`);
  }
  off() {
    console.log('  投影仪: 关闭电源');
  }
}

// ---- 子系统类：功放 ----
class Amplifier {
  on() {
    console.log('  功放: 开启电源');
  }
  setVolume(level) {
    console.log(`  功放: 音量设置为 ${level}`);
  }
  off() {
    console.log('  功放: 关闭电源');
  }
}

// ---- 子系统类：灯光 ----
class Lights {
  dim(level) {
    console.log(`  灯光: 调暗至 ${level}%`);
  }
  brighten() {
    console.log('  灯光: 恢复正常亮度');
  }
}

// ---- 子系统类：流媒体播放器 ----
class StreamingPlayer {
  on() {
    console.log('  播放器: 开启电源');
  }
  play(movie) {
    console.log(`  播放器: 开始播放《${movie}》`);
  }
  stop() {
    console.log('  播放器: 停止播放');
  }
  off() {
    console.log('  播放器: 关闭电源');
  }
}

// ---- 外观（Facade）：为复杂子系统提供一个简单的高层接口 ----
class HomeTheaterFacade {
  #projector;
  #amplifier;
  #lights;
  #player;

  constructor(projector, amplifier, lights, player) {
    this.#projector = projector;
    this.#amplifier = amplifier;
    this.#lights = lights;
    this.#player = player;
  }

  // 客户端只需调用这一个方法，无需了解四个子系统的调用顺序与细节
  watchMovie(movie) {
    console.log(`[外观] 准备观影环境，播放《${movie}》...`);
    this.#lights.dim(20);
    this.#projector.on();
    this.#projector.setInput('HDMI-流媒体播放器');
    this.#amplifier.on();
    this.#amplifier.setVolume(65);
    this.#player.on();
    this.#player.play(movie);
    console.log('[外观] 一切就绪，尽情享受观影吧！');
  }

  endMovie() {
    console.log('[外观] 结束观影，恢复房间状态...');
    this.#player.stop();
    this.#player.off();
    this.#amplifier.off();
    this.#projector.off();
    this.#lights.brighten();
    console.log('[外观] 已恢复至初始状态。');
  }
}

console.log('=== 外观模式：一键家庭影院 ===\n');

const homeTheater = new HomeTheaterFacade(
  new Projector(),
  new Amplifier(),
  new Lights(),
  new StreamingPlayer()
);

homeTheater.watchMovie('星际穿越');
console.log();
homeTheater.endMovie();
