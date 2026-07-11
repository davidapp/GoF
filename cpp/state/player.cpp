#include "player.h"
#include <iostream>

AudioPlayer::AudioPlayer() : state_(std::make_unique<StoppedState>()) {}

void AudioPlayer::play() { state_->play(*this); }
void AudioPlayer::pause() { state_->pause(*this); }
void AudioPlayer::stop() { state_->stop(*this); }

void AudioPlayer::set_state(std::unique_ptr<PlayerState> state) {
    std::cout << "  (状态切换: " << state_->name() << " -> " << state->name() << ")" << std::endl;
    state_ = std::move(state);
}

void StoppedState::play(AudioPlayer& player) {
    std::cout << "开始播放 " << player.track() << std::endl;
    player.set_state(std::make_unique<PlayingState>());
}
void StoppedState::pause(AudioPlayer& /*player*/) { std::cout << "已经是停止状态，无法暂停" << std::endl; }
void StoppedState::stop(AudioPlayer& /*player*/) { std::cout << "已经是停止状态" << std::endl; }

void PlayingState::play(AudioPlayer& /*player*/) { std::cout << "正在播放中，忽略重复的播放请求" << std::endl; }
void PlayingState::pause(AudioPlayer& player) {
    std::cout << "暂停播放" << std::endl;
    player.set_state(std::make_unique<PausedState>());
}
void PlayingState::stop(AudioPlayer& player) {
    std::cout << "停止播放" << std::endl;
    player.set_state(std::make_unique<StoppedState>());
}

void PausedState::play(AudioPlayer& player) {
    std::cout << "从暂停处继续播放 " << player.track() << std::endl;
    player.set_state(std::make_unique<PlayingState>());
}
void PausedState::pause(AudioPlayer& /*player*/) { std::cout << "已经是暂停状态，无法重复暂停" << std::endl; }
void PausedState::stop(AudioPlayer& player) {
    std::cout << "从暂停状态直接停止" << std::endl;
    player.set_state(std::make_unique<StoppedState>());
}
