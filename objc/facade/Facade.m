#import "Facade.h"

@implementation Projector
- (void)on { NSLog(@"投影仪：开启"); }
- (void)off { NSLog(@"投影仪：关闭"); }
- (void)setInputSource:(NSString *)source { NSLog(@"投影仪：切换输入源为 %@", source); }
@end

@implementation Amplifier
- (void)on { NSLog(@"功放：开启"); }
- (void)off { NSLog(@"功放：关闭"); }
- (void)setVolume:(NSInteger)volume { NSLog(@"功放：音量设置为 %ld", (long)volume); }
@end

@implementation Lights
- (void)dimTo:(NSInteger)level { NSLog(@"灯光：调暗至 %ld%%", (long)level); }
@end

@implementation StreamingPlayer
- (void)on { NSLog(@"流媒体播放器：开启"); }
- (void)off { NSLog(@"流媒体播放器：关闭"); }
- (void)play:(NSString *)title { NSLog(@"流媒体播放器：播放《%@》", title); }
@end

@implementation HomeTheaterFacade {
    Projector *_projector;
    Amplifier *_amplifier;
    Lights *_lights;
    StreamingPlayer *_player;
}

- (instancetype)initWithProjector:(Projector *)projector
                        amplifier:(Amplifier *)amplifier
                           lights:(Lights *)lights
                           player:(StreamingPlayer *)player {
    self = [super init];
    if (self) {
        _projector = projector;
        _amplifier = amplifier;
        _lights = lights;
        _player = player;
    }
    return self;
}

// 一键观影：内部协调四个子系统，客户端不必了解具体步骤和顺序
- (void)watchMovie:(NSString *)title {
    NSLog(@"=== 准备观影：《%@》===", title);
    [_lights dimTo:20];
    [_projector on];
    [_projector setInputSource:@"HDMI 1"];
    [_amplifier on];
    [_amplifier setVolume:60];
    [_player on];
    [_player play:title];
    NSLog(@"一切就绪，请享用！");
}

- (void)endMovie {
    NSLog(@"=== 结束观影，恢复现场 ===");
    [_player off];
    [_amplifier off];
    [_projector off];
    [_lights dimTo:100];
}

@end
