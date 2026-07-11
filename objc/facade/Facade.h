#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

// ==================== 子系统（Subsystem Classes） ====================
// 各子系统类相互独立，互不知道对方的存在，各自的接口都比较繁琐

@interface Projector : NSObject
- (void)on;
- (void)off;
- (void)setInputSource:(NSString *)source;
@end

@interface Amplifier : NSObject
- (void)on;
- (void)off;
- (void)setVolume:(NSInteger)volume;
@end

@interface Lights : NSObject
- (void)dimTo:(NSInteger)level;
@end

@interface StreamingPlayer : NSObject
- (void)on;
- (void)off;
- (void)play:(NSString *)title;
@end

// ==================== 外观（Facade） ====================

// 外观：为子系统提供一个简化的高层接口，客户端只需调用 watchMovie:/endMovie
@interface HomeTheaterFacade : NSObject

- (instancetype)initWithProjector:(Projector *)projector
                        amplifier:(Amplifier *)amplifier
                           lights:(Lights *)lights
                           player:(StreamingPlayer *)player;

- (void)watchMovie:(NSString *)title;
- (void)endMovie;

@end

NS_ASSUME_NONNULL_END
