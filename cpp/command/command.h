#pragma once
#include <memory>
#include <string>
#include <vector>

// 接收者：电灯，真正执行操作的对象
class Light {
public:
    explicit Light(std::string room) : room_(std::move(room)) {}
    void on();
    void off();
    const std::string& room() const { return room_; }

private:
    std::string room_;
};

// 抽象命令：把请求封装成对象，统一提供 execute/undo
class Command {
public:
    virtual ~Command() = default;
    virtual void execute() = 0;
    virtual void undo() = 0;
    virtual std::string name() const = 0;
};

// 具体命令：开灯
class LightOnCommand : public Command {
public:
    explicit LightOnCommand(Light& light) : light_(light) {}
    void execute() override;
    void undo() override;
    std::string name() const override;

private:
    Light& light_;
};

// 具体命令：关灯
class LightOffCommand : public Command {
public:
    explicit LightOffCommand(Light& light) : light_(light) {}
    void execute() override;
    void undo() override;
    std::string name() const override;

private:
    Light& light_;
};

// 调用者：遥控器，记录命令历史以支持 undo，不知道命令具体做了什么
class RemoteControl {
public:
    void press_button(std::unique_ptr<Command> command);
    void press_undo();

private:
    std::vector<std::unique_ptr<Command>> history_;
};
