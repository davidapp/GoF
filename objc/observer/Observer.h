#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

// ==================== 观察者（Observer） ====================

@protocol Observer <NSObject>
- (void)updateTemperature:(double)temperature;
@end

// ==================== 主题（Subject） ====================

// 主题：气象站，维护观察者列表，温度变化时统一通知，
// 自身不知道观察者的具体类型，只依赖 Observer 协议。
@interface WeatherStation : NSObject

- (void)addObserver:(id<Observer>)observer;
- (void)removeObserver:(id<Observer>)observer;

- (void)setTemperature:(double)temperature;

@end

// ==================== 具体观察者（Concrete Observer） ====================

@interface PhoneDisplay : NSObject <Observer>
@end

@interface TVDisplay : NSObject <Observer>
@end

NS_ASSUME_NONNULL_END
