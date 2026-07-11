#import <Foundation/Foundation.h>
#import "Bridge.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSLog(@"=== 基础遥控器 x 电视机 ===");
        RemoteControl *tvRemote = [[RemoteControl alloc] initWithDevice:[[TV alloc] init]];
        [tvRemote togglePower];
        [tvRemote volumeUp];
        [tvRemote volumeUp];

        NSLog(@" ");
        NSLog(@"=== 高级遥控器 x 收音机 ===");
        AdvancedRemoteControl *radioRemote = [[AdvancedRemoteControl alloc] initWithDevice:[[Radio alloc] init]];
        [radioRemote togglePower];
        [radioRemote volumeUp];
        [radioRemote mute];

        NSLog(@" ");
        NSLog(@"=== 高级遥控器同样可以控制电视机（两个维度自由组合） ===");
        AdvancedRemoteControl *tvAdvanced = [[AdvancedRemoteControl alloc] initWithDevice:[[TV alloc] init]];
        [tvAdvanced togglePower];
        [tvAdvanced mute];
    }
    return 0;
}
