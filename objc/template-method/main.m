#import <Foundation/Foundation.h>
#import "TemplateMethod.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSLog(@"=== 冲泡茶（默认加调料） ===");
        Tea *tea = [[Tea alloc] init];
        [tea prepareRecipe];

        NSLog(@" ");
        NSLog(@"=== 冲泡咖啡（默认加调料） ===");
        Coffee *coffee = [[Coffee alloc] init];
        [coffee prepareRecipe];

        NSLog(@" ");
        NSLog(@"=== 冲泡黑咖啡（通过钩子方法关闭加调料这一步） ===");
        Coffee *blackCoffee = [[Coffee alloc] init];
        blackCoffee.wantsCondiments = NO;
        [blackCoffee prepareRecipe];
    }
    return 0;
}
