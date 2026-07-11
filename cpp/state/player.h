#pragma once
#include <memory>
#include <string>

class AudioPlayer;  // 前置声明

// 抽象状态：声明播放器在各状态下都可能收到的操作
class PlayerState {
public:
    virtual ~PlayerState() = default;
    virtual void play(AudioPlayer& player) = 0;
    virtual void pause(AudioPlayer& player) = 0;
    virtual void stop(AudioPlayer& player) = 0;
    virtual std::string name() const = 0;
};

// 上下文：音频播放器，把 play/pause/stop 都委托给当前状态对象
class AudioPlayer {
public:
    AudioPlayer();

    void play();
    void pause();
    void stop();

    void set_state(std::unique_ptr<PlayerState> state);
    const std::string& track() const { return track_; }

private:
    std::unique_ptr<PlayerState> state_;
    std::string track_ = "《夜曲》";
};

// 具体状态：停止
class StoppedState : public PlayerState {
public:
    void play(AudioPlayer& player) override;
    void pause(AudioPlayer& player) override;
    void stop(AudioPlayer& player) override;
    std::string name() const override { return "停止"; }
};

// 具体状态：播放中
class PlayingState : public PlayerState {
public:
    void play(AudioPlayer& player) override;
    void pause(AudioPlayer& player) override;
    void stop(AudioPlayer& player) override;
    std::string name() const override { return "播放中"; }
};

// 具体状态：暂停
class PausedState : public PlayerState {
public:
    void play(AudioPlayer& player) override;
    void pause(AudioPlayer& player) override;
    void stop(AudioPlayer& player) override;
    std::string name() const override { return "暂停"; }
};
