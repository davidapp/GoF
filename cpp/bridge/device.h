#pragma once
#include <string>

// 实现化角色：设备（桥的“实现”一端），定义设备的底层操作
class Device {
public:
    virtual ~Device() = default;
    virtual std::string name() const = 0;
    virtual bool is_on() const = 0;
    virtual void power_on() = 0;
    virtual void power_off() = 0;
    virtual void set_volume(int percent) = 0;
    virtual int volume() const = 0;
};

// 具体实现化：电视机
class TV : public Device {
public:
    std::string name() const override { return "电视机"; }
    bool is_on() const override { return on_; }
    void power_on() override;
    void power_off() override;
    void set_volume(int percent) override;
    int volume() const override { return volume_; }

private:
    bool on_ = false;
    int volume_ = 30;
};

// 具体实现化：收音机
class Radio : public Device {
public:
    std::string name() const override { return "收音机"; }
    bool is_on() const override { return on_; }
    void power_on() override;
    void power_off() override;
    void set_volume(int percent) override;
    int volume() const override { return volume_; }

private:
    bool on_ = false;
    int volume_ = 20;
};
