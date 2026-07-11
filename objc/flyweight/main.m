#import <Foundation/Foundation.h>
#import "Flyweight.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        Forest *forest = [[Forest alloc] init];

        // 种下 6 棵树，但只有"松树""枫树"两种类型，观察 TreeType 只被创建 2 次
        [forest plantTreeAtX:10 y:20 name:@"松树" color:@"深绿色" texture:@"粗糙树皮纹理"];
        [forest plantTreeAtX:15 y:25 name:@"松树" color:@"深绿色" texture:@"粗糙树皮纹理"];
        [forest plantTreeAtX:20 y:30 name:@"枫树" color:@"红色" texture:@"光滑树皮纹理"];
        [forest plantTreeAtX:22 y:31 name:@"松树" color:@"深绿色" texture:@"粗糙树皮纹理"];
        [forest plantTreeAtX:40 y:12 name:@"枫树" color:@"红色" texture:@"光滑树皮纹理"];
        [forest plantTreeAtX:41 y:13 name:@"枫树" color:@"红色" texture:@"光滑树皮纹理"];

        NSLog(@"=== 渲染森林 ===");
        [forest renderAll];

        NSLog(@" ");
        NSLog(@"树木总数: %lu 棵", (unsigned long)[forest treeCount]);
        NSLog(@"实际创建的 TreeType（享元）数量: %lu 个",
              (unsigned long)[[TreeTypeFactory sharedFactory] createdTypeCount]);
    }
    return 0;
}
