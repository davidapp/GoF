/**
 * 中介者模式（Mediator）
 * 场景：聊天室 —— User 通过 ChatRoom 中介收发消息，用户之间彼此解耦。
 *
 * 核心思想：用一个中介对象封装一组对象之间的交互方式，
 * 使各对象不需要显式地相互引用，从而降低耦合，交互逻辑集中管理。
 */

// ---------- 抽象中介者（Mediator） ----------
interface ChatMediator {
  register(user: User): void;
  sendMessage(message: string, sender: User): void;
}

// ---------- 具体中介者（Concrete Mediator） ----------
class ChatRoom implements ChatMediator {
  private readonly users: User[] = [];

  register(user: User): void {
    this.users.push(user);
    console.log(`(${user.getName()} 加入了聊天室)`);
  }

  sendMessage(message: string, sender: User): void {
    for (const user of this.users) {
      if (user !== sender) {
        user.receive(message, sender.getName());
      }
    }
  }
}

// ---------- 同事类（Colleague）：只与中介者交互，不直接引用其他 User ----------
class User {
  constructor(
    private readonly name: string,
    private readonly mediator: ChatMediator,
  ) {
    this.mediator.register(this);
  }

  getName(): string {
    return this.name;
  }

  send(message: string): void {
    console.log(`[${this.name} 发送]: ${message}`);
    this.mediator.sendMessage(message, this);
  }

  receive(message: string, from: string): void {
    console.log(`  -> ${this.name} 收到来自「${from}」的消息: ${message}`);
  }
}

// ---------- 演示 ----------
function main(): void {
  const chatRoom = new ChatRoom();

  const alice = new User("Alice", chatRoom);
  const bob = new User("Bob", chatRoom);
  const carol = new User("Carol", chatRoom);

  console.log();
  alice.send("大家好，我是 Alice！");

  console.log();
  bob.send("Alice 你好，我是 Bob。");

  console.log();
  carol.send("欢迎欢迎，我是 Carol，很高兴认识大家。");
}

main();
