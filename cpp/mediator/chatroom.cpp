#include "chatroom.h"
#include <iostream>

void ConcreteChatRoom::register_user(User* user) { users_.push_back(user); }

void ConcreteChatRoom::send(const std::string& message, User* from, const std::string& to_name) {
    for (auto* user : users_) {
        if (user->name() == to_name) {
            user->receive(from->name(), message);
            return;
        }
    }
    std::cout << "  [聊天室] 找不到用户: " << to_name << std::endl;
}

void ConcreteChatRoom::broadcast(const std::string& message, User* from) {
    for (auto* user : users_) {
        if (user != from) {
            user->receive(from->name(), message);
        }
    }
}

User::User(std::string name, ChatRoom& room) : name_(std::move(name)), room_(room) {
    room_.register_user(this);
}

void User::send_to(const std::string& message, const std::string& to_name) {
    std::cout << "[" << name_ << " -> " << to_name << "] " << message << std::endl;
    room_.send(message, this, to_name);
}

void User::send_all(const std::string& message) {
    std::cout << "[" << name_ << " -> 所有人] " << message << std::endl;
    room_.broadcast(message, this);
}

void User::receive(const std::string& from, const std::string& message) const {
    std::cout << "  (" << name_ << " 收到 " << from << " 的消息: " << message << ")" << std::endl;
}
