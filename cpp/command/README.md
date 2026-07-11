# Command 命令模式（C++）

## 意图

将一个请求封装为一个对象，从而可用不同的请求对客户进行参数化；对请求排队或记录请求日志，以及支持可撤销的操作。

## 适用场景

- 需要将“发出请求”与“执行请求”解耦（如遥控器按钮与具体电器操作）
- 需要支持撤销/重做、请求排队、记录操作日志
- 需要把请求作为参数传递、存储或在不同时间执行

## 实现方式

`Light` 是接收者，真正知道如何开关灯；`Command` 是抽象命令，声明 `execute()`/`undo()`；`LightOnCommand`/`LightOffCommand` 把“对哪个 Light 做什么操作”封装成对象；`RemoteControl`（调用者）只负责触发命令并把执行过的命令压入历史栈：

```cpp
void RemoteControl::press_button(std::unique_ptr<Command> command) {
    command->execute();
    history_.push_back(std::move(command));   // 记录历史，供 undo 使用
}

void RemoteControl::press_undo() {
    auto command = std::move(history_.back());
    history_.pop_back();
    command->undo();
}
```

`RemoteControl` 完全不知道 `Light` 的存在，只认识 `Command` 接口，新增一种命令（如调节亮度）不需要改动 `RemoteControl`。

## 文件说明

| 文件 | 说明 |
|------|------|
| `command.h` | 接收者 `Light`、抽象命令 `Command`、两个具体命令、调用者 `RemoteControl` 的声明 |
| `command.cpp` | 各命令与调用者的具体实现 |
| `main.cpp` | 依次开关客厅/卧室的灯，再连续 4 次 undo 观察历史回放 |
| `Makefile` | 编译与运行 |

## 编译与运行

```bash
make        # 编译
make run    # 编译并运行
make clean  # 清理
```

## 输出示例

```
=== 命令模式：遥控器与撤销 ===

按下按钮: 开灯命令(客厅)
  [客厅的灯] 开启
按下按钮: 开灯命令(卧室)
  [卧室的灯] 开启
按下按钮: 关灯命令(客厅)
  [客厅的灯] 关闭

按下撤销键，撤销: 关灯命令(客厅)
  [客厅的灯] 开启
按下撤销键，撤销: 开灯命令(卧室)
  [卧室的灯] 关闭
按下撤销键，撤销: 开灯命令(客厅)
  [客厅的灯] 关闭
没有可撤销的操作
```

## 要点

1. **请求对象化** — 每个命令自己知道调用哪个接收者的哪个方法，调用者无需知道细节
2. **撤销的对称性** — `undo()` 与 `execute()` 一一对应，是命令自身职责的一部分
3. **调用者与接收者解耦** — `RemoteControl` 只依赖 `Command` 抽象接口，可以对接任意接收者
4. **历史栈天然支持多级撤销** — 用 `vector<unique_ptr<Command>>` 记录执行顺序，逆序弹出即可逐步撤销
