import Foundation

// 中介者模式：聊天室
// 场景：User 通过 ChatRoom 中介收发消息，彼此解耦

// MARK: - 中介者协议
protocol ChatMediator: AnyObject {
    func send(message: String, from user: User)
    func register(_ user: User)
}

// MARK: - 具体中介者：聊天室，负责转发消息，解耦各个 User
final class ChatRoom: ChatMediator {
    private var users: [User] = []

    func register(_ user: User) {
        users.append(user)
        user.mediator = self
    }

    func send(message: String, from sender: User) {
        for user in users where user !== sender {
            user.receive(message: message, from: sender)
        }
    }
}

// MARK: - 同事类：聊天室中的用户，彼此之间不直接通信，只通过中介者
final class User {
    let name: String
    // weak：用户不应该拥有中介者的强引用，避免 ChatRoom <-> User 之间的循环引用
    weak var mediator: ChatMediator?

    init(name: String) {
        self.name = name
    }

    func send(_ message: String) {
        print("\(name) 发送: \(message)")
        mediator?.send(message: message, from: self)
    }

    func receive(message: String, from sender: User) {
        print("  \(name) 收到来自 \(sender.name) 的消息: \(message)")
    }
}

// MARK: - 顶层入口
print("=== 中介者模式：聊天室 ===\n")

let chatRoom = ChatRoom()

let alice = User(name: "Alice")
let bob = User(name: "Bob")
let carol = User(name: "Carol")

chatRoom.register(alice)
chatRoom.register(bob)
chatRoom.register(carol)

alice.send("大家好！")
print("")
bob.send("Alice 你好，我是 Bob")
