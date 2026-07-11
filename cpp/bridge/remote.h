#pragma once
#include "device.h"

// 抽象化角色：遥控器，持有一个 Device 引用——这就是“桥”
// 遥控器的种类（basic/advanced）与设备的种类（TV/Radio）可以独立变化
class RemoteControl {
public:
    explicit RemoteControl(Device& device) : device_(device) {}
    virtual ~RemoteControl() = default;

    virtual void toggle_power();
    virtual void volume_up();
    virtual void volume_down();

protected:
    Device& device_;  // 桥接点：抽象持有实现的引用，而非继承实现
};

// 扩充抽象化角色：高级遥控器，在基本操作之上增加静音功能
class AdvancedRemoteControl : public RemoteControl {
public:
    explicit AdvancedRemoteControl(Device& device) : RemoteControl(device) {}

    void mute();

private:
    int volume_before_mute_ = 0;
};
