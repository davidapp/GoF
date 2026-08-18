#import "Singleton.h"
#import <dispatch/dispatch.h>

@implementation Logger

+ (instancetype)sharedLogger {
    static Logger *instance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        // 绕开我们自己重写的 allocWithZone:，直接向 NSObject 要一块裸实例
        instance = [(Logger *)[super allocWithZone:NULL] init];
    });
    return instance;
}

// 拦截 alloc：即使外部代码写 [[Logger alloc] init]，也无法绕过单例
+ (instancetype)allocWithZone:(NSZone *)zone {
    return [self sharedLogger];
}

- (instancetype)init {
    self = [super init];
    if (self) {
        _level = LogLevelInfo;
    }
    return self;
}

- (void)log:(NSString *)message {
    NSLog(@"[%@] %@", [self levelName], message);
}

- (NSString *)levelName {
    switch (self.level) {
        case LogLevelDebug:   return @"DEBUG";
        case LogLevelInfo:    return @"INFO";
        case LogLevelWarning: return @"WARNING";
        case LogLevelError:   return @"ERROR";
    }
    return @"UNKNOWN";
}

@end
