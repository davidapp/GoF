#import "Proxy.h"

@implementation RealImage {
    NSString *_filename;
}

- (instancetype)initWithFilename:(NSString *)filename {
    self = [super init];
    if (self) {
        _filename = [filename copy];
        [self loadFromDisk]; // 构造即加载，代价高昂
    }
    return self;
}

- (void)loadFromDisk {
    NSLog(@"  [RealImage] 正在从磁盘加载 %@ ...（耗时操作）", _filename);
}

- (void)display {
    NSLog(@"  [RealImage] 显示 %@", _filename);
}

@end

@implementation ImageProxy {
    NSString *_filename;
    RealImage *_realImage; // 懒加载，初始为 nil，直到第一次 display 才创建
}

- (instancetype)initWithFilename:(NSString *)filename {
    self = [super init];
    if (self) {
        _filename = [filename copy];
    }
    return self;
}

- (void)display {
    if (_realImage == nil) {
        NSLog(@"[Proxy] 首次访问 %@，创建 RealImage", _filename);
        _realImage = [[RealImage alloc] initWithFilename:_filename];
    } else {
        NSLog(@"[Proxy] %@ 已加载，直接复用，不再重新读盘", _filename);
    }
    [_realImage display];
}

@end
