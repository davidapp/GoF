#import "State.h"

@implementation AudioPlayer

- (instancetype)init {
    self = [super init];
    if (self) {
        _state = [[StoppedState alloc] init]; // 初始状态：停止
    }
    return self;
}

- (void)play {
    [self.state play:self];
}

- (void)pause {
    [self.state pause:self];
}

- (void)stop {
    [self.state stop:self];
}

@end

@implementation PlayingState

- (NSString *)stateName {
    return @"播放中";
}

- (void)play:(AudioPlayer *)player {
    NSLog(@"  已经在播放了，无需重复播放");
}

- (void)pause:(AudioPlayer *)player {
    NSLog(@"  暂停播放");
    player.state = [[PausedState alloc] init];
}

- (void)stop:(AudioPlayer *)player {
    NSLog(@"  停止播放");
    player.state = [[StoppedState alloc] init];
}

@end

@implementation PausedState

- (NSString *)stateName {
    return @"已暂停";
}

- (void)play:(AudioPlayer *)player {
    NSLog(@"  从暂停处继续播放");
    player.state = [[PlayingState alloc] init];
}

- (void)pause:(AudioPlayer *)player {
    NSLog(@"  已经是暂停状态，无需重复暂停");
}

- (void)stop:(AudioPlayer *)player {
    NSLog(@"  停止播放");
    player.state = [[StoppedState alloc] init];
}

@end

@implementation StoppedState

- (NSString *)stateName {
    return @"已停止";
}

- (void)play:(AudioPlayer *)player {
    NSLog(@"  开始播放");
    player.state = [[PlayingState alloc] init];
}

- (void)pause:(AudioPlayer *)player {
    NSLog(@"  已停止，无法暂停");
}

- (void)stop:(AudioPlayer *)player {
    NSLog(@"  已经是停止状态");
}

@end
