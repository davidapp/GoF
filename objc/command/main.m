#import <Foundation/Foundation.h>
#import "Command.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        Light *livingRoomLight = [[Light alloc] initWithLocation:@"客厅"];

        id<Command> lightOn = [[LightOnCommand alloc] initWithLight:livingRoomLight];
        id<Command> lightOff = [[LightOffCommand alloc] initWithLight:livingRoomLight];

        RemoteControl *remote = [[RemoteControl alloc] init];

        NSLog(@"=== 按下开灯按钮 ===");
        [remote pressButton:lightOn];

        NSLog(@" ");
        NSLog(@"=== 按下关灯按钮 ===");
        [remote pressButton:lightOff];

        NSLog(@" ");
        NSLog(@"=== 按下撤销按钮（应恢复为开灯） ===");
        [remote pressUndo];

        NSLog(@" ");
        NSLog(@"=== 再次撤销（应恢复到最初的关灯状态） ===");
        [remote pressUndo];

        NSLog(@" ");
        NSLog(@"=== 没有更多历史时再撤销 ===");
        [remote pressUndo];
    }
    return 0;
}
