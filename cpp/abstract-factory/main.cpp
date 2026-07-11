#include "gui_factory.h"
#include <iostream>
#include <memory>
#include <vector>

// 抽象工厂模式：为不同平台生产成套的 Button + Checkbox，
// 客户端代码 (Application) 全程不知道具体是哪个平台的控件。
int main() {
    std::cout << "=== 抽象工厂模式：跨平台 GUI 控件族 ===\n" << std::endl;

    std::vector<std::unique_ptr<GUIFactory>> factories;
    factories.push_back(std::make_unique<WinFactory>());
    factories.push_back(std::make_unique<MacFactory>());

    for (const auto& factory : factories) {
        Application app(*factory);
        app.render_ui();
        std::cout << std::endl;
    }

    return 0;
}
