// ============================================================
// 状态模式（State）
// 场景：音频播放器 —— Playing/Paused/Stopped 状态下 play/pause/stop 行为不同
// ============================================================

// ---- 抽象状态（State）----
class PlayerState {
  play(player) {
    throw new Error('子类必须实现 play()');
  }
  pause(player) {
    throw new Error('子类必须实现 pause()');
  }
  stop(player) {
    throw new Error('子类必须实现 stop()');
  }
  get name() {
    throw new Error('子类必须实现 name');
  }
}

// ---- 具体状态：停止 ----
class StoppedState extends PlayerState {
  get name() {
    return '已停止';
  }
  play(player) {
    console.log('  从头开始播放');
    player.state = new PlayingState();
  }
  pause(player) {
    console.log('  已经是停止状态，无法暂停');
  }
  stop(player) {
    console.log('  已经是停止状态');
  }
}

// ---- 具体状态：播放中 ----
class PlayingState extends PlayerState {
  get name() {
    return '播放中';
  }
  play(player) {
    console.log('  已经在播放中');
  }
  pause(player) {
    console.log('  暂停播放');
    player.state = new PausedState();
  }
  stop(player) {
    console.log('  停止播放，播放进度归零');
    player.state = new StoppedState();
  }
}

// ---- 具体状态：暂停 ----
class PausedState extends PlayerState {
  get name() {
    return '已暂停';
  }
  play(player) {
    console.log('  从暂停处继续播放');
    player.state = new PlayingState();
  }
  pause(player) {
    console.log('  已经是暂停状态');
  }
  stop(player) {
    console.log('  停止播放，播放进度归零');
    player.state = new StoppedState();
  }
}

// ---- 上下文（Context）：持有当前状态，把动作委托给状态对象处理 ----
class AudioPlayer {
  state = new StoppedState(); // 初始状态

  play() {
    this.state.play(this);
    console.log(`  -> 当前状态: ${this.state.name}`);
  }
  pause() {
    this.state.pause(this);
    console.log(`  -> 当前状态: ${this.state.name}`);
  }
  stop() {
    this.state.stop(this);
    console.log(`  -> 当前状态: ${this.state.name}`);
  }
}

console.log('=== 状态模式：音频播放器 ===\n');

const player = new AudioPlayer();
console.log(`初始状态: ${player.state.name}\n`);

console.log('-- 调用 play() --');
player.play();

console.log('\n-- 调用 pause() --');
player.pause();

console.log('\n-- 在暂停状态下再调用 pause()（同一动作，因状态不同而结果不同）--');
player.pause();

console.log('\n-- 调用 play() 从暂停恢复 --');
player.play();

console.log('\n-- 调用 stop() --');
player.stop();

console.log('\n-- 在停止状态下调用 pause()（非法操作被状态对象自行拦截）--');
player.pause();
