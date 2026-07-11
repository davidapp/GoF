#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

// ==================== 组件（Component） ====================

// 组件协议：File（叶子）与 Directory（组合）都遵循同一协议，
// 客户端统一通过 size / printWithIndent: 访问，无需区分二者。
@protocol FileSystemComponent <NSObject>

@property (nonatomic, readonly, copy) NSString *name;

- (NSInteger)size;                            // 计算大小（字节），组合会递归求和
- (void)printWithIndent:(NSString *)indent;   // 按缩进打印树状结构

@end

// ==================== 叶子（Leaf） ====================

// 叶子：普通文件，没有子节点
@interface File : NSObject <FileSystemComponent>

@property (nonatomic, readonly, copy) NSString *name;

- (instancetype)initWithName:(NSString *)name size:(NSInteger)size;

@end

// ==================== 组合（Composite） ====================

// 组合：目录，可以包含文件或子目录，对外表现出与叶子一致的接口
@interface Directory : NSObject <FileSystemComponent>

@property (nonatomic, readonly, copy) NSString *name;

- (instancetype)initWithName:(NSString *)name;

- (void)addComponent:(id<FileSystemComponent>)component;

@end

NS_ASSUME_NONNULL_END
