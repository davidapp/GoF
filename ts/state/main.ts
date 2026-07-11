/**
 * 状态模式（State）
 * 场景：音频播放器 —— Playing / Paused / Stopped 状态下 play/pause/stop 行为各不相同。
 *
 * 核心思想：允许对象在内部状态改变时改变它的行为，
 * 使对象看起来像是修改了它的类。将每个状态的行为封装到独立的状态类中，
 * 避免在 Context 里写一堆 if/switch 判断当前状态。
 */

// ---------- 状态接口（State） ----------
interface PlayerState {
  readonly name: string;
  play(player: AudioPlayer): void;
  pause(player: AudioPlayer): void;
  stop(player: AudioPlayer): void;
}

// ---------- 具体状态（Concrete State） ----------
class PlayingState implements PlayerState {
  readonly name = "播放中";

  play(_player: AudioPlayer): void {
    console.log("已经在播放了，无需重复播放");
  }
  pause(player: AudioPlayer): void {
    console.log("暂停播放");
    player.setState(new PausedState());
  }
  stop(player: AudioPlayer): void {
    console.log("停止播放");
    player.setState(new StoppedState());
  }
}

class PausedState implements PlayerState {
  readonly name = "已暂停";

  play(player: AudioPlayer): void {
    console.log("从暂停处继续播放");
    player.setState(new PlayingState());
  }
  pause(_player: AudioPlayer): void {
    console.log("已经处于暂停状态");
  }
  stop(player: AudioPlayer): void {
    console.log("从暂停状态直接停止");
    player.setState(new StoppedState());
  }
}

class StoppedState implements PlayerState {
  readonly name = "已停止";

  play(player: AudioPlayer): void {
    console.log("从头开始播放");
    player.setState(new PlayingState());
  }
  pause(_player: AudioPlayer): void {
    console.log("已停止，无法暂停");
  }
  stop(_player: AudioPlayer): void {
    console.log("已经是停止状态");
  }
}

// ---------- 上下文（Context） ----------
class AudioPlayer {
  private state: PlayerState = new StoppedState();

  setState(state: PlayerState): void {
    this.state = state;
    console.log(`  (当前状态切换为: ${state.name})`);
  }

  getStateName(): string {
    return this.state.name;
  }

  play(): void {
    this.state.play(this);
  }
  pause(): void {
    this.state.pause(this);
  }
  stop(): void {
    this.state.stop(this);
  }
}

// ---------- 演示 ----------
function main(): void {
  const player = new AudioPlayer();
  console.log(`初始状态: ${player.getStateName()}`);

  console.log("\n--- 调用 play() ---");
  player.play();

  console.log("\n--- 调用 pause() ---");
  player.pause();

  console.log("\n--- 再次调用 pause()（重复暂停） ---");
  player.pause();

  console.log("\n--- 调用 play()（从暂停恢复） ---");
  player.play();

  console.log("\n--- 调用 stop() ---");
  player.stop();

  console.log("\n--- 调用 pause()（已停止，无法暂停） ---");
  player.pause();
}

main();
