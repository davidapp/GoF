#include "hometheater.h"
#include <iostream>

void Projector::on() { std::cout << "  投影仪：开启" << std::endl; }
void Projector::set_input(const std::string& source) {
    std::cout << "  投影仪：切换输入源为 " << source << std::endl;
}
void Projector::off() { std::cout << "  投影仪：关闭" << std::endl; }

void Amplifier::on() { std::cout << "  功放：开启" << std::endl; }
void Amplifier::set_volume(int level) { std::cout << "  功放：音量设置为 " << level << std::endl; }
void Amplifier::off() { std::cout << "  功放：关闭" << std::endl; }

void Lights::dim(int level) { std::cout << "  灯光：调节至 " << level << "%" << std::endl; }

void DiscPlayer::play(const std::string& movie) {
    std::cout << "  播放器：播放《" << movie << "》" << std::endl;
}
void DiscPlayer::stop() { std::cout << "  播放器：停止播放" << std::endl; }

void HomeTheaterFacade::watch_movie(const std::string& movie) {
    std::cout << "[外观] 一键观影，正在协调各子系统..." << std::endl;
    lights_.dim(20);
    projector_.on();
    projector_.set_input("DiscPlayer");
    amplifier_.on();
    amplifier_.set_volume(60);
    player_.play(movie);
    std::cout << "[外观] 一切就绪，尽情观影吧！" << std::endl;
}

void HomeTheaterFacade::end_movie() {
    std::cout << "\n[外观] 一键关闭家庭影院..." << std::endl;
    player_.stop();
    amplifier_.off();
    projector_.off();
    lights_.dim(100);
    std::cout << "[外观] 已恢复至正常照明" << std::endl;
}
