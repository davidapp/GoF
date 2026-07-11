#import <Foundation/Foundation.h>
#import "Proxy.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSLog(@"=== 创建图片代理（此时尚未真正加载图片） ===");
        id<Image> photo = [[ImageProxy alloc] initWithFilename:@"vacation.jpg"];
        NSLog(@"代理已创建，注意上面并没有出现加载日志");

        NSLog(@" ");
        NSLog(@"=== 第一次调用 display（触发真正加载） ===");
        [photo display];

        NSLog(@" ");
        NSLog(@"=== 第二次调用 display（直接复用，不再重新加载） ===");
        [photo display];
    }
    return 0;
}
