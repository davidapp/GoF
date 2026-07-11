# Command 命令模式（Objective-C）

## 意图

将请求封装成一个独立的对象，从而可以用不同的请求对客户进行参数化、对请求排队或记录日志，并支持可撤销的操作。

## 适用场景

- 需要把"操作"作为一等对象传递、存储或排队（如遥控器按钮、菜单项、任务队列）
- 需要支持撤销/重做
- 希望调用者与真正执行操作的对象解耦

## 实现方式

`Light` 是接收者，真正执行开关灯逻辑。`LightOnCommand`/`LightOffCommand` 把"开灯"“关灯"这两个请求封装成对象，遵循统一的 `Command` 协议。`RemoteControl` 是调用者，只依赖 `Command` 协议，同时维护一个历史栈用于撤销：

```objc
@protocol Command <NSObject>
- (void)execute;
- (void)undo;
@end

- (void)pressButton:(id<Command>)command {
    [command execute];
    [_history addObject:command];
}

- (void)pressUndo {
    id<Command> last = _history.lastObject;
    [_history removeLastObject];
    [last undo];
}
```

## 文件说明

| 文件 | 说明 |
|------|------|
| `Command.h` | 接收者 `Light`、命令协议 `Command`、具体命令 `LightOnCommand`/`LightOffCommand`、调用者 `RemoteControl` 声明 |
| `Command.m` | 上述类型的实现 |
| `main.m` | 依次开灯、关灯，再连续两次撤销，最后演示历史为空时撤销 |
| `Makefile` | 编译与运行 |

## 编译与运行

```bash
make run    # 编译并运行
make        # 仅编译
make clean  # 清理
```

## 输出示例

```
=== 按下开灯按钮 ===
客厅 的灯：开
 
=== 按下关灯按钮 ===
客厅 的灯：关
 
=== 按下撤销按钮（应恢复为开灯） ===
撤销上一步操作:
客厅 的灯：开
 
=== 再次撤销（应恢复到最初的关灯状态） ===
撤销上一步操作:
客厅 的灯：关
 
=== 没有更多历史时再撤销 ===
没有可撤销的操作
```

（预期输出 —— 本机未安装 ObjC 工具链，未实机运行）

## 要点

1. **请求即对象** —— `LightOnCommand`/`LightOffCommand` 把"做什么"封装成对象，`RemoteControl` 不需要写一堆 `if/else` 判断按的是哪个按钮。
2. **撤销是命令自身的职责** —— 每个命令知道如何撤销自己（开灯的反面是关灯），调用者只管调用 `undo`，不关心具体怎么撤销。
3. **历史栈实现撤销** —— `RemoteControl` 维护一个执行过的命令栈，`pressUndo` 弹出最近一条并调用其 `undo`，天然支持连续多次撤销。
