#include "command.h"
#include <iostream>

void Light::on() { std::cout << "  [" << room_ << "的灯] 开启" << std::endl; }
void Light::off() { std::cout << "  [" << room_ << "的灯] 关闭" << std::endl; }

void LightOnCommand::execute() { light_.on(); }
void LightOnCommand::undo() { light_.off(); }
std::string LightOnCommand::name() const { return "开灯命令(" + light_.room() + ")"; }

void LightOffCommand::execute() { light_.off(); }
void LightOffCommand::undo() { light_.on(); }
std::string LightOffCommand::name() const { return "关灯命令(" + light_.room() + ")"; }

void RemoteControl::press_button(std::unique_ptr<Command> command) {
    std::cout << "按下按钮: " << command->name() << std::endl;
    command->execute();
    history_.push_back(std::move(command));
}

void RemoteControl::press_undo() {
    if (history_.empty()) {
        std::cout << "没有可撤销的操作" << std::endl;
        return;
    }
    auto command = std::move(history_.back());
    history_.pop_back();
    std::cout << "按下撤销键，撤销: " << command->name() << std::endl;
    command->undo();
}
