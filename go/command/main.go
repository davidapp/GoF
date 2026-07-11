package main

import "fmt"

// 命令接口：统一的执行/撤销操作
type Command interface {
	Execute() string
	Undo() string
}

// 接收者：灯，真正执行业务逻辑的对象
type Light struct {
	Location string
	on       bool
}

func NewLight(location string) *Light {
	return &Light{Location: location}
}

func (l *Light) On() string {
	l.on = true
	return l.Location + " 的灯已打开"
}

func (l *Light) Off() string {
	l.on = false
	return l.Location + " 的灯已关闭"
}

// 具体命令：开灯
type LightOnCommand struct {
	light *Light
}

func NewLightOnCommand(light *Light) *LightOnCommand {
	return &LightOnCommand{light: light}
}

func (c *LightOnCommand) Execute() string { return c.light.On() }
func (c *LightOnCommand) Undo() string    { return c.light.Off() }

// 具体命令：关灯
type LightOffCommand struct {
	light *Light
}

func NewLightOffCommand(light *Light) *LightOffCommand {
	return &LightOffCommand{light: light}
}

func (c *LightOffCommand) Execute() string { return c.light.Off() }
func (c *LightOffCommand) Undo() string    { return c.light.On() }

// 调用者：遥控器，记录已执行的命令历史以支持撤销，不关心命令具体做了什么
type RemoteControl struct {
	history []Command
}

func (r *RemoteControl) PressButton(cmd Command) {
	fmt.Println(cmd.Execute())
	r.history = append(r.history, cmd)
}

func (r *RemoteControl) PressUndo() {
	n := len(r.history)
	if n == 0 {
		fmt.Println("没有可撤销的操作")
		return
	}
	last := r.history[n-1]
	r.history = r.history[:n-1]
	fmt.Println("撤销:", last.Undo())
}

func main() {
	fmt.Println("=== 命令模式：遥控器与撤销 ===")

	livingRoomLight := NewLight("客厅")
	bedroomLight := NewLight("卧室")

	remote := &RemoteControl{}

	remote.PressButton(NewLightOnCommand(livingRoomLight))
	remote.PressButton(NewLightOnCommand(bedroomLight))
	remote.PressButton(NewLightOffCommand(livingRoomLight))

	fmt.Println("\n--- 依次撤销 ---")
	remote.PressUndo()
	remote.PressUndo()
	remote.PressUndo()
	remote.PressUndo() // 已无历史记录
}
