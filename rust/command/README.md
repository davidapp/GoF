# Command 命令模式（Rust）

## 意图
将请求封装成对象，从而可以用不同的请求对客户进行参数化，并支持将请求排队、记录日志、以及撤销操作。

## 适用场景
- 需要把“发出请求的对象”和“执行请求的对象”解耦（遥控器不需要知道灯的实现细节）
- 需要支持撤销/重做、操作历史、宏命令（批量执行一组命令）
- 需要将请求缓存、排队或者跨进程传递

## 实现方式
`Command` trait 声明 `execute`/`undo`；`LightOnCommand`/`LightOffCommand` 是具体命令，
持有对接收者 `Light` 的引用并把操作委托给它。因为同一个 `Light` 需要被多个命令对象共享
（开灯命令和关灯命令都要操作同一盏灯），这里用 `Rc<RefCell<Light>>` 实现共享可变状态：

```rust
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
}
```

`RemoteControl`（调用者）执行命令后把它压入 `history: Vec<Box<dyn Command>>`，
撤销时从栈顶弹出并调用其 `undo()`。

## 文件说明
| 文件 | 说明 |
|------|------|
| `main.rs` | `Command` 接口、`Light` 接收者、`LightOnCommand`/`LightOffCommand` 具体命令、`RemoteControl` 调用者、`main()` 演示 |

## 编译与运行
```bash
rustc main.rs && ./main
```

## 输出示例
```
=== 命令模式：遥控器与撤销演示 ===

[遥控器] 执行命令: 开灯(客厅灯)
客厅灯: 已打开
[遥控器] 执行命令: 关灯(客厅灯)
客厅灯: 已关闭

-- 执行撤销 --
[遥控器] 撤销命令: 关灯(客厅灯)
客厅灯: 已打开

-- 再次撤销 --
[遥控器] 撤销命令: 开灯(客厅灯)
客厅灯: 已关闭

-- 没有更多命令时撤销 --
[遥控器] 没有可撤销的操作

[主程序独立读取] 客厅灯最终是否开启: false
```
（预期输出（本机未安装 Rust，未实机运行）。）

## 要点
1. **`Rc<RefCell<Light>>` 让多个命令共享同一个接收者** —— `Rc::clone` 只是增加引用计数，
   `LightOnCommand` 和 `LightOffCommand` 操作的是同一盏灯，而不是各自的副本。
2. **`RefCell` 的借用都收敛在单条语句内** —— `self.light.borrow_mut().on()` 这种写法里，
   借用守卫（`RefMut`）在语句结束时立刻释放，不会与后续操作产生运行时借用冲突。
3. **历史栈天然支持撤销** —— `Vec<Box<dyn Command>>` 后进先出，`pop()` 出来的正好是
   最近一次执行的命令，调用其 `undo()` 即可精确撤销上一步操作。
4. **调用者与接收者完全解耦** —— `RemoteControl` 全程只接触 `Box<dyn Command>`，
   增加新的命令类型（如调节音量）不需要修改 `RemoteControl` 任何代码。
5. **`Light::is_on()` 让主程序也能独立验证最终状态** —— 得益于共享所有权，
   主程序在遥控器之外，仍可通过同一个 `Rc<RefCell<Light>>` 读到接收者的真实状态。
