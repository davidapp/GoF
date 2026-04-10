#include "singleton.h"
#include <iostream>

// 模拟两个不同模块各自获取 Logger
void module_a() {
    auto& logger = Logger::instance();
    logger.log("module_a: 正在初始化");
}

void module_b() {
    auto& logger = Logger::instance();
    logger.log("module_b: 正在处理数据");
}

int main() {
    // 首次获取实例，设置日志级别
    auto& logger = Logger::instance();
    logger.set_level("DEBUG");
    logger.log("main: 程序启动");

    // 不同模块拿到的是同一个实例，所以日志级别也是 DEBUG
    module_a();
    module_b();

    // 验证：打印实例地址，证明是同一个对象
    std::cout << "\n地址验证:" << std::endl;
    std::cout << "  main    中的 Logger 地址: " << &Logger::instance() << std::endl;
    std::cout << "  再次获取的 Logger 地址: " << &Logger::instance() << std::endl;

    return 0;
}
