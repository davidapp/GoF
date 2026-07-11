#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@class AudioPlayer;

// ==================== 状态（State） ====================

// 状态协议：同一操作（play/pause/stop）在不同状态下有不同的行为
@protocol PlayerState <NSObject>

@property (nonatomic, copy, readonly) NSString *stateName;

- (void)play:(AudioPlayer *)player;
- (void)pause:(AudioPlayer *)player;
- (void)stop:(AudioPlayer *)player;

@end

// ==================== 上下文（Context） ====================

// 上下文：播放器，把 play/pause/stop 请求委托给当前状态对象处理，
// 自身不写任何 if/switch 判断状态，状态切换由具体状态对象自己决定。
@interface AudioPlayer : NSObject

@property (nonatomic, strong) id<PlayerState> state;

- (void)play;
- (void)pause;
- (void)stop;

@end

// ==================== 具体状态（Concrete State） ====================

@interface PlayingState : NSObject <PlayerState>
@end

@interface PausedState : NSObject <PlayerState>
@end

@interface StoppedState : NSObject <PlayerState>
@end

NS_ASSUME_NONNULL_END
