#import <Foundation/Foundation.h>
#import "Singleton.h"

// 模拟模块 A：只管从 sharedLogger 拿到实例并记录日志
static void ModuleAInitialize(void) {
    Logger *logger = [Logger sharedLogger];
    [logger log:@"module_a: 正在初始化"];
}

// 模拟模块 B
static void ModuleBProcess(void) {
    Logger *logger = [Logger sharedLogger];
    [logger log:@"module_b: 正在处理数据"];
}

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        Logger *logger = [Logger sharedLogger];
        logger.level = LogLevelDebug;
        [logger log:@"main: 程序启动"];

        // 不同模块拿到的是同一个实例，因此日志级别也同样是 DEBUG
        ModuleAInitialize();
        ModuleBProcess();

        // 验证：无论用 sharedLogger 还是尝试 alloc/init，拿到的都是同一实例
        Logger *again = [Logger sharedLogger];
        Logger *viaAlloc = [[Logger alloc] init];

        NSLog(@" ");
        NSLog(@"地址验证:");
        NSLog(@"  main 中的 Logger 地址:        %p", (__bridge void *)logger);
        NSLog(@"  再次 sharedLogger 得到的地址: %p", (__bridge void *)again);
        NSLog(@"  alloc/init 得到的地址:        %p（allocWithZone 被拦截，依然是同一实例）", (__bridge void *)viaAlloc);
    }
    return 0;
}
