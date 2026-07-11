package main

import "fmt"

// 实现部分接口：设备（TV、Radio 等具体设备实现此接口）
type Device interface {
	Name() string
	IsEnabled() bool
	Enable()
	Disable()
	GetVolume() int
	SetVolume(percent int)
}

// 具体实现：电视机
type TV struct {
	enabled bool
	volume  int
}

func NewTV() *TV {
	return &TV{volume: 30}
}

func (t *TV) Name() string    { return "电视" }
func (t *TV) IsEnabled() bool { return t.enabled }
func (t *TV) Enable()         { t.enabled = true }
func (t *TV) Disable()        { t.enabled = false }
func (t *TV) GetVolume() int  { return t.volume }

func (t *TV) SetVolume(percent int) {
	t.volume = clamp(percent, 0, 100)
}

// 具体实现：收音机
type Radio struct {
	enabled bool
	volume  int
}

func NewRadio() *Radio {
	return &Radio{volume: 50}
}

func (r *Radio) Name() string    { return "收音机" }
func (r *Radio) IsEnabled() bool { return r.enabled }
func (r *Radio) Enable()         { r.enabled = true }
func (r *Radio) Disable()        { r.enabled = false }
func (r *Radio) GetVolume() int  { return r.volume }

func (r *Radio) SetVolume(percent int) {
	r.volume = clamp(percent, 0, 100)
}

func clamp(v, lo, hi int) int {
	if v < lo {
		return lo
	}
	if v > hi {
		return hi
	}
	return v
}

// 抽象部分：遥控器，持有一个 Device（桥接关系），
// 与具体设备实现解耦，二者可沿各自维度独立扩展。
type RemoteControl struct {
	device Device
}

func (r *RemoteControl) TogglePower() string {
	if r.device.IsEnabled() {
		r.device.Disable()
		return r.device.Name() + " 已关闭"
	}
	r.device.Enable()
	return r.device.Name() + " 已开启"
}

func (r *RemoteControl) VolumeUp() string {
	r.device.SetVolume(r.device.GetVolume() + 10)
	return fmt.Sprintf("%s 音量提升至 %d", r.device.Name(), r.device.GetVolume())
}

func (r *RemoteControl) VolumeDown() string {
	r.device.SetVolume(r.device.GetVolume() - 10)
	return fmt.Sprintf("%s 音量降低至 %d", r.device.Name(), r.device.GetVolume())
}

// 扩展抽象：高级遥控器，组合 RemoteControl 复用基础功能（而非继承），并新增静音等功能
type AdvancedRemoteControl struct {
	RemoteControl
}

func NewAdvancedRemoteControl(device Device) *AdvancedRemoteControl {
	return &AdvancedRemoteControl{RemoteControl: RemoteControl{device: device}}
}

func (r *AdvancedRemoteControl) Mute() string {
	r.device.SetVolume(0)
	return r.device.Name() + " 已静音"
}

func main() {
	fmt.Println("=== 桥接模式：遥控器与设备 ===")

	basicRemote := &RemoteControl{device: NewTV()}
	fmt.Println(basicRemote.TogglePower())
	fmt.Println(basicRemote.VolumeUp())

	fmt.Println()

	advancedRemote := NewAdvancedRemoteControl(NewRadio())
	fmt.Println(advancedRemote.TogglePower())
	fmt.Println(advancedRemote.VolumeUp())
	fmt.Println(advancedRemote.Mute())
}
