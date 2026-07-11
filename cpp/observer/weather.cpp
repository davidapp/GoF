#include "weather.h"
#include <algorithm>
#include <iostream>

void WeatherStation::attach(WeatherObserver* observer) { observers_.push_back(observer); }

void WeatherStation::detach(WeatherObserver* observer) {
    observers_.erase(std::remove(observers_.begin(), observers_.end(), observer), observers_.end());
}

void WeatherStation::set_measurements(double temperature, double humidity) {
    temperature_ = temperature;
    humidity_ = humidity;
    std::cout << "[气象站] 采集到新数据: 温度=" << temperature_ << "C, 湿度=" << humidity_ << "%"
              << std::endl;
    notify_all();
}

void WeatherStation::notify_all() const {
    for (auto* observer : observers_) {
        observer->update(temperature_, humidity_);
    }
}

void PhoneDisplay::update(double temperature, double humidity) {
    std::cout << "  [手机 App] 当前温度 " << temperature << "C，湿度 " << humidity << "%" << std::endl;
}

void BillboardDisplay::update(double temperature, double humidity) {
    std::cout << "  [广告屏] 温度: " << temperature << "C | 湿度: " << humidity << "%" << std::endl;
}
