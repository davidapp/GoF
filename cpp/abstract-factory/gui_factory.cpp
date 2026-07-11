#include "gui_factory.h"
#include <iostream>

std::string WinButton::render() const { return "[Windows 按钮]"; }
std::string WinButton::on_click() const { return "Windows 按钮：播放系统点击音效"; }

std::string WinCheckbox::render() const { return "[Windows 复选框]"; }
std::string WinCheckbox::toggle() const { return "Windows 复选框：方形勾选切换"; }

std::string MacButton::render() const { return "(macOS 按钮)"; }
std::string MacButton::on_click() const { return "macOS 按钮：播放轻柔点击反馈"; }

std::string MacCheckbox::render() const { return "(macOS 复选框)"; }
std::string MacCheckbox::toggle() const { return "macOS 复选框：圆角勾选切换"; }

std::unique_ptr<Button> WinFactory::create_button() const {
    return std::make_unique<WinButton>();
}
std::unique_ptr<Checkbox> WinFactory::create_checkbox() const {
    return std::make_unique<WinCheckbox>();
}
std::string WinFactory::name() const { return "Windows"; }

std::unique_ptr<Button> MacFactory::create_button() const {
    return std::make_unique<MacButton>();
}
std::unique_ptr<Checkbox> MacFactory::create_checkbox() const {
    return std::make_unique<MacCheckbox>();
}
std::string MacFactory::name() const { return "macOS"; }

// 客户端只与抽象工厂打交道：换一个工厂即可整体切换控件风格
Application::Application(const GUIFactory& factory)
    : button_(factory.create_button()),
      checkbox_(factory.create_checkbox()),
      platform_(factory.name()) {}

void Application::render_ui() const {
    std::cout << "--- 渲染 " << platform_ << " 界面 ---" << std::endl;
    std::cout << "  " << button_->render() << std::endl;
    std::cout << "  " << checkbox_->render() << std::endl;
    std::cout << "  " << button_->on_click() << std::endl;
    std::cout << "  " << checkbox_->toggle() << std::endl;
}
