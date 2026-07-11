#import "Prototype.h"

@implementation Shape

- (instancetype)initWithColor:(NSString *)color x:(double)x y:(double)y {
    self = [super init];
    if (self) {
        _color = [color copy];
        _x = x;
        _y = y;
    }
    return self;
}

// 基类自身的克隆逻辑：子类会各自重写，返回各自正确的类型
- (id)copyWithZone:(NSZone *)zone {
    return [[Shape allocWithZone:zone] initWithColor:self.color x:self.x y:self.y];
}

- (NSString *)shapeDescription {
    return [NSString stringWithFormat:@"颜色: %@, 位置: (%.1f, %.1f)", self.color, self.x, self.y];
}

@end

@implementation Circle

- (instancetype)initWithColor:(NSString *)color x:(double)x y:(double)y radius:(double)radius {
    self = [super initWithColor:color x:x y:y];
    if (self) {
        _radius = radius;
    }
    return self;
}

// 重写克隆：连同 radius 一起复制，返回一个独立的新 Circle 实例
- (id)copyWithZone:(NSZone *)zone {
    return [[Circle allocWithZone:zone] initWithColor:self.color x:self.x y:self.y radius:self.radius];
}

- (NSString *)shapeDescription {
    return [NSString stringWithFormat:@"圆形 | %@, 半径: %.1f", [super shapeDescription], self.radius];
}

@end

@implementation Rectangle

- (instancetype)initWithColor:(NSString *)color
                             x:(double)x
                             y:(double)y
                         width:(double)width
                        height:(double)height {
    self = [super initWithColor:color x:x y:y];
    if (self) {
        _width = width;
        _height = height;
    }
    return self;
}

- (id)copyWithZone:(NSZone *)zone {
    return [[Rectangle allocWithZone:zone] initWithColor:self.color
                                                        x:self.x
                                                        y:self.y
                                                    width:self.width
                                                   height:self.height];
}

- (NSString *)shapeDescription {
    return [NSString stringWithFormat:@"矩形 | %@, 宽: %.1f, 高: %.1f", [super shapeDescription], self.width, self.height];
}

@end
