#pragma once
#include <string>

// 子系统类：投影仪
class Projector {
public:
    void on();
    void set_input(const std::string& source);
    void off();
};

// 子系统类：功放
class Amplifier {
public:
    void on();
    void set_volume(int level);
    void off();
};

// 子系统类：灯光
class Lights {
public:
    void dim(int level);
};

// 子系统类：播放器
class DiscPlayer {
public:
    void play(const std::string& movie);
    void stop();
};

// 外观：为四个子系统提供统一的高层接口，屏蔽内部协调细节
class HomeTheaterFacade {
public:
    HomeTheaterFacade(Projector& projector, Amplifier& amplifier, Lights& lights, DiscPlayer& player)
        : projector_(projector), amplifier_(amplifier), lights_(lights), player_(player) {}

    void watch_movie(const std::string& movie);
    void end_movie();

private:
    Projector& projector_;
    Amplifier& amplifier_;
    Lights& lights_;
    DiscPlayer& player_;
};
