#import <Foundation/Foundation.h>
#import "Decorator.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        id<Beverage> beverage = [[Espresso alloc] init];
        NSLog(@"%@ - 单价: %.1f 元", [beverage beverageDescription], [beverage cost]);

        // 动态叠加装饰：先加一份牛奶
        beverage = [[MilkDecorator alloc] initWithBeverage:beverage];
        NSLog(@"%@ - 单价: %.1f 元", [beverage beverageDescription], [beverage cost]);

        // 再加一份糖：装饰器可以层层叠加，顺序也会体现在描述里
        beverage = [[SugarDecorator alloc] initWithBeverage:beverage];
        NSLog(@"%@ - 单价: %.1f 元", [beverage beverageDescription], [beverage cost]);

        // 再加一份糖（口味更甜）
        beverage = [[SugarDecorator alloc] initWithBeverage:beverage];
        NSLog(@"%@ - 单价: %.1f 元", [beverage beverageDescription], [beverage cost]);
    }
    return 0;
}
