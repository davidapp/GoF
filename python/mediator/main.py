"""中介者模式（Mediator）
场景：聊天室 —— User 通过 ChatRoom 中介收发消息，彼此解耦。

核心思想：用一个中介对象来封装一系列对象之间的交互，使各对象不需要显式地
相互引用，从而使其可以独立地变化。若没有中介者，N 个用户两两直接通信需要
维护 O(N^2) 条关系；引入 ChatRoom 后，每个 User 只需认识中介者这一个对象。
"""

from __future__ import annotations

import sys
from abc import ABC, abstractmethod
from datetime import datetime

# Windows 控制台有时默认非 UTF-8 编码，强制切换避免中文输出乱码
if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8")


# ------------------------- 抽象中介者（Mediator） -------------------------
class ChatMediator(ABC):
    """抽象中介者：定义用户注册与转发消息的接口"""

    @abstractmethod
    def register(self, user: User) -> None: ...

    @abstractmethod
    def send(self, sender: User, message: str) -> None: ...

    @abstractmethod
    def send_private(self, sender: User, receiver_name: str, message: str) -> None: ...


# ------------------------- 具体中介者（Concrete Mediator） -------------------------
class ChatRoom(ChatMediator):
    """具体中介者：聊天室，负责在用户之间转发消息，用户彼此并不直接引用"""

    def __init__(self, name: str) -> None:
        self.name = name
        self._users: dict[str, User] = {}

    def register(self, user: User) -> None:
        self._users[user.name] = user
        self._broadcast_system(f"{user.name} 加入了聊天室「{self.name}」")

    def send(self, sender: User, message: str) -> None:
        timestamp = self._timestamp()
        for name, user in self._users.items():
            if name != sender.name:
                user.receive(sender.name, message, timestamp)

    def send_private(self, sender: User, receiver_name: str, message: str) -> None:
        receiver = self._users.get(receiver_name)
        if receiver is None:
            print(f"[系统] 用户 {receiver_name} 不存在，私信发送失败")
            return
        timestamp = self._timestamp()
        receiver.receive(f"{sender.name}（私信）", message, timestamp)

    def _broadcast_system(self, text: str) -> None:
        print(f"[系统 {self._timestamp()}] {text}")

    @staticmethod
    def _timestamp() -> str:
        return datetime.now().strftime("%H:%M:%S")


# ------------------------- 同事类（Colleague） -------------------------
class User:
    """同事类：聊天室里的用户，只与中介者交互，不持有其他用户的引用"""

    def __init__(self, name: str, mediator: ChatMediator) -> None:
        self.name = name
        self._mediator = mediator
        self._mediator.register(self)

    def send(self, message: str) -> None:
        print(f"{self.name} 说: {message}")
        self._mediator.send(self, message)

    def send_private(self, receiver_name: str, message: str) -> None:
        print(f"{self.name} 对 {receiver_name} 悄悄说: {message}")
        self._mediator.send_private(self, receiver_name, message)

    def receive(self, sender_name: str, message: str, timestamp: str) -> None:
        print(f"  [{timestamp}] {self.name} 收到来自 {sender_name} 的消息: {message}")


def main() -> None:
    chat_room = ChatRoom("GoF 学习交流群")

    alice = User("Alice", chat_room)
    bob = User("Bob", chat_room)
    carol = User("Carol", chat_room)

    print()
    alice.send("大家好，今天讲讲中介者模式吧")
    print()
    bob.send("好啊，我看完实现了，感觉和外观模式有点像")
    print()
    carol.send_private("Alice", "群里的资料能单独发我一份吗？")


if __name__ == "__main__":
    main()
