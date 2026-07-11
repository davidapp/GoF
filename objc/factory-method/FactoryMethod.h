#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

// ==================== 抽象产品（Abstract Product） ====================

// 抽象产品：运输工具
@protocol Transport <NSObject>
- (NSString *)deliver; // 执行运输，返回描述文本
@end

// ==================== 具体产品（Concrete Product） ====================

@interface Truck : NSObject <Transport>
@end

@interface Ship : NSObject <Transport>
@end

// ==================== 创建者（Creator） ====================

// 抽象创建者：定义工厂方法 createTransport，交由子类决定具体产出哪种产品；
// 同时提供一个依赖工厂方法的模板方法 planDelivery。
@interface Logistics : NSObject

// 工厂方法：子类必须重写，基类不知道具体产出什么运输工具
- (id<Transport>)createTransport;

// 依赖工厂方法完成一次完整的配送流程（对客户端而言这是唯一入口）
- (NSString *)planDelivery;

@end

// ==================== 具体创建者（Concrete Creator） ====================

@interface RoadLogistics : Logistics
@end

@interface SeaLogistics : Logistics
@end

NS_ASSUME_NONNULL_END
