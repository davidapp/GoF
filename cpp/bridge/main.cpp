#include "device.h"
#include "remote.h"
#include <iostream>

// 桥接模式：RemoteControl（抽象）与 Device（实现）是两个独立的继承体系，
// 通过组合（持有引用）连接，任意搭配都不需要修改对方的代码。
int main() {
    std::cout << "=== 桥接模式：遥控器 x 设备 ===\n" << std::endl;

    TV tv;
    RemoteControl basic_remote(tv);
    std::cout << "[基础遥控器 操作电视机]" << std::endl;
    basic_remote.toggle_power();
    basic_remote.volume_up();
    basic_remote.volume_up();
    basic_remote.volume_down();

    std::cout << std::endl;

    Radio radio;
    AdvancedRemoteControl advanced_remote(radio);
    std::cout << "[高级遥控器 操作收音机]" << std::endl;
    advanced_remote.toggle_power();
    advanced_remote.volume_up();
    advanced_remote.mute();
    advanced_remote.mute();

    return 0;
}
