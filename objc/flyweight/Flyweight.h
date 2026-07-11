#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

// ==================== 享元（Flyweight） ====================

// 享元：树的种类，保存可共享的"内在状态"（名称/颜色/纹理）。
// 假设纹理数据很大，相同种类的树应当只保留一份，供大量 Tree 共享引用。
@interface TreeType : NSObject

@property (nonatomic, readonly, copy) NSString *name;
@property (nonatomic, readonly, copy) NSString *color;
@property (nonatomic, readonly, copy) NSString *texture;

- (instancetype)initWithName:(NSString *)name color:(NSString *)color texture:(NSString *)texture;

- (void)renderAtX:(double)x y:(double)y;

@end

// ==================== 享元工厂（Flyweight Factory） ====================

// 享元工厂：以 (name, color, texture) 为键缓存 TreeType，相同参数只创建一次
@interface TreeTypeFactory : NSObject

+ (instancetype)sharedFactory;

- (TreeType *)treeTypeForName:(NSString *)name color:(NSString *)color texture:(NSString *)texture;

// 实际创建过的不同 TreeType 数量（用于验证共享效果）
- (NSUInteger)createdTypeCount;

@end

// ==================== 客户端上下文（Context） ====================

// 单棵树只保存"外在状态"（坐标），内在状态通过共享的 TreeType 引用获取，
// 因此 Tree 本身非常轻量，可以大量创建而不必担心内存暴涨。
@interface Tree : NSObject

- (instancetype)initWithX:(double)x y:(double)y type:(TreeType *)type;

- (void)render;

@end

// 森林：包含大量的树
@interface Forest : NSObject

- (void)plantTreeAtX:(double)x
                   y:(double)y
                name:(NSString *)name
               color:(NSString *)color
             texture:(NSString *)texture;

- (void)renderAll;

- (NSUInteger)treeCount;

@end

NS_ASSUME_NONNULL_END
