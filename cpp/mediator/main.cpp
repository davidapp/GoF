#include "chatroom.h"
#include <iostream>

// 中介者模式：User 之间不直接持有彼此的引用，
// 所有收发消息都通过 ChatRoom 转发，新增/移除用户不会影响其他用户的代码。
int main() {
    std::cout << "=== 中介者模式：聊天室 ===\n" << std::endl;

    ConcreteChatRoom room;
    User alice("Alice", room);
    User bob("Bob", room);
    User carol("Carol", room);

    alice.send_to("晚上一起吃饭吗？", "Bob");
    bob.send_to("好啊，几点？", "Alice");
    carol.send_all("大家好，我是新来的 Carol！");

    return 0;
}
