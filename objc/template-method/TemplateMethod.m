#import "TemplateMethod.h"

@implementation Beverage

- (instancetype)init {
    self = [super init];
    if (self) {
        _wantsCondiments = YES;
    }
    return self;
}

// 模板方法：算法骨架固定在基类中，具体步骤延迟到子类
- (void)prepareRecipe {
    [self boilWater];
    [self brew];
    [self pourInCup];
    if ([self customerWantsCondiments]) {
        [self addCondiments];
    }
}

- (void)boilWater {
    NSLog(@"  烧开水");
}

- (void)pourInCup {
    NSLog(@"  倒入杯中");
}

- (void)brew {
    NSAssert(NO, @"Beverage 子类必须重写 brew");
}

- (void)addCondiments {
    NSAssert(NO, @"Beverage 子类必须重写 addCondiments");
}

- (BOOL)customerWantsCondiments {
    return self.wantsCondiments;
}

@end

@implementation Tea

- (void)brew {
    NSLog(@"  用沸水浸泡茶叶");
}

- (void)addCondiments {
    NSLog(@"  加柠檬");
}

@end

@implementation Coffee

- (void)brew {
    NSLog(@"  用沸水冲泡咖啡粉");
}

- (void)addCondiments {
    NSLog(@"  加糖和牛奶");
}

@end
