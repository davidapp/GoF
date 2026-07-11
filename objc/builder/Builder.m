#import "Builder.h"

@implementation Computer

- (NSString *)specification {
    NSMutableString *spec = [NSMutableString stringWithFormat:@"CPU: %@ | 内存: %@ | 存储: %@",
                              self.cpu, self.memory, self.storage];
    if (self.gpu.length > 0) {
        [spec appendFormat:@" | 显卡: %@", self.gpu];
    }
    return spec;
}

@end

@implementation ComputerBuilder {
    NSString *_cpu;
    NSString *_memory;
    NSString *_storage;
    NSString *_gpu;
}

- (instancetype)setCPU:(NSString *)cpu {
    _cpu = [cpu copy];
    return self;
}

- (instancetype)setMemory:(NSString *)memory {
    _memory = [memory copy];
    return self;
}

- (instancetype)setStorage:(NSString *)storage {
    _storage = [storage copy];
    return self;
}

- (instancetype)setGPU:(NSString *)gpu {
    _gpu = [gpu copy];
    return self;
}

- (Computer *)build {
    Computer *computer = [[Computer alloc] init];
    computer.cpu = _cpu ?: @"未指定";
    computer.memory = _memory ?: @"未指定";
    computer.storage = _storage ?: @"未指定";
    computer.gpu = _gpu;
    return computer;
}

@end

@implementation ComputerDirector

- (Computer *)buildOfficePCWithBuilder:(ComputerBuilder *)builder {
    // 预设：办公用机，注重性价比，无需独立显卡
    [builder setCPU:@"Intel i5"];
    [builder setMemory:@"16GB"];
    [builder setStorage:@"512GB SSD"];
    return [builder build];
}

- (Computer *)buildGamingPCWithBuilder:(ComputerBuilder *)builder {
    // 预设：游戏主机，注重性能，需要高端显卡
    [builder setCPU:@"Intel i9"];
    [builder setMemory:@"32GB"];
    [builder setStorage:@"2TB SSD"];
    [builder setGPU:@"NVIDIA RTX 4090"];
    return [builder build];
}

@end
