#include "player.h"
#include <iostream>

// 状态模式：AudioPlayer 把 play/pause/stop 都委托给当前 PlayerState，
// 同样调用 play()，在不同状态下产生完全不同的行为，状态切换封装在状态类内部。
int main() {
    std::cout << "=== 状态模式：音频播放器 ===\n" << std::endl;

    AudioPlayer player;

    player.pause();  // 停止状态下暂停 -> 无效操作
    player.play();   // 停止 -> 播放
    player.play();   // 播放中再次播放 -> 忽略
    player.pause();  // 播放 -> 暂停
    player.play();   // 暂停 -> 继续播放
    player.stop();   // 播放 -> 停止

    return 0;
}
