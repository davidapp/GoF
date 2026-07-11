#pragma once
#include <string>
#include <vector>

// 抽象观察者
class WeatherObserver {
public:
    virtual ~WeatherObserver() = default;
    virtual void update(double temperature, double humidity) = 0;
};

// 目标（Subject）：气象站，维护观察者列表，数据变化时统一通知
class WeatherStation {
public:
    void attach(WeatherObserver* observer);
    void detach(WeatherObserver* observer);
    void set_measurements(double temperature, double humidity);

private:
    void notify_all() const;

    std::vector<WeatherObserver*> observers_;
    double temperature_ = 0.0;
    double humidity_ = 0.0;
};

// 具体观察者：手机 App 显示屏
class PhoneDisplay : public WeatherObserver {
public:
    void update(double temperature, double humidity) override;
};

// 具体观察者：室外电子广告屏
class BillboardDisplay : public WeatherObserver {
public:
    void update(double temperature, double humidity) override;
};
