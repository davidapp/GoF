#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

// ==================== 实现部（Implementor） ====================

// 实现部协议：各种"设备"的统一底层操作接口
@protocol Device <NSObject>

@property (nonatomic, readonly, copy) NSString *name;
@property (nonatomic, readonly, getter=isOn) BOOL on;
@property (nonatomic, assign) NSInteger volume; // 0-100

- (void)turnOn;
- (void)turnOff;

@end

// ==================== 具体实现（Concrete Implementor） ====================

@interface TV : NSObject <Device>
@end

@interface Radio : NSObject <Device>
@end

// ==================== 抽象部（Abstraction） ====================

// 抽象部：遥控器持有一个 Device（这就是"桥"），自身操作都委托给 device 完成。
// 由此"遥控器种类"与"设备种类"可以独立变化、自由组合，避免 N x M 的子类爆炸。
@interface RemoteControl : NSObject

@property (nonatomic, strong, readonly) id<Device> device;

- (instancetype)initWithDevice:(id<Device>)device;

- (void)togglePower;
- (void)volumeUp;
- (void)volumeDown;

@end

// ==================== 扩展抽象（Refined Abstraction） ====================

// 高级遥控器：在基础遥控器之上追加静音功能，依然只依赖 Device 协议，
// 不关心桥接的另一端具体是 TV 还是 Radio。
@interface AdvancedRemoteControl : RemoteControl

- (void)mute;

@end

NS_ASSUME_NONNULL_END
