// ============================================================
// 命令模式（Command）
// 场景：遥控器 —— LightOn/LightOff 命令，支持 undo
// ============================================================

// ---- 接收者（Receiver）：真正执行业务逻辑的对象 ----
class Light {
  #isOn = false;

  constructor(location) {
    this.location = location;
  }

  turnOn() {
    this.#isOn = true;
    console.log(`  [${this.location}的灯] 已打开`);
  }

  turnOff() {
    this.#isOn = false;
    console.log(`  [${this.location}的灯] 已关闭`);
  }

  get isOn() {
    return this.#isOn;
  }
}

// ---- 抽象命令（Command）：统一 execute() / undo() 接口 ----
class Command {
  execute() {
    throw new Error('子类必须实现 execute()');
  }
  undo() {
    throw new Error('子类必须实现 undo()');
  }
}

// ---- 具体命令：开灯 / 关灯 ----
class LightOnCommand extends Command {
  #light;
  constructor(light) {
    super();
    this.#light = light;
  }
  execute() {
    this.#light.turnOn();
  }
  undo() {
    this.#light.turnOff(); // 开灯的反操作是关灯
  }
}

class LightOffCommand extends Command {
  #light;
  constructor(light) {
    super();
    this.#light = light;
  }
  execute() {
    this.#light.turnOff();
  }
  undo() {
    this.#light.turnOn(); // 关灯的反操作是开灯
  }
}

// 一个稍复杂的命令：调节亮度，undo 时恢复到调节前的数值（体现命令可携带状态）
class DimLightCommand extends Command {
  #light;
  #newLevel;
  #previousLevel = 100;

  constructor(light, newLevel) {
    super();
    this.#light = light;
    this.#newLevel = newLevel;
  }

  execute() {
    console.log(`  [${this.#light.location}的灯] 亮度调整为 ${this.#newLevel}%`);
  }

  undo() {
    console.log(`  [${this.#light.location}的灯] 亮度恢复为 ${this.#previousLevel}%`);
  }
}

// ---- 调用者（Invoker）：只知道调用 execute()/undo()，不知道具体命令的实现细节 ----
class RemoteControl {
  #history = [];

  pressButton(command) {
    command.execute();
    this.#history.push(command); // 记录历史，供撤销使用
  }

  pressUndo() {
    const command = this.#history.pop();
    if (!command) {
      console.log('  没有可撤销的操作了');
      return;
    }
    console.log('  执行撤销:');
    command.undo();
  }
}

console.log('=== 命令模式：遥控器控制灯光，支持撤销 ===\n');

const livingRoomLight = new Light('客厅');
const bedroomLight = new Light('卧室');

const remote = new RemoteControl();

console.log('-- 依次按下：开客厅灯、开卧室灯、关客厅灯 --');
remote.pressButton(new LightOnCommand(livingRoomLight));
remote.pressButton(new LightOnCommand(bedroomLight));
remote.pressButton(new LightOffCommand(livingRoomLight));

console.log('\n-- 按下撤销键 3 次，逆序撤销刚才的操作 --');
remote.pressUndo(); // 撤销“关客厅灯” -> 重新开灯
remote.pressUndo(); // 撤销“开卧室灯” -> 关灯
remote.pressUndo(); // 撤销“开客厅灯” -> 关灯

console.log('\n-- 再次撤销：历史记录已空 --');
remote.pressUndo();

console.log('\n-- 调光命令示例 --');
remote.pressButton(new DimLightCommand(livingRoomLight, 40));
remote.pressUndo();
