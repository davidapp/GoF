#import <Foundation/Foundation.h>
#import "Prototype.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        Circle *originalCircle = [[Circle alloc] initWithColor:@"红色" x:0 y:0 radius:5];
        Rectangle *originalRect = [[Rectangle alloc] initWithColor:@"蓝色" x:1 y:1 width:10 height:20];

        NSLog(@"=== 原型对象 ===");
        NSLog(@"原始圆形: %@", [originalCircle shapeDescription]);
        NSLog(@"原始矩形: %@", [originalRect shapeDescription]);

        // 通过 -copy（NSCopying）克隆，而不是重新 new 一个再逐一赋值
        Circle *clonedCircle = [originalCircle copy];
        Rectangle *clonedRect = [originalRect copy];

        // 修改克隆体的属性，验证与原对象相互独立
        clonedCircle.color = @"绿色";
        clonedCircle.x = 100;
        clonedRect.color = @"黄色";
        clonedRect.height = 999;

        NSLog(@"\n=== 克隆并修改后 ===");
        NSLog(@"克隆圆形: %@", [clonedCircle shapeDescription]);
        NSLog(@"克隆矩形: %@", [clonedRect shapeDescription]);

        NSLog(@"\n=== 验证原对象未受影响 ===");
        NSLog(@"原始圆形: %@", [originalCircle shapeDescription]);
        NSLog(@"原始矩形: %@", [originalRect shapeDescription]);

        NSLog(@"\n地址验证: original=%p, clone=%p（不同实例）", (void *)originalCircle, (void *)clonedCircle);
    }
    return 0;
}
