#include "device.h"
#include <algorithm>
#include <iostream>

void TV::power_on() {
    on_ = true;
    std::cout << "  [电视机] 开机，画面点亮" << std::endl;
}
void TV::power_off() {
    on_ = false;
    std::cout << "  [电视机] 关机" << std::endl;
}
void TV::set_volume(int percent) {
    volume_ = std::clamp(percent, 0, 100);
    std::cout << "  [电视机] 音量调整为 " << volume_ << std::endl;
}

void Radio::power_on() {
    on_ = true;
    std::cout << "  [收音机] 开机，开始接收信号" << std::endl;
}
void Radio::power_off() {
    on_ = false;
    std::cout << "  [收音机] 关机" << std::endl;
}
void Radio::set_volume(int percent) {
    volume_ = std::clamp(percent, 0, 100);
    std::cout << "  [收音机] 音量调整为 " << volume_ << std::endl;
}
