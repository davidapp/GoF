/**
 * 外观模式（Facade）
 * 场景：HomeTheaterFacade 一键 watchMovie()，内部协调投影仪/功放/灯光/播放器。
 *
 * 核心思想：为复杂子系统提供一个统一的高层接口，
 * 降低客户端与子系统之间的耦合，客户端无需了解子系统内部细节。
 */

// ---------- 子系统类（Subsystem Classes） ----------
class Projector {
  turnOn(): void {
    console.log("投影仪：开启");
  }
  setInput(source: string): void {
    console.log(`投影仪：切换输入源为 ${source}`);
  }
  turnOff(): void {
    console.log("投影仪：关闭");
  }
}

class Amplifier {
  turnOn(): void {
    console.log("功放：开启");
  }
  setVolume(level: number): void {
    console.log(`功放：音量设置为 ${level}`);
  }
  turnOff(): void {
    console.log("功放：关闭");
  }
}

class Lights {
  dim(level: number): void {
    console.log(`灯光：调暗至 ${level}%`);
  }
  brighten(): void {
    console.log("灯光：恢复明亮");
  }
}

class StreamingPlayer {
  play(movie: string): void {
    console.log(`播放器：开始播放《${movie}》`);
  }
  stop(): void {
    console.log("播放器：停止播放");
  }
}

// ---------- 外观（Facade）：协调各子系统，提供简单接口 ----------
class HomeTheaterFacade {
  constructor(
    private readonly projector: Projector,
    private readonly amplifier: Amplifier,
    private readonly lights: Lights,
    private readonly player: StreamingPlayer,
  ) {}

  watchMovie(movie: string): void {
    console.log(`--- 准备观影：《${movie}》 ---`);
    this.lights.dim(20);
    this.projector.turnOn();
    this.projector.setInput("HDMI-Streaming");
    this.amplifier.turnOn();
    this.amplifier.setVolume(15);
    this.player.play(movie);
    console.log("--- 一切就绪，请欣赏电影 ---");
  }

  endMovie(): void {
    console.log("--- 结束观影，恢复房间状态 ---");
    this.player.stop();
    this.amplifier.turnOff();
    this.projector.turnOff();
    this.lights.brighten();
  }
}

// ---------- 演示 ----------
function main(): void {
  const homeTheater = new HomeTheaterFacade(
    new Projector(),
    new Amplifier(),
    new Lights(),
    new StreamingPlayer(),
  );

  homeTheater.watchMovie("星际穿越");
  console.log();
  homeTheater.endMovie();
}

main();
