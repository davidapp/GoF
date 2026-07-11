// 命令模式（Command）—— 遥控器演示（支持 undo）
//
// 把“开灯”“关灯”这样的请求封装成实现了 Command trait 的对象，
// 调用者（RemoteControl）不需要知道接收者（Light）的具体细节，
// 只管执行命令，并把已执行的命令存入历史栈以支持撤销。
//
// 多个命令需要共享同一个 Light 接收者，这里用 Rc<RefCell<Light>>
// 实现共享可变状态。

use std::cell::RefCell;
use std::rc::Rc;

// 命令接口：支持执行与撤销
trait Command {
    fn execute(&mut self);
    fn undo(&mut self);
    fn name(&self) -> String;
}

// 接收者：真正知道如何完成操作的对象
struct Light {
    name: String,
    is_on: bool,
}

impl Light {
    fn new(name: &str) -> Self {
        Light { name: name.to_string(), is_on: false }
    }

    fn on(&mut self) {
        self.is_on = true;
        println!("{}: 已打开", self.name);
    }

    fn off(&mut self) {
        self.is_on = false;
        println!("{}: 已关闭", self.name);
    }

    fn is_on(&self) -> bool {
        self.is_on
    }
}

// 具体命令：开灯
struct LightOnCommand {
    light: Rc<RefCell<Light>>,
}
impl Command for LightOnCommand {
    fn execute(&mut self) {
        self.light.borrow_mut().on();
    }
    fn undo(&mut self) {
        self.light.borrow_mut().off();
    }
    fn name(&self) -> String {
        format!("开灯({})", self.light.borrow().name)
    }
}

// 具体命令：关灯
struct LightOffCommand {
    light: Rc<RefCell<Light>>,
}
impl Command for LightOffCommand {
    fn execute(&mut self) {
        self.light.borrow_mut().off();
    }
    fn undo(&mut self) {
        self.light.borrow_mut().on();
    }
    fn name(&self) -> String {
        format!("关灯({})", self.light.borrow().name)
    }
}

// 调用者：遥控器，记录命令历史以支持撤销
struct RemoteControl {
    history: Vec<Box<dyn Command>>,
}

impl RemoteControl {
    fn new() -> Self {
        RemoteControl { history: Vec::new() }
    }

    fn press_button(&mut self, mut command: Box<dyn Command>) {
        println!("[遥控器] 执行命令: {}", command.name());
        command.execute();
        self.history.push(command);
    }

    fn press_undo(&mut self) {
        match self.history.pop() {
            Some(mut command) => {
                println!("[遥控器] 撤销命令: {}", command.name());
                command.undo();
            }
            None => println!("[遥控器] 没有可撤销的操作"),
        }
    }
}

fn main() {
    println!("=== 命令模式：遥控器与撤销演示 ===\n");

    let living_room_light = Rc::new(RefCell::new(Light::new("客厅灯")));
    let mut remote = RemoteControl::new();

    remote.press_button(Box::new(LightOnCommand { light: Rc::clone(&living_room_light) }));
    remote.press_button(Box::new(LightOffCommand { light: Rc::clone(&living_room_light) }));

    println!("\n-- 执行撤销 --");
    remote.press_undo();

    println!("\n-- 再次撤销 --");
    remote.press_undo();

    println!("\n-- 没有更多命令时撤销 --");
    remote.press_undo();

    // 主程序也能通过共享的 Rc<RefCell<Light>> 独立读取接收者的最终状态
    println!(
        "\n[主程序独立读取] 客厅灯最终是否开启: {}",
        living_room_light.borrow().is_on()
    );
}
