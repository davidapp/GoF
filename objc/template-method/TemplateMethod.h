#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

// ==================== 抽象类（Abstract Class） ====================

// 抽象类：定义冲泡饮料的算法骨架（模板方法），具体步骤延迟到子类实现
@interface Beverage : NSObject

// 钩子方法读取的开关：是否需要加调料，默认 YES，子类/客户端都可以改变它
@property (nonatomic, assign) BOOL wantsCondiments;

// 模板方法：固定了"烧水 -> 冲泡 -> 倒杯 -> (可选)加调料"的步骤顺序，子类不应重写它本身
- (void)prepareRecipe;

// 子类必须重写的抽象步骤
- (void)brew;
- (void)addCondiments;

// 钩子方法（Hook）：默认读取 wantsCondiments，子类也可以整体重写来改变判断逻辑
- (BOOL)customerWantsCondiments;

@end

// ==================== 具体类（Concrete Class） ====================

@interface Tea : Beverage
@end

@interface Coffee : Beverage
@end

NS_ASSUME_NONNULL_END
