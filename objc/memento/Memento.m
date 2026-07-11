#import "Memento.h"

@implementation EditorMemento

- (instancetype)initWithContent:(NSString *)content {
    self = [super init];
    if (self) {
        _content = [content copy];
    }
    return self;
}

@end

@implementation TextEditor

- (EditorMemento *)save {
    return [[EditorMemento alloc] initWithContent:self.content];
}

- (void)restore:(EditorMemento *)memento {
    self.content = memento.content;
}

@end

@implementation History {
    NSMutableArray<EditorMemento *> *_snapshots;
}

- (instancetype)init {
    self = [super init];
    if (self) {
        _snapshots = [NSMutableArray array];
    }
    return self;
}

- (void)push:(EditorMemento *)memento {
    [_snapshots addObject:memento];
}

- (nullable EditorMemento *)pop {
    if (_snapshots.count == 0) {
        return nil;
    }
    EditorMemento *last = _snapshots.lastObject;
    [_snapshots removeLastObject];
    return last;
}

- (NSUInteger)count {
    return _snapshots.count;
}

@end
