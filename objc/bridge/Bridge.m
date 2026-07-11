#import "Bridge.h"

@implementation TV {
    BOOL _on;
    NSInteger _volume;
}

- (NSString *)name {
    return @"电视机";
}

- (BOOL)isOn {
    return _on;
}

- (NSInteger)volume {
    return _volume;
}

- (void)setVolume:(NSInteger)volume {
    _volume = MAX(0, MIN(100, volume));
}

- (void)turnOn {
    _on = YES;
    NSLog(@"%@ 已开机", [self name]);
}

- (void)turnOff {
    _on = NO;
    NSLog(@"%@ 已关机", [self name]);
}

@end

@implementation Radio {
    BOOL _on;
    NSInteger _volume;
}

- (NSString *)name {
    return @"收音机";
}

- (BOOL)isOn {
    return _on;
}

- (NSInteger)volume {
    return _volume;
}

- (void)setVolume:(NSInteger)volume {
    _volume = MAX(0, MIN(100, volume));
}

- (void)turnOn {
    _on = YES;
    NSLog(@"%@ 已开机", [self name]);
}

- (void)turnOff {
    _on = NO;
    NSLog(@"%@ 已关机", [self name]);
}

@end

@implementation RemoteControl

- (instancetype)initWithDevice:(id<Device>)device {
    self = [super init];
    if (self) {
        _device = device;
    }
    return self;
}

- (void)togglePower {
    if ([self.device isOn]) {
        [self.device turnOff];
    } else {
        [self.device turnOn];
    }
}

- (void)volumeUp {
    self.device.volume = self.device.volume + 10;
    NSLog(@"%@ 音量提升至 %ld", self.device.name, (long)self.device.volume);
}

- (void)volumeDown {
    self.device.volume = self.device.volume - 10;
    NSLog(@"%@ 音量降低至 %ld", self.device.name, (long)self.device.volume);
}

@end

@implementation AdvancedRemoteControl

- (void)mute {
    self.device.volume = 0;
    NSLog(@"%@ 已静音", self.device.name);
}

@end
