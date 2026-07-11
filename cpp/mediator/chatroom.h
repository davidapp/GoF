#pragma once
#include <string>
#include <vector>

class User;  // 前置声明，User 与 ChatRoom 互相引用

// 抽象中介者：声明用户之间通信所需的接口
class ChatRoom {
public:
    virtual ~ChatRoom() = default;
    virtual void register_user(User* user) = 0;
    virtual void send(const std::string& message, User* from, const std::string& to_name) = 0;
    virtual void broadcast(const std::string& message, User* from) = 0;
};

// 具体中介者：聊天室，集中管理用户列表与消息分发
class ConcreteChatRoom : public ChatRoom {
public:
    void register_user(User* user) override;
    void send(const std::string& message, User* from, const std::string& to_name) override;
    void broadcast(const std::string& message, User* from) override;

private:
    std::vector<User*> users_;
};

// 同事类：用户，只持有中介者的引用，彼此之间不直接通信
class User {
public:
    User(std::string name, ChatRoom& room);

    const std::string& name() const { return name_; }

    void send_to(const std::string& message, const std::string& to_name);
    void send_all(const std::string& message);
    void receive(const std::string& from, const std::string& message) const;

private:
    std::string name_;
    ChatRoom& room_;
};
