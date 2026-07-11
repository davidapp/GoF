#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

// ==================== 接收者（Receiver） ====================

// 接收者：真正执行业务逻辑的对象，命令只是对它的操作的一层封装
@interface Light : NSObject

@property (nonatomic, readonly, getter=isOn) BOOL on;
@property (nonatomic, copy, readonly) NSString *location;

- (instancetype)initWithLocation:(NSString *)location;

- (void)turnOn;
- (void)turnOff;

@end

// ==================== 命令（Command） ====================

// 命令协议：把"请求"封装成对象，统一提供 execute/undo，
// 调用者与接收者之间因此完全解耦。
@protocol Command <NSObject>
- (void)execute;
- (void)undo;
@end

// ==================== 具体命令（Concrete Command） ====================

@interface LightOnCommand : NSObject <Command>
- (instancetype)initWithLight:(Light *)light;
@end

@interface LightOffCommand : NSObject <Command>
- (instancetype)initWithLight:(Light *)light;
@end

// ==================== 调用者（Invoker） ====================

// 调用者：遥控器，只认识 Command 协议，不知道背后接收者的具体类型；
// 同时维护一个历史栈，支持撤销最近一次操作。
@interface RemoteControl : NSObject

- (void)pressButton:(id<Command>)command;
- (void)pressUndo;

@end

NS_ASSUME_NONNULL_END
