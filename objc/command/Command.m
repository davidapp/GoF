#import "Command.h"

@implementation Light

- (instancetype)initWithLocation:(NSString *)location {
    self = [super init];
    if (self) {
        _location = [location copy];
        _on = NO;
    }
    return self;
}

- (void)turnOn {
    _on = YES;
    NSLog(@"%@ 的灯：开", self.location);
}

- (void)turnOff {
    _on = NO;
    NSLog(@"%@ 的灯：关", self.location);
}

@end

@implementation LightOnCommand {
    Light *_light;
}

- (instancetype)initWithLight:(Light *)light {
    self = [super init];
    if (self) {
        _light = light;
    }
    return self;
}

- (void)execute {
    [_light turnOn];
}

- (void)undo {
    [_light turnOff]; // 撤销"开灯"就是关灯
}

@end

@implementation LightOffCommand {
    Light *_light;
}

- (instancetype)initWithLight:(Light *)light {
    self = [super init];
    if (self) {
        _light = light;
    }
    return self;
}

- (void)execute {
    [_light turnOff];
}

- (void)undo {
    [_light turnOn]; // 撤销"关灯"就是开灯
}

@end

@implementation RemoteControl {
    NSMutableArray<id<Command>> *_history;
}

- (instancetype)init {
    self = [super init];
    if (self) {
        _history = [NSMutableArray array];
    }
    return self;
}

- (void)pressButton:(id<Command>)command {
    [command execute];
    [_history addObject:command]; // 记录历史，供 undo 使用
}

- (void)pressUndo {
    if (_history.count == 0) {
        NSLog(@"没有可撤销的操作");
        return;
    }
    id<Command> last = _history.lastObject;
    [_history removeLastObject];
    NSLog(@"撤销上一步操作:");
    [last undo];
}

@end
