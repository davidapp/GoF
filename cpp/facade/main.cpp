#include "hometheater.h"
#include <iostream>

// 外观模式：客户端只调用 HomeTheaterFacade 的两个方法，
// 不必了解投影仪、功放、灯光、播放器之间繁琐的协调顺序。
int main() {
    std::cout << "=== 外观模式：家庭影院 ===\n" << std::endl;

    Projector projector;
    Amplifier amplifier;
    Lights lights;
    DiscPlayer player;

    HomeTheaterFacade home_theater(projector, amplifier, lights, player);

    home_theater.watch_movie("肖申克的救赎");
    home_theater.end_movie();

    return 0;
}
