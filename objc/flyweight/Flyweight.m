#import "Flyweight.h"
#import <dispatch/dispatch.h>

@implementation TreeType

- (instancetype)initWithName:(NSString *)name color:(NSString *)color texture:(NSString *)texture {
    self = [super init];
    if (self) {
        _name = [name copy];
        _color = [color copy];
        _texture = [texture copy];
    }
    return self;
}

- (void)renderAtX:(double)x y:(double)y {
    NSLog(@"  在 (%.0f, %.0f) 绘制一棵【%@】(颜色: %@, 纹理: %@)", x, y, self.name, self.color, self.texture);
}

@end

@implementation TreeTypeFactory {
    NSMutableDictionary<NSString *, TreeType *> *_cache;
}

+ (instancetype)sharedFactory {
    static TreeTypeFactory *instance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        instance = [[TreeTypeFactory alloc] init];
    });
    return instance;
}

- (instancetype)init {
    self = [super init];
    if (self) {
        _cache = [NSMutableDictionary dictionary];
    }
    return self;
}

- (TreeType *)treeTypeForName:(NSString *)name color:(NSString *)color texture:(NSString *)texture {
    NSString *key = [NSString stringWithFormat:@"%@-%@-%@", name, color, texture];
    TreeType *type = _cache[key];
    if (type == nil) {
        NSLog(@"[工厂] 缓存未命中，创建新的 TreeType: %@", key);
        type = [[TreeType alloc] initWithName:name color:color texture:texture];
        _cache[key] = type;
    }
    return type;
}

- (NSUInteger)createdTypeCount {
    return _cache.count;
}

@end

@implementation Tree {
    double _x;
    double _y;
    TreeType *_type; // 只持有共享享元的引用，不复制内在状态
}

- (instancetype)initWithX:(double)x y:(double)y type:(TreeType *)type {
    self = [super init];
    if (self) {
        _x = x;
        _y = y;
        _type = type;
    }
    return self;
}

- (void)render {
    [_type renderAtX:_x y:_y];
}

@end

@implementation Forest {
    NSMutableArray<Tree *> *_trees;
}

- (instancetype)init {
    self = [super init];
    if (self) {
        _trees = [NSMutableArray array];
    }
    return self;
}

- (void)plantTreeAtX:(double)x
                   y:(double)y
                name:(NSString *)name
               color:(NSString *)color
             texture:(NSString *)texture {
    // 外在状态（坐标）由调用方传入；内在状态通过工厂共享获取
    TreeType *type = [[TreeTypeFactory sharedFactory] treeTypeForName:name color:color texture:texture];
    Tree *tree = [[Tree alloc] initWithX:x y:y type:type];
    [_trees addObject:tree];
}

- (void)renderAll {
    for (Tree *tree in _trees) {
        [tree render];
    }
}

- (NSUInteger)treeCount {
    return _trees.count;
}

@end
