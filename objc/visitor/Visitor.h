#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@class Circle;
@class Rectangle;

// ==================== 访问者（Visitor） ====================

// 访问者协议：为每种具体元素声明一个 visit 方法，是实现"双重分派"的关键
@protocol ShapeVisitor <NSObject>
- (void)visitCircle:(Circle *)circle;
- (void)visitRectangle:(Rectangle *)rectangle;
@end

// ==================== 元素（Element） ====================

// 元素协议：接受访问者，固定写法 [visitor visitXxx:self]
@protocol Shape <NSObject>
- (void)accept:(id<ShapeVisitor>)visitor;
@end

// ==================== 具体元素（Concrete Element） ====================

@interface Circle : NSObject <Shape>

@property (nonatomic, readonly) double radius;

- (instancetype)initWithRadius:(double)radius;

@end

@interface Rectangle : NSObject <Shape>

@property (nonatomic, readonly) double width;
@property (nonatomic, readonly) double height;

- (instancetype)initWithWidth:(double)width height:(double)height;

@end

// ==================== 具体访问者（Concrete Visitor） ====================

// 求面积的访问者：累加所有访问过的图形面积
@interface AreaVisitor : NSObject <ShapeVisitor>

- (double)totalArea;

@end

// 渲染的访问者：把图形"画"成简单的文字描述
@interface DrawVisitor : NSObject <ShapeVisitor>
@end

NS_ASSUME_NONNULL_END
