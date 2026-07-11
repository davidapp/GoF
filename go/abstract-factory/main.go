package main

import "fmt"

// 抽象产品：按钮
type Button interface {
	Render() string
	OnClick() string
}

// 抽象产品：复选框
type Checkbox interface {
	Render() string
	Toggle() string
}

// ---- Windows 系列具体产品 ----

// 具体产品：Windows 按钮
type WindowsButton struct{}

func (b *WindowsButton) Render() string {
	return "[Windows 按钮]"
}

func (b *WindowsButton) OnClick() string {
	return "Windows 按钮被点击（Win32 消息）"
}

// 具体产品：Windows 复选框
type WindowsCheckbox struct{}

func (c *WindowsCheckbox) Render() string {
	return "[Windows 复选框]"
}

func (c *WindowsCheckbox) Toggle() string {
	return "Windows 复选框状态已切换"
}

// ---- macOS 系列具体产品 ----

// 具体产品：macOS 按钮
type MacButton struct{}

func (b *MacButton) Render() string {
	return "(macOS 按钮)"
}

func (b *MacButton) OnClick() string {
	return "macOS 按钮被点击（Cocoa 事件）"
}

// 具体产品：macOS 复选框
type MacCheckbox struct{}

func (c *MacCheckbox) Render() string {
	return "(macOS 复选框)"
}

func (c *MacCheckbox) Toggle() string {
	return "macOS 复选框状态已切换"
}

// 抽象工厂：声明一组创建方法，生产成套的相关产品（同一平台的 Button + Checkbox）
type GUIFactory interface {
	CreateButton() Button
	CreateCheckbox() Checkbox
}

// 具体工厂：Windows 控件工厂
type WindowsFactory struct{}

func (f *WindowsFactory) CreateButton() Button {
	return &WindowsButton{}
}

func (f *WindowsFactory) CreateCheckbox() Checkbox {
	return &WindowsCheckbox{}
}

// 具体工厂：macOS 控件工厂
type MacFactory struct{}

func (f *MacFactory) CreateButton() Button {
	return &MacButton{}
}

func (f *MacFactory) CreateCheckbox() Checkbox {
	return &MacCheckbox{}
}

// renderUI 是客户端代码：只依赖抽象工厂与抽象产品接口，
// 不关心运行时具体拿到的是 Windows 还是 macOS 的实现。
func renderUI(factory GUIFactory) {
	button := factory.CreateButton()
	checkbox := factory.CreateCheckbox()
	fmt.Println(button.Render())
	fmt.Println(button.OnClick())
	fmt.Println(checkbox.Render())
	fmt.Println(checkbox.Toggle())
}

func main() {
	fmt.Println("=== 抽象工厂模式：跨平台 GUI ===")

	fmt.Println("\n-- 构建 Windows 界面 --")
	renderUI(&WindowsFactory{})

	fmt.Println("\n-- 构建 macOS 界面 --")
	renderUI(&MacFactory{})
}
