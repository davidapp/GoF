#import <Foundation/Foundation.h>
#import "Builder.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        ComputerDirector *director = [[ComputerDirector alloc] init];

        NSLog(@"=== 使用 Director 预设：办公电脑 ===");
        Computer *office = [director buildOfficePCWithBuilder:[[ComputerBuilder alloc] init]];
        NSLog(@"%@", [office specification]);

        NSLog(@"=== 使用 Director 预设：游戏电脑 ===");
        Computer *gaming = [director buildGamingPCWithBuilder:[[ComputerBuilder alloc] init]];
        NSLog(@"%@", [gaming specification]);

        NSLog(@"=== 客户端跳过 Director，自行组装（体现链式 Builder 的灵活性）===");
        ComputerBuilder *builder = [[ComputerBuilder alloc] init];
        [builder setCPU:@"AMD Ryzen 9"];
        [builder setMemory:@"64GB"];
        [builder setStorage:@"4TB NVMe"];
        [builder setGPU:@"AMD Radeon RX 7900"];
        Computer *custom = [builder build];
        NSLog(@"%@", [custom specification]);
    }
    return 0;
}
