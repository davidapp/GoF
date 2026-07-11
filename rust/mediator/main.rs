// 中介者模式（Mediator）—— 聊天室演示
//
// User 之间不直接互相持有引用，全部通过 ChatRoom 中介转发消息，
// 从而互相解耦：新增/删除一个 User 不影响其他 User 的实现。
//
// 注意 ChatRoom 持有所有 User 的强引用（Rc），如果 User 反过来也
// 用 Rc 持有 ChatRoom，会形成引用循环导致内存永远无法释放；这里
// User 用 Weak<ChatRoom> 保存对中介者的反向引用，避免循环引用。

use std::cell::RefCell;
use std::rc::{Rc, Weak};

// 中介者接口
trait Mediator {
    fn send_message(&self, from: &str, message: &str);
}

// 具体中介者：聊天室，持有所有用户的强引用
struct ChatRoom {
    users: RefCell<Vec<Rc<User>>>,
}

impl ChatRoom {
    fn new() -> Rc<Self> {
        Rc::new(ChatRoom { users: RefCell::new(Vec::new()) })
    }
}

impl Mediator for ChatRoom {
    fn send_message(&self, from: &str, message: &str) {
        for user in self.users.borrow().iter() {
            if user.name != from {
                user.receive(from, message);
            }
        }
    }
}

// 同事类：用户。只持有中介者的弱引用，收发消息都通过中介者完成，
// 用户之间彼此互不知晓、互不直接依赖。
struct User {
    name: String,
    mediator: Weak<ChatRoom>,
}

impl User {
    // 创建用户并自动注册到聊天室
    fn new(name: &str, mediator: &Rc<ChatRoom>) -> Rc<Self> {
        let user = Rc::new(User {
            name: name.to_string(),
            mediator: Rc::downgrade(mediator),
        });
        mediator.users.borrow_mut().push(Rc::clone(&user));
        user
    }

    fn send(&self, message: &str) {
        println!("{} 发送消息: {}", self.name, message);
        if let Some(mediator) = self.mediator.upgrade() {
            mediator.send_message(&self.name, message);
        }
    }

    fn receive(&self, from: &str, message: &str) {
        println!("  [{} 收到来自 {} 的消息]: {}", self.name, from, message);
    }
}

fn main() {
    println!("=== 中介者模式：聊天室演示 ===\n");

    let chat_room = ChatRoom::new();

    let alice = User::new("Alice", &chat_room);
    let bob = User::new("Bob", &chat_room);
    // Carol 注册后不需要保留本地引用，聊天室内部仍持有她的强引用
    User::new("Carol", &chat_room);

    alice.send("大家好！");
    println!();
    bob.send("你好 Alice，我是 Bob。");
}
