#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

// ==================== 抽象构件（Component） ====================

// 抽象构件：饮料，声明价格与描述两个基本行为
@protocol Beverage <NSObject>
- (double)cost;
- (NSString *)beverageDescription;
@end

// ==================== 具体构件（Concrete Component） ====================

@interface Espresso : NSObject <Beverage>
@end

// ==================== 抽象装饰器（Decorator） ====================

// 抽象装饰器：自身也遵循 Beverage 协议，同时持有一个被装饰的 Beverage。
// 因为装饰器和被装饰对象实现同一协议，装饰器可以层层叠加、无限嵌套。
@interface BeverageDecorator : NSObject <Beverage>

- (instancetype)initWithBeverage:(id<Beverage>)beverage;

@end

// ==================== 具体装饰器（Concrete Decorator） ====================

@interface MilkDecorator : BeverageDecorator
@end

@interface SugarDecorator : BeverageDecorator
@end

NS_ASSUME_NONNULL_END
