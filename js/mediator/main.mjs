// ============================================================
// 中介者模式（Mediator）
// 场景：聊天室 —— User 通过 ChatRoom 中介收发消息，彼此解耦
// ============================================================

// ---- 抽象中介者 ----
class ChatMediator {
  register(user) {
    throw new Error('子类必须实现 register()');
  }
  send(message, from, to) {
    throw new Error('子类必须实现 send()');
  }
  broadcast(message, from) {
    throw new Error('子类必须实现 broadcast()');
  }
}

// ---- 具体中介者：聊天室，集中管理所有用户之间的通信 ----
class ChatRoom extends ChatMediator {
  #users = new Map();

  register(user) {
    this.#users.set(user.name, user);
    user.mediator = this; // 让同事对象持有中介者引用
    console.log(`  [聊天室] ${user.name} 加入了聊天室`);
  }

  // 私聊：点对点转发
  send(message, from, toName) {
    const receiver = this.#users.get(toName);
    if (!receiver) {
      console.log(`  [聊天室] 用户 ${toName} 不存在，消息发送失败`);
      return;
    }
    receiver.receive(message, from);
  }

  // 群发：广播给除发送者外的所有人
  broadcast(message, from) {
    for (const [name, user] of this.#users) {
      if (name !== from.name) {
        user.receive(message, from, true);
      }
    }
  }
}

// ---- 同事类（Colleague）：用户之间不直接引用彼此，只与中介者交互 ----
class User {
  mediator = null;

  constructor(name) {
    this.name = name;
  }

  sendTo(message, toName) {
    console.log(`${this.name} 对 ${toName} 悄悄说: "${message}"`);
    this.mediator.send(message, this, toName);
  }

  sendToAll(message) {
    console.log(`${this.name} 在群里说: "${message}"`);
    this.mediator.broadcast(message, this);
  }

  receive(message, from, isBroadcast = false) {
    const tag = isBroadcast ? '[群聊]' : '[私聊]';
    console.log(`  ${tag} ${this.name} 收到来自 ${from.name} 的消息: "${message}"`);
  }
}

console.log('=== 中介者模式：聊天室转发消息 ===\n');

const chatRoom = new ChatRoom();

const alice = new User('Alice');
const bob = new User('Bob');
const carol = new User('Carol');

chatRoom.register(alice);
chatRoom.register(bob);
chatRoom.register(carol);

console.log('\n-- 私聊：Alice 只对 Bob 说话 --');
alice.sendTo('晚上一起吃饭吗？', 'Bob');

console.log('\n-- 群发：Bob 对所有人广播 --');
bob.sendToAll('大家好，我是新来的 Bob！');

console.log('\n-- 私聊一个不存在的用户 --');
carol.sendTo('你好？', 'Dave');

console.log('\n（注意：User 之间从未互相持有引用，全部通过 ChatRoom 转发，彼此解耦）');
