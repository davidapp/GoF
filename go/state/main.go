package main

import "fmt"

// PlayerState 状态接口：定义各状态下对播放器操作的响应
type PlayerState interface {
	Play(player *AudioPlayer)
	Pause(player *AudioPlayer)
	Stop(player *AudioPlayer)
	Name() string
}

// PlayingState 具体状态：播放中
type PlayingState struct{}

func (s *PlayingState) Name() string { return "播放中" }

func (s *PlayingState) Play(player *AudioPlayer) {
	fmt.Println("已经在播放了")
}

func (s *PlayingState) Pause(player *AudioPlayer) {
	fmt.Println("暂停播放")
	player.SetState(&PausedState{})
}

func (s *PlayingState) Stop(player *AudioPlayer) {
	fmt.Println("停止播放")
	player.SetState(&StoppedState{})
}

// PausedState 具体状态：已暂停
type PausedState struct{}

func (s *PausedState) Name() string { return "已暂停" }

func (s *PausedState) Play(player *AudioPlayer) {
	fmt.Println("恢复播放")
	player.SetState(&PlayingState{})
}

func (s *PausedState) Pause(player *AudioPlayer) {
	fmt.Println("已经是暂停状态")
}

func (s *PausedState) Stop(player *AudioPlayer) {
	fmt.Println("停止播放")
	player.SetState(&StoppedState{})
}

// StoppedState 具体状态：已停止
type StoppedState struct{}

func (s *StoppedState) Name() string { return "已停止" }

func (s *StoppedState) Play(player *AudioPlayer) {
	fmt.Println("开始播放")
	player.SetState(&PlayingState{})
}

func (s *StoppedState) Pause(player *AudioPlayer) {
	fmt.Println("尚未播放，无法暂停")
}

func (s *StoppedState) Stop(player *AudioPlayer) {
	fmt.Println("已经是停止状态")
}

// AudioPlayer 上下文：音频播放器，将操作委托给当前状态对象处理
type AudioPlayer struct {
	state PlayerState
}

func NewAudioPlayer() *AudioPlayer {
	return &AudioPlayer{state: &StoppedState{}}
}

func (p *AudioPlayer) SetState(state PlayerState) {
	p.state = state
	fmt.Println("  (状态切换为:", p.state.Name(), ")")
}

func (p *AudioPlayer) Play()  { p.state.Play(p) }
func (p *AudioPlayer) Pause() { p.state.Pause(p) }
func (p *AudioPlayer) Stop()  { p.state.Stop(p) }

func main() {
	fmt.Println("=== 状态模式：音频播放器 ===")

	player := NewAudioPlayer()

	player.Play()
	player.Pause()
	player.Play()
	player.Stop()
	player.Pause()
}
