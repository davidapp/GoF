#import <Foundation/Foundation.h>
#import "AbstractFactory.h"

// 根据平台名称返回对应的具体工厂（模拟运行时检测操作系统）
static id<GUIFactory> GUIFactoryForPlatform(NSString *platform) {
    if ([platform isEqualToString:@"windows"]) {
        return [[WindowsFactory alloc] init];
    } else if ([platform isEqualToString:@"mac"]) {
        return [[MacFactory alloc] init];
    }
    NSLog(@"不支持的平台: %@", platform);
    return nil;
}

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSArray<NSString *> *platforms = @[@"windows", @"mac"];
        for (NSString *platform in platforms) {
            NSLog(@"=== 当前平台: %@ ===", platform);
            id<GUIFactory> factory = GUIFactoryForPlatform(platform);
            Application *app = [[Application alloc] initWithFactory:factory];
            [app renderUI];
        }
    }
    return 0;
}
