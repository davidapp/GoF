#import <Foundation/Foundation.h>
#import "Visitor.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSArray<id<Shape>> *shapes = @[
            [[Circle alloc] initWithRadius:3],
            [[Rectangle alloc] initWithWidth:4 height:5],
            [[Circle alloc] initWithRadius:1.5],
        ];

        NSLog(@"=== AreaVisitor：计算每个图形的面积 ===");
        AreaVisitor *areaVisitor = [[AreaVisitor alloc] init];
        for (id<Shape> shape in shapes) {
            [shape accept:areaVisitor]; // 具体调用哪个 visitXxx: 由图形自己的 accept 决定
        }
        NSLog(@"总面积 = %.2f", [areaVisitor totalArea]);

        NSLog(@" ");
        NSLog(@"=== DrawVisitor：渲染每个图形（同一批对象，换一种操作） ===");
        DrawVisitor *drawVisitor = [[DrawVisitor alloc] init];
        for (id<Shape> shape in shapes) {
            [shape accept:drawVisitor];
        }
    }
    return 0;
}
