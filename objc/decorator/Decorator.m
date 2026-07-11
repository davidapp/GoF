#import "Decorator.h"

@implementation Espresso

- (double)cost {
    return 20.0;
}

- (NSString *)beverageDescription {
    return @"Espresso 浓缩咖啡";
}

@end

@implementation BeverageDecorator {
    id<Beverage> _wrapped;
}

- (instancetype)initWithBeverage:(id<Beverage>)beverage {
    self = [super init];
    if (self) {
        _wrapped = beverage;
    }
    return self;
}

// 默认原样转发给被装饰对象；具体装饰器重写这两个方法来叠加行为
- (double)cost {
    return [_wrapped cost];
}

- (NSString *)beverageDescription {
    return [_wrapped beverageDescription];
}

@end

@implementation MilkDecorator

- (double)cost {
    return [super cost] + 5.0;
}

- (NSString *)beverageDescription {
    return [[super beverageDescription] stringByAppendingString:@" + 牛奶"];
}

@end

@implementation SugarDecorator

- (double)cost {
    return [super cost] + 2.0;
}

- (NSString *)beverageDescription {
    return [[super beverageDescription] stringByAppendingString:@" + 糖"];
}

@end
