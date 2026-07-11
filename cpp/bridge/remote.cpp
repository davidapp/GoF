#include "remote.h"
#include <iostream>

void RemoteControl::toggle_power() {
    if (device_.is_on()) {
        device_.power_off();
    } else {
        device_.power_on();
    }
}

void RemoteControl::volume_up() { device_.set_volume(device_.volume() + 10); }

void RemoteControl::volume_down() { device_.set_volume(device_.volume() - 10); }

void AdvancedRemoteControl::mute() {
    if (device_.volume() > 0) {
        volume_before_mute_ = device_.volume();
        device_.set_volume(0);
        std::cout << "  [高级遥控器] 已静音" << std::endl;
    } else {
        device_.set_volume(volume_before_mute_);
        std::cout << "  [高级遥控器] 取消静音" << std::endl;
    }
}
