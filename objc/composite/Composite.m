#import "Composite.h"

@implementation File {
    NSInteger _size;
}

- (instancetype)initWithName:(NSString *)name size:(NSInteger)size {
    self = [super init];
    if (self) {
        _name = [name copy];
        _size = size;
    }
    return self;
}

- (NSInteger)size {
    return _size;
}

- (void)printWithIndent:(NSString *)indent {
    NSLog(@"%@- %@ (%ld 字节)", indent, self.name, (long)_size);
}

@end

@implementation Directory {
    NSMutableArray<id<FileSystemComponent>> *_children;
}

- (instancetype)initWithName:(NSString *)name {
    self = [super init];
    if (self) {
        _name = [name copy];
        _children = [NSMutableArray array];
    }
    return self;
}

- (void)addComponent:(id<FileSystemComponent>)component {
    [_children addObject:component];
}

- (NSInteger)size {
    // 递归累加所有子组件大小；调用者无需关心子节点究竟是文件还是子目录
    NSInteger total = 0;
    for (id<FileSystemComponent> child in _children) {
        total += [child size];
    }
    return total;
}

- (void)printWithIndent:(NSString *)indent {
    NSLog(@"%@+ %@/ (%ld 字节)", indent, self.name, (long)[self size]);
    NSString *childIndent = [indent stringByAppendingString:@"  "];
    for (id<FileSystemComponent> child in _children) {
        [child printWithIndent:childIndent];
    }
}

@end
