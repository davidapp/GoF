import Foundation

// 抽象工厂模式：跨平台 GUI 控件族
// 场景：为 Windows / macOS 生产成套的 Button + Checkbox，保证同一族控件风格一致

// MARK: - 抽象产品：按钮
protocol Button {
    func render() -> String
    func onClick() -> String
}

// MARK: - 抽象产品：复选框
protocol Checkbox {
    func render() -> String
    func toggle() -> String
}

// MARK: - 具体产品：Windows 系列
struct WindowsButton: Button {
    func render() -> String { "[Windows 按钮]" }
    func onClick() -> String { "Windows 按钮：播放系统点击音效" }
}

struct WindowsCheckbox: Checkbox {
    func render() -> String { "[Windows 复选框]" }
    func toggle() -> String { "Windows 复选框：方形勾选切换" }
}

// MARK: - 具体产品：macOS 系列
struct MacButton: Button {
    func render() -> String { "(macOS 按钮)" }
    func onClick() -> String { "macOS 按钮：播放系统点击音效" }
}

struct MacCheckbox: Checkbox {
    func render() -> String { "(macOS 复选框)" }
    func toggle() -> String { "macOS 复选框：圆角勾选切换" }
}

// MARK: - 抽象工厂：声明创建一族产品的接口
protocol GUIFactory {
    func createButton() -> Button
    func createCheckbox() -> Checkbox
}

// MARK: - 具体工厂：Windows 工厂，只生产 Windows 风格控件
struct WindowsFactory: GUIFactory {
    func createButton() -> Button { WindowsButton() }
    func createCheckbox() -> Checkbox { WindowsCheckbox() }
}

// MARK: - 具体工厂：macOS 工厂，只生产 macOS 风格控件
struct MacFactory: GUIFactory {
    func createButton() -> Button { MacButton() }
    func createCheckbox() -> Checkbox { MacCheckbox() }
}

// MARK: - 客户端：只依赖抽象工厂与抽象产品协议，不感知具体平台类型
struct Application {
    let button: Button
    let checkbox: Checkbox

    init(factory: GUIFactory) {
        self.button = factory.createButton()
        self.checkbox = factory.createCheckbox()
    }

    func render() -> String {
        "\(button.render()) \(checkbox.render())"
    }
}

// MARK: - 操作系统枚举：决定运行时选用哪个具体工厂
enum OperatingSystem: String {
    case windows = "Windows"
    case macOS = "macOS"

    var factory: GUIFactory {
        switch self {
        case .windows: return WindowsFactory()
        case .macOS: return MacFactory()
        }
    }
}

// MARK: - 顶层入口
print("=== 抽象工厂模式：跨平台 GUI 控件 ===\n")

for os in [OperatingSystem.windows, OperatingSystem.macOS] {
    let app = Application(factory: os.factory)
    print("当前系统：\(os.rawValue)")
    print("渲染界面：\(app.render())")
    print(app.button.onClick())
    print(app.checkbox.toggle())
    print("---")
}
