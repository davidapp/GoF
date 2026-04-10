#pragma once
#include <string>

// 单例模式（Singleton）
// 确保一个类只有一个实例，并提供全局访问点。
// 这里使用 C++11 的 Meyers' Singleton —— 利用局部静态变量的线程安全初始化。

class Logger {
public:
    // 获取唯一实例
    static Logger& instance() {
        static Logger inst;
        return inst;
    }

    void set_level(const std::string& level) { level_ = level; }
    const std::string& level() const { return level_; }

    void log(const std::string& message) const;

    // 禁止拷贝和移动
    Logger(const Logger&) = delete;
    Logger& operator=(const Logger&) = delete;
    Logger(Logger&&) = delete;
    Logger& operator=(Logger&&) = delete;

private:
    Logger();  // 私有构造
    ~Logger() = default;

    std::string level_;
};
