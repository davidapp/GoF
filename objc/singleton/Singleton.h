#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

// 日志级别
typedef NS_ENUM(NSInteger, LogLevel) {
    LogLevelDebug,
    LogLevelInfo,
    LogLevelWarning,
    LogLevelError,
};

// 单例（Singleton）：全局唯一的 Logger，任何模块通过 +sharedLogger 拿到的都是同一实例。
@interface Logger : NSObject

@property (nonatomic, assign) LogLevel level;

// 全局访问点
+ (instancetype)sharedLogger;

- (void)log:(NSString *)message;

@end

NS_ASSUME_NONNULL_END
