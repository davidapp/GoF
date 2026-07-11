// 抽象工厂模式（Abstract Factory）—— 跨平台 GUI 演示
//
// 抽象工厂负责一次性生产“一整套”相互匹配的产品（Button + Checkbox），
// 客户端只依赖抽象接口，具体用 Windows 还是 macOS 的控件由传入的工厂决定。

// 抽象产品：按钮
trait Button {
    fn render(&self) -> String;
}

// 抽象产品：复选框
trait Checkbox {
    fn render(&self) -> String;
}

// 具体产品：Windows 风格控件
struct WindowsButton;
impl Button for WindowsButton {
    fn render(&self) -> String {
        "[ Windows 按钮 ]".to_string()
    }
}

struct WindowsCheckbox;
impl Checkbox for WindowsCheckbox {
    fn render(&self) -> String {
        "[x] Windows 复选框".to_string()
    }
}

// 具体产品：macOS 风格控件
struct MacButton;
impl Button for MacButton {
    fn render(&self) -> String {
        "(  macOS 按钮  )".to_string()
    }
}

struct MacCheckbox;
impl Checkbox for MacCheckbox {
    fn render(&self) -> String {
        "(✓) macOS 复选框".to_string()
    }
}

// 抽象工厂：声明创建一整套产品的接口
trait GuiFactory {
    fn create_button(&self) -> Box<dyn Button>;
    fn create_checkbox(&self) -> Box<dyn Checkbox>;
}

// 具体工厂：Windows 工厂，只生产 Windows 风格控件
struct WindowsFactory;
impl GuiFactory for WindowsFactory {
    fn create_button(&self) -> Box<dyn Button> {
        Box::new(WindowsButton)
    }
    fn create_checkbox(&self) -> Box<dyn Checkbox> {
        Box::new(WindowsCheckbox)
    }
}

// 具体工厂：macOS 工厂，只生产 macOS 风格控件
struct MacFactory;
impl GuiFactory for MacFactory {
    fn create_button(&self) -> Box<dyn Button> {
        Box::new(MacButton)
    }
    fn create_checkbox(&self) -> Box<dyn Checkbox> {
        Box::new(MacCheckbox)
    }
}

// 客户端代码：只依赖抽象工厂与抽象产品，不知道具体平台
fn render_ui(factory: &dyn GuiFactory) {
    let button = factory.create_button();
    let checkbox = factory.create_checkbox();
    println!("按钮   -> {}", button.render());
    println!("复选框 -> {}", checkbox.render());
}

fn main() {
    println!("=== 抽象工厂模式：跨平台 GUI 演示 ===\n");

    println!("-- 运行在 Windows 上 --");
    render_ui(&WindowsFactory);

    println!("\n-- 运行在 macOS 上 --");
    render_ui(&MacFactory);
}
