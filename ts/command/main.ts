/**
 * 命令模式（Command）
 * 场景：遥控器 —— LightOn/LightOff 命令，支持 undo。
 *
 * 核心思想：把请求封装成对象，从而可以用不同的请求对客户端进行参数化，
 * 并支持撤销、排队、记录日志等操作。
 */

// ---------- 接收者（Receiver）：真正执行业务逻辑的对象 ----------
class Light {
  private on = false;

  constructor(private readonly room: string) {}

  turnOn(): void {
    this.on = true;
    console.log(`${this.room}的灯：已打开`);
  }

  turnOff(): void {
    this.on = false;
    console.log(`${this.room}的灯：已关闭`);
  }

  isOn(): boolean {
    return this.on;
  }
}

// ---------- 命令接口（Command） ----------
interface Command {
  execute(): void;
  undo(): void;
  describe(): string;
}

// ---------- 具体命令（Concrete Command） ----------
class LightOnCommand implements Command {
  constructor(private readonly light: Light) {}

  execute(): void {
    this.light.turnOn();
  }
  undo(): void {
    this.light.turnOff();
  }
  describe(): string {
    return "开灯命令";
  }
}

class LightOffCommand implements Command {
  constructor(private readonly light: Light) {}

  execute(): void {
    this.light.turnOff();
  }
  undo(): void {
    this.light.turnOn();
  }
  describe(): string {
    return "关灯命令";
  }
}

// 空命令（Null Object），避免遥控器按钮未绑定时做 null 判断
class NoCommand implements Command {
  execute(): void {
    console.log("（该按钮未绑定任何命令）");
  }
  undo(): void {
    /* 无操作 */
  }
  describe(): string {
    return "空命令";
  }
}

// ---------- 调用者（Invoker）：遥控器，只知道调用 Command 接口 ----------
class RemoteControl {
  private slot: Command = new NoCommand();
  private readonly history: Command[] = [];

  setCommand(command: Command): void {
    this.slot = command;
  }

  pressButton(): void {
    this.slot.execute();
    this.history.push(this.slot);
  }

  pressUndo(): void {
    const last = this.history.pop();
    if (last === undefined) {
      console.log("没有可撤销的操作");
      return;
    }
    console.log(`撤销上一步：${last.describe()}`);
    last.undo();
  }
}

// ---------- 演示 ----------
function main(): void {
  const livingRoomLight = new Light("客厅");
  const bedroomLight = new Light("卧室");

  const remote = new RemoteControl();

  console.log("=== 打开客厅灯 ===");
  remote.setCommand(new LightOnCommand(livingRoomLight));
  remote.pressButton();

  console.log("\n=== 打开卧室灯 ===");
  remote.setCommand(new LightOnCommand(bedroomLight));
  remote.pressButton();

  console.log("\n=== 关闭客厅灯 ===");
  remote.setCommand(new LightOffCommand(livingRoomLight));
  remote.pressButton();

  console.log("\n=== 撤销上一步操作（重新打开客厅灯） ===");
  remote.pressUndo();

  console.log("\n=== 再撤销一步（关闭卧室灯） ===");
  remote.pressUndo();
}

main();
