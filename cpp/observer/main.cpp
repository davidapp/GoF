#include "weather.h"
#include <iostream>

// 观察者模式：WeatherStation 不知道具体有哪些 Display，
// 新增一种展示方式只需实现 WeatherObserver 并 attach，无需修改 WeatherStation。
int main() {
    std::cout << "=== 观察者模式：气象站 ===\n" << std::endl;

    WeatherStation station;
    PhoneDisplay phone;
    BillboardDisplay billboard;

    station.attach(&phone);
    station.attach(&billboard);

    station.set_measurements(28.5, 65.0);

    std::cout << "\n广告屏下线维护...\n" << std::endl;
    station.detach(&billboard);

    station.set_measurements(26.0, 70.0);

    return 0;
}
