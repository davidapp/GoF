package main

import "fmt"

// 子系统：投影仪
type Projector struct{}

func (p *Projector) On()  { fmt.Println("投影仪: 开启") }
func (p *Projector) Off() { fmt.Println("投影仪: 关闭") }

func (p *Projector) SetInput(source string) {
	fmt.Println("投影仪: 切换输入源为", source)
}

// 子系统：功放
type Amplifier struct{}

func (a *Amplifier) On()  { fmt.Println("功放: 开启") }
func (a *Amplifier) Off() { fmt.Println("功放: 关闭") }

func (a *Amplifier) SetVolume(level int) {
	fmt.Printf("功放: 音量设置为 %d\n", level)
}

// 子系统：灯光
type Lights struct{}

func (l *Lights) Dim(level int) {
	fmt.Printf("灯光: 调暗至 %d%%\n", level)
}

func (l *Lights) On() {
	fmt.Println("灯光: 恢复明亮")
}

// 子系统：流媒体播放器
type StreamingPlayer struct{}

func (s *StreamingPlayer) Play(movie string) {
	fmt.Println("播放器: 正在播放《" + movie + "》")
}

func (s *StreamingPlayer) Stop() {
	fmt.Println("播放器: 停止播放")
}

// 外观：为投影仪/功放/灯光/播放器等复杂子系统提供简单统一的高层接口
type HomeTheaterFacade struct {
	projector *Projector
	amplifier *Amplifier
	lights    *Lights
	player    *StreamingPlayer
}

func NewHomeTheaterFacade() *HomeTheaterFacade {
	return &HomeTheaterFacade{
		projector: &Projector{},
		amplifier: &Amplifier{},
		lights:    &Lights{},
		player:    &StreamingPlayer{},
	}
}

// WatchMovie 一键完成观影前所有子系统的协调工作，客户端无需了解内部细节
func (h *HomeTheaterFacade) WatchMovie(movie string) {
	fmt.Println("--- 准备观影 ---")
	h.lights.Dim(20)
	h.projector.On()
	h.projector.SetInput("流媒体")
	h.amplifier.On()
	h.amplifier.SetVolume(60)
	h.player.Play(movie)
}

// EndMovie 一键关闭所有子系统
func (h *HomeTheaterFacade) EndMovie() {
	fmt.Println("--- 结束观影 ---")
	h.player.Stop()
	h.amplifier.Off()
	h.projector.Off()
	h.lights.On()
}

func main() {
	fmt.Println("=== 外观模式：家庭影院 ===")

	theater := NewHomeTheaterFacade()
	theater.WatchMovie("盗梦空间")
	fmt.Println()
	theater.EndMovie()
}
