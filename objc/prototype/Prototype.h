#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

// ==================== 抽象原型（Prototype） ====================

// 抽象原型：所有可克隆的图形都遵循 NSCopying —— 这是 ObjC 中原型模式的惯用实现方式，
// 无需自己定义 clone 协议，直接复用 Foundation 内建机制。
@interface Shape : NSObject <NSCopying>

@property (nonatomic, copy) NSString *color;
@property (nonatomic, assign) double x;
@property (nonatomic, assign) double y;

- (instancetype)initWithColor:(NSString *)color x:(double)x y:(double)y;

// 返回描述文本，子类重写时通过 [super shapeDescription] 附加自身特有属性
- (NSString *)shapeDescription;

@end

// ==================== 具体原型（Concrete Prototype） ====================

@interface Circle : Shape

@property (nonatomic, assign) double radius;

- (instancetype)initWithColor:(NSString *)color x:(double)x y:(double)y radius:(double)radius;

@end

@interface Rectangle : Shape

@property (nonatomic, assign) double width;
@property (nonatomic, assign) double height;

- (instancetype)initWithColor:(NSString *)color
                             x:(double)x
                             y:(double)y
                         width:(double)width
                        height:(double)height;

@end

NS_ASSUME_NONNULL_END
