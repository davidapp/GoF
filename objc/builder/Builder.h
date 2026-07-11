#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

// ==================== 产品（Product） ====================

// 产品：电脑，由各部件组装而成
@interface Computer : NSObject

@property (nonatomic, copy) NSString *cpu;
@property (nonatomic, copy) NSString *memory;
@property (nonatomic, copy) NSString *storage;
@property (nonatomic, copy, nullable) NSString *gpu; // 可选部件

- (NSString *)specification;

@end

// ==================== 建造者（Builder） ====================

// 建造者：分步设置各部件；每个 set 方法返回 self，支持链式调用
@interface ComputerBuilder : NSObject

- (instancetype)setCPU:(NSString *)cpu;
- (instancetype)setMemory:(NSString *)memory;
- (instancetype)setStorage:(NSString *)storage;
- (instancetype)setGPU:(nullable NSString *)gpu;

- (Computer *)build;

@end

// ==================== 指挥者（Director） ====================

// 指挥者：封装几种常见预设配置的组装步骤，隐藏具体组装顺序
@interface ComputerDirector : NSObject

- (Computer *)buildOfficePCWithBuilder:(ComputerBuilder *)builder;
- (Computer *)buildGamingPCWithBuilder:(ComputerBuilder *)builder;

@end

NS_ASSUME_NONNULL_END
