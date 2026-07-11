#import <Foundation/Foundation.h>
#import "State.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        AudioPlayer *player = [[AudioPlayer alloc] init];

        NSLog(@"初始状态: %@", player.state.stateName);

        NSLog(@" ");
        NSLog(@"=== 调用 play ===");
        [player play];
        NSLog(@"当前状态: %@", player.state.stateName);

        NSLog(@" ");
        NSLog(@"=== 再次调用 play（应提示已在播放） ===");
        [player play];

        NSLog(@" ");
        NSLog(@"=== 调用 pause ===");
        [player pause];
        NSLog(@"当前状态: %@", player.state.stateName);

        NSLog(@" ");
        NSLog(@"=== 调用 play（从暂停恢复） ===");
        [player play];
        NSLog(@"当前状态: %@", player.state.stateName);

        NSLog(@" ");
        NSLog(@"=== 调用 stop ===");
        [player stop];
        NSLog(@"当前状态: %@", player.state.stateName);

        NSLog(@" ");
        NSLog(@"=== 停止状态下调用 pause（应提示无法暂停） ===");
        [player pause];
    }
    return 0;
}
