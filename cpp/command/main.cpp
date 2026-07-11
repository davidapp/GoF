#include "command.h"
#include <iostream>
#include <memory>

// 命令模式：把“开灯”“关灯”这些请求封装成对象，
// RemoteControl（调用者）不需要知道 Light（接收者）的具体实现，还能统一支持 undo。
int main() {
    std::cout << "=== 命令模式：遥控器与撤销 ===\n" << std::endl;

    Light living_room("客厅");
    Light bedroom("卧室");

    RemoteControl remote;

    remote.press_button(std::make_unique<LightOnCommand>(living_room));
    remote.press_button(std::make_unique<LightOnCommand>(bedroom));
    remote.press_button(std::make_unique<LightOffCommand>(living_room));

    std::cout << std::endl;
    remote.press_undo();  // 撤销“关闭客厅灯” -> 客厅灯重新打开
    remote.press_undo();  // 撤销“打开卧室灯” -> 卧室灯关闭
    remote.press_undo();  // 撤销“打开客厅灯” -> 客厅灯关闭
    remote.press_undo();  // 没有更多可撤销的操作

    return 0;
}
