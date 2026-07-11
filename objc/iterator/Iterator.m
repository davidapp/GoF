#import "Iterator.h"

@implementation Book

- (instancetype)initWithTitle:(NSString *)title author:(NSString *)author {
    self = [super init];
    if (self) {
        _title = [title copy];
        _author = [author copy];
    }
    return self;
}

@end

// 具体迭代器：持有聚合内容的快照与当前游标，按顺序遍历。
// 不对外暴露在 .h 中，因为客户端只应该依赖 Iterator 协议拿到它。
@interface BookIterator : NSObject <Iterator>
- (instancetype)initWithBooks:(NSArray<Book *> *)books;
@end

@implementation BookIterator {
    NSArray<Book *> *_books;
    NSUInteger _index;
}

- (instancetype)initWithBooks:(NSArray<Book *> *)books {
    self = [super init];
    if (self) {
        _books = books;
        _index = 0;
    }
    return self;
}

- (BOOL)hasNext {
    return _index < _books.count;
}

- (nullable Book *)next {
    if (![self hasNext]) {
        return nil;
    }
    Book *book = _books[_index];
    _index += 1;
    return book;
}

@end

@implementation BookCollection {
    NSMutableArray<Book *> *_books;
}

- (instancetype)init {
    self = [super init];
    if (self) {
        _books = [NSMutableArray array];
    }
    return self;
}

- (void)addBook:(Book *)book {
    [_books addObject:book];
}

- (id<Iterator>)createIterator {
    // 传入不可变副本，避免遍历过程中被外部意外修改
    return [[BookIterator alloc] initWithBooks:[_books copy]];
}

- (NSUInteger)count {
    return _books.count;
}

@end
