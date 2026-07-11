#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

// ==================== 抽象主题（Subject） ====================

@protocol Image <NSObject>
- (void)display;
@end

// ==================== 真实主题（Real Subject） ====================

// 真实图片：初始化时就要从"磁盘"加载数据，模拟一个昂贵的操作
@interface RealImage : NSObject <Image>

- (instancetype)initWithFilename:(NSString *)filename;

@end

// ==================== 代理（Proxy） ====================

// 代理：延迟到第一次 display 才真正创建 RealImage（懒加载），
// 此后的 display 调用直接复用已创建好的 RealImage，对客户端完全透明。
@interface ImageProxy : NSObject <Image>

- (instancetype)initWithFilename:(NSString *)filename;

@end

NS_ASSUME_NONNULL_END
