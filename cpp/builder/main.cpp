#include "computer.h"
#include <iostream>

// 建造者模式：Director 用同一套装配流程，驱动不同 Builder 产出不同配置；
// 客户端也可以绕开 Director，自行挑选步骤定制专属配置。
int main() {
    std::cout << "=== 建造者模式：分步组装 Computer ===\n" << std::endl;

    GamingComputerBuilder gaming_builder;
    Director gaming_director(gaming_builder);
    auto gaming_pc = gaming_director.construct();
    std::cout << "[游戏主机预设] " << gaming_pc->describe() << std::endl;

    OfficeComputerBuilder office_builder;
    Director office_director(office_builder);
    auto office_pc = office_director.construct();
    std::cout << "[办公主机预设] " << office_pc->describe() << std::endl;

    // 不经过 Director，客户端自行选择步骤，只装 CPU 和内存
    GamingComputerBuilder custom_builder;
    custom_builder.build_cpu().build_ram();
    auto custom_pc = custom_builder.result();
    std::cout << "[自定义配置]   " << custom_pc->describe() << std::endl;

    return 0;
}
