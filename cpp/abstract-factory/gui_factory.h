#pragma once
#include <memory>
#include <string>

// 抽象产品：按钮
class Button {
public:
    virtual ~Button() = default;
    virtual std::string render() const = 0;
    virtual std::string on_click() const = 0;
};

// 抽象产品：复选框
class Checkbox {
public:
    virtual ~Checkbox() = default;
    virtual std::string render() const = 0;
    virtual std::string toggle() const = 0;
};

// 具体产品：Windows 风格按钮
class WinButton : public Button {
public:
    std::string render() const override;
    std::string on_click() const override;
};

// 具体产品：Windows 风格复选框
class WinCheckbox : public Checkbox {
public:
    std::string render() const override;
    std::string toggle() const override;
};

// 具体产品：macOS 风格按钮
class MacButton : public Button {
public:
    std::string render() const override;
    std::string on_click() const override;
};

// 具体产品：macOS 风格复选框
class MacCheckbox : public Checkbox {
public:
    std::string render() const override;
    std::string toggle() const override;
};

// 抽象工厂：负责生产一整套相互匹配的控件
class GUIFactory {
public:
    virtual ~GUIFactory() = default;
    virtual std::unique_ptr<Button> create_button() const = 0;
    virtual std::unique_ptr<Checkbox> create_checkbox() const = 0;
    virtual std::string name() const = 0;
};

// 具体工厂：生产 Windows 控件族
class WinFactory : public GUIFactory {
public:
    std::unique_ptr<Button> create_button() const override;
    std::unique_ptr<Checkbox> create_checkbox() const override;
    std::string name() const override;
};

// 具体工厂：生产 macOS 控件族
class MacFactory : public GUIFactory {
public:
    std::unique_ptr<Button> create_button() const override;
    std::unique_ptr<Checkbox> create_checkbox() const override;
    std::string name() const override;
};

// 客户端：只依赖抽象工厂/抽象产品，不关心具体平台是谁
class Application {
public:
    explicit Application(const GUIFactory& factory);
    void render_ui() const;

private:
    std::unique_ptr<Button> button_;
    std::unique_ptr<Checkbox> checkbox_;
    std::string platform_;
};
