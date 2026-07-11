#import "Visitor.h"

@implementation Circle

- (instancetype)initWithRadius:(double)radius {
    self = [super init];
    if (self) {
        _radius = radius;
    }
    return self;
}

- (void)accept:(id<ShapeVisitor>)visitor {
    // 双重分派第一跳：这里的 self 类型在编译期就是 Circle，直接调用 visitCircle:
    [visitor visitCircle:self];
}

@end

@implementation Rectangle

- (instancetype)initWithWidth:(double)width height:(double)height {
    self = [super init];
    if (self) {
        _width = width;
        _height = height;
    }
    return self;
}

- (void)accept:(id<ShapeVisitor>)visitor {
    [visitor visitRectangle:self];
}

@end

@implementation AreaVisitor {
    double _total;
}

- (void)visitCircle:(Circle *)circle {
    double area = M_PI * circle.radius * circle.radius;
    NSLog(@"  圆形(半径 %.1f) 面积 = %.2f", circle.radius, area);
    _total += area;
}

- (void)visitRectangle:(Rectangle *)rectangle {
    double area = rectangle.width * rectangle.height;
    NSLog(@"  矩形(%.1f x %.1f) 面积 = %.2f", rectangle.width, rectangle.height, area);
    _total += area;
}

- (double)totalArea {
    return _total;
}

@end

@implementation DrawVisitor

- (void)visitCircle:(Circle *)circle {
    NSLog(@"  绘制圆形: O (半径 %.1f)", circle.radius);
}

- (void)visitRectangle:(Rectangle *)rectangle {
    NSLog(@"  绘制矩形: [] (%.1f x %.1f)", rectangle.width, rectangle.height);
}

@end
